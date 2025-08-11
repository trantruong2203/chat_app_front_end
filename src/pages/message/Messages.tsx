import { Layout } from 'antd';
import Main from '../../components/Main';
import RecentChats from '../../components/RecentChats';
import AddFriendModal from '../../components/modal/AddFriendModal';
import AddGroupModal from '../../components/modal/AddGroupModal';
import NotFriendModal from '../../components/modal/NotFriendModal';
import { useState, useContext, useEffect } from 'react';
import type { UserResponse, Message } from '../../interface/UserResponse';
import { useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../stores/store';
import { ContextAuth } from '../../contexts/AuthContext';
import { getObjectById } from '../../services/respone';
import { sendMessageThunk, getMessages } from '../../features/messages/messageThunks';
// import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { message } from 'antd';
import dayjs from 'dayjs';
import { fetchLastMessagesByUserIdThunk } from '../../features/messages/messageThunks';


function Messages() {
    const [isNotFriendModalOpen, setIsNotFriendModalOpen] = useState(false);
    const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false);
    const [isAddGroupModalOpen, setIsAddGroupModalOpen] = useState(false);
    const messages = useSelector((state: RootState) => state.message.items);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const [fullMessages, setFullMessages] = useState<Message[]>([]);
    const [messageContent, setMessageContent] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const { items } = useSelector((state: RootState) => state.user);
    const { accountLogin } = useContext(ContextAuth);
    const currentUserId = getObjectById(items, accountLogin?.email ?? '')?.id;
    const { id } = useParams();
    const groupMember = useSelector((state: RootState) => state.groupMember.items);
    const lastMessages = useSelector((state: RootState) => state.message.lastMessages);

    const isGroupChat = window.location.pathname.includes('/group/');
    const userId = isGroupChat ? null : id;
    const groupId = isGroupChat ? id : null;

    const [findUser, setFindUser] = useState<UserResponse>({
        id: 0,
        email: '',
        avatar: '',
        password: '',
        confirm: '',
        username: '',
        phone: '',
        gender: '',
        birthday: new Date().toISOString(),
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
            birthday: new Date().toISOString(),
            agreement: false,
            status: 0,
        });
    }

    const handleOpenNotFriendModal = (): void => {
        setIsNotFriendModalOpen(true);
    };

    const handleCancelNotFriend = (): void => {
        setIsNotFriendModalOpen(false);
    };

    const handleSendMessage = async () => {
        if (!messageContent.trim() || !selectedMessage || !currentUserId) return;
        try {
            const chatPartnerId = selectedMessage.groupid ? null :
                selectedMessage.senderid === currentUserId ?
                    selectedMessage.receiverid : selectedMessage.senderid;
            const groupId = groupMember.find(item => item.userid == currentUserId && item.groupid == selectedMessage.groupid)?.groupid;

            const newMessage = {
                id: 0,
                groupid: groupId || null,
                senderid: currentUserId,
                receiverid: chatPartnerId || null,
                content: messageContent,
                sentat: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                status: 1,
                messageid: 0
            };

            await dispatch(sendMessageThunk(newMessage)).unwrap();
            setMessageContent('');
            const allMessages = await dispatch(getMessages()).unwrap();
            const filteredMessages = allMessages.filter(message =>
                (message.senderid === currentUserId && message.receiverid === chatPartnerId) ||
                (message.receiverid === currentUserId && message.senderid === chatPartnerId) ||
                (message.groupid === groupId)
            ).sort((a, b) => new Date(a.sentat).getTime() - new Date(b.sentat).getTime());
            if (filteredMessages.length > 0) {
                setFullMessages(filteredMessages);
                dispatch(fetchLastMessagesByUserIdThunk(currentUserId));
            }
            setSelectedMessage({
                ...newMessage,
                senderid: currentUserId,
                receiverid: chatPartnerId || null,
                groupid: groupId || null
            });
        } catch (error: unknown) {
            console.error('Lỗi khi gửi tin nhắn:', error);
            message.error(`Lỗi: ${error instanceof Error ? error.message : 'Không xác định'}`);
        }
    };

    const handleMessageSelection = (mess: Message) => {
        if (!currentUserId) return;
        const chatGroupId = mess.groupid;
        const chatPartnerId = mess.senderid === currentUserId ? mess.receiverid : mess.senderid;
        if (chatGroupId) {
            groupMember.some(item => item.userid === currentUserId && item.groupid === chatGroupId);
            const filteredMessages = messages.filter(message =>
                message.groupid === chatGroupId
            );
            setFullMessages(filteredMessages.sort((a, b) => new Date(a.sentat).getTime() - new Date(b.sentat).getTime()));
        } else {
            const filteredMessages = messages.filter(message =>
                (message.senderid === currentUserId && message.receiverid === chatPartnerId) ||
                (message.receiverid === currentUserId && message.senderid === chatPartnerId)
            );
            setFullMessages(filteredMessages.sort((a, b) => new Date(a.sentat).getTime() - new Date(b.sentat).getTime()));
        };
        setSelectedMessage({
            ...mess,
            senderid: currentUserId,
            receiverid: chatPartnerId,
            groupid: chatGroupId
        });
    };

    useEffect(() => {
        if (groupId && currentUserId && messages.length > 0) {
            const groupIdNumber = parseInt(groupId);
            const firstGroupMessage = messages.find(message => message.groupid === groupIdNumber);
            console.log(firstGroupMessage);
            if (firstGroupMessage) {
                handleMessageSelection(firstGroupMessage);
            }
        } else if (userId && currentUserId && messages.length > 0) {
            const userIdNumber = parseInt(userId);
            const firstPersonalMessage = messages.find(message =>
                (message.senderid === currentUserId && message.receiverid === userIdNumber) ||
                (message.receiverid === currentUserId && message.senderid === userIdNumber)
            );
            if (firstPersonalMessage) {
                handleMessageSelection(firstPersonalMessage);
            }
        }
    }, [userId, groupId, currentUserId, messages]);

    return (
        <>
            <Layout style={{ height: '100vh', overflow: 'hidden' }}>
                <Layout style={{ display: 'flex', flexDirection: 'row', height: '100%', backgroundColor: '#fff' }}>
                    <div style={{ height: '100%', width: "300px" }}>
                        <RecentChats
                            setIsAddFriendModalOpen={setIsAddFriendModalOpen}
                            setIsAddGroupModalOpen={setIsAddGroupModalOpen}
                            handleMessageSelection={handleMessageSelection}
                            selectedMessage={selectedMessage}
                            lastMessages={lastMessages}
                        />
                    </div>
                    <Main
                        message={messageContent}
                        setMessage={setMessageContent}
                        handleSendMessage={handleSendMessage}
                        fullMessages={fullMessages}
                        handleMessageSelection={handleMessageSelection}
                        groupMember={groupMember}
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
            />
            <NotFriendModal
                isModalOpen={isNotFriendModalOpen}
                handleCancel={handleCancelNotFriend}
                findUser={findUser}
            />


        </>

    );
}

export default Messages;