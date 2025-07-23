import React, { useContext, useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Avatar, Layout, Menu } from 'antd';
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
import type { UserResponse } from '../interface/UserResponse';
import { useNavigate } from 'react-router-dom';


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
  getItem('1', '1', <MessageOutlined />),
  getItem('2', '2', <UserOutlined />),
  getItem('3', '3', <AppstoreOutlined />),
  getItem('4', '4', <SettingOutlined />),
];

const Navbar: React.FC<{ setIsUserModalOpen: (isUserModalOpen: boolean) => void }> = ({ setIsUserModalOpen }) => {
  const {accountLogin} = useContext(ContextAuth);
  const [userData, setUserData] = useState<UserResponse | null>(null);
  const { items } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  useEffect(() => {
    if (accountLogin) {
      setUserData(getObjectById(items, accountLogin.email) || null);
    }
  }, [accountLogin, items, dispatch]);

  const onMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === '2') {
      navigate('/contacts');
    } else if (e.key === '1') {
      navigate('/');
    }
  };

  return (
    <Sider
      className="app-navbar"
      width={70}
      style={{ 
        borderRight: '1px solid var(--wechat-border)',
        zIndex: 1000
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
        <Avatar
          className="user-avatar"
          style={{
            backgroundColor: '#f5f5f5',
            color: '#666',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '40px',
            height: '40px',
          }}  
          src={userData?.avatar}
          onClick={() => setIsUserModalOpen(true)}
        />
      </div>
    
      <Menu
        theme="dark"
        defaultSelectedKeys={['1']}
        mode="inline"
        items={itemsMenu}
        onClick={onMenuClick}
        style={{ 
          borderRight: 0,
          textAlign: 'center'
        }}
      />
      
    </Sider >
  );
};

export default Navbar;