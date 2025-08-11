import { useState, useEffect, useCallback, useRef } from 'react';
import { useAppDispatch, useAppSelector } from './index';
import {
  countedFavoritePost,
  createdFavoritePost,
  deletedFavoritePost,
  getFavoritePosts
} from '../features/favoritePost/favoritePostThunks';
import type { FavoritePost } from '../interface/UserResponse';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

interface UseFavoritesReturn {
  favoriteCounts: { [postId: number]: number };
  isFavorite: (postId: number) => boolean;
  handleLike: (postId: number) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const useFavorites = (currentUserId: number | undefined, postIds: number[]): UseFavoritesReturn => {
  const dispatch = useAppDispatch();
  const favoritePosts = useAppSelector((state) => state.favoritePost.items);

  const [favoriteCounts, setFavoriteCounts] = useState<{ [postId: number]: number }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Use useRef for timeout to avoid stale closure issues
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasLoadedInitialCounts = useRef(false);

  // Memoized function to check if a post is favorited
  const isFavorite = useCallback((postId: number) => {
    if (!currentUserId) return false;
    return favoritePosts.some(item => item.postid === postId && item.userid === currentUserId);
  }, [favoritePosts, currentUserId]);

  // Function to refresh count for a specific post
  const refreshPostCount = useCallback(async (postId: number) => {
    try {
      const count = await dispatch(countedFavoritePost(postId)).unwrap();
      setFavoriteCounts(prev => ({ ...prev, [postId]: count }));
    } catch (error) {
      console.error(`Error refreshing count for post ${postId}:`, error);
    }
  }, [dispatch]);

  // Batch load favorite counts with debouncing
  const loadFavoriteCounts = useCallback(async (postIdsToLoad: number[]) => {
    if (postIdsToLoad.length === 0 || !currentUserId) return;

    setLoading(true);
    setError(null);

    try {
      // Load counts in parallel instead of sequentially
      const countPromises = postIdsToLoad.map(async (postId) => {
        try {
          const count = await dispatch(countedFavoritePost(postId)).unwrap();
          return { postId, count };
        } catch (error) {
          console.error(`Error loading favorite count for post ${postId}:`, error);
          return { postId, count: 0 };
        }
      });

      const results = await Promise.all(countPromises);

      const newCounts: { [postId: number]: number } = {};
      results.forEach(({ postId, count }) => {
        newCounts[postId] = count;
      });

      setFavoriteCounts(prev => ({ ...prev, ...newCounts }));
    } catch (err) {
      setError('Không thể tải số lượt thích');
      console.error('Error loading favorite counts:', err);
    } finally {
      setLoading(false);
    }
  }, [dispatch, currentUserId]);

  // Debounced version of loadFavoriteCounts using useRef
  const debouncedLoadCounts = useCallback((postIdsToLoad: number[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      loadFavoriteCounts(postIdsToLoad);
    }, 300);
  }, [loadFavoriteCounts]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Load favorite counts when postIds change
  useEffect(() => {
    const newPostIds = postIds.filter(id => !(id in favoriteCounts));
    if (newPostIds.length > 0) {
      debouncedLoadCounts(newPostIds);
    }
  }, [postIds, favoriteCounts, debouncedLoadCounts]);

  // Load favorite counts immediately when postIds are available for the first time
  useEffect(() => {
    if (postIds.length > 0 && !hasLoadedInitialCounts.current) {
      hasLoadedInitialCounts.current = true;
      loadFavoriteCounts(postIds);
    }
  }, [postIds, loadFavoriteCounts]);

  // Load favorite posts on mount
  useEffect(() => {
    dispatch(getFavoritePosts());
  }, [dispatch]);

  // Handle like/unlike with optimistic updates
  const handleLike = useCallback(async (postId: number) => {
    if (!currentUserId) {
      toast.error('Vui lòng đăng nhập để thích bài viết');
      return;
    }

    const isCurrentlyFavorite = isFavorite(postId);
    const currentCount = favoriteCounts[postId] || 0;

    // Optimistic update
    setFavoriteCounts(prev => ({
      ...prev,
      [postId]: isCurrentlyFavorite
        ? Math.max(0, currentCount - 1)
        : currentCount + 1
    }));

    const favoritePost: FavoritePost = {
      id: 0,
      userid: currentUserId,
      postid: postId,
      createdat: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      iconid: null
    };

    try {
      if (isCurrentlyFavorite) {
        await dispatch(deletedFavoritePost({ postid: postId, userid: currentUserId })).unwrap();
      } else {
        await dispatch(createdFavoritePost(favoritePost)).unwrap();
      }

      // Refresh favorite posts and update count for this specific post
      await Promise.all([
        dispatch(getFavoritePosts()),
        refreshPostCount(postId)
      ]);
    } catch (error) {
      // Revert optimistic update on error
      setFavoriteCounts(prev => ({
        ...prev,
        [postId]: currentCount
      }));

      console.error('Error handling like:', error);
      toast.error('Có lỗi xảy ra khi thích bài viết');
    }
  }, [currentUserId, isFavorite, dispatch, favoriteCounts, refreshPostCount]);

  return {
    favoriteCounts,
    isFavorite,
    handleLike,
    loading,
    error
  };
};