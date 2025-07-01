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
  Row, 
  Col, 
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
      alert('Email hoặc số điện thoại đã được sử dụng!');
      return;
    }
    dispatch(createUser(values));
    toast.success('Đăng ký thành công!');
    alert('Đăng ký thành công!');
    navigate('/');
    // Xử lý đăng ký ở đây
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Col xs={22} sm={16} md={12} lg={8} xl={6}>
        <Card 
          variant="outlined"
          style={{ 
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            borderRadius: '8px',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <WechatOutlined style={{ fontSize: 48, color: '#1677ff' }} />
            <Title level={2} style={{ marginTop: 16, marginBottom: 8 }}>Đăng ký</Title>
            <Text type="secondary">Tạo tài khoản mới</Text>
          </div>
          
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
                prefix={<MailOutlined style={{ color: '#bfbfbf' }} />} 
                placeholder="Email" 
              />
            </Form.Item>

            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!', whitespace: true }]}
            >
              <Input 
                prefix={<UserOutlined style={{ color: '#bfbfbf' }} />} 
                placeholder="Tên người dùng" 
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
                prefix={<LockOutlined style={{ color: '#bfbfbf' }} />} 
                placeholder="Mật khẩu" 
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
                prefix={<LockOutlined style={{ color: '#bfbfbf' }} />} 
                placeholder="Xác nhận mật khẩu" 
              />
            </Form.Item>

            <Form.Item
              name="phone"
              rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
            >
              <Input 
                prefix={<PhoneOutlined style={{ color: '#bfbfbf' }} />} 
                placeholder="Số điện thoại" 
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
                Tôi đã đọc và đồng ý với <a href="">điều khoản</a>
              </Checkbox>
            </Form.Item>
            
            <Form.Item >
              <Button 
                block 
                type="primary" 
                htmlType="submit"
                style={{ height: '40px', borderRadius: '6px' }}
              >
                Đăng ký
              </Button>
            </Form.Item>
            
            <Divider plain>
              <Text type="secondary" style={{ fontSize: '14px' }}>Hoặc</Text>
            </Divider>
            
            <div style={{ textAlign: 'center' }}>
              <Text type="secondary" style={{ marginRight: 8 }}>Đã có tài khoản?</Text>
              <Link to="/login" style={{ color: '#1677ff' }}>Đăng nhập ngay!</Link>
            </div>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Register;