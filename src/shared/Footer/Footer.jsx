import './Footer.css'
import { Layout } from 'antd';
import { InstagramOutlined, FacebookOutlined, WhatsAppOutlined  } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
const { Footer } = Layout;

const MainFooter = ()=> {
    const navigate = useNavigate()
    return (
        <Footer style={{ textAlign: 'center' }}>
            <div className='footer-icons-container'>
                <a className='footer-icon' href="https://instagram.com/butron.eg?igshid=YmMyMTA2M2Y=" target='_blank'><InstagramOutlined/></a>
                <a className='footer-icon' href="https://www.facebook.com/Butron-103517865190017" target='_blank'><FacebookOutlined /></a>
                <a className='footer-icon' href="https://wa.me/201270777325" target='_blank'><WhatsAppOutlined/></a>
            </div>
            <p>BUTRO'N ©2022 Created by joeFouda</p>
        </Footer>
    )
}

export default MainFooter