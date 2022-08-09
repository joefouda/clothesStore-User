import './UserProfile.css'
import MainWrapper from "../../shared/main-wrapper"
import ProfileInfo from './ProfileInfo/ProfileInfo'
import ProfilePayment from './ProfilePayment/ProfilePayment'
import ProfileOrders from './ProfileOrders/ProfileOrders'
import ProfileFavorites from './ProfileFavorites/ProfileFavorites'
import axios from 'axios'
import { Layout, Menu } from 'antd';
import { UserOutlined, HeartOutlined, UnorderedListOutlined, DollarCircleOutlined } from '@ant-design/icons';
import { useState, useEffect, useContext } from 'react'
import { DispatchUserContext } from '../../contexts/userContext'
const { Content, Sider } = Layout

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem('Personal Info', 'Personal Info', <UserOutlined />),
    getItem('Orders', 'Orders', <UnorderedListOutlined />),
    getItem('Favorites', 'Favorites', <HeartOutlined />),
    getItem('Payment Methods', 'Payment Methods', <DollarCircleOutlined />),
];

const UserProfile = () => {
    const dispatchUser = useContext(DispatchUserContext)
    const [selectedKey, setSelectedKey] = useState('')
    const handleClick = (e) => {
        setSelectedKey(e.key)
    }

    useEffect(()=>{
        console.log('triggered')
        axios.get('http://localhost:3000/api/v1/user/id', {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        }).then(res => {
            dispatchUser({ type: 'SET', user: res.data.user })
            setSelectedKey('Orders')
        })
    },[])
    return (
        <MainWrapper>
            <Layout>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                >
                    <Menu
                        className='profile-nav'
                        onClick={handleClick}
                        mode="inline"
                        defaultSelectedKeys={[selectedKey]}
                        items={items}
                    />
                </Sider>
                <Layout>
                    <Content
                        style={{
                            margin: '24px 16px',
                        }}
                    >
                        <div
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                height: '70vh',
                            }}
                        >
                            {selectedKey === 'Personal Info'?<ProfileInfo />:selectedKey === 'Orders'?<ProfileOrders />:selectedKey === 'Favorites'?<ProfileFavorites />:<ProfilePayment />}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </MainWrapper>
    )
}

export default UserProfile