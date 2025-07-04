import React, { useState } from 'react';
import { FileOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Layout, Menu } from 'antd';
import { MdContacts, MdGroups, MdMessage } from 'react-icons/md';


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

const items: MenuItem[] = [
  getItem('Tin nhắn', '1', <MdMessage />),
  getItem('Danh bạ', '2', <MdContacts />),
  getItem('Nhóm chat', 'sub1', <MdGroups />, [
    getItem('Nhóm 1', '3'),
    getItem('Nhóm 2', '4'),
    getItem('Nhóm 3', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];

  const Navbar: React.FC<{ setIsUserModalOpen: (isUserModalOpen: boolean) => void }> = ({ setIsUserModalOpen }) => {
  const [collapsed, setCollapsed] = useState(false);


  return (
    <Sider
      className="app-navbar"
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      style={{ 
        borderRight: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-sm)',
        zIndex: 1000
      }}
    >
      <div 
        className="gradient-bg" 
        style={{ 
          padding: '20px 0', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          marginBottom: '10px'
        }}
      >
        <Avatar
          className="user-avatar"
          style={{
            backgroundColor: 'white',
            color: 'var(--primary-color)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '40px',
            height: '40px',
            boxShadow: 'var(--shadow-md)'
          }}  
          icon={<UserOutlined />}
          onClick={() => setIsUserModalOpen(true)}
        />
      </div>
    
      <Menu
        theme="dark"
        defaultSelectedKeys={['1']}
        mode="inline"
        items={items}
        style={{ borderRight: 0 }}
      />
      
    </Sider >
  );
};

export default Navbar;