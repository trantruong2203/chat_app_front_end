import React, { useContext } from 'react';
import { LockOutlined, UserOutlined, WechatOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Card, Typography, Divider, Row } from 'antd';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../stores/store.ts';
import { loginUser, updateUserThunk } from '../features/users/userThunks.ts';
import { Link, useNavigate } from 'react-router-dom';
import type { LoginRequest, UserResponse } from '../interface/UserResponse.ts';
import { toast } from 'react-toastify';
import { ContextAuth } from '../contexts/AuthContext.tsx';
import { setUser } from '../features/users/userSlice.ts';

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const [form] = Form.useForm<LoginRequest>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { getToken } = useContext(ContextAuth);

  const onFinish = async (values: LoginRequest): Promise<void> => {
    try {
      const user = await dispatch(loginUser(values));
      console.log(user);
      if (!user) {
        toast.error("Đăng nhập thất bại! Bạn vui lòng kiểm tra lại thông tin đăng nhập!");
        return;
      }
      await getToken();
      await dispatch(updateUserThunk({ email: user?.meta.arg.email || '', account: {
        ...user,
        status: 1
      } as unknown as UserResponse })).unwrap();
      // Cập nhật state user với thông tin mới
      if (user) {
        setUser({
          ...user,
          status: 1
        });
      }
      toast.success("Đăng nhập thành công!");
      navigate('/');
    } catch (error: unknown) {
      console.error('Lỗi đăng nhập:', error);
      toast.error("Đăng nhập thất bại! Bạn vui lòng kiểm tra lại thông tin đăng nhập!");
    }
  };


  return (
    <div className="auth-background" style={{ 
      minHeight: '100vh', 
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
          width: '400px',
          padding: '20px',
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
          <Title level={2} style={{ marginTop: 16, marginBottom: 8, color: 'var(--text-primary)' }}>Đăng nhập</Title>
          <Text style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Chào mừng bạn quay trở lại!</Text>
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
              className="message-input"
              prefix={<UserOutlined style={{ color: 'var(--primary-color)', opacity: 0.7 }} />}
              placeholder="Email"
              style={{ height: '46px' }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input
              className="message-input"
              prefix={<LockOutlined style={{ color: 'var(--primary-color)', opacity: 0.7 }} />}
              type="password"
              placeholder="Mật khẩu"
              style={{ height: '46px' }}
            />
          </Form.Item>

          <Form.Item>
            <Row justify="space-between" align="middle">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Ghi nhớ đăng nhập</Checkbox>
              </Form.Item>
              <a href="/forget-password" style={{ fontSize: '14px', color: 'var(--primary-color)' }}>Quên mật khẩu?</a>
            </Row>
          </Form.Item>

          <Form.Item>
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
                boxShadow: 'var(--shadow-md)',
              }}
            >
              Đăng nhập
            </Button>
          </Form.Item>

          <Divider plain>
            <Text style={{ fontSize: '14px', color: 'var(--text-tertiary)' }}>Hoặc</Text>
          </Divider>

          <div style={{ textAlign: 'center' }}>
            <Text style={{ marginRight: 8, color: 'var(--text-secondary)' }}>Chưa có tài khoản?</Text>
            <Link to="/register" style={{ color: 'var(--primary-color)', fontWeight: '500' }}>Đăng ký ngay!</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;