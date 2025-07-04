import React, { useContext } from 'react';
import { Avatar, Button, Modal, Divider, Typography, Card, Descriptions, Row, Col, message, Badge } from 'antd';
import { useSelector } from 'react-redux';
import type { RootState } from '../../stores/store';
import { ContextAuth } from '../../contexts/AuthContext';
import { 
  UserOutlined, 
  LogoutOutlined, 
  EditOutlined, 
  CameraOutlined, 
  MailOutlined, 
  PhoneOutlined,
  CalendarOutlined,
  ManOutlined
} from '@ant-design/icons';
import '../../App.css';

const { Title } = Typography;

const UserModal: React.FC<{ isModalOpen: boolean, setIsModalOpen: (isModalOpen: boolean) => void }> = ({ isModalOpen, setIsModalOpen }) => {

  const { user } = useSelector((state: RootState) => state.user);
  const { logout } = useContext(ContextAuth);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleEditProfile = () => {
    message.info('Tính năng chỉnh sửa thông tin sẽ sớm được cập nhật!');
  };

  const handleChangeCover = () => {
    message.info('Tính năng thay đổi ảnh bìa sẽ sớm được cập nhật!');
  };

  const handleChangeAvatar = () => {
    message.info('Tính năng thay đổi ảnh đại diện sẽ sớm được cập nhật!');
  };

  return (
    <Modal
      title={<Title level={4} style={{ margin: 0 }}>Thông tin tài khoản</Title>}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      width={500}
      footer={null}
      className="user-modal"
    >
      <Card bordered={false} className="user-card">
        <div style={{ position: 'relative', height: '150px', marginBottom: '50px' }}>
          <div style={{
            width: '100%',
            height: '150px',
            overflow: 'hidden',
            borderRadius: '8px',
            position: 'relative'
          }}>
            <img
              src="https://cdn.pixabay.com/photo/2023/12/06/21/07/photo-8434386_1280.jpg"
              alt="Ảnh bìa"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <Button
              type="primary"
              shape="circle"
              icon={<CameraOutlined />}
              size="small"
              style={{
                position: 'absolute',
                right: '10px',
                bottom: '10px',
              }}
              onClick={handleChangeCover}
            />
          </div>
          
          <div style={{ 
            position: 'absolute', 
            bottom: '-40px', 
            left: '50%', 
            transform: 'translateX(-50%)',
            textAlign: 'center'
          }}>
            <Badge count={
              <Button
                type="primary"
                shape="circle"
                icon={<CameraOutlined />}
                size="small"
                onClick={handleChangeAvatar}
                style={{ backgroundColor: '#1890ff' }}
              />
            } offset={[0, 0]}>
              <Avatar
                size={80}
                icon={<UserOutlined />}
                style={{
                  border: '4px solid white',
                  backgroundColor: '#1890ff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                }}
              />
            </Badge>
            <Title level={4} style={{ marginTop: '10px', marginBottom: 0 }}>
              {user?.username || 'Người dùng'}
            </Title>
          </div>
        </div>

        <Divider style={{ marginTop: '30px' }} />
        
        <Descriptions bordered layout="vertical" size="small" column={1}>
          <Descriptions.Item label={<><MailOutlined /> Email</>}>
            {user?.email || 'Chưa cập nhật'}
          </Descriptions.Item>
          <Descriptions.Item label={<><PhoneOutlined /> Số điện thoại</>}>
            {user?.phone || 'Chưa cập nhật'}
          </Descriptions.Item>
          <Descriptions.Item label={<><ManOutlined /> Giới tính</>}>
            {user?.gender || 'Chưa cập nhật'}
          </Descriptions.Item>
          <Descriptions.Item label={<><CalendarOutlined /> Ngày sinh</>}>
            {user?.dob ? new Date(user.dob).toLocaleDateString() : 'Chưa cập nhật'}
          </Descriptions.Item>
        </Descriptions>

        <Row gutter={16} style={{ marginTop: '20px' }}>
          <Col span={12}>
            <Button 
              type="primary" 
              icon={<EditOutlined />} 
              block
              onClick={handleEditProfile}
            >
              Chỉnh sửa thông tin
            </Button>
          </Col>
          <Col span={12}>
            <Button 
              type="primary" 
              danger 
              icon={<LogoutOutlined />} 
              block
              onClick={logout}
            >
              Đăng xuất
            </Button>
          </Col>
        </Row>
      </Card>
    </Modal>
  );
};

export default UserModal;