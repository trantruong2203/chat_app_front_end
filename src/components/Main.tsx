import React, { useContext, useEffect, useRef, useState } from 'react';
import { Avatar, Layout, Input, Button, Space, Empty, Upload } from 'antd';
import { UserOutlined, SendOutlined, SmileOutlined, PaperClipOutlined } from '@ant-design/icons';
import HeadMain from './HeadMain';
import { useSelector } from 'react-redux';
import type { RootState } from '../stores/store';
import { getObjectById, getObjectByEmail } from '../services/respone';
import { ContextAuth } from '../contexts/AuthContext';
import type { Message, UserResponse, GroupMember } from '../interface/UserResponse';
import dayjs from 'dayjs';
import EmojiPicker from './EmojiPicker';

const { Content } = Layout;

interface MainProps {
  message: string;
  setMessage: (message: string) => void;
  handleSendMessage: () => void;
  handleMessageSelection: (message: Message) => void;
  fullMessages: Message[];
  groupMember: GroupMember[];
}

const Main: React.FC<MainProps> = ({ message, setMessage, handleSendMessage, fullMessages, handleMessageSelection, groupMember }) => {
  const { items } = useSelector((state: RootState) => state.user);
  const { accountLogin } = useContext(ContextAuth);
  const currentUserId = getObjectById(items, accountLogin?.email ?? '')?.id;
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chatPartner, setChatPartner] = useState<UserResponse | null>(null);
  const [memberCount, setMemberCount] = useState<number>(0);
  const chatGroup = useSelector((state: RootState) => state.chatGroup.items);
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);
  
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    if (fullMessages.length === 0 || !currentUserId) return;
    
    const lastMessage = fullMessages[fullMessages.length - 1];
         if(lastMessage.groupid){
       // Lấy thông tin về nhóm chat
       const group = chatGroup.find(item => item.id === lastMessage.groupid);
       
               // Đếm số thành viên trong nhóm và lưu vào state
        const count = groupMember.filter(member => member.groupid === lastMessage.groupid).length;
        setMemberCount(count);
        
        // Thiết lập thông tin hiển thị
        if (group) {
          setChatPartner({
            ...group,
            username: group.name, // Chỉ hiển thị tên nhóm, không kèm số thành viên
            email: '',
            password: '',
            confirm: '',
            phone: '',
            gender: '',
            birthday: '',
            agreement: false,
            status: 1,
          });
       } 
          } else {
        // Đặt số lượng thành viên về 0 cho tin nhắn cá nhân
        setMemberCount(0);
        
        const chatPartnerId = lastMessage.senderid === currentUserId ? 
        lastMessage.receiverid : lastMessage.senderid;

        const partner = getObjectByEmail(items, chatPartnerId ?? '');
        
        if (partner) {
          setChatPartner(partner);
        }
      }
  }, [fullMessages, currentUserId, items, groupMember, chatGroup]);

  const handleEmojiSelect = (emoji: { native: string }) => {
    setIsEmojiPickerVisible(false);
    setMessage(message + emoji.native);
  };

  return (
    <Content className="chat-container" style={{ display: 'flex', flexDirection: 'column', flex: 1, position: 'relative' }}>
      {chatPartner && <HeadMain chatPartner={chatPartner} memberCount={memberCount} />}

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
        {fullMessages.length === 0 ? (
          <div style={{marginTop: '100px' }}>
            <Empty description="Chọn một cuộc trò chuyện để bắt đầu" />
          </div>
        ) : (
          <>
            {fullMessages.map((msg, index) => {
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
                      src={msg.groupid ? 
                        getObjectByEmail(items, msg.senderid ?? '')?.avatar : 
                        chatPartner?.avatar
                      }
                      style={{ backgroundColor: '#f0f0f0', marginRight: '10px' }}
                    />
                  )}
                  <div className={isCurrentUser ? "message-bubble-sent" : "message-bubble-received"}>
                    {currentUserId == msg.senderid ?
                    (
                      <div>

                      </div>
                    ) : (
                      <div style={{ fontSize: '12px', fontWeight: 'normal', color: '#999', marginBottom: '4px' }}>
                        {getObjectByEmail(items, msg.senderid ?? '')?.username}
                      </div>
                    )}
                    <div style={{ padding: '0', margin: 0, fontSize: '14px' }}>
                      {msg.content}
                    </div>
                    <div style={{
                      fontSize: '11px',
                      color: isCurrentUser ? '#7BC76A' : '#999',
                      marginTop: '4px',
                      textAlign: 'right'
                    }}>
                      {dayjs(msg.sentat).utcOffset(7).format('HH:mm')}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </>
        )}
      </Space>

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
            onClick={() => setIsEmojiPickerVisible(!isEmojiPickerVisible)}
          />
          <Upload>
            <Button
              type="text"
              style={{ color: '#666', fontSize: '18px' }}
              icon={<PaperClipOutlined />}
            />
          </Upload>

        </Space>

        <Input
          placeholder="Nhập tin nhắn..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onPressEnter={handleSendMessage}
          disabled={!handleMessageSelection}
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
          disabled={!handleMessageSelection || !message.trim()}
          style={{
            marginLeft: '8px',
            background: '#07C160',
            borderColor: '#07C160'
          }}
        >
          Gửi
        </Button>
      </div>

      {isEmojiPickerVisible && (
        <div style={{ position: 'absolute', bottom: '60px', left: '10px' }}>
          <EmojiPicker onSelect={handleEmojiSelect} setMessage={setMessage} />
        </div>
      )}
    </Content>
  );
};

export default Main; 