import { Modal, Card, Avatar, Button, Divider, Typography, List, Space } from "antd";
import { MessageOutlined, UserAddOutlined, BlockOutlined, WarningOutlined, ShareAltOutlined, TeamOutlined, InfoCircleOutlined } from "@ant-design/icons";
import type { UserResponse } from "../../interface/UserResponse";

const { Text } = Typography;

const NotFriendModal = ({ isModalOpen, handleCancel, findUser }: { isModalOpen: boolean, handleCancel: () => void, findUser: UserResponse }) => (

  <Modal
    open={isModalOpen}
    onCancel={handleCancel}
    footer={null}
    width={400}
    title={
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <InfoCircleOutlined style={{ color: '#07C160', marginRight: '10px' }} />
        <span>Thông tin tài khoản</span>
      </div>
    }
    centered
  >
    <Card
      style={{ borderRadius: 4, margin: 0, boxShadow: "none" }}
      cover={
        <img
          alt="cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2qLE1GXRzDLzoFHGMGQkXJUh1b5osxM7v6w&s"
          style={{ height: 150, objectFit: "cover", borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
        />
      }
    >
      <div style={{ padding: 16, paddingTop: 0, textAlign: "center" }}>
        <Avatar
          size={80}
          src={findUser?.avatar}
          style={{
            marginTop: -40,
            border: "3px solid #fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            background: "#f0f0f0"
          }}
        />
        <h2 style={{ fontSize: '18px', marginTop: '10px' }}>{findUser.username}</h2>
        <Space style={{ marginTop: '10px' }}>
          <Button
            icon={<UserAddOutlined />}
            type="primary"
            style={{
              borderRadius: 4,
              minWidth: 100,
              backgroundColor: '#07C160',
              borderColor: '#07C160'
            }}
          >
            Kết bạn
          </Button>
          <Button
            icon={<MessageOutlined style={{ color: "#07C160" }} />}
            style={{
              borderRadius: 4,
              border: "1px solid #07C160",
              color: "#07C160",
              background: "#fff",
              minWidth: 100
            }}
          >
            Nhắn tin
          </Button>
        </Space>
        <Divider style={{ margin: '16px 0', background: "#e6e6e6" }} />
        <div style={{ textAlign: "left" }}>
          <Text style={{ color: "#888", fontSize: 13, fontWeight: 600 }}>Thông tin cá nhân</Text>
          <div style={{ margin: "10px 0", display: "flex", alignItems: "center", gap: 10 }}>
            <Text strong >Giới tính:</Text>
            <Text>{findUser.gender || 'Chưa cập nhật'} </Text>
          </div>
          <div style={{ margin: "10px 0", display: "flex", alignItems: "center", gap: 10 }}>
            <Text strong >Ngày sinh:</Text>
            <Text>{findUser.birthday ? (typeof findUser.birthday === 'string' ? new Date(findUser.birthday).toLocaleDateString() : new Date(findUser.birthday).toLocaleDateString()) : 'Chưa cập nhật'}</Text>
          </div>
          <div style={{ margin: "10px 0", display: "flex", alignItems: "center", gap: 10 }}>
            <Text strong >Số điện thoại:</Text>
            <Text>{findUser.phone || 'Chưa cập nhật'}</Text>
          </div>
        </div>
        <Divider style={{ margin: '16px 0', background: "#e6e6e6" }} />
        <List
          itemLayout="horizontal"
          dataSource={[
            { icon: <TeamOutlined style={{ fontSize: 16, color: '#07C160' }} />, text: "Nhóm chung (0)" },
            { icon: <ShareAltOutlined style={{ fontSize: 16, color: '#07C160' }} />, text: "Chia sẻ danh thiếp" },
            { icon: <BlockOutlined style={{ fontSize: 16, color: '#ff4d4f' }} />, text: "Chặn tin nhắn và cuộc gọi" },
            { icon: <WarningOutlined style={{ fontSize: 16, color: '#faad14' }} />, text: "Báo xấu" },
          ]}
          renderItem={item => (
            <List.Item
              style={{
                padding: '8px 0',
                borderBottom: '1px solid #f5f5f5',
                cursor: 'pointer'
              }}
            >
              <List.Item.Meta
                avatar={item.icon}
                title={<span style={{ color: "#333", fontSize: 14 }}>{item.text}</span>}
              />
            </List.Item>
          )}
        />
      </div>
    </Card>
  </Modal>
);

export default NotFriendModal;