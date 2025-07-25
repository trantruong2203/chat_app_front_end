import React from 'react';
import { Avatar, Typography } from 'antd';
import { EllipsisOutlined, UserOutlined } from '@ant-design/icons';
import type { UserResponse } from '../interface/UserResponse';

const { Title } = Typography;

interface HeadMainProps {
  chatPartner?: UserResponse | null;
}

const HeadMain: React.FC<HeadMainProps> = ({ chatPartner }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 16px',
      borderBottom: '1px solid var(--wechat-border)',
      backgroundColor: '#F5F5F5'
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar 
          size={36} 
          icon={<UserOutlined />} 
          src={chatPartner?.avatar}
          style={{ marginRight: '8px' }}
        />
        <div>
          <Title level={5} style={{ margin: 0 }}>
            {chatPartner ? chatPartner.username : 'Chọn một cuộc trò chuyện'}
          </Title>
          <div style={{ fontSize: '12px', color: '#666' }}>
            {chatPartner?.email || ''}
          </div>
        </div>
      </div>
      <div>
        <EllipsisOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
      </div>
    </div>
  );
};

export default HeadMain;