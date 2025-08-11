import React from 'react';
import { Card } from 'antd';
import {
  FireOutlined,
  HeartOutlined,
} from '@ant-design/icons';

interface PostTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const PostTabs: React.FC<PostTabsProps> = React.memo(({
  activeTab,
  onTabChange
}) => {
  return (
    <Card style={{
      marginBottom: 20,
      borderRadius: '12px',
      padding: '0',
      overflow: 'hidden',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ display: 'flex', width: '100%' }}>
        <div
          style={{
            flex: 1,
            textAlign: 'center',
            padding: '12px',
            fontWeight: activeTab === 'foryou' ? 'bold' : 'normal',
            borderBottom: activeTab === 'foryou' ? '3px solid #1877f2' : 'none',
            color: activeTab === 'foryou' ? '#1877f2' : 'inherit',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onClick={() => onTabChange('foryou')}
        >
          <FireOutlined style={{ marginRight: '8px' }} />
          Dành cho bạn
        </div>
        <div
          style={{
            flex: 1,
            textAlign: 'center',
            padding: '12px',
            fontWeight: activeTab === 'following' ? 'bold' : 'normal',
            borderBottom: activeTab === 'following' ? '3px solid #1877f2' : 'none',
            color: activeTab === 'following' ? '#1877f2' : 'inherit',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onClick={() => onTabChange('following')}
        >
          <HeartOutlined style={{ marginRight: '8px' }} />
          Đang theo dõi
        </div>
      </div>
    </Card>
  );
});

PostTabs.displayName = 'PostTabs';

export default PostTabs;