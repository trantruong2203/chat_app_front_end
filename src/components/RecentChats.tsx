import { Avatar, Input, type GetProps, Badge } from 'antd';
import React, { useContext, useEffect } from 'react';
import { SearchOutlined, UserAddOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../stores/store';
import { ContextAuth } from '../contexts/AuthContext';
import type { Message, ChatGroup } from '../interface/UserResponse';
import { getObjectByEmail, getObjectById } from '../services/respone';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';
import { fetchLastMessagesByUserIdThunk } from '../features/messages/messageThunks';

dayjs.extend(relativeTime);
dayjs.locale('vi');

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

interface RecentChatsProps {
    setIsAddFriendModalOpen: (isAddFriendModalOpen: boolean) => void;
    setIsAddGroupModalOpen: (isAddGroupModalOpen: boolean) => void;
    selectedMessage: Message | null;
    handleMessageSelection: (message: Message) => void;
    lastMessages: Message[];
}

function RecentChats({ setIsAddFriendModalOpen, setIsAddGroupModalOpen, selectedMessage, handleMessageSelection, lastMessages }: RecentChatsProps): React.ReactElement {

    const { items } = useSelector((state: RootState) => state.user);
    const { accountLogin } = useContext(ContextAuth);
    const currentUserId = getObjectById(items, accountLogin?.email ?? '')?.id;
    const chatGroup = useSelector((state: RootState) => state.chatGroup.items as ChatGroup[]);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
      if (!accountLogin || !currentUserId) return;
      dispatch(fetchLastMessagesByUserIdThunk(currentUserId));
    }, [accountLogin, currentUserId, dispatch]);


    // Hàm lấy thông tin chat partner (group hoặc user)
    const getChatPartnerName = (message: Message): string | undefined => {
        if (message.groupid) {
            const group = chatGroup.find((group) => group.id === message.groupid);
            return group?.name;
        }
        return getObjectByEmail(items, message.receiverid === currentUserId ? message.senderid : message.receiverid ?? 0)?.username;
    }

    // Hàm lấy avatar của chat partner
    const getChatPartnerAvatar = (message: Message): string | undefined => {
        if (message.groupid) {
            const group = chatGroup.find((group) => group.id === message.groupid);
            return group?.avatar;
        }
        return getObjectByEmail(items, message.receiverid === currentUserId ? message.senderid : message.receiverid ?? 0)?.avatar;
    }

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
                {lastMessages.map((message: Message) => {
                    let isSelected = false;
                    
                    if (selectedMessage) {
                        if (message.groupid) {
                            isSelected = selectedMessage.groupid === message.groupid;
                        } else {
                            // Tin nhắn cá nhân: tạo key duy nhất cho cuộc trò chuyện
                            const getConversationKey = (msg: Message) => {
                                const partnerId = msg.senderid === currentUserId ? msg.receiverid : msg.senderid;
                                return `${currentUserId}-${partnerId}`;
                            };
                            
                            const currentConversationKey = getConversationKey(message);
                            const selectedConversationKey = getConversationKey(selectedMessage);
                            
                            isSelected = currentConversationKey === selectedConversationKey;
                        }
                    }

                    return (
                        <div key={`${message.groupid ? `group-${message.groupid}` : `user-${message.senderid}-${message.receiverid}`}-${message.sentat}`} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px'
                        }}
                            onClick={() => handleMessageSelection(message)}
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
                                <Badge dot={false} status="success" offset={[-4, 38]}>
                                    <Avatar
                                        size={40}
                                        icon={<SearchOutlined />}
                                        src={getChatPartnerAvatar(message)}
                                        style={{
                                            backgroundColor: '#f0f0f0'
                                        }}
                                    />
                                </Badge>
                                <div style={{ marginLeft: '12px', flex: 1, overflow: 'hidden' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ fontWeight: 'bold', color: '#000' }}>{getChatPartnerName(message)}</span>
                                        <span style={{ fontSize: '12px', color: '#9E9E9E' }}>{dayjs(message.sentat).utcOffset(7).fromNow()}</span>
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