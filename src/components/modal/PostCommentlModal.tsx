import React, { useEffect, useState } from 'react';
import {
  Modal,
  Avatar,
  Typography,
  Button,
  Divider,
  Image,
  Space,
  Spin,
  message,
  Empty
} from 'antd';
import {
  CommentOutlined,
  ShareAltOutlined,
  GlobalOutlined,
  MoreOutlined,
  LikeFilled,
  LikeOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../stores/store';
import { getObjectByEmail } from '../../services/respone';
import type { PostDetailModalProps, CommentFormData } from '../../interface/Comment';
import CommentList from '../post/comment/CommentList';
import dayjs from 'dayjs';
import './PostDetailModal.css';
import CommentForm from '../post/comment/CommentForm';
import { createdComment, getCommentsByPostId } from '../../features/comments/commentThunks';
import { buildCommentTree } from '../../utils/commentMapper';

const { Title, Text, Paragraph } = Typography;

const PostDetailModal: React.FC<PostDetailModalProps> = ({
  visible,
  onClose,
  post,
  postImages,
  favoriteCounts,
  handleLike,
  isFavorite,
  currentUserId
}) => {
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { items: comments } = useSelector((state: RootState) => state.comment);
  const { items } = useSelector((state: RootState) => state.user);
  
  // Build comment tree from flat array
  const commentTree = buildCommentTree(comments);
  
  const postAuthor = post ? getObjectByEmail(items, post.userid) : null;
  
  // Format time function
  const formatTime = (dateString: string) => {
    const now = dayjs();
    const postDate = dayjs(dateString);
    const diffInHours = now.diff(postDate, 'hour');
    const diffInDays = now.diff(postDate, 'day');

    if (diffInDays >= 1) {
      return postDate.format('DD/MM/YYYY lúc HH:mm');
    } else if (diffInHours >= 1) {
      return `${diffInHours} giờ trước`;
    } else {
      const diffInMinutes = now.diff(postDate, 'minute');
      return `${diffInMinutes} phút trước`;
    }
  };

  useEffect(() => {
    if (post) {
      const getComment = dispatch(getCommentsByPostId(post.id));
      console.log(getComment);
    }
  }, [post, dispatch]);

  const handleCommentSubmit = async (data: CommentFormData) => {
    if (!currentUserId || !post) {
      message.error('Vui lòng đăng nhập để bình luận');
      return;
    }

    setSubmitting(true);
    try {
      const commentData = {
        userid: data.userid,
        postid: data.postid,
        content: data.content,
        iconid: data.iconid || undefined,
        imgurl: data.imgurl || undefined,
        commentid: data.commentid || undefined
      };

      await dispatch(createdComment(commentData));
      message.success('Đã thêm bình luận');
      dispatch(getCommentsByPostId(post.id));
    } catch (error) {
      console.error('Error submitting comment:', error);
      message.error('Không thể thêm bình luận');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCommentReply = async (commentId: number, content: string) => {
    if (!post || !currentUserId) return;
    
    await handleCommentSubmit({
      id: 0,
      userid: currentUserId,
      createdat: new Date().toISOString(),
      iconid: 0,
      imgurl: '',
      content,
      postid: post.id,
      commentid: commentId 
    });
  };

  if (!post) return null;

  return (
    <Modal
      title={`bai viet cua `}
      open={visible}
      onCancel={onClose}
      footer={null} 
      width="90%"
      style={{ maxWidth: '800px' }}
      className="post-detail-modal"
      styles={{
          body: { padding: 0, maxHeight: 'calc(90vh - 120px)' },
          header: { textAlign: 'center', fontSize: '18px', fontWeight: 'bold', padding: '16px 20px' },
        }}
    >
      <div className="post-detail-content">
        {/* Post Header */}
        <div className="post-header">
          <div className="post-author-info">
            <Avatar
              src={postAuthor?.avatar}
              size={48}
              className="post-author-avatar"
            />
            <div className="post-meta">
              <Title level={5} className="post-author-name">
                {postAuthor?.username || 'Người dùng'}
              </Title>
              <Text type="secondary" className="post-time">
                {formatTime(post.createdat)} · <GlobalOutlined />
              </Text>
            </div>
          </div>
          <Button
            type="text"
            shape="circle"
            icon={<MoreOutlined />}
            className="post-more-btn"
          />
        </div>

        {/* Post Content */}
        <div className="post-content">
          <Paragraph className="post-text">
            {post.content}
          </Paragraph>
          
          {postImages && postImages.length > 0 && (
            <div className="post-images">
              {postImages.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt="Post image"
                  className="post-image"
                />
              ))}
            </div>
          )}
        </div>

        {/* Post Stats */}
        <div className="post-stats">
          <div className="post-stats-left">
            <Space>
              {isFavorite(post.id) ? <LikeFilled className="like-icon liked" /> : <LikeOutlined className="like-icon" />}
              <Text>{favoriteCounts[post.id] || 0} lượt thích</Text>
            </Space>
          </div>
          <div className="post-stats-right">
            <Text type="secondary">
              {commentTree.length} bình luận · {post.shares || 0} lượt chia sẻ
            </Text>
          </div>
        </div>

        <Divider className="post-divider" />

        {/* Action Buttons */}
        <div className="post-actions">
          <Button
            type="text"
            icon={isFavorite(post.id) ? <LikeFilled /> : <LikeOutlined />}
            className={`action-btn like-btn ${isFavorite(post.id) ? 'liked' : ''}`}
            onClick={() => handleLike(post.id)}
          >
            Thích
          </Button>
          <Button
            type="text"
            icon={<CommentOutlined />}
            className="action-btn comment-btn"
          >
            Bình luận
          </Button>
          <Button
            type="text"
            icon={<ShareAltOutlined />}
            className="action-btn share-btn"
          >
            Chia sẻ
          </Button>
        </div>

        <Divider className="post-divider" />

        {/* Comments Section */}
        <div className="comments-section">
          <div className="comments-header">
            <Title level={5}>Bình luận ({commentTree.length})</Title>
          </div>

           {/* Comment Form */}
           <div className="comment-form-container">
            <CommentForm
              postId={post.id}
              onSubmit={handleCommentSubmit}
              loading={submitting}
              placeholder="Viết bình luận..."
            />
          </div>

          {/* Comments List */}
          <div className="comments-list-container">
            {submitting ? (
              <div className="comments-loading">
                <Spin size="large" />
                <Text>Đang tải bình luận...</Text>
              </div>
            ) : commentTree.length > 0 ? (
              <CommentList
                comments={commentTree}
                onReply={handleCommentReply}
                items={items}
                currentUserId={currentUserId}
              />
            ) : (
              <Empty
                description="Chưa có bình luận nào"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PostDetailModal;
