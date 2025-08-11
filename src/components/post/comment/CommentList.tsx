import React from 'react';
import { List } from 'antd';
import type { Comment } from '../../../interface/Comment';
import CommentItem from './CommentItem';
import './CommentList.css';
import type { UserResponse } from '../../../interface/UserResponse';

interface CommentListProps {
  comments: Comment[];
  onReply: (commentId: number, content: string) => void;
  items: UserResponse[];
  currentUserId?: number;
  maxLevel?: number;
}

const CommentList: React.FC<CommentListProps> = ({
  comments,
  onReply,
  items,
  currentUserId,
  maxLevel = 3
}) => {
  // Flatten nested comments for rendering
  const flattenComments = (comments: Comment[], level: number = 0): Comment[] => {
    const result: Comment[] = [];
    
    for (let i = 0; i < comments.length; i++) {
      const comment = comments[i];
      
      // Add current comment with level
      result.push({ ...comment, level });
      
      // Add replies recursively if they exist and we haven't reached max level
      if (comment.replies && comment.replies.length > 0 && level < maxLevel) {
        const childComments = flattenComments(comment.replies, level + 1);
        for (let j = 0; j < childComments.length; j++) {
          result.push(childComments[j]);
        }
      }
    }
    
    return result;
  };

  const flatComments = flattenComments(comments);

  return (
    <List
      className="comment-list"
      dataSource={flatComments}
      style={{ maxWidth: '100%', overflow: 'hidden' }}
      renderItem={(comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          level={comment.level || 0}
          onReply={onReply}
          items={items}
          currentUserId={currentUserId}
          maxLevel={maxLevel}
        />
      )}
    />
  );
};

export default CommentList;
