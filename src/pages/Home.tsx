import { Layout } from 'antd';
import Navbar from '../components/Navbar';
import Main from '../components/Main';
import RecentChats from '../components/RecentChats';
import AddFriendModal from '../components/modal/AddFriendModal';
import AddGroupModal from '../components/modal/AddGroupModal';
import NotFriendModal from '../components/modal/NotFriendModal';
import UserModal from '../components/modal/UserModal';
import { useState } from 'react';
import type { UserResponse } from '../interface/UserResponse';
function Home() {
    const [isNotFriendModalOpen, setIsNotFriendModalOpen] = useState(false);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false);
    const [isAddGroupModalOpen, setIsAddGroupModalOpen] = useState(false);
    const [findUser, setFindUser] = useState<UserResponse>({
        email: '',
        avatar: '',
        password: '',
        confirm: '',
        username: '',
        phone: '',
        gender: '',
        dob: new Date(),
        agreement: false,
    });

    const handleCancel = (): void => {
        setIsAddFriendModalOpen(false);
        setFindUser({
            email: '',
            avatar: '',
            password: '',
            confirm: '',
            username: '',
            phone: '',
            gender: '',
            dob: new Date(),
            agreement: false,
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

    return (
        <>
            <Layout style={{ height: '100vh', overflow: 'hidden' }}>
                <Layout style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
                    <Navbar setIsUserModalOpen={setIsUserModalOpen} />
                    <RecentChats 
                        setIsAddFriendModalOpen={setIsAddFriendModalOpen} 
                        setIsAddGroupModalOpen={setIsAddGroupModalOpen}
                    />
                    <Main />
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

export default Home;