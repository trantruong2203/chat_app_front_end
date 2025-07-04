import React, { useState } from 'react';
import { Avatar, Layout, Input, Button, Space, Typography, Card, Row, Col } from 'antd';
import { UserOutlined, SendOutlined } from '@ant-design/icons';
import { MdAttachment, MdInsertEmoticon } from 'react-icons/md';
import HeadMain from './HeadMain';

const { Content } = Layout;
const { Text, Paragraph } = Typography;

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
        className="bg-pattern" 
        style={{ 
          padding: 24, 
          flex: 1, 
          overflowY: 'auto', 
          width: '100%' 
        }}
        size={18}
      >
        {/* Tin nhắn nhận từ người khác */}
        <Row>
          <Col flex="auto" style={{ maxWidth: '80%', display: 'flex', alignItems: 'flex-start' }}>
            <Avatar 
              className="user-avatar" 
              size={40} 
              icon={<UserOutlined />} 
              style={{ backgroundColor: 'var(--primary-light)', marginRight: 12 }} 
            />
            <Card 
              className="message-bubble-received fade-in" 
              size="small" 
              bordered={false} 
              style={{ padding: '8px 12px' }}
            >
              <Paragraph style={{ fontSize: 15, margin: 0 }}>
                Xin chào bạn, tôi có thể giúp gì cho bạn?
              </Paragraph>
              <Text type="secondary" className="message-timestamp" style={{ fontSize: 12, float: 'right' }}>
                10:05
              </Text>
            </Card>
          </Col>
        </Row>

        {/* Tin nhắn gửi từ người dùng hiện tại */}
        <Row justify="end">
          <Col flex="auto" style={{ maxWidth: '80%', display: 'flex', justifyContent: 'flex-end' }}>
            <Card 
              className="message-bubble-sent fade-in" 
              size="small" 
              bordered={false} 
              style={{ padding: '8px 12px' }}
            >
              <Paragraph style={{ fontSize: 15, margin: 0 }}>
                Tôi cần hỗ trợ về ứng dụng chat này
              </Paragraph>
              <Text type="secondary" className="message-timestamp" style={{ fontSize: 12, float: 'right' }}>
                10:07
              </Text>
            </Card>
          </Col>
        </Row>

        {/* Tin nhắn nhận khác */}
        <Row>
          <Col flex="auto" style={{ maxWidth: '80%', display: 'flex', alignItems: 'flex-start' }}>
            <Avatar 
              className="user-avatar" 
              size={40} 
              icon={<UserOutlined />} 
              style={{ backgroundColor: 'var(--primary-light)', marginRight: 12 }} 
            />
            <Card 
              className="message-bubble-received fade-in" 
              size="small" 
              bordered={false} 
              style={{ padding: '8px 12px' }}
            >
              <Paragraph style={{ fontSize: 15, margin: 0 }}>
                Vâng, tôi có thể giúp bạn. Bạn đang gặp khó khăn gì?
              </Paragraph>
              <Text type="secondary" className="message-timestamp" style={{ fontSize: 12, float: 'right' }}>
                10:08
              </Text>
            </Card>
          </Col>
        </Row>
      </Space>
      
      {/* Vùng nhập tin nhắn */}
      <Row 
        align="middle" 
        style={{ 
          padding: '14px 24px', 
          borderTop: '1px solid var(--border-light)',
          backgroundColor: 'var(--bg-secondary)'
        }}
      >
        <Space size={10} style={{ marginRight: 10 }}>
          <Button
            type="text"
            shape="circle"
            icon={<MdAttachment style={{ fontSize: 20 }} />}
            style={{ color: 'var(--primary-color)' }}
          />
          <Button
            type="text"
            shape="circle"
            icon={<MdInsertEmoticon style={{ fontSize: 20 }} />}
            style={{ color: 'var(--primary-color)' }}
          />
        </Space>
        
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
          shape="circle"
          icon={<SendOutlined />} 
          onClick={handleSendMessage}
          size="large"
          style={{ marginLeft: 12 }}
        />
      </Row>
    </Content>
  );
};

export default Main;