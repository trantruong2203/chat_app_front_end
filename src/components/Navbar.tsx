import React, { useState } from 'react';
import { FileOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Layout, Menu } from 'antd';
import { MdContacts, MdGroups, MdMessage } from 'react-icons/md';
import UserModal from '../pages/modal/UserModal';

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

const Navbar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };


  return (
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{ borderRight: '1px solid #f0f0f0' }}
        >
          <Avatar
            style={{
              margin: '16px',
              backgroundColor: '#87d068',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '40px',
              height: '40px',
            }}  
            icon={<UserOutlined />}
            onClick={showModal}
          />
        
          <Menu
            theme="dark"
            defaultSelectedKeys={['1']}
            mode="inline"
            items={items}
          />
          <UserModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </Sider >
  );
};

export default Navbar;