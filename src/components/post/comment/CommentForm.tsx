import React, { useState, useContext, useRef, useEffect } from 'react';
import {
  Input,
  Button,
  Avatar,
  Space,
  message
} from 'antd';
import {
  SendOutlined,
  SmileOutlined,
  PictureOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import type { CommentFormProps, CommentCreateRequest, CommentFormData } from '../../../interface/Comment';
import { ContextAuth } from '../../../contexts/AuthContext';
import { getObjectById } from '../../../services/respone';
import type { RootState, AppDispatch } from '../../../stores/store';
import { createdComment } from '../../../features/comments/commentThunks';



const { TextArea } = Input;

const CommentForm: React.FC<CommentFormProps> = ({
  postId,
  parentId,
  placeholder = "Viết bình luận...",
  onSubmit,
  onCancel,
  loading = false,
  autoFocus = false,
  compact = false
}) => {
  const [content, setContent] = useState('');
  const [focused, setFocused] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const accountLogin = useContext(ContextAuth);
  const { items } = useSelector((state: RootState) => state.user);
  const currentUser = getObjectById(items, accountLogin?.accountLogin?.email ?? '');
  const dispatch = useDispatch<AppDispatch>();
    
  useEffect(() => {
    if (autoFocus && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [autoFocus]);

  const handleSubmit = async () => {
    if (!content.trim()) {
      message.warning('Vui lòng nhập nội dung bình luận');
      return;
    }

    if (!currentUser) {
      message.error('Vui lòng đăng nhập để bình luận');
      return;
    }

    // Tạo CommentFormData để gửi qua onSubmit prop
    const commentFormData: CommentCreateRequest = {
      userid: currentUser.id,
      postid: postId,
      content: content.trim(),
      iconid: 0,
      imgurl: '',
      commentid: parentId || undefined
    };

    try {
      if (onSubmit) {
        await onSubmit(commentFormData as unknown as CommentFormData);
      } else {
                  const commentData = {
            userid: currentUser.id,
            postid: postId,
            content: content.trim(),
            iconid: 0,
            imgurl: '',
            commentid: parentId || undefined
          };
        await dispatch(createdComment(commentData));
      }
      setContent('');
      setFocused(false);
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const handleCancel = () => {
    setContent('');
    setFocused(false);
    if (onCancel) {
      onCancel();
    }
  };

  const isSubmitDisabled = !content.trim() || loading;

  return (
    <div className={`comment-form ${compact ? 'compact' : ''} ${focused ? 'focused' : ''}`} style={{ maxWidth: '100%' }}>
      <div className="comment-form-content">
        {!compact && (
          <Avatar
            src={currentUser?.avatar}
            size={40}
            className="comment-form-avatar"
          />
        )}
        
        <div className="comment-form-input-container">
          <TextArea
            ref={textAreaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => !content && setFocused(false)}
            placeholder={placeholder}
            autoSize={{ minRows: compact ? 1 : 2, maxRows: 6 }}
            className="comment-form-textarea"
            disabled={loading}
            style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}
          />
          
          {(focused || content || compact) && (
            <div className="comment-form-actions">
              <div className="comment-form-tools">
                <Space wrap>
                  <Button
                    type="text"
                    icon={<SmileOutlined />}
                    size="small"
                    className="comment-tool-btn"
                    title="Thêm emoji"
                  />
                  <Button
                    type="text"
                    icon={<PictureOutlined />}
                    size="small"
                    className="comment-tool-btn"
                    title="Thêm hình ảnh"
                  />
                </Space>
              </div>
              
              <div className="comment-form-submit">
                <Space wrap>
                  {(compact || content) && (
                    <Button
                      size="small"
                      onClick={handleCancel}
                      disabled={loading}
                    >
                      Hủy
                    </Button>
                  )}
                  <Button
                    type="primary"
                    size="small"
                    icon={<SendOutlined />}
                    onClick={handleSubmit}
                    loading={loading}
                    disabled={isSubmitDisabled}
                  >
                    {compact ? 'Trả lời' : 'Bình luận'}
                  </Button>
                </Space>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
