import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Button, Modal, Divider, Typography, Card, Descriptions, Row, Col, message, Badge, Input, Form, Select, DatePicker, Spin, Upload } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../stores/store';
import { ContextAuth } from '../../contexts/AuthContext';
import {
  UserOutlined,
  LogoutOutlined,
  EditOutlined,
  CameraOutlined,
  MailOutlined,
  PhoneOutlined,
  ManOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import '../../App.css';
import { getObjectById } from '../../services/respone';
import type { UserResponse } from '../../interface/UserResponse';
import { updateUserThunk } from '../../features/users/userThunks';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

const { Title } = Typography;

const UserModal: React.FC<{ isModalOpen: boolean, setIsModalOpen: (isModalOpen: boolean) => void }> = ({ isModalOpen, setIsModalOpen }) => {

  const { items } = useSelector((state: RootState) => state.user);
  const { accountLogin } = useContext(ContextAuth);
  const { logout } = useContext(ContextAuth);
  const [user, setUser] = useState<UserResponse | null>(null);
  const [handleInput, setHandleInput] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (accountLogin) {
      setUser(getObjectById(items, accountLogin.email) || null);
    }
  }, [items, accountLogin]);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChangeCover = () => {
    message.info('Tính năng thay đổi ảnh bìa sẽ sớm được cập nhật!');
  };

  const handleChangeAvatar = () => {
    message.info('Tính năng thay đổi ảnh đại diện sẽ sớm được cập nhật!');
  };

  const handleUpdateUser = async () => {
    try {
      const values = await form.validateFields();
      const updatePayload: Partial<UserResponse> = {};

      if (values.gender !== user?.gender) updatePayload.gender = values.gender;
      
      if (values.birthday) {
        const newBirthdayISO = dayjs(values.birthday).toISOString();
        const oldBirthday = user?.birthday ? new Date(user.birthday) : null;
        
        if (!oldBirthday || newBirthdayISO !== oldBirthday.toISOString()) {
          updatePayload.birthday = values.birthday.toISOString();
        }
      }

      if (values.username !== user?.username) updatePayload.username = values.username;
      if (values.phone !== user?.phone) updatePayload.phone = values.phone;

      if (Object.keys(updatePayload).length === 0) {
        toast.info('Không có thông tin nào thay đổi');
        return;
      }

      setIsLoading(true);
      await dispatch(updateUserThunk({ email: user?.email || '', account: updatePayload as UserResponse })).unwrap();
      toast.success('Cập nhật thông tin thành công');
      setIsLoading(false);
      setHandleInput(false);
    } catch (error) {
      setIsLoading(false);
      toast.error('Cập nhật thông tin thất bại: ' + error);
      console.log(error);
    }
  };


  return (
    <Modal
      title={<Title level={4}>Thông tin tài khoản</Title>}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      width={500}
      footer={null}

    >
      <Card >
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
              <Upload
                action={`http://localhost:3000/user/upload-avatar`}
                showUploadList={false}
                headers={{
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }}
                onChange={handleChangeAvatar}
              >
                <Button type="primary" shape="circle" icon={<CameraOutlined />} size="small" />
              </Upload>
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
        {handleInput ? (
          <Form form={form} style={{ marginBottom: '20px' }}>
            <Form.Item label="Tên người dùng" name="username" initialValue={user?.username}>
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email" initialValue={user?.email}>
              <Input disabled />
            </Form.Item>
            <Form.Item label="Số điện thoại" name="phone" initialValue={user?.phone}>
              <Input />
            </Form.Item>
            <Form.Item label="Giới tính" name="gender" initialValue={user?.gender}>
              <Select>
                <Select.Option value="Nam">Nam</Select.Option>
                <Select.Option value="Nữ">Nữ</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Ngày sinh" name="birthday" initialValue={user?.birthday ? dayjs(user.birthday) : null}>
              <DatePicker format="YYYY/MM/DD"  />
            </Form.Item>

          </Form>
        ) : (
          <div style={{ marginBottom: '20px' }}>
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
                {user?.birthday ? new Date(user.birthday).toLocaleDateString() : 'Chưa cập nhật'}
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}
        <Row gutter={16} style={{ marginTop: '20px' }}>
          <Col span={12}>
            {handleInput ? (
              <div style={{ display: 'flex', gap: '10px' }}>
                <Button type="primary" htmlType="submit" style={{ width: '100%', borderRadius: '4px' }} onClick={handleUpdateUser}>
                  {isLoading ? <Spin /> : 'Lưu'}
                </Button>
                <Button type="default" htmlType="submit" style={{ width: '100%', borderRadius: '4px' }} onClick={() => setHandleInput(false)}>
                  Hủy
                </Button>
              </div>
            ) : (
              <>
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  block
                  onClick={() => setHandleInput(true)}
                  style={{ borderRadius: '4px' }}
                >
                  Chỉnh sửa thông tin
                </Button>
              </>
            )}
          </Col>
          <Col span={12}>
            {handleInput ? (
              <></>
            ) : (

              <Button
                type="primary"
                danger
                icon={<LogoutOutlined />}
                block
                onClick={() => logout()}
              >
                Đăng xuất
              </Button>
            )}
          </Col>
        </Row>
      </Card>
    </Modal>
  );
};

export default UserModal;