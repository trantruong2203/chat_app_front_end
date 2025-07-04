import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { MdCall } from 'react-icons/md';
import { CiVideoOn } from 'react-icons/ci';
import { CiSearch } from 'react-icons/ci';

function HeadMain() {
    return (
        <div
        style={{
          padding: '10px',
          backgroundColor: 'var(--bg-secondary)',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '10px',
          boxShadow: 'var(--shadow-sm)',
          borderBottom: '1px solid var(--border-light)'
        }}
      >
        <div style={{display: "flex", gap: "10px", alignItems: "center"}}>
          <Avatar 
            className="user-avatar" 
            size={46} 
            icon={<UserOutlined />} 
            style={{ backgroundColor: 'var(--primary-light)' }} 
          />
          <div>
            <h3 >Tran van A</h3>
            <p >Trực tuyến</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '18px' }}>
          <div className="glass-effect" style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer'
          }}>
            <MdCall size={20} color='var(--primary-color)' />
          </div>
          <div className="glass-effect" style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer'
          }}>
            <CiVideoOn size={22} color='var(--primary-color)' />
          </div>
          <div className="glass-effect" style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer'
          }}>
            <CiSearch size={22} color='var(--primary-color)' />
          </div>
        </div>
      </div>
    );
}

export default HeadMain;