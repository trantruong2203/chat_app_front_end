import { Layout } from 'antd';
import Navbar from '../components/Navbar';
import Main from '../components/Main';
import RecentChats from '../components/RecentChats';

function Home() {
    return (
        <Layout style={{ height: '100vh', overflow: 'hidden' }}>
            <Layout style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
                <Navbar />
                <RecentChats />
                <Main />
            </Layout>
        </Layout>
    );
}

export default Home;