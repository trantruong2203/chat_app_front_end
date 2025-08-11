import { Input, type GetProps } from 'antd';
import React from 'react';
import { SearchOutlined, UserAddOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { AiOutlineTeam, AiOutlineUser, AiOutlineUserAdd, AiOutlineUsergroupAdd } from 'react-icons/ai';
import { useNavigate, useLocation } from 'react-router-dom';

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

interface MenuContactsProps {
    setIsAddFriendModalOpen: (isAddFriendModalOpen: boolean) => void;
    setIsAddGroupModalOpen: (isAddGroupModalOpen: boolean) => void;
    }

function MenuContacts({ setIsAddFriendModalOpen, setIsAddGroupModalOpen }: MenuContactsProps): React.ReactElement {
    const navigate = useNavigate();
    const location = useLocation();
    // Style chung cho các menu item
    const menuItemStyle = {
        display: 'flex',
        flexDirection: 'row' as const,
        alignItems: 'center',
        gap: '15px',
        padding: '12px 15px',
        borderRadius: '8px',
        transition: 'all 0.2s ease',
        margin: '3px 0',
        cursor: 'pointer',
    };

    // Kiểm tra item nào đang active
    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <div className="navbar-contacts-container" style={{ 
            padding: '10px', 
            display: 'flex', 
            flexDirection: 'column', 
            height: '100%',
            width: '300px',
            backgroundColor: '#f7f7f7',
        }}>
            <div style={{ 
                display: 'flex', 
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                gap: '10px', 
                alignItems: 'center', 
                padding: '10px 5px 20px 5px',
                borderBottom: '1px solid var(--wechat-border)'
            }}>
                <Search 
                    placeholder="Tìm kiếm" 
                    allowClear 
                    onSearch={onSearch} 
                    prefix={<SearchOutlined style={{ color: '#bbb' }} />}
                    style={{ 
                        width: '100%',
                        borderRadius: '30px',
                    }} 
                />
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'row', 
                    gap: '15px' 
                }}>
                    <div className="icon-btn" style={{
                        cursor: 'pointer',
                        fontSize: '20px',
                        color: '#666',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        backgroundColor: '#e6e6e6',
                        transition: 'all 0.2s ease',
                    }} 
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d9d9d9'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e6e6e6'}
                    onClick={() => setIsAddFriendModalOpen(true)}>
                        <UserAddOutlined />
                    </div>
                    <div className="icon-btn" style={{
                        cursor: 'pointer',
                        fontSize: '20px',
                        color: '#666',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        backgroundColor: '#e6e6e6',
                        transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d9d9d9'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e6e6e6'}
                    onClick={() => setIsAddGroupModalOpen(true)}>
                        <UsergroupAddOutlined />
                    </div>
                </div>
            </div>
            
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column',
                overflow: 'auto',
                height: '100%',
                padding: '15px 5px',
            }}>
                <div style={{ 
                    display: 'flex', 
                    backgroundColor: '#FFFFFF', 
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    flexDirection: 'column',
                    padding: '10px',
                }}> 
                    <div 
                        style={{
                            ...menuItemStyle,
                            backgroundColor: isActive('/contacts') ? '#e6f7ff' : 'transparent',
                            color: isActive('/contacts') ? '#1890ff' : '#333',
                        }}
                        onMouseEnter={(e) => !isActive('/contacts') && (e.currentTarget.style.backgroundColor = '#f0f0f0')} 
                        onMouseLeave={(e) => !isActive('/contacts') && (e.currentTarget.style.backgroundColor = 'transparent')}
                        onClick={() => {
                            navigate('/contacts');
                        }}
                    >
                        <AiOutlineUser style={{ fontSize: '24px' }} />
                        <p style={{ fontSize: '16px', margin: 0, fontWeight: isActive('/contacts/list-contacts') ? '500' : 'normal' }}>Danh sách bạn bè</p>
                    </div>
                    
                    <div 
                        style={{
                            ...menuItemStyle,
                            backgroundColor: isActive('/contacts/list-groups') ? '#e6f7ff' : 'transparent',
                            color: isActive('/contacts/list-groups') ? '#1890ff' : '#333',
                        }}
                        onMouseEnter={(e) => !isActive('/contacts/list-groups') && (e.currentTarget.style.backgroundColor = '#f0f0f0')}
                        onMouseLeave={(e) => !isActive('/contacts/list-groups') && (e.currentTarget.style.backgroundColor = 'transparent')}
                        onClick={() => navigate('/contacts/list-groups')}
                    >
                        <AiOutlineTeam style={{ fontSize: '24px' }} />
                        <p style={{ fontSize: '16px', margin: 0, fontWeight: isActive('/contacts/list-groups') ? '500' : 'normal' }}>Danh sách nhóm</p>
                    </div>

                    <div 
                        style={{
                            ...menuItemStyle,
                            backgroundColor: isActive('/contacts/add-friend-request') ? '#e6f7ff' : 'transparent',
                            color: isActive('/contacts/add-friend-request') ? '#1890ff' : '#333',
                        }}
                        onMouseEnter={(e) => !isActive('/contacts/add-friend-request') && (e.currentTarget.style.backgroundColor = '#f0f0f0')}
                        onMouseLeave={(e) => !isActive('/contacts/add-friend-request') && (e.currentTarget.style.backgroundColor = 'transparent')}
                        onClick={() => navigate('/contacts/add-friend-request')}
                    >
                        <AiOutlineUserAdd style={{ fontSize: '24px' }} />
                        <p style={{ fontSize: '16px', margin: 0, fontWeight: isActive('/contacts/add-friend-request') ? '500' : 'normal' }}>Lời mời kết bạn</p>
                    </div>

                    <div 
                        style={{
                            ...menuItemStyle,
                            backgroundColor: isActive('/contacts/add-group-request') ? '#e6f7ff' : 'transparent',
                            color: isActive('/contacts/add-group-request') ? '#1890ff' : '#333',
                        }}
                        onMouseEnter={(e) => !isActive('/contacts/add-group-request') && (e.currentTarget.style.backgroundColor = '#f0f0f0')}
                        onMouseLeave={(e) => !isActive('/contacts/add-group-request') && (e.currentTarget.style.backgroundColor = 'transparent')}
                        onClick={() => navigate('/contacts/add-group-request')}
                    >
                        <AiOutlineUsergroupAdd style={{ fontSize: '24px' }} />
                        <p style={{ fontSize: '16px', margin: 0, fontWeight: isActive('/contacts/add-group-request') ? '500' : 'normal' }}>Lời mời tham gia nhóm</p>
                    </div>
                </div>
            </div>
           
        </div>
    );
}

export default MenuContacts;