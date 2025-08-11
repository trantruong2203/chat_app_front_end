import React, { useState } from 'react';
import {
  Avatar,
  Typography,
  Button,
  Space,
  message
} from 'antd';
import {
  MoreOutlined
} from '@ant-design/icons';
import type { Comment } from '../../../interface/Comment';
import CommentForm from './CommentForm';
import dayjs from 'dayjs';
import { getObjectByEmail } from '../../../services/respone';
import type { UserResponse } from '../../../interface/UserResponse';

interface CommentItemProps {
  comment: Comment;
  level: number;
  onReply: (commentId: number, content: string) => void;
  items: UserResponse[];
  currentUserId?: number;
  maxLevel?: number;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  level,
  onReply,
  items,
  currentUserId,
  maxLevel = 3
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const canReply = level < maxLevel;
  const { Text, Paragraph } = Typography;
  const commentAuthor = getObjectByEmail(items, comment.userId.toString());


  // Format time for comment
  const formatCommentTime = (dateString: string) => {
    const now = dayjs();
    const commentDate = dayjs(dateString);
    const diffInMinutes = now.diff(commentDate, 'minute');
    const diffInHours = now.diff(commentDate, 'hour');
    const diffInDays = now.diff(commentDate, 'day');

    if (diffInMinutes < 1) {
      return 'Vừa xong';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} phút`;
    } else if (diffInHours < 24) {
      return `${diffInHours} giờ`;
    } else if (diffInDays < 7) {
      return `${diffInDays} ngày`;
    } else {
      return commentDate.format('DD/MM/YYYY');
    }
  };

  const handleReplySubmit = (content: string) => {
    try {
      onReply(comment.id, content);
      setShowReplyForm(false);
      message.success('Đã trả lời bình luận');
    } catch (error) {
      console.error('Error replying to comment:', error);
      message.error('Không thể trả lời bình luận');
    }
  };

  const handleReplyCancel = () => {
    setShowReplyForm(false);
  };

  // Calculate indentation based on level
  const indentStyle = {
    marginLeft: level * 32,
    borderLeft: level > 0 ? '2px solid #f0f0f0' : 'none',
    paddingLeft: level > 0 ? 16 : 0,
    maxWidth: '100%',
    wordWrap: 'break-word' as const,
    overflowWrap: 'break-word' as const
  };

  return (
    <div className={`comment-item level-${level}`} style={indentStyle}>
      <div className="comment-content">
        <div className="comment-header">
          <Avatar
            src={commentAuthor?.avatar}
            size={level === 0 ? 40 : 32}
            className="comment-avatar"
          />
          <div className="comment-info">
            <div className="comment-author-line">
              <Text strong className="comment-author">
                {commentAuthor?.username || 'Người dùng'}
              </Text>
              <Text type="secondary" className="comment-time">
                {formatCommentTime(comment.createdAt)}
              </Text>
            </div>
            <Paragraph className="comment-text" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
              {comment.content}
            </Paragraph>
          </div>
          <Button
            type="text"
            shape="circle"
            icon={<MoreOutlined />}
            size="small"
            className="comment-more-btn"
          />
        </div>

        <div className="comment-actions">
          <Space size="large" wrap>

            {canReply && (
              <Button
                type="text"
                size="small"
                className="comment-reply-btn"
                onClick={() => setShowReplyForm(!showReplyForm)}
              >
                Trả lời
              </Button>
            )}

            {currentUserId === comment.userId && (
              <Button
                type="text"
                size="small"
                className="comment-edit-btn"
              >
                Chỉnh sửa
              </Button>
            )}
          </Space>
        </div>

        {/* Reply Form */}
        {showReplyForm && (
          <div className="comment-reply-form">
            <CommentForm
              postId={comment.postId}
              parentId={comment.id}
              placeholder={`Trả lời ${commentAuthor?.username || 'người dùng'}...`}
              onSubmit={(data) => handleReplySubmit(data.content)}
              onCancel={handleReplyCancel}
              compact={true}
              autoFocus={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;