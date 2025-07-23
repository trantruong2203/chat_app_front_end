import { Avatar, Input, type GetProps, Badge } from 'antd';
import React from 'react';
import { SearchOutlined, UserAddOutlined, UsergroupAddOutlined } from '@ant-design/icons';

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

interface RecentChatsProps {
    setIsAddFriendModalOpen: (isAddFriendModalOpen: boolean) => void;
    setIsAddGroupModalOpen: (isAddGroupModalOpen: boolean) => void;
}

function RecentChats({ setIsAddFriendModalOpen, setIsAddGroupModalOpen }: RecentChatsProps): React.ReactElement {

    return (
        <div className="recent-chats-container" style={{ 
            padding: '0', 
            display: 'flex', 
            flexDirection: 'column', 
            height: '100%',
            width: '250px',
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
                {/* Cuộc trò chuyện 1 */}
                <div style={{ 
                    display: 'flex', 
                    padding: '10px 15px', 
                    backgroundColor: '#FFFFFF', 
                    cursor: 'pointer',
                    borderBottom: '1px solid var(--wechat-border)'
                }}
                className="chat-item"
                >
                    <Badge dot status="success" offset={[-4, 38]}>
                        <Avatar 
                            size={40} 
                            icon={<SearchOutlined />} 
                            style={{ 
                                backgroundColor: '#f0f0f0' 
                            }} 
                        />
                    </Badge>
                    <div style={{ marginLeft: '12px', flex: 1, overflow: 'hidden' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontWeight: 'bold', color: '#000' }}>Nguyễn Văn A</span>
                            <span style={{ fontSize: '12px', color: '#9E9E9E' }}>12:00</span>
                        </div>
                        <div style={{ 
                            fontSize: '13px', 
                            color: '#666', 
                            whiteSpace: 'nowrap', 
                            overflow: 'hidden', 
                            textOverflow: 'ellipsis',
                            marginTop: '3px'
                        }}>
                            Chào bạn, hẹn gặp lại vào chiều nay nhé!
                        </div>
                    </div>
                </div>

                {/* Cuộc trò chuyện 2 */}
                <div style={{ 
                    display: 'flex', 
                    padding: '10px 15px', 
                    backgroundColor: '#FFFFFF', 
                    cursor: 'pointer',
                    borderBottom: '1px solid var(--wechat-border)'
                }}
                className="chat-item"
                >
                    <Avatar 
                        size={40} 
                        style={{ 
                            backgroundColor: '#f0f0f0' 
                        }}
                    >
                        T
                    </Avatar>
                    <div style={{ marginLeft: '12px', flex: 1, overflow: 'hidden' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontWeight: 'bold', color: '#000' }}>Trần Thị B</span>
                            <span style={{ fontSize: '12px', color: '#9E9E9E' }}>Hôm qua</span>
                        </div>
                        <div style={{ 
                            fontSize: '13px', 
                            color: '#666', 
                            whiteSpace: 'nowrap', 
                            overflow: 'hidden', 
                            textOverflow: 'ellipsis',
                            marginTop: '3px'
                        }}>
                            Bạn đã nhận được file tài liệu chưa?
                        </div>
                    </div>
                </div>

                {/* Cuộc trò chuyện nhóm */}
                <div style={{ 
                    display: 'flex', 
                    padding: '10px 15px', 
                    backgroundColor: '#FFFFFF', 
                    cursor: 'pointer',
                    borderBottom: '1px solid var(--wechat-border)'
                }}
                className="chat-item"
                >
                    <Badge count={3} size="small" offset={[-2, 38]}>
                        <Avatar 
                            size={40} 
                            style={{ 
                                backgroundColor: '#f0f0f0'
                            }}
                        >
                            N
                        </Avatar>
                    </Badge>
                    <div style={{ marginLeft: '12px', flex: 1, overflow: 'hidden' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontWeight: 'bold', color: '#000' }}>Nhóm dự án</span>
                            <span style={{ fontSize: '12px', color: '#9E9E9E' }}>09:45</span>
                        </div>
                        <div style={{ 
                            fontSize: '13px', 
                            color: '#666', 
                            whiteSpace: 'nowrap', 
                            overflow: 'hidden', 
                            textOverflow: 'ellipsis',
                            marginTop: '3px' 
                        }}>
                            Lê C: Mọi người chuẩn bị họp lúc 2h chiều nhé
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecentChats;