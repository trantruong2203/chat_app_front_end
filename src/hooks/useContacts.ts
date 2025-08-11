import { useState, useEffect, useCallback } from 'react';
import { useAppSelector } from './index';
import type { FriendShip } from '../interface/UserResponse';

interface UseContactsReturn {
  contacts: FriendShip[];
  loading: boolean;
  error: string | null;
}

export const useContacts = (currentUserId: number | undefined): UseContactsReturn => {
  const friendShip = useAppSelector((state) => state.friendship.items);

  const [contacts, setContacts] = useState<FriendShip[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Memoized function to get filtered friendships
  const getFilteredFriendships = useCallback(() => {
    if (!currentUserId) return [];

    try {
      setLoading(true);
      setError(null);

      const filteredFriendships = friendShip.filter(item =>
        (item.sentat == currentUserId || item.userid == currentUserId) &&
        item.status === 0 
      );

      return filteredFriendships;
    } catch (err) {
      setError('Không thể tải danh sách bạn bè');
      console.error('Error filtering friendships:', err);
      return [];
    } finally {
      setLoading(false);
    }
  }, [currentUserId, friendShip]);

  // Update contacts when dependencies change
  useEffect(() => {
    const filteredContacts = getFilteredFriendships();
    setContacts(filteredContacts);
  }, [getFilteredFriendships]);

  return {
    contacts,
    loading,
    error
  };
};