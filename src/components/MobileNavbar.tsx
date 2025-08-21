import React from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { 
  MessageOutlined, 
  UserOutlined,
  SettingOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useResponsive } from '../hooks/useResponsive';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  key: React.Key,
  icon: React.ReactNode,
): MenuItem {
  return {
    key,
    icon,
    label: null, // Không hiển thị text, chỉ hiển thị icon
  } as MenuItem;
}

const itemsMenu: MenuItem[] = [
  getItem('1', <MessageOutlined style={{ fontSize: '20px' }} />),
  getItem('2', <UserOutlined style={{ fontSize: '20px' }} />),
  getItem('3', <AppstoreOutlined style={{ fontSize: '20px' }} />),
  getItem('4', <SettingOutlined style={{ fontSize: '20px' }} />),
];

const MobileNavbar: React.FC = () => {
  const { isMobile } = useResponsive();
  const navigate = useNavigate();

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
      <Menu
        theme="dark"
        defaultSelectedKeys={['1']}
        mode="horizontal"
        items={itemsMenu}
        onClick={onMenuClick}
        className="mobile-navbar-menu"
      />
    </div>
  );
};

export default MobileNavbar; 