import './Footer.css'
import { Button, Layout } from 'antd';
import { InstagramOutlined, FacebookOutlined, WhatsAppOutlined  } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom';
import { FormOutlined, PhoneOutlined } from '@ant-design/icons'
import payment1 from '../../assets/payment1.jpeg'
import payment2 from '../../assets/payment2.jpeg'
import payment3 from '../../assets/payment3.jpeg'

const { Footer } = Layout;

const MainFooter = ()=> {
    const navigate = useNavigate()
    return (
        <div className='footer-container'>
            <div className='payment-section'>
                <div className="payment-photos">
                    <img src={payment1} className="payment-photo"/>
                    <img src={payment2} className="payment-photo"/>
                    <img src={payment3} className="payment-photo"/>
                </div>
            </div>
            <Footer>
                <div className='links-section'>
                    <div className="chunk">
                        <h4>Shop</h4>
                        <ul className='chunk-list'>
                            <li><Link to='#'>MEN</Link></li>
                            <li><Link to='#'>SALE</Link></li>
                            <li><Link to='#'>CAREER</Link></li>
                            <li><Link to='#'>LOCATION</Link></li>
                        </ul>
                    </div>
                    <div className="chunk">
                        <h4>ABOUT &amp; MORE</h4>
                        <ul className='chunk-list'>
                            <li><Link to='/about'>ABOUT US</Link></li>
                            <li><Link to='#'>ORDER STATUS</Link></li>
                            <li><Link to='#'>CONTACT US</Link></li>
                            <li><Link to='#'>DEVELOPMENT</Link></li>
                        </ul>
                    </div>
                    <div className="chunk">
                        <h4>COMPANY</h4>
                        <ul className='chunk-list'>
                            <li><Link to='#'>SHIPPING &amp; RETURNS</Link></li>
                            <li><Link to='#'>PRIVACY POLICY</Link></li>
                            <li><Link to='#'>TERMS OF SERVICES</Link></li>
                            <li><Link to='#'>DEVELOPMENT</Link></li>
                        </ul>
                    </div>
                    <div className="chunk">
                        <h4>JOIN US</h4>
                        <p>Sign up now and get 10%</p>
                        <Button className='signup-signup-button' icon={<FormOutlined />} onClick={()=> navigate('signup')}>Sign up</Button>
                        <br /><br />
                        <h4>CUSTOMER SERVICE</h4>
                        <p><PhoneOutlined /> +201030078088</p>
                    </div>
                </div>
                <div className='footer-icons-container'>
                    <a className='footer-icon' href="https://instagram.com/butron.eg?igshid=YmMyMTA2M2Y=" target='_blank'><InstagramOutlined/></a>
                    <a className='footer-icon' href="https://www.facebook.com/Butron-103517865190017" target='_blank'><FacebookOutlined /></a>
                    <a className='footer-icon' href="https://wa.me/201270777325" target='_blank'><WhatsAppOutlined/></a>
                </div>
                <p className='copyright-text'>
                    © BUTRON's business concept is to offer fashion and quality at the best price in a sustainable way.
                    BUTRON has since it was founded in 2020 grown into one of the world's leading fashion companies. The
                    content of this site is copyright-protected and is the property of BUTRON
                </p>
                <p style={{textAlign:'center'}}>BUTRON ©2022</p>
            </Footer>
        </div>
    )
}

export default MainFooter