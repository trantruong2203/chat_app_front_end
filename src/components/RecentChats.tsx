import { Avatar, Input, type GetProps, Badge } from 'antd';
import React from 'react';
import { MdGroupAdd, MdPersonAdd } from 'react-icons/md';
import { UserOutlined } from '@ant-design/icons';

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

function RecentChats(): React.ReactElement {
    return (
        <div style={{ padding: '10px', border: '1px solid #e0e0e0', display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#f9f9f9' }}>

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '10px', alignItems: 'center', marginBottom: '15px' }}>
                <Search placeholder="Tìm kiếm" allowClear onSearch={onSearch} style={{ width: 200 }} />
                <div style={{ display: 'flex', flexDirection: 'row', gap: '15px' }}>
                    <MdPersonAdd size={24} color='#1890ff' style={{ cursor: 'pointer' }} />
                    <MdGroupAdd size={24} color='#1890ff' style={{ cursor: 'pointer' }} />
                </div>
            </div>

            <h3 style={{ marginBottom: '10px', borderBottom: '1px solid #e0e0e0', paddingBottom: '8px' }}>Trò chuyện gần đây</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflow: 'auto' }}>
                {/* Cuộc trò chuyện 1 */}
                <div style={{ 
                    display: 'flex', 
                    padding: '10px', 
                    borderRadius: '8px',
                    backgroundColor: '#fff', 
                    cursor: 'pointer',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                }}
                className="chat-item"
                >
                    <Badge dot status="success" offset={[-4, 38]}>
                        <Avatar size={40} icon={<UserOutlined />} />
                    </Badge>
                    <div style={{ marginLeft: '12px', flex: 1, overflow: 'hidden' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontWeight: 'bold' }}>Nguyễn Văn A</span>
                            <span style={{ fontSize: '12px', color: '#999' }}>12:00</span>
                        </div>
                        <div style={{ 
                            fontSize: '13px', 
                            color: '#666', 
                            whiteSpace: 'nowrap', 
                            overflow: 'hidden', 
                            textOverflow: 'ellipsis' 
                        }}>
                            Chào bạn, hẹn gặp lại vào chiều nay nhé!
                        </div>
                    </div>
                </div>

                {/* Cuộc trò chuyện 2 */}
                <div style={{ 
                    display: 'flex', 
                    padding: '10px', 
                    borderRadius: '8px',
                    backgroundColor: '#fff', 
                    cursor: 'pointer',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                }}
                className="chat-item"
                >
                    <Avatar size={40} style={{ backgroundColor: '#1677ff' }}>T</Avatar>
                    <div style={{ marginLeft: '12px', flex: 1, overflow: 'hidden' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontWeight: 'bold' }}>Trần Thị B</span>
                            <span style={{ fontSize: '12px', color: '#999' }}>Hôm qua</span>
                        </div>
                        <div style={{ 
                            fontSize: '13px', 
                            color: '#666', 
                            whiteSpace: 'nowrap', 
                            overflow: 'hidden', 
                            textOverflow: 'ellipsis' 
                        }}>
                            Bạn đã nhận được file tài liệu chưa?
                        </div>
                    </div>
                </div>

                {/* Cuộc trò chuyện nhóm */}
                <div style={{ 
                    display: 'flex', 
                    padding: '10px', 
                    borderRadius: '8px',
                    backgroundColor: '#fff', 
                    cursor: 'pointer',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                }}
                className="chat-item"
                >
                    <Badge count={3} size="small" offset={[-2, 38]}>
                        <Avatar size={40} style={{ backgroundColor: '#52c41a' }}>N</Avatar>
                    </Badge>
                    <div style={{ marginLeft: '12px', flex: 1, overflow: 'hidden' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontWeight: 'bold' }}>Nhóm dự án</span>
                            <span style={{ fontSize: '12px', color: '#999' }}>09:45</span>
                        </div>
                        <div style={{ 
                            fontSize: '13px', 
                            color: '#666', 
                            whiteSpace: 'nowrap', 
                            overflow: 'hidden', 
                            textOverflow: 'ellipsis' 
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