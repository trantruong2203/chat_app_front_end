import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { PhoneOutlined, VideoCameraOutlined, EllipsisOutlined } from '@ant-design/icons';

function HeadMain() {
    return (
        <div
        style={{
          padding: '10px 16px',
          backgroundColor: '#F5F5F5',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '10px',
          borderBottom: '1px solid var(--wechat-border)'
        }}
      >
        <div style={{display: "flex", gap: "10px", alignItems: "center"}}>
          <Avatar 
            size={36} 
            icon={<UserOutlined />} 
            style={{ backgroundColor: '#f0f0f0' }} 
          />
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '500' }}>Tran van A</h3>
            <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>Trực tuyến</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }}>
          <div style={{
            cursor: 'pointer',
            fontSize: '18px',
            color: '#666'
          }}>
            <PhoneOutlined />
          </div>
          <div style={{
            cursor: 'pointer',
            fontSize: '18px',
            color: '#666'
          }}>
            <VideoCameraOutlined />
          </div>
          <div style={{
            cursor: 'pointer',
            fontSize: '18px',
            color: '#666'
          }}>
            <EllipsisOutlined />
          </div>
        </div>
      </div>
    );
}

export default HeadMain;