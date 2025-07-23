import { Input, type GetProps } from 'antd';
import React from 'react';
import { SearchOutlined, UserAddOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { AiOutlineTeam, AiOutlineUser, AiOutlineUserAdd, AiOutlineUsergroupAdd } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

interface MenuContactsProps {
    setIsAddFriendModalOpen: (isAddFriendModalOpen: boolean) => void;
    setIsAddGroupModalOpen: (isAddGroupModalOpen: boolean) => void;
}

function MenuContacts({ setIsAddFriendModalOpen, setIsAddGroupModalOpen }: MenuContactsProps): React.ReactElement {

    const navigate = useNavigate();

    return (
        <div className="navbar-contacts-container" style={{ 
            padding: '0', 
            display: 'flex', 
            flexDirection: 'column', 
            height: '100%',
            width: '350px',
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
                <div style={{ 
                    display: 'flex', 
                    padding: '10px 15px', 
                    backgroundColor: '#FFFFFF', 
                    cursor: 'pointer',
                    borderBottom: '1px solid var(--wechat-border)',
                    flexDirection: 'column',
                    gap: '10px'
                }}
             
                >
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '10px'
                    }} onClick={() => navigate('/contacts/list-contacts')}>
                    <AiOutlineUser style={{ fontSize: '24px' }} />
                    <p style={{ fontSize: '18px' }}>Danh sách bạn bè</p>
                    </div>
                    
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '10px'
                    }} onClick={() => navigate('/contacts/list-groups')}>
                    <AiOutlineTeam style={{ fontSize: '24px' }} />
                    <p style={{ fontSize: '18px' }}>Danh sách nhóm</p>
                    </div>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '10px'
                    }} onClick={() => navigate('/contacts/add-friend-request')}>
                    <AiOutlineUserAdd style={{ fontSize: '24px' }} />
                    <p style={{ fontSize: '18px' }}>Lời mời kết bạn</p>
                    </div>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '10px'
                    }} onClick={() => navigate('/contacts/add-group-request')}>
                    <AiOutlineUsergroupAdd style={{ fontSize: '24px' }} />
                    <p style={{ fontSize: '18px' }}>Lời mời tham gia nhóm</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenuContacts;