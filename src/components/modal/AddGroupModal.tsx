import React, { useState } from 'react';
import { Modal, Input, Button, Tabs, List, Avatar, Checkbox, Typography, Divider } from 'antd';
import { SearchOutlined, CameraOutlined, CloseCircleOutlined } from '@ant-design/icons';
import '../../App.css';

interface User {
  id: string;
  username: string;
  avatar?: string;
}

interface AddGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateGroup: (name: string, memberIds: string[]) => void;
}

const AddGroupModal: React.FC<AddGroupModalProps> = ({ isOpen, onClose, onCreateGroup }) => {
  const [groupName, setGroupName] = useState('');
  const [searchText, setSearchText] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  // Mẫu dữ liệu người dùng
  const recentUsers: User[] = [
    { id: '1', username: 'Trần Thanh Tí', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: '2', username: 'Trần Đình Trường', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: '3', username: 'Đoàn Khánh Vân', avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: '4', username: 'Khánh Thị Nga', avatar: 'https://i.pravatar.cc/150?img=4' },
    { id: '5', username: 'Fm Style Ái Nghĩa', avatar: 'https://i.pravatar.cc/150?img=5' },
    { id: '6', username: 'Anh Dương', avatar: 'https://i.pravatar.cc/150?img=6' },
    { id: '7', username: 'Cẩm Tú', avatar: 'https://i.pravatar.cc/150?img=7' },
    { id: '8', username: 'Cty Vinaparts', avatar: 'https://i.pravatar.cc/150?img=8' }
  ];

  const handleToggleUser = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleCreateGroup = () => {
    if (groupName.trim() && selectedUsers.length > 0) {
      onCreateGroup(groupName, selectedUsers);
      resetForm();
    }
  };

  const resetForm = () => {
    setGroupName('');
    setSearchText('');
    setSelectedUsers([]);
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  // Nhóm người dùng theo chữ cái đầu tiên
  const groupByFirstLetter = (users: User[]) => {
    const grouped: { [key: string]: User[] } = {};
    
    users.forEach(user => {
      const firstLetter = user.username.charAt(0).toUpperCase();
      if (!grouped[firstLetter]) {
        grouped[firstLetter] = [];
      }
      grouped[firstLetter].push(user);
    });
    
    return Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b));
  };

  const groupedUsers = groupByFirstLetter(recentUsers);

  const tabItems = [
    { label: 'Tất cả', key: 'all' },
    { label: 'Khách hàng', key: 'customers' },
    { label: 'Gia đình', key: 'family' },
    { label: 'Công việc', key: 'work' },
    { label: 'Bạn bè', key: 'friends' },
    { label: 'Trả lời sau', key: 'later' },
  ];

  return (
    <Modal
      title="Tạo nhóm"
      open={isOpen}
      onCancel={handleCancel}
      closeIcon={<CloseCircleOutlined />}
      footer={[
        <Button key="cancel" onClick={handleCancel} style={{ borderRadius: '4px' }}>
          Hủy
        </Button>,
        <Button 
          key="create" 
          type="primary" 
          onClick={handleCreateGroup} 
          disabled={!groupName.trim() || selectedUsers.length === 0}
          style={{ borderRadius: '4px' }}
        >
          Tạo nhóm
        </Button>
      ]}
      width={400}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <Avatar 
          size={40} 
          icon={<CameraOutlined />} 
          style={{ backgroundColor: '#f0f2f5', color: '#595959', marginRight: '12px' }} 
        />
        <Input 
          placeholder="Nhập tên nhóm..." 
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          style={{ border: 'none', borderBottom: '1px solid #e8e8e8', borderRadius: '0' }}
        />
      </div>

      <Input
        placeholder="Nhập tên, số điện thoại, hoặc danh sách số điện thoại"
        prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: '10px', borderRadius: '20px' }}
      />

      <Tabs
        items={tabItems}
        defaultActiveKey="all"
        style={{ marginBottom: '10px' }}
      />

      <Typography.Text style={{ fontWeight: 'bold', display: 'block', margin: '10px 0' }}>
        Trò chuyện gần đây
      </Typography.Text>

      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {groupedUsers.map(([letter, users]) => (
          <div key={letter}>
            <Typography.Title level={5} style={{ margin: '8px 0' }}>{letter}</Typography.Title>
            <List
              dataSource={users}
              renderItem={user => (
                <List.Item
                  style={{ padding: '8px 0', cursor: 'pointer' }}
                  onClick={() => handleToggleUser(user.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <Checkbox 
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleToggleUser(user.id)}
                      style={{ marginRight: '10px' }}
                    />
                    <Avatar src={user.avatar} style={{ marginRight: '10px' }} />
                    <Typography.Text>{user.username}</Typography.Text>
                  </div>
                </List.Item>
              )}
            />
            <Divider style={{ margin: '8px 0' }} />
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default AddGroupModal;
