import { Avatar, Input, type GetProps, Badge } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { SearchOutlined, UserAddOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import type { RootState } from '../stores/store';
import { ContextAuth } from '../contexts/AuthContext';
import type { Message } from '../interface/UserResponse';
import { getObjectByEmail, getObjectById } from '../services/respone';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi'; // Import Vietnamese locale

// Cấu hình dayjs với plugin relativeTime và tiếng Việt
dayjs.extend(relativeTime);
dayjs.locale('vi');

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

interface RecentChatsProps {
    setIsAddFriendModalOpen: (isAddFriendModalOpen: boolean) => void;
    setIsAddGroupModalOpen: (isAddGroupModalOpen: boolean) => void;
    selectedMessage: Message | null;
    setSelectedMessage: (message: Message) => void;
}

function RecentChats({ setIsAddFriendModalOpen, setIsAddGroupModalOpen, selectedMessage, setSelectedMessage }: RecentChatsProps): React.ReactElement {

    const messages = useSelector((state: RootState) => state.message.items);
    const [myMessages, setMyMessages] = useState<Message[]>([]);
    const { items } = useSelector((state: RootState) => state.user);
    const { accountLogin } = useContext(ContextAuth);
    const currentUserId = getObjectById(items, accountLogin?.email ?? '')?.id ;
    useEffect(() => {
        const getMessages = () => {
            if (!accountLogin) return;
            const messageArray: Message[] = [];
           
            if (!currentUserId) return;
            
            messages.filter((mes) => 
                // điều kiện kiểm tra khi ngườfi dùng hiện tại gưi tin nhắn
                (mes.senderid === currentUserId ||
                // điều kiện kiểm tra khi ngườfi dùng hiện tại nhận tin nhắn
                mes.receiverid === currentUserId)).map((message) => {
                // Xác định ID của người đối thoại
                const chatPartnerId = message.senderid === currentUserId ? 
                    message.receiverid : message.senderid;
                
                // Tìm kiếm xem đã có tin nhắn với người này chưa
                const index = messageArray.findIndex((item) => {
                    // Lấy ID của đối tượng giao tiếp từ tin nhắn
                    const itemPartnerId = item.senderid === currentUserId ? 
                        item.receiverid : item.senderid;
                    return itemPartnerId === chatPartnerId;
                });
                
                if (index !== -1) {
                    if (message.sentat > messageArray[index].sentat) {
                        messageArray[index] = message;
                    }
                } else {
                    messageArray.push(message);
                }
            });
            setMyMessages(messageArray);
        };
        getMessages();
    }, [messages, accountLogin, items]);    

    return (
        <div className="recent-chats-container" style={{
            padding: '0',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '300px',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: '10px',
                alignItems: 'center',
                padding: '15px',
                borderBottom: '1px solid var(--wechat-border)'
            }}>
                <Search
                    placeholder="Tìm kiếm"
                    allowClear
                    onSearch={onSearch}
                    prefix={<SearchOutlined style={{ color: '#bbb' }} />}
                    style={{
                        width: '100%',
                    }}
                />
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '12px'
                }}>
                    <div className="icon-btn" style={{
                        cursor: 'pointer',
                        fontSize: '16px',
                        color: '#666'
                    }}>
                        <UserAddOutlined onClick={() => setIsAddFriendModalOpen(true)} />
                    </div>
                    <div className="icon-btn" style={{
                        cursor: 'pointer',
                        fontSize: '16px',
                        color: '#666'
                    }}>
                        <UsergroupAddOutlined onClick={() => setIsAddGroupModalOpen(true)} />
                    </div>
                </div>
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'auto',
                height: '100%'
            }}>
                {myMessages.map((message: Message) => {
                    // Xác định người đối thoại
                    const chatPartnerId = message.senderid === currentUserId ? 
                        message.receiverid : message.senderid;
                    // Kiểm tra xem đây có phải là cuộc trò chuyện đang được chọn không
                    const isSelected = selectedMessage && 
                        ((selectedMessage.senderid === currentUserId ? 
                            selectedMessage.receiverid : selectedMessage.senderid) === chatPartnerId);
                    
                    return (
                        <div key={message.senderid + message.receiverid} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px'
                        }}
                        onClick={() => setSelectedMessage(message)}
                        >
                            <div style={{
                                display: 'flex',
                                padding: '10px 15px',
                                backgroundColor: isSelected ? '#EDEDED' : '#FFFFFF',
                                cursor: 'pointer',
                                borderBottom: '1px solid var(--wechat-border)'
                            }}
                                className="chat-item"
                            >
                                <Badge dot status="success" offset={[-4, 38]}>
                                    <Avatar
                                        size={40}
                                        icon={<SearchOutlined />}
                                        src={getObjectByEmail(items, message.receiverid === currentUserId ? message.senderid : message.receiverid)?.avatar}
                                        style={{
                                            backgroundColor: '#f0f0f0'
                                        }}
                                    />
                                </Badge>
                                <div style={{ marginLeft: '12px', flex: 1, overflow: 'hidden' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ fontWeight: 'bold', color: '#000' }}>{getObjectByEmail(items, message.receiverid === currentUserId ? message.senderid : message.receiverid)?.username}</span>
                                        <span style={{ fontSize: '12px', color: '#9E9E9E' }}>{dayjs(message.sentat).fromNow()}</span>
                                    </div>
                                    <div style={{
                                        fontSize: '13px',
                                        color: '#666',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        marginTop: '3px'
                                    }}>
                                        {message.content}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default RecentChats;