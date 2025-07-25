import { Layout } from 'antd';
import Navbar from '../components/Navbar';
import Main from '../components/Main';
import RecentChats from '../components/RecentChats';
import AddFriendModal from '../components/modal/AddFriendModal';
import AddGroupModal from '../components/modal/AddGroupModal';
import NotFriendModal from '../components/modal/NotFriendModal';
import UserModal from '../components/modal/UserModal';
import { useState, useContext } from 'react';
import type { UserResponse, Message } from '../interface/UserResponse';
import { useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../stores/store';
import { ContextAuth } from '../contexts/AuthContext';
import { getObjectById } from '../services/respone';
import { createdMessage, getMessages } from '../features/messages/messageThunks';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';

function Messages() {
    const [isNotFriendModalOpen, setIsNotFriendModalOpen] = useState(false);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false);
    const [isAddGroupModalOpen, setIsAddGroupModalOpen] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const [messageContent, setMessageContent] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const { items } = useSelector((state: RootState) => state.user);
    const { accountLogin } = useContext(ContextAuth);
    const currentUserId = getObjectById(items, accountLogin?.email ?? '')?.id;

    const [findUser, setFindUser] = useState<UserResponse>({
        id: 0,
        email: '',
        avatar: '',
        password: '',
        confirm: '',
        username: '',
        phone: '',
        gender: '',
        birthday: new Date().toISOString(), // Chuyển từ Date sang string ISO
        agreement: false,
        status: 0,
    });

    const handleCancel = (): void => {
        setIsAddFriendModalOpen(false);
        setFindUser({
            id: 0,
            email: '',
            avatar: '',
            password: '',
            confirm: '',
            username: '',
            phone: '',
            gender: '',
            birthday: new Date().toISOString(), // Chuyển từ Date sang string ISO
            agreement: false,
            status: 0,
        });
    }

    const handleOpenNotFriendModal = (): void => {
        setIsNotFriendModalOpen(true);
    }

    const handleCancelNotFriend = (): void => {
        setIsNotFriendModalOpen(false);
    }

    const handleCreateGroup = (name: string, memberIds: string[]) => {
        console.log('Tạo nhóm mới:', { name, memberIds });
        // Thêm logic tạo nhóm ở đây
        setIsAddGroupModalOpen(false);
    };
    
    const handleSendMessage = async () => {
        if (!messageContent.trim() || !selectedMessage || !currentUserId) return;
        
        try {
            await dispatch(createdMessage(
                {
                    id: 0,
                    senderid: selectedMessage.senderid == currentUserId ? selectedMessage.senderid : selectedMessage.receiverid,
                    receiverid: selectedMessage.senderid == currentUserId ? selectedMessage.receiverid : selectedMessage.senderid,
                    content: messageContent,
                    sentat: dayjs().utcOffset(7).format('YYYY-MM-DD HH:mm:ss'),
                    status: 1
                }
            ));
            
            // Cập nhật danh sách tin nhắn ngay sau khi tạo tin nhắn thành công
            await dispatch(getMessages());
            setMessageContent('');
        } catch (error) {
            console.error('Lỗi khi gửi tin nhắn:', error);
        }
    };

    return (
        <>
            <Layout style={{ height: '100vh', overflow: 'hidden' }}>
                <Layout style={{ display: 'flex', flexDirection: 'row', height: '100%', backgroundColor: '#fff' }}>
                    <Navbar setIsUserModalOpen={setIsUserModalOpen} />
                    <div style={{ height: '100%', width: "300px" }}>
                        <RecentChats
                            setIsAddFriendModalOpen={setIsAddFriendModalOpen}
                            setIsAddGroupModalOpen={setIsAddGroupModalOpen}
                            selectedMessage={selectedMessage}
                            setSelectedMessage={setSelectedMessage}
                        />
                    </div>
                    <Main
                        message={messageContent} 
                        setMessage={setMessageContent} 
                        handleSendMessage={handleSendMessage}
                        selectedMessage={selectedMessage}
                    />
                </Layout>
            </Layout>

            
            <AddFriendModal
                findUser={findUser}
                setFindUser={setFindUser}
                isModalOpen={isAddFriendModalOpen}
                handleCancel={handleCancel}
                handleOpenNotFriendModal={handleOpenNotFriendModal}
            />
            <AddGroupModal
                isOpen={isAddGroupModalOpen}
                onClose={() => setIsAddGroupModalOpen(false)}
                onCreateGroup={handleCreateGroup}
            />
            <NotFriendModal
                isModalOpen={isNotFriendModalOpen}
                handleCancel={handleCancelNotFriend}
                findUser={findUser}
            />
            <UserModal
                isModalOpen={isUserModalOpen}
                setIsModalOpen={setIsUserModalOpen}
            />

        </>

    );
}

export default Messages;