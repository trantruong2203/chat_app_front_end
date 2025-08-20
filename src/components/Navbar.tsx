import React, { useContext, useEffect } from 'react';
import type { MenuProps } from 'antd';
import { Avatar, Layout, Menu, Tooltip } from 'antd';
import { 
  MessageOutlined, 
  UserOutlined,
  SettingOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../stores/store';
import { ContextAuth } from '../contexts/AuthContext';
import { getObjectById } from '../services/respone';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../features/users/userSlice';

type MenuItem = Required<MenuProps>['items'][number];
const { Sider } = Layout;

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
  getItem( '', '1', <MessageOutlined />),
  getItem( '', '2', <UserOutlined />),
  getItem( '', '3', <AppstoreOutlined />),
  getItem( '', '4', <SettingOutlined />),
];

const Navbar: React.FC<{ setIsUserModalOpen: (isUserModalOpen: boolean) => void }> = ({ setIsUserModalOpen }) => {
  const {accountLogin} = useContext(ContextAuth);
  const { items } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);
 
  useEffect(() => {
    if (accountLogin) {
      dispatch(setUser(getObjectById(items, accountLogin.email) || null));
    }
  }, [accountLogin, items, dispatch]);

  const onMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === '2') {
      navigate('/contacts');
    } else if (e.key === '1') {
      navigate('/');
    } else if (e.key === '3') {
      navigate('/post');
    }
  };

  return (
    <Sider
      className="app-navbar"
      width={80}
      style={{ 
        borderRight: '1px solid var(--yahoo-border)',
        zIndex: 1000,
        background: 'var(--yahoo-primary)',
        minWidth: '80px'
      }}
    >
      <div 
        style={{ 
          padding: '20px 0', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          marginBottom: '20px'
        }}
      >
        <Tooltip title="Hồ sơ cá nhân" placement="right">
          <Avatar
            className="user-avatar"
            style={{
              backgroundColor: '#ffffff',
              color: 'var(--yahoo-primary)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '45px',
              height: '45px',
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
        mode="inline"
        items={itemsMenu}
        onClick={onMenuClick}
        style={{ 
          borderRight: 0,
          textAlign: 'center',
          background: 'transparent'
        }}
      />
      
    </Sider >
  );
};

export default Navbar;