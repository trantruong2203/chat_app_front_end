import  { useState } from 'react';
import ClientRouter from '../routers/ClientRouter';
import { Layout } from 'antd';
import Navbar from '../components/Navbar';
import UserModal from '../components/modal/UserModal';

function Home() {
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);

    return (
        <div>
            <Layout style={{ height: '100vh', overflow: 'hidden' }}>
                <Layout style={{ display: 'flex', flexDirection: 'row', height: '100%', backgroundColor: '#fff' }}>
                    <Navbar setIsUserModalOpen={setIsUserModalOpen}  />
                    <ClientRouter />
                </Layout>
            </Layout>
            <UserModal
                isModalOpen={isUserModalOpen}
                setIsModalOpen={setIsUserModalOpen}
            />

        </div>
    );
}

export default Home;