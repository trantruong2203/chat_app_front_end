import React, { useContext } from 'react';
import { Avatar, Button, Modal, Divider, Typography } from 'antd';
import { useSelector } from 'react-redux';
import type { RootState } from '../../stores/store';
import { ContextAuth } from '../../contexts/AuthContext';
import { UserOutlined, LogoutOutlined, EditOutlined } from '@ant-design/icons';
import '../../App.css';

const { Title, Text } = Typography;

const UserModal: React.FC<{ isModalOpen: boolean, setIsModalOpen: (isModalOpen: boolean) => void }> = ({ isModalOpen, setIsModalOpen }) => {

    const { user } = useSelector((state : RootState) => state.user);
    const { accountLogin, logout } = useContext(ContextAuth);
    
    console.log(user);

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    
    const userInfoItemStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '12px',
      padding: '5px 0'
    };
    
    return (
        <>
            <Modal
                title={<Title level={4} style={{ margin: 0 }}>Thông tin tài khoản</Title>}
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={400}
                footer={null}
            >
              <div style={{position: 'relative', height: '180px'}}>
                <div style={{
                  width: '100%', 
                  height: '120px', 
                  overflow: 'hidden',
                  background: 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)'
                }}>
                  <img 
                    src="https://cdn.pixabay.com/photo/2023/12/06/21/07/photo-8434386_1280.jpg" 
                    alt="Ảnh bìa"
                    style={{
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover', 
                      opacity: 0.8
                    }} 
                  />
                </div>
                <Avatar 
                  size={80}
                  icon={<UserOutlined />} 
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    border: '4px solid white',
                    backgroundColor: '#1890ff',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                  }}
                />
                <Button 
                  type="primary" 
                  shape="circle" 
                  icon={<EditOutlined />} 
                  size="small"
                  style={{
                    position: 'absolute',
                    right: '125px',
                    top: '130px',
                  }}
                />
              </div>
              
              <div style={{ 
                padding: '20px', 
                marginTop: '15px', 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
              }}>
                {user && (
                  <Title level={4} style={{ margin: '0 0 15px 0', textAlign: 'center' }}>
                    {user.username || 'Người dùng'}
                  </Title>
                )}
                
                <Divider style={{ margin: '10px 0' }} />
                
                <div style={{ width: '100%' }}>
                  {user && (
                    <>
                      <div style={userInfoItemStyle}>
                        <Text type="secondary">Email:</Text>
                        <Text strong>{user.email}</Text>
                      </div>
                      <div style={userInfoItemStyle}>
                        <Text type="secondary">Tên người dùng:</Text>
                        <Text strong>{user.username}</Text>
                      </div>
                      <div style={userInfoItemStyle}>
                        <Text type="secondary">Số điện thoại:</Text>
                        <Text strong>{user.phone || 'Chưa cập nhật'}</Text>
                      </div>
                    </>
                  )}
                  {accountLogin && (
                    <div style={userInfoItemStyle}>
                      <Text type="secondary">Tài khoản:</Text>
                      <Text strong>{accountLogin}</Text>
                    </div>
                  )}
                </div>
                
                <Divider style={{ margin: '15px 0' }} />
                
                <Button 
                  type="primary" 
                  danger
                  icon={<LogoutOutlined />}
                  onClick={logout}
                  style={{ 
                    width: '100%',
                    marginTop: '10px'
                  }}
                >
                  Đăng xuất
                </Button>
              </div>
            </Modal>
        </>
    );
};

export default UserModal;