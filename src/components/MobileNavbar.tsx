import React from 'react';
import type { MenuProps } from 'antd';
import { Avatar, Menu, Tooltip } from 'antd';
import { 
  MessageOutlined, 
  UserOutlined,
  SettingOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import type { RootState } from '../stores/store';
import { useNavigate } from 'react-router-dom';
import { useResponsive } from '../hooks/useResponsive';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const itemsMenu: MenuItem[] = [
  getItem('Chat', '1', <MessageOutlined />),
  getItem('Danh bạ', '2', <UserOutlined />),
  getItem('Bài viết', '3', <AppstoreOutlined />),
  getItem('Cài đặt', '4', <SettingOutlined />),
];

interface MobileNavbarProps {
  setIsUserModalOpen: (isUserModalOpen: boolean) => void;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ setIsUserModalOpen }) => {
  const { isMobile } = useResponsive();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);

  const onMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === '2') {
      navigate('/contacts');
    } else if (e.key === '1') {
      navigate('/');
    } else if (e.key === '3') {
      navigate('/post');
    }
  };

  if (!isMobile) {
    return null;
  }

  return (
    <div className="mobile-navbar">
      <div className="mobile-user-avatar">
        <Tooltip title="Hồ sơ cá nhân" placement="top">
          <Avatar
            className="user-avatar"
            style={{
              backgroundColor: '#ffffff',
              color: 'var(--yahoo-primary)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '36px',
              height: '36px',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              cursor: 'pointer'
            }}
            src={user?.avatar || null}
            onClick={() => setIsUserModalOpen(true)}
          />
        </Tooltip>
      </div>
      
      <Menu
        theme="dark"
        defaultSelectedKeys={['1']}
        mode="horizontal"
        items={itemsMenu}
        onClick={onMenuClick}
        style={{ 
          border: 'none',
          background: 'transparent',
          flex: 1,
          justifyContent: 'space-around'
        }}
      />
    </div>
  );
};

export default MobileNavbar; 