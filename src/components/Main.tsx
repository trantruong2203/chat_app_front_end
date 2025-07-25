import React, { useContext, useState, useEffect, useRef } from 'react';
import { Avatar, Layout, Input, Button, Space, Empty } from 'antd';
import { UserOutlined, SendOutlined, SmileOutlined, PaperClipOutlined } from '@ant-design/icons';
import HeadMain from './HeadMain';
import { useSelector } from 'react-redux';
import type { RootState } from '../stores/store';
import { getObjectById, getObjectByEmail } from '../services/respone';
import { ContextAuth } from '../contexts/AuthContext';
import type { Message } from '../interface/UserResponse';
import dayjs from 'dayjs';

const { Content } = Layout;

interface MainProps {
  message: string; 
  setMessage: (message: string) => void; 
  handleSendMessage: () => void;
  selectedMessage: Message | null;
}

const Main: React.FC<MainProps> = ({message, setMessage, handleSendMessage, selectedMessage}) => {
  const { items } = useSelector((state: RootState) => state.user);
  const messages = useSelector((state: RootState) => state.message.items);
  const [conversationMessages, setConversationMessages] = useState<Message[]>([]);
  const { accountLogin } = useContext(ContextAuth);
  const currentUserId = getObjectById(items, accountLogin?.email ?? '')?.id;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Lấy ID của người đối thoại (nếu có cuộc trò chuyện được chọn)
  const chatPartnerId = selectedMessage && (
    selectedMessage.senderid === currentUserId ? 
    selectedMessage.receiverid : selectedMessage.senderid
  );

  // Thông tin của người đối thoại
  const chatPartner = chatPartnerId ? 
    getObjectByEmail(items, chatPartnerId) : null;

  // Hàm cuộn xuống cuối cùng
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Cập nhật danh sách tin nhắn khi có cuộc trò chuyện được chọn
  useEffect(() => {
    if (!selectedMessage || !currentUserId || !chatPartnerId) {
      setConversationMessages([]);
      return;
    }

    // Lọc các tin nhắn giữa người dùng hiện tại và đối tác trò chuyện
    const filteredMessages = messages.filter(message => 
      (message.senderid === currentUserId && message.receiverid === chatPartnerId) ||
      (message.senderid === chatPartnerId && message.receiverid === currentUserId)
    );

    // Sắp xếp tin nhắn theo thời gian
    const sortedMessages = [...filteredMessages].sort(
      (a, b) => new Date(a.sentat).getTime() - new Date(b.sentat).getTime()
    );

    setConversationMessages(sortedMessages);
    
    // Cuộn xuống sau khi cập nhật danh sách tin nhắn
    setTimeout(scrollToBottom, 100);
  }, [selectedMessage, messages, currentUserId, chatPartnerId]);

  return (
    <Content className="chat-container" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      {chatPartner && <HeadMain chatPartner={chatPartner} />}
      
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
        {!selectedMessage ? (
          <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Empty description="Chọn một cuộc trò chuyện để bắt đầu" />
          </div>
        ) : (
          <>
            {conversationMessages.map((msg, index) => {
              const isCurrentUser = msg.senderid === currentUserId;
              return (
                <div key={index} style={{ 
                  display: 'flex', 
                  justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
                  marginBottom: '8px' 
                }}>
                  {!isCurrentUser && (
                    <Avatar 
                      size={36} 
                      icon={<UserOutlined />}
                      src={chatPartner?.avatar} 
                      style={{ backgroundColor: '#f0f0f0', marginRight: '10px' }} 
                    />
                  )}
                  <div className={isCurrentUser ? "message-bubble-sent" : "message-bubble-received"}>
                    <div style={{ padding: '0', margin: 0, fontSize: '14px' }}>
                      {msg.content}
                    </div>
                    <div style={{ 
                      fontSize: '11px', 
                      color: isCurrentUser ? '#7BC76A' : '#999', 
                      marginTop: '4px', 
                      textAlign: 'right' 
                    }}>
                      {dayjs(msg.sentat).format('HH:mm')}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </>
        )}
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
          disabled={!selectedMessage}
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
          disabled={!selectedMessage}
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