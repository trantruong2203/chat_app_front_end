import React from 'react';
import {
  Avatar,
  Button,
  Card,
  Divider,
  Typography,
  Image,
} from 'antd';
import {
  LikeOutlined,
  CommentOutlined,
  ShareAltOutlined,
  MoreOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import type { PostUI } from '../../hooks/usePostData';
import { getObjectByEmail } from '../../services/respone';
import type { UserResponse } from '../../interface/UserResponse';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';

// Configure dayjs
dayjs.extend(relativeTime);
dayjs.locale('vi');

const { Title, Text, Paragraph } = Typography;

// Time formatting function
const formatTime = (dateString: string) => {
  const now = dayjs();
  const postDate = dayjs(dateString);
  const diffInHours = now.diff(postDate, 'hour');
  const diffInDays = now.diff(postDate, 'day');

  if (diffInDays >= 1) {
    return postDate.format('DD/MM/YYYY lúc HH:mm');
  } else if (diffInHours >= 1) {
    return `${diffInHours} giờ`;
  } else {
    const diffInMinutes = now.diff(postDate, 'minute');
    return `${diffInMinutes} phút`;
  }
};

interface PostCardProps {
  post: PostUI;
  postImages: string[];
  users: UserResponse[];
  favoriteCounts: { [postId: number]: number };
  isFavorite: (postId: number) => boolean;
  onLike: (postId: number) => Promise<void>;
  onComment: (post: PostUI) => void;
  onShare?: (post: PostUI) => void;
}

const PostCard: React.FC<PostCardProps> = React.memo(({
  post,
  postImages,
  users,
  favoriteCounts,
  isFavorite,
  onLike,
  onComment,
  onShare
}) => {
  const author = getObjectByEmail(users, post.userid);
  const favoriteCount = favoriteCounts[post.id] || 0;
  const isLiked = isFavorite(post.id);

  const handleLike = () => {
    onLike(post.id);
  };

  const handleComment = () => {
    onComment(post);
  };

  const handleShare = () => {
    onShare?.(post);
  };

  return (
    <Card
      style={{
        marginBottom: 20,
        borderRadius: '12px',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Post Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            src={author?.avatar}
            size="large"
            style={{ marginRight: 12 }}
          />
          <div>
            <Title level={5} style={{ margin: 0, fontWeight: 600 }}>
              {author?.username || 'Người dùng'}
            </Title>
            <Text type="secondary" style={{ fontSize: '13px' }}>
              {formatTime(post.createdat)} · <GlobalOutlined />
            </Text>
          </div>
        </div>
        <Button type="text" shape="circle" icon={<MoreOutlined />} />
      </div>

      {/* Post Content */}
      <Paragraph style={{ fontSize: '15px', margin: '0 0 15px 0' }}>
        {post.content}
      </Paragraph>

      {/* Post Images */}
      {postImages && postImages.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          {postImages.length === 1 && (
            <Image
              src={postImages[0]}
              alt="Post image"
              style={{
                borderRadius: '8px',
                width: '100%',
                maxHeight: '400px',
                objectFit: 'cover'
              }}
            />
          )}

          {postImages.length === 2 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {postImages.map((image: string, index: number) => (
                <Image
                  key={index}
                  src={image}
                  alt={`Post image ${index + 1}`}
                  style={{
                    borderRadius: '8px',
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover'
                  }}
                />
              ))}
            </div>
          )}

          {postImages.length === 3 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <Image
                src={postImages[0]}
                alt="Post image 1"
                style={{
                  borderRadius: '8px',
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  gridColumn: '1 / -1'
                }}
              />
              {postImages.slice(1, 3).map((image: string, index: number) => (
                <Image
                  key={index + 1}
                  src={image}
                  alt={`Post image ${index + 2}`}
                  style={{
                    borderRadius: '8px',
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover'
                  }}
                />
              ))}
            </div>
          )}

          {postImages.length >= 4 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {postImages.slice(0, 3).map((image: string, index: number) => (
                <Image
                  key={index}
                  src={image}
                  alt={`Post image ${index + 1}`}
                  style={{
                    borderRadius: '8px',
                    width: '100%',
                    height: index === 0 ? '200px' : '150px',
                    objectFit: 'cover',
                    gridColumn: index === 0 ? '1 / -1' : 'auto'
              }}
            />
          ))}
              <div style={{ position: 'relative' }}>
                <Image
                  src={postImages[3]}
                  alt="Post image 4"
                  style={{
                    borderRadius: '8px',
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover'
                  }}
                />
                {postImages.length > 4 && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.6)',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '24px',
                      fontWeight: 'bold'
                    }}
                  >
                    +{postImages.length - 4}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Post Stats */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}>
        <Text type="secondary">
          <LikeOutlined style={{ color: isLiked ? '#1877f2' : 'inherit' }} /> {favoriteCount}
        </Text>
        <Text type="secondary">
          {post.comments || 0} bình luận · {post.shares || 0} lượt chia sẻ
        </Text>
      </div>

      <Divider style={{ margin: '10px 0' }} />

      {/* Action Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          type="text"
          icon={<LikeOutlined />}
          style={{
            flex: 1,
            color: isLiked ? '#1877f2' : 'inherit',
            fontWeight: isLiked ? 'bold' : 'normal'
          }}
          onClick={handleLike}
        >
          Thích
        </Button>
        <Button
          type="text"
          icon={<CommentOutlined />}
          style={{ flex: 1 }}
          onClick={handleComment}
        >
          Bình luận
        </Button>
        <Button
          type="text"
          icon={<ShareAltOutlined />}
          style={{ flex: 1 }}
          onClick={handleShare}
        >
          Chia sẻ
        </Button>
      </div>
    </Card>
  );
});

PostCard.displayName = 'PostCard';

export default PostCard;