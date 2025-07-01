import React, { useContext } from 'react';
import { Avatar, Button, Modal } from 'antd';
import { useSelector } from 'react-redux';
import type { RootState } from '../../stores/store';
import { ContextAuth } from '../../contexts/AuthContext';
import { UserOutlined } from '@ant-design/icons';
import '../../App.css';

const UserModal: React.FC<{ isModalOpen: boolean, setIsModalOpen: (isModalOpen: boolean) => void }> = ({ isModalOpen, setIsModalOpen }) => {

    // Lấy thông tin user từ Redux
    const { user } = useSelector((state : RootState) => state.user);
    const { accountLogin, logout } = useContext(ContextAuth);
    
    console.log(user);

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Modal
                title="Thông tin tài khoản"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'}}>
                <img src="https://cdn.pixabay.com/photo/2023/12/06/21/07/photo-8434386_1280.jpg" alt=""
                style={{width: '100%', height: '150px', objectFit: 'cover', position: 'relative', top: '0', left: '0'}} />
                <Avatar className='avatar-user' icon={<UserOutlined />} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center', marginTop: '20px' }}>
                {user && (
                  <>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Số điện thoại:</strong> {user.phone}</p>
                  </>
                )}
                {accountLogin && (
                  <>
                    <p><strong>Tài khoản:</strong> {accountLogin}</p>
                  </>
                )}
                <Button type="primary" onClick={logout}>Đăng xuất</Button>
                
              </div>
            </Modal>
        </>
    );
};

export default UserModal;