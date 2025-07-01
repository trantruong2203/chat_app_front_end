import { Layout } from 'antd';
import Navbar from '../components/Navbar';
import Main from '../components/Main';
import RecentChats from '../components/RecentChats';

function Home() {
    return (
        <Layout style={{ maxHeight: '100vh' }}>
            <Navbar />
            <Layout style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
                <RecentChats />
                <Main />
            </Layout>
        </Layout>
    );
}

export default Home;