import React, { useState } from 'react';
import { Avatar, Layout, Input, Button } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { UserOutlined } from '@ant-design/icons';
import { MdCall, MdAttachment, MdInsertEmoticon } from 'react-icons/md';
import { CiVideoOn } from 'react-icons/ci';
import { CiSearch } from 'react-icons/ci';
import { SendOutlined } from '@ant-design/icons';

const { Content } = Layout;

const Main: React.FC = () => {
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
    <Content className="chat-container" style={{ flex: 1 }}>
      <Header
        style={{
          padding: '0 20px',
          backgroundColor: 'var(--bg-secondary)',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '10px',
          height: '64px',
          boxShadow: 'var(--shadow-sm)',
          borderBottom: '1px solid var(--border-light)'
        }}
      >
        <div style={{display: "flex", gap: "10px", alignItems: "center"}}>
          <Avatar 
            className="user-avatar" 
            size={46} 
            icon={<UserOutlined />} 
            style={{ backgroundColor: 'var(--primary-light)' }} 
          />
          <div style={{display: "flex", flexDirection: "column", gap: "4px"}}>
            <div style={{fontSize: "16px", fontWeight: "bold", padding: 0, margin: 0}}>Tran van A</div>
            <div style={{fontSize: "13px", color: "var(--text-tertiary)", margin: 0}}>Trực tuyến</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '18px' }}>
          <div className="glass-effect" style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer'
          }}>
            <MdCall size={20} color='var(--primary-color)' />
          </div>
          <div className="glass-effect" style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer'
          }}>
            <CiVideoOn size={22} color='var(--primary-color)' />
          </div>
          <div className="glass-effect" style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer'
          }}>
            <CiSearch size={22} color='var(--primary-color)' />
          </div>
        </div>
      </Header>
      
      <div
        className="bg-pattern"
        style={{
          padding: '24px',
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px'
        }}
      >
        {/* Tin nhắn nhận từ người khác */}
        <div style={{ display: 'flex', flexDirection: 'row', gap: '12px', alignSelf: 'flex-start', maxWidth: '80%' }}>
          <Avatar 
            className="user-avatar" 
            size={40} 
            icon={<UserOutlined />} 
            style={{ backgroundColor: 'var(--primary-light)' }} 
          />
          <div className="message-bubble-received fade-in">
            <p style={{ fontSize: '15px', fontWeight: '400', margin: 0 }}>Xin chào bạn, tôi có thể giúp gì cho bạn?</p>
            <span className="message-timestamp" style={{ alignSelf: 'flex-end', marginTop: '4px' }}>10:05</span>
          </div>
        </div>

        {/* Tin nhắn gửi từ người dùng hiện tại */}
        <div style={{ display: 'flex', flexDirection: 'row', gap: '12px', alignSelf: 'flex-end', maxWidth: '80%' }}>
          <div className="message-bubble-sent fade-in">
            <p style={{ fontSize: '15px', fontWeight: '400', margin: 0 }}>Tôi cần hỗ trợ về ứng dụng chat này</p>
            <span className="message-timestamp" style={{ alignSelf: 'flex-end', marginTop: '4px' }}>10:07</span>
          </div>
        </div>

        {/* Tin nhắn nhận khác */}
        <div style={{ display: 'flex', flexDirection: 'row', gap: '12px', alignSelf: 'flex-start', maxWidth: '80%' }}>
          <Avatar 
            className="user-avatar" 
            size={40} 
            icon={<UserOutlined />} 
            style={{ backgroundColor: 'var(--primary-light)' }} 
          />
          <div className="message-bubble-received fade-in">
            <p style={{ fontSize: '15px', fontWeight: '400', margin: 0 }}>Vâng, tôi có thể giúp bạn. Bạn đang gặp khó khăn gì?</p>
            <span className="message-timestamp" style={{ alignSelf: 'flex-end', marginTop: '4px' }}>10:08</span>
          </div>
        </div>
      </div>
      
      {/* Vùng nhập tin nhắn */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center',
        padding: '14px 24px', 
        borderTop: '1px solid var(--border-light)',
        backgroundColor: 'var(--bg-secondary)'
      }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'row', 
          gap: '10px', 
          marginRight: '10px'
        }}>
          <Button
            type="text"
            style={{ 
              width: '40px', 
              height: '40px',
              padding: 0,
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'var(--primary-color)',
              borderRadius: '50%'
            }}
          >
            <MdAttachment style={{ fontSize: '20px' }} />
          </Button>
          <Button
            type="text"
            style={{ 
              width: '40px', 
              height: '40px', 
              padding: 0,
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'var(--primary-color)',
              borderRadius: '50%'
            }}
          >
            <MdInsertEmoticon style={{ fontSize: '20px' }} />
          </Button>
        </div>
        
        <Input
          className="message-input"
          placeholder="Nhập tin nhắn..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onPressEnter={handleSendMessage}
          style={{ flex: 1 }}
        />
        <Button 
          className="send-button"
          type="primary" 
          icon={<SendOutlined />} 
          onClick={handleSendMessage}
          style={{ 
            marginLeft: '12px',
            width: '44px', 
            height: '44px', 
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