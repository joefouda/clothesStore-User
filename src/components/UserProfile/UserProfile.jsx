import './UserProfile.css'
import MainWrapper from "../../shared/main-wrapper"
import ProfileInfo from './ProfileInfo/ProfileInfo'
import ProfilePayment from './ProfilePayment/ProfilePayment'
import ProfileOrders from './ProfileOrders/ProfileOrders'
import ProfileFavorites from './ProfileFavorites/ProfileFavorites'
import React, { useState } from "react"
import { Layout, Menu } from 'antd';
import { UserOutlined, HeartOutlined, UnorderedListOutlined, DollarCircleOutlined } from '@ant-design/icons';
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
    const [selectedKey, setSelectedKey] = useState('Orders')
    const handleClick = (e) => {
        setSelectedKey(e.key)
    }
    return (
        <MainWrapper>
            <Layout>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={(broken) => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}
                >
                    <Menu
                        className='profile-nav'
                        onClick={handleClick}
                        theme="dark"
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