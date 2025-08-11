import React, { useState, useContext } from 'react';
import { Layout, Alert } from 'antd';
import type { UploadFile } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import '../../App.css';
import { ContextAuth } from '../../contexts/AuthContext';
import { useAppSelector } from '../../hooks';
import { getObjectById } from '../../services/respone';
import { usePostData } from '../../hooks/usePostData';
import { useFavorites } from '../../hooks/useFavorites';
import { useNewsData } from '../../hooks/useNewsData';
import { useContacts } from '../../hooks/useContacts';
import CreatPostModal from './CreatPostModal';
import PostDetailModal from '../../components/modal/PostCommentlModal';
import PostCard from '../../components/post/PostCard';
import NewsSidebar from '../../components/post/NewsSidebar';
import ContactsSidebar from '../../components/post/ContactsSidebar';
import CreatePostSection from '../../components/post/CreatePostSection';
import PostTabs from '../../components/post/PostTabs';
import ErrorBoundary from '../../components/ErrorBoundary';
import { PostSkeleton } from '../../components/Loading';
import { toast } from 'react-toastify';
import type { Post } from '../../interface/UserResponse';

const { Content } = Layout;

const Post: React.FC = () => {
  // Basic state
  const [newPostContent, setNewPostContent] = useState('');
  const [activeTab, setActiveTab] = useState('foryou');
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [postDetailModalVisible, setPostDetailModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [uploadFileList, setUploadFileList] = useState<UploadFile[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  // Get current user info
  const accountLogin = useContext(ContextAuth);
  const { items: users } = useAppSelector((state) => state.user);
  const currentUserId = getObjectById(users, accountLogin?.accountLogin?.email ?? '')?.id;

  // Custom hooks for data management
  const { contacts } = useContacts(currentUserId);
  const { allPosts, postImagesMap, loading: postsLoading, error: postsError } = usePostData(currentUserId, contacts);
  const { favoriteCounts, isFavorite, handleLike} = useFavorites(currentUserId, allPosts.map(p => p.id));
  const { newsArticles, loading: newsLoading, error: newsError, refreshNews } = useNewsData();

  // Event handlers
  const handleOpenPostDetail = (post: Post) => {
    setSelectedPost(post);
    setPostDetailModalVisible(true);
  };

  const handleClosePostDetail = () => {
    setPostDetailModalVisible(false);
    setSelectedPost(null);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  // Early return if no user logged in
  if (!currentUserId) {
    return (
      <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
        <Content style={{ padding: '50px', textAlign: 'center' }}>
          <h2>Vui lòng đăng nhập để xem bài viết</h2>
        </Content>
      </Layout>
    );
  }

  // Upload props for create post
  const uploadProps = {
    beforeUpload: (file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setPreviewImages([reader.result as string]);
          setSelectedImages([file]);
          setOpen(true);
        }
      };
      reader.onerror = () => {
        toast.error('Lỗi khi đọc file ảnh');
      };
      reader.readAsDataURL(file);
      return false;
    },
  };

  const handleImageSelect = (info: UploadChangeParam<UploadFile>) => {
    const { fileList } = info;
    const validFiles = fileList.filter((file: UploadFile) => file.status !== 'error' && file.originFileObj instanceof File);

    setUploadFileList(validFiles);
    const validFileObjects = validFiles.map((file: UploadFile) => file.originFileObj as File);
    setSelectedImages(validFileObjects);

    const newPreviewImages: string[] = [];
    validFileObjects.forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newPreviewImages.push(e.target?.result as string);
        if (newPreviewImages.length === validFileObjects.length) {
          setPreviewImages([...newPreviewImages]);
        }
      };
      reader.onerror = () => {
        toast.error('Lỗi khi đọc file ảnh');
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <ErrorBoundary>
      <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5', overflow: 'scroll' }}>
        <Layout>
          {/* News Sidebar */}
          <ErrorBoundary fallback={<div style={{ width: 380, padding: 20 }}>Không thể tải tin tức</div>}>
            <NewsSidebar
              newsArticles={newsArticles}
              loading={newsLoading}
              error={newsError}
              onRefresh={refreshNews}
            />
          </ErrorBoundary>

          {/* Main Content */}
          <Layout style={{ padding: '20px', marginLeft: 380, marginRight: 300, marginTop: 0 }}>
            <Content>
              {/* Create Post Section */}
              <CreatePostSection
                users={users}
                currentUserId={currentUserId}
                onCreatePost={() => setOpen(true)}
                uploadProps={uploadProps}
              />

              {/* Post Tabs */}
              <PostTabs
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />

              {/* Posts List with Loading and Error States */}
              {postsLoading ? (
                <PostSkeleton />
              ) : postsError ? (
                <Alert
                  message="Lỗi tải bài viết"
                  description={postsError}
                  type="error"
                  showIcon
                  style={{ marginBottom: 20 }}
                />
              ) : allPosts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '50px 0' }}>
                  <h3>Chưa có bài viết nào</h3>
                  <p>Hãy tạo bài viết đầu tiên của bạn!</p>
                </div>
              ) : (
                allPosts.map((post) => (
                  <ErrorBoundary key={post.id} fallback={<div>Lỗi hiển thị bài viết</div>}>
                    <PostCard
                      post={post}
                      postImages={postImagesMap[post.id] || []}
                      users={users}
                      favoriteCounts={favoriteCounts}
                      isFavorite={isFavorite}
                      onLike={handleLike}
                      onComment={handleOpenPostDetail}
                    />
                  </ErrorBoundary>
                ))
              )}
            </Content>
          </Layout>

          {/* Contacts Sidebar */}
          <ErrorBoundary fallback={<div style={{ width: 300, padding: 20 }}>Không thể tải danh bạ</div>}>
            <ContactsSidebar
              contacts={contacts}
              users={users}
              currentUserId={currentUserId}
            />
          </ErrorBoundary>
        </Layout>

        {/* Modals */}
        <CreatPostModal
          open={open}
          setOpen={setOpen}
          confirmLoading={confirmLoading}
          setConfirmLoading={setConfirmLoading}
          setNewPostContent={setNewPostContent}
          newPostContent={newPostContent}
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
          uploadFileList={uploadFileList}
          setUploadFileList={setUploadFileList}
          previewImages={previewImages}
          setPreviewImages={setPreviewImages}
          handleImageSelect={handleImageSelect}
        />
        <PostDetailModal
          visible={postDetailModalVisible}
          onClose={handleClosePostDetail}
          post={selectedPost}
          postImages={selectedPost ? postImagesMap[selectedPost.id] || [] : []}
          favoriteCounts={favoriteCounts}
          handleLike={handleLike}
          isFavorite={isFavorite}
          currentUserId={currentUserId}
        />
      </Layout>
    </ErrorBoundary>
  );
};

export default Post;
