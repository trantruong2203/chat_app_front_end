import { Modal, Card, Avatar, Button, Divider, Typography, List, Space } from "antd";
import { MessageOutlined, UserAddOutlined, BlockOutlined, WarningOutlined, ShareAltOutlined, TeamOutlined } from "@ant-design/icons";
import type { UserResponse } from "../../interface/UserResponse";

const { Text } = Typography;

const NotFriendModal = ({ isModalOpen, handleCancel, findUser }: { isModalOpen: boolean, handleCancel: () => void, findUser: UserResponse }) => (

  <Modal
    open={isModalOpen}
    onCancel={handleCancel}
    footer={null}
    width={400}
    title={<span style={{ fontWeight: 600 }}>Thông tin tài khoản</span>}
    centered
  >
    <Card
      style={{ borderRadius: 12, margin: 0, boxShadow: "none" }}
      cover={
        <img
          alt="cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2qLE1GXRzDLzoFHGMGQkXJUh1b5osxM7v6w&s"
          style={{ height: 150, objectFit: "cover", borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
        />
      }
    >
      <div style={{ padding: 24, paddingTop: 0, textAlign: "center" }}>
        <Avatar
          size={90}
          src={findUser?.avatar}
          style={{
            marginTop: -45,
            border: "3px solid #1890ff",
            boxShadow: "0 2px 8px rgba(24,144,255,0.15)",
            background: "#fff"
          }}
        />
        <h2>{findUser.username}</h2>
        <Space>
          <Button
            icon={<UserAddOutlined />}
            type="primary"
            style={{ borderRadius: 20, minWidth: 100 }}
          
          >
            Kết bạn
          </Button>
          <Button
            icon={<MessageOutlined style={{ color: "#1890ff" }} />}
            style={{ borderRadius: 20, border: "1px solid #1890ff", color: "#1890ff", background: "#fff", minWidth: 100 }}
          >
            Nhắn tin
          </Button>
        </Space>
        <Divider style={{ background: "#e6e6e6" }} />
        <div style={{ textAlign: "left" }}>
          <Text style={{ color: "#888", fontSize: 13 }}>Thông tin cá nhân</Text>
          <div style={{ margin: "8px 0", display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: 15, marginRight: 6 }}>👤</span>
            <Text strong>Giới tính:</Text> <Text> {findUser.gender}</Text>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: 15, marginRight: 6 }}>🎂</span>
            <Text strong>Ngày sinh:</Text> <Text>{findUser.dob?.toLocaleDateString()}</Text>
          </div>
        </div>
        <Divider style={{ background: "#e6e6e6" }} />
        <List
          itemLayout="horizontal"
          dataSource={[
            { icon: <TeamOutlined style={{ fontSize: 18, color: '#1890ff' }} />, text: "Nhóm chung (0)" },
            { icon: <ShareAltOutlined style={{ fontSize: 18, color: '#1890ff' }} />, text: "Chia sẻ danh thiếp" },
            { icon: <BlockOutlined style={{ fontSize: 18, color: '#ff4d4f' }} />, text: "Chặn tin nhắn và cuộc gọi" },
            { icon: <WarningOutlined style={{ fontSize: 18, color: '#faad14' }} />, text: "Báo xấu" },
          ]}
          renderItem={item => (
            <List.Item
              style={{ color: "#222", borderRadius: 8, transition: 'background 0.2s' }}
              onMouseOver={e => (e.currentTarget.style.background = '#f5f5f5')}
              onMouseOut={e => (e.currentTarget.style.background = 'transparent')}
            >
              <List.Item.Meta
                avatar={item.icon}
                title={<span style={{ color: "#222", fontSize: 15 }}>{item.text}</span>}
              />
            </List.Item>
          )}
        />
      </div>
    </Card>
  </Modal>
);

export default NotFriendModal;