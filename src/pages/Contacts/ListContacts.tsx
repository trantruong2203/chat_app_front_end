import React, { useContext, useEffect, useState } from 'react';
import { UserOutlined, SearchOutlined } from '@ant-design/icons';
import { Avatar, Input, List, Typography, Badge, Divider } from 'antd';
import { getObjectByEmail, getObjectById } from '../../services/respone';
import { useSelector } from 'react-redux';
import type { RootState } from '../../stores/store';
import { ContextAuth } from '../../contexts/AuthContext';
import type { FriendShip } from '../../interface/UserResponse';

const { Search } = Input;
const { Title, Text } = Typography;

const ListContacts: React.FC = () => {
  const [contacts, setContacts] = useState<FriendShip[]>([]);
  const { accountLogin } = useContext(ContextAuth);
  const friendShip = useSelector((state: RootState) => state.friendship.items);
  const { items } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const getFriendShip = () => {
      const currentUserId = getObjectById(items, accountLogin?.email ?? '')?.id;
      if (!currentUserId) return [];
      return friendShip.filter(item => item.sentat == currentUserId || item.userid == currentUserId && item.status == 0);
    };
    const friendShipData = getFriendShip();
    setContacts(friendShipData);
  }, [friendShip, items, accountLogin]);

  const handleSearch = (value: string) => {
    if (!value.trim()) {
      const currentUserId = getObjectById(items, accountLogin?.email ?? '')?.id;
      if (!currentUserId) {
        setContacts([]);
        return;
      }
      const originalContacts = friendShip.filter(item => item.sentat == currentUserId && item.status == 0);
      setContacts(originalContacts);
    } else {
      setContacts(contacts.filter(item => getObjectByEmail(items, item.userid)?.username?.toLowerCase().includes(value.toLowerCase())));
    }
  };
  return (
    <div
      style={{
        width: '100%',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        padding: '20px'
      }}
    >
      <div style={{ padding: '0 10px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '20px'
        }}>
          <UserOutlined style={{ fontSize: '20px' }} />
          <Title level={4} style={{ margin: "10px 0" }}>Danh sách bạn bè</Title>
        </div>

        <Search
          placeholder="Tìm kiếm bạn bè..."
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          style={{ marginBottom: '20px' }}
          onChange={(e) => handleSearch(e.target.value)}
        />

        <Divider style={{ margin: '10px 0' }} />

        <List
          dataSource={contacts}
          renderItem={item => (
            <List.Item
              style={{
                padding: '12px 5px',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                borderRadius: '8px'
              }}
              className="contact-item"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f5f5f5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <List.Item.Meta
                avatar={
                  <Badge
                    dot
                    color={item.status === 0 ? 'green' : 'gray'}
                    offset={[-5, 40]}
                  >
                    <Avatar
                      src={getObjectByEmail(items, item.userid)?.avatar ?? ''}
                      size={50}
                      style={{ boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}
                    />
                  </Badge>
                }
                title={<Text strong>{getObjectByEmail(items, item.userid)?.username ?? '---'}</Text>}
                description={
                  <div>
                    <Text type="secondary">{getObjectByEmail(items, item.userid)?.phone ?? '---'}</Text>
                    <br />
                    <Text type="secondary">{getObjectByEmail(items, item.userid)?.email ?? '---'}</Text>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default ListContacts;