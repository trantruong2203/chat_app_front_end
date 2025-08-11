import React from 'react';
import {
  Avatar,
  Button,
  Card,
  Divider,
  Upload,
} from 'antd';
import {
  PictureOutlined,
  SmileOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { getObjectByEmail } from '../../services/respone';
import type { User } from '../../interface/UserResponse';

interface CreatePostSectionProps {
  users: User[];
  currentUserId: number | undefined;
  onCreatePost: () => void;
  uploadProps: UploadProps;
}

const CreatePostSection: React.FC<CreatePostSectionProps> = React.memo(({
  users,
  currentUserId,
  onCreatePost,
  uploadProps
}) => {
  const currentUser = getObjectByEmail(users, currentUserId ?? '');

  return (
    <Card style={{
      marginBottom: 20,
      borderRadius: '12px',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Create Post Input */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
        <Avatar
          src={currentUser?.avatar}
          size="large"
          style={{ marginRight: 12 }}
        />
        <Button
          type="text"
          style={{
            flex: 1,
            borderRadius: '50px',
            height: '40px',
            backgroundColor: '#f0f2f5',
            color: '#000',
            fontSize: '15px',
            justifyContent: 'flex-start'
          }}
          onClick={onCreatePost}
        >
          Bạn đang nghĩ gì?
        </Button>
      </div>

      <Divider style={{ margin: '8px 0' }} />

      {/* Action Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Upload
          multiple
          accept="image/*"
          {...uploadProps}
          showUploadList={false}
        >
          <Button
            type="text"
            icon={<PictureOutlined style={{ fontSize: '18px', color: '#45bd62' }} />}
            style={{ flex: 1, borderRadius: '8px', height: '40px' }}
          >
            Ảnh/Video
          </Button>
        </Upload>

        <Button
          type="text"
          icon={<SmileOutlined style={{ fontSize: '18px', color: '#f7b928' }} />}
          style={{ flex: 1, borderRadius: '8px', height: '40px' }}
        >
          Cảm xúc
        </Button>

        <Button
          type="text"
          icon={<GlobalOutlined style={{ fontSize: '18px', color: '#1877f2' }} />}
          style={{ flex: 1, borderRadius: '8px', height: '40px' }}
        >
          Vị trí
        </Button>
      </div>
    </Card>
  );
});

CreatePostSection.displayName = 'CreatePostSection';

export default CreatePostSection;