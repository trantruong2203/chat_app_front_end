import React, { useState } from 'react';
import { Modal, Input, List, Avatar, Button, Typography, Divider, Space, Empty } from 'antd';
import { useSelector } from 'react-redux';
import type { RootState } from '../../stores/store';
import type { UserResponse } from '../../interface/UserResponse';



const { Search } = Input;
const { Text } = Typography;

const AddFriendModal: React.FC<{
  isModalOpen: boolean;
  handleCancel: () => void;
  handleOpenNotFriendModal: (item: UserResponse) => void;
  findUser: UserResponse; // BẮT BUỘC phải có
  setFindUser: (findUser: UserResponse) => void;
}> = ({ isModalOpen, handleCancel, handleOpenNotFriendModal, findUser, setFindUser }) => {
  const [searchValue, setSearchValue] = useState('');
  const { items } = useSelector((state: RootState) => state.user);


  const handleSearch = (): void => {
    const findAccount = items.find(item => item.email === searchValue || item.phone === searchValue);
    if (findAccount) {
      setFindUser(findAccount);
    }
  };

  return (
    <Modal
      title="Thêm bạn"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>Hủy</Button>,

      ]}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Search
          addonBefore={<span role="img" aria-label="vn">Email - Sdt</span>}
          placeholder="Nhập email hoặc số điện thoại"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          onSearch={handleSearch}
          enterButton
        />
        <Divider orientation="left">Kết quả tìm kiếm</Divider>
        {
          findUser.email ? (
            <List
              itemLayout="horizontal"
              dataSource={[findUser]}
              renderItem={item => (
                <List.Item
                  onClick={() => handleOpenNotFriendModal(item)}
                  actions={[<Button type="primary" size="small" >Kết bạn</Button>]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} style={{ width: 50, height: 50 }} />}
                    title={<Text strong>{item.username}</Text>}
                    description={<Text type="secondary">{item.phone}</Text>}
                  />
                </List.Item>
              )}
            />
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Không tìm thấy người dùng"
            />
          )
        }

      </Space>

    </Modal>
  );
};

export default AddFriendModal;