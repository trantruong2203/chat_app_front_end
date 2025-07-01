import React, { useContext } from 'react';
import { LockOutlined, UserOutlined, WechatOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Card, Typography, Divider, Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../stores/store.ts';
import { loginUser } from '../features/users/userThunks.ts';
import { ContextAuth } from '../contexts/AuthContext.tsx';
import { Link, useNavigate } from 'react-router-dom';
import type { LoginRequest } from '../interface/UserResponse.ts';
import { toast } from 'react-toastify';

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const [form] = Form.useForm<LoginRequest>();
  const dispatch = useDispatch<AppDispatch>();
  const { saveLocal } = useContext(ContextAuth);
  const navigate = useNavigate();

  const onFinish = async (values: LoginRequest): Promise<void> => {
    try {
      const user = await dispatch(loginUser(values)).unwrap();
      saveLocal("account", user.email);
      navigate('/home');
      toast.success('Đăng nhập thành công!');
    } catch (error: unknown) {
      console.error('Lỗi đăng nhập:', error);
      toast.error('Đăng nhập thất bại!');
    }
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
            <Title level={2} style={{ marginTop: 16, marginBottom: 8 }}>Đăng nhập</Title>
            <Text type="secondary">Chào mừng bạn quay trở lại!</Text>
          </div>

          <Form<LoginRequest>
            form={form}
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            size="large"
            layout="vertical"
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Vui lòng nhập email!', type: 'email' }]}
            >
              <Input
                prefix={<UserOutlined style={{ color: '#bfbfbf' }} />}
                placeholder="Email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            >
              <Input
                prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
                type="password"
                placeholder="Mật khẩu"
              />
            </Form.Item>

            <Form.Item>
              <Row justify="space-between" align="middle">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Ghi nhớ đăng nhập</Checkbox>
                </Form.Item>
                <a href="#" style={{ fontSize: '14px' }}>Quên mật khẩu?</a>
              </Row>
            </Form.Item>

            <Form.Item>
              <Button
                block
                type="primary"
                htmlType="submit"
                style={{ height: '40px', borderRadius: '6px' }}
              >
                Đăng nhập
              </Button>
            </Form.Item>

            <Divider plain>
              <Text type="secondary" style={{ fontSize: '14px' }}>Hoặc</Text>
            </Divider>

            <div style={{ textAlign: 'center' }}>
              <Text type="secondary" style={{ marginRight: 8 }}>Chưa có tài khoản?</Text>
              <Link to="/register" style={{ color: '#1677ff' }}>Đăng ký ngay!</Link>
            </div>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;