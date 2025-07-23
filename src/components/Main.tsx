import React, { useState } from 'react';
import { Avatar, Layout, Input, Button, Space } from 'antd';
import { UserOutlined, SendOutlined, SmileOutlined, PaperClipOutlined } from '@ant-design/icons';
import HeadMain from './HeadMain';

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
    <Content className="chat-container" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <HeadMain />
      
      <Space 
        direction="vertical" 
        style={{ 
          padding: '16px', 
          flex: 1, 
          overflowY: 'auto', 
          width: '100%',
          backgroundColor: '#EDEDED'
        }}
        size={16}
      >
        {/* Tin nhắn nhận từ người khác */}
        <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '8px' }}>
          <Avatar 
            size={36} 
            icon={<UserOutlined />} 
            style={{ backgroundColor: '#f0f0f0', marginRight: '10px' }} 
          />
          <div className="message-bubble-received">
            <div style={{ padding: '0', margin: 0, fontSize: '14px' }}>
              Xin chào bạn, tôi có thể giúp gì cho bạn?
            </div>
            <div style={{ fontSize: '11px', color: '#999', marginTop: '4px', textAlign: 'right' }}>
              10:05
            </div>
          </div>
        </div>

        {/* Tin nhắn gửi từ người dùng hiện tại */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
          <div className="message-bubble-sent">
            <div style={{ padding: '0', margin: 0, fontSize: '14px' }}>
              Tôi cần hỗ trợ về ứng dụng chat này
            </div>
            <div style={{ fontSize: '11px', color: '#7BC76A', marginTop: '4px', textAlign: 'right' }}>
              10:07
            </div>
          </div>
        </div>

        {/* Tin nhắn nhận khác */}
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <Avatar 
            size={36} 
            icon={<UserOutlined />} 
            style={{ backgroundColor: '#f0f0f0', marginRight: '10px' }} 
          />
          <div className="message-bubble-received">
            <div style={{ padding: '0', margin: 0, fontSize: '14px' }}>
              Vâng, tôi có thể giúp bạn. Bạn đang gặp khó khăn gì?
            </div>
            <div style={{ fontSize: '11px', color: '#999', marginTop: '4px', textAlign: 'right' }}>
              10:08
            </div>
          </div>
        </div>
      </Space>
      
      {/* Vùng nhập tin nhắn */}
      <div
        style={{ 
          padding: '10px', 
          backgroundColor: '#F5F5F5',
          borderTop: '1px solid var(--wechat-border)',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Space size={12} style={{ marginRight: '8px' }}>
          <Button
            type="text"
            style={{ color: '#666', fontSize: '18px' }}
            icon={<SmileOutlined />}
          />
          <Button
            type="text"
            style={{ color: '#666', fontSize: '18px' }}
            icon={<PaperClipOutlined />}
          />
        </Space>
        
        <Input
          placeholder="Nhập tin nhắn..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onPressEnter={handleSendMessage}
          style={{ 
            flex: 1,
            border: '1px solid #E5E5E5',
            borderRadius: '4px',
            backgroundColor: '#FFFFFF' 
          }}
        />
        <Button 
          type="primary" 
          icon={<SendOutlined />} 
          onClick={handleSendMessage}
          style={{ 
            marginLeft: '8px',
            background: '#07C160',
            borderColor: '#07C160' 
          }}
        >
          Gửi
        </Button>
      </div>
    </Content>
  );
};

export default Main;