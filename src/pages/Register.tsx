import React from 'react';
import { 
  UserOutlined, 
  LockOutlined, 
  MailOutlined, 
  PhoneOutlined,
  WechatOutlined,
} from '@ant-design/icons';
import { 
  Button, 
  Checkbox, 
  Form, 
  Input, 
  Card, 
  Typography, 
  Divider,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../features/users/userThunks.ts';
import type { UserResponse } from '../interface/UserResponse.js';
import type { AppDispatch, RootState } from '../stores/store.ts';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const { Title, Text } = Typography;

const Register: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state : RootState) => state.user);
  const navigate = useNavigate();
  

  const onFinish = (values: UserResponse) => {
    const emailExists : boolean = items.some((user : UserResponse) => user.email === values.email || user.phone === values.phone);
    if (emailExists) {
      toast.error('Email hoặc số điện thoại đã được sử dụng!');
      return;
    }
    dispatch(createUser(values));
    toast.success('Đăng ký thành công!');
    navigate('/');
  };

  return (
    <div className="auth-background" style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      position: 'relative'
    }}>
      <div className="glass-effect" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 0
      }}></div>
      
      <Card
        className="glass-effect fade-in"
        style={{
          width: '450px',
          padding: '10px 20px',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(10px)',
          border: 'none',
          zIndex: 1
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <div className="gradient-bg" style={{ 
            width: '70px', 
            height: '70px', 
            borderRadius: '50%', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            margin: '0 auto 16px',
            boxShadow: 'var(--shadow-md)'
          }}>
            <WechatOutlined style={{ fontSize: 36, color: 'white' }} />
          </div>
          <Title level={2} style={{ marginTop: 16, marginBottom: 8, color: 'var(--text-primary)' }}>Đăng ký</Title>        </div>
          
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          size="large"
          layout="vertical"
          scrollToFirstError
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                message: 'Email không hợp lệ!',
              },
              {
                required: true,
                message: 'Vui lòng nhập email!',
              },
            ]}
          >
            <Input 
              className="message-input"
              prefix={<MailOutlined style={{ color: 'var(--primary-color)', opacity: 0.7 }} />} 
              placeholder="Email" 
              style={{ height: '46px' }}
            />
          </Form.Item>

          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!', whitespace: true }]}
          >
            <Input 
              className="message-input"
              prefix={<UserOutlined style={{ color: 'var(--primary-color)', opacity: 0.7 }} />} 
              placeholder="Tên người dùng" 
              style={{ height: '46px' }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu!',
              },
            ]}
            hasFeedback
          >
            <Input.Password 
              className="message-input"
              prefix={<LockOutlined style={{ color: 'var(--primary-color)', opacity: 0.7 }} />} 
              placeholder="Mật khẩu" 
              style={{ height: '46px' }}
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Vui lòng xác nhận mật khẩu!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu nhập lại không khớp!'));
                },
              }),
            ]}
          >
            <Input.Password 
              className="message-input"
              prefix={<LockOutlined style={{ color: 'var(--primary-color)', opacity: 0.7 }} />} 
              placeholder="Xác nhận mật khẩu" 
              style={{ height: '46px' }}
            />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
          >
            <Input 
              className="message-input"
              prefix={<PhoneOutlined style={{ color: 'var(--primary-color)', opacity: 0.7 }} />} 
              placeholder="Số điện thoại" 
              style={{ height: '46px' }}
            />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('Vui lòng đồng ý với điều khoản')),
              },
            ]}
          >
            <Checkbox>
              Tôi đã đọc và đồng ý với <a href="" style={{ color: 'var(--primary-color)' }}>điều khoản</a>
            </Checkbox>
          </Form.Item>
          
          <Form.Item >
            <Button 
              block 
              type="primary"
              htmlType="submit"
              style={{ 
                height: '46px', 
                borderRadius: 'var(--radius-md)', 
                border: 'none',
                fontWeight: '500',
                fontSize: '16px',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              Đăng ký
            </Button>
          </Form.Item>
          
          <Divider plain>
            <Text style={{ fontSize: '14px', color: 'var(--text-tertiary)' }}>Hoặc</Text>
          </Divider>
          
          <div style={{ textAlign: 'center' }}>
            <Text style={{ marginRight: 8, color: 'var(--text-secondary)' }}>Đã có tài khoản?</Text>
            <Link to="/" style={{ color: 'var(--primary-color)', fontWeight: '500' }}>Đăng nhập ngay!</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Register;