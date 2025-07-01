import React, { useState } from 'react';
import { Avatar, Layout, theme, Input, Button } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { UserOutlined } from '@ant-design/icons';
import { MdCall } from 'react-icons/md';
import { CiVideoOn } from 'react-icons/ci';
import { CiSearch } from 'react-icons/ci';
import { SendOutlined } from '@ant-design/icons';

const { Content } = Layout;

const Main: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [message, setMessage] = useState<string>('');
  
  // Xử lý gửi tin nhắn
  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Tin nhắn gửi:', message);
      // Thêm logic gửi tin nhắn tại đây
      setMessage('');
    }
  };

  return (
    <Content style={{ border: '1px solid #e0e0e0', display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header
        style={{
          padding: '10px 14px',
          backgroundColor: '#f9f9f9',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '10px',
          height: '60px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
          <Avatar size={40} icon={<UserOutlined />} />
          <p style={{ fontSize: '16px', fontWeight: 'bold', margin: 0 }}>Nguyễn Văn A</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '15px' }}>
          <MdCall size={24} color='#1890ff' style={{ cursor: 'pointer' }} />
          <CiVideoOn size={24} color='#1890ff' style={{ cursor: 'pointer' }} />
          <CiSearch size={24} color='#1890ff' style={{ cursor: 'pointer' }} />
        </div>
      </Header>
      
      <div
        style={{
          padding: '20px',
          flex: 1,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}
      >
        {/* Tin nhắn nhận từ người khác */}
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignSelf: 'flex-start', maxWidth: '80%' }}>
          <Avatar size={36} icon={<UserOutlined />} />
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            backgroundColor: '#f0f2f5', 
            padding: '12px', 
            borderRadius: '16px 16px 16px 0', 
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)' 
          }}>
            <p style={{ fontSize: '15px', fontWeight: '400', margin: 0 }}>Xin chào bạn, tôi có thể giúp gì cho bạn?</p>
            <span style={{ fontSize: '12px', color: '#666', alignSelf: 'flex-end', marginTop: '4px' }}>10:05</span>
          </div>
        </div>

        {/* Tin nhắn gửi từ người dùng hiện tại */}
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignSelf: 'flex-end', maxWidth: '80%' }}>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            backgroundColor: '#1890ff', 
            color: 'white',
            padding: '12px', 
            borderRadius: '16px 16px 0 16px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)' 
          }}>
            <p style={{ fontSize: '15px', fontWeight: '400', margin: 0 }}>Tôi cần hỗ trợ về ứng dụng chat này</p>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', alignSelf: 'flex-end', marginTop: '4px' }}>10:07</span>
          </div>
        </div>

        {/* Tin nhắn nhận khác */}
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignSelf: 'flex-start', maxWidth: '80%' }}>
          <Avatar size={36} icon={<UserOutlined />} />
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            backgroundColor: '#f0f2f5', 
            padding: '12px', 
            borderRadius: '16px 16px 16px 0', 
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)' 
          }}>
            <p style={{ fontSize: '15px', fontWeight: '400', margin: 0 }}>Vâng, tôi có thể giúp bạn. Bạn đang gặp khó khăn gì?</p>
            <span style={{ fontSize: '12px', color: '#666', alignSelf: 'flex-end', marginTop: '4px' }}>10:08</span>
          </div>
        </div>
      </div>
      
      {/* Vùng nhập tin nhắn */}
      <div style={{ 
        display: 'flex', 
        padding: '12px 20px', 
        borderTop: '1px solid #e0e0e0',
        backgroundColor: '#f9f9f9'
      }}>
        <Input
          placeholder="Nhập tin nhắn..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onPressEnter={handleSendMessage}
          style={{ 
            borderRadius: '20px', 
            marginRight: '10px', 
            padding: '10px 15px',
            fontSize: '15px'
          }}
        />
        <Button 
          type="primary" 
          icon={<SendOutlined />} 
          onClick={handleSendMessage}
          style={{ 
            borderRadius: '50%', 
            width: '40px', 
            height: '40px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}
        />
      </div>
    </Content>
  );
};

export default Main;