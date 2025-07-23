import { Layout } from 'antd';
import MenuContacts from '../../components/MenuContacts';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { useState } from 'react';
import UserModal from '../../components/modal/UserModal';

function Contacts() {
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);


    return (
        <>
            <Layout style={{ height: '100vh', overflow: 'hidden' }}>
                <Layout style={{ display: 'flex', flexDirection: 'row', height: '100%', backgroundColor: '#fff' }}>
                    <Navbar setIsUserModalOpen={setIsUserModalOpen} />
                    <MenuContacts setIsAddFriendModalOpen={() => {}} setIsAddGroupModalOpen={() => {}} />
                    <Outlet />
                </Layout>
            </Layout>

            <UserModal
                isModalOpen={isUserModalOpen}
                setIsModalOpen={setIsUserModalOpen}
            />
        </>
    );
}

export default Contacts;