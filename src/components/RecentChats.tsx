import { Avatar, Input, type GetProps, Badge } from 'antd';
import React from 'react';
import { MdGroupAdd, MdPersonAdd } from 'react-icons/md';
import { UserOutlined } from '@ant-design/icons';

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

function RecentChats(): React.ReactElement {
    return (
        <div className="recent-chats-container bg-pattern" style={{ 
            padding: '16px', 
            display: 'flex', 
            flexDirection: 'column', 
            height: '100%',
            width: '320px',
        }}>
            <div style={{ 
                display: 'flex', 
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                gap: '10px', 
                alignItems: 'center', 
                marginBottom: '20px' 
            }}>
                <Search 
                    placeholder="Tìm kiếm" 
                    allowClear 
                    onSearch={onSearch} 
                    style={{ 
                        width: '100%',
                        borderRadius: 'var(--radius-md)'
                    }} 
                />
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'row', 
                    gap: '15px' 
                }}>
                    <div className="glass-effect" style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer'
                    }}>
                        <MdPersonAdd size={20} color='var(--primary-color)' />
                    </div>
                    <div className="glass-effect" style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer'
                    }}>
                        <MdGroupAdd size={20} color='var(--primary-color)' />
                    </div>
                </div>
            </div>

            <h3 style={{ 
                marginBottom: '16px', 
                borderBottom: '1px solid var(--border-light)', 
                paddingBottom: '12px',
                fontWeight: '600',
                color: 'var(--text-primary)'
            }}>Trò chuyện gần đây</h3>
            
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '12px', 
                overflow: 'auto',
                paddingRight: '6px'
            }}>
                {/* Cuộc trò chuyện 1 */}
                <div style={{ 
                    display: 'flex', 
                    padding: '12px', 
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-primary)', 
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-sm)',
                }}
                className="chat-item fade-in"
                >
                    <Badge dot status="success" offset={[-4, 38]}>
                        <Avatar 
                            className="user-avatar" 
                            size={46} 
                            icon={<UserOutlined />} 
                            style={{ 
                                backgroundColor: 'var(--primary-light)' 
                            }} 
                        />
                    </Badge>
                    <div style={{ marginLeft: '14px', flex: 1, overflow: 'hidden' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>Nguyễn Văn A</span>
                            <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>12:00</span>
                        </div>
                        <div style={{ 
                            fontSize: '13px', 
                            color: 'var(--text-secondary)', 
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
                    padding: '12px', 
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-primary)', 
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-sm)'
                }}
                className="chat-item fade-in"
                >
                    <Avatar 
                        className="user-avatar"
                        size={46} 
                        style={{ 
                            backgroundColor: 'var(--accent-color)'
                        }}
                    >
                        T
                    </Avatar>
                    <div style={{ marginLeft: '14px', flex: 1, overflow: 'hidden' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>Trần Thị B</span>
                            <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>Hôm qua</span>
                        </div>
                        <div style={{ 
                            fontSize: '13px', 
                            color: 'var(--text-secondary)', 
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
                    padding: '12px', 
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-primary)', 
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-sm)'
                }}
                className="chat-item fade-in"
                >
                    <Badge count={3} size="small" offset={[-2, 38]}>
                        <Avatar 
                            className="user-avatar"
                            size={46} 
                            style={{ 
                                backgroundColor: 'var(--secondary-color)'
                            }}
                        >
                            N
                        </Avatar>
                    </Badge>
                    <div style={{ marginLeft: '14px', flex: 1, overflow: 'hidden' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>Nhóm dự án</span>
                            <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>09:45</span>
                        </div>
                        <div style={{ 
                            fontSize: '13px', 
                            color: 'var(--text-secondary)', 
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