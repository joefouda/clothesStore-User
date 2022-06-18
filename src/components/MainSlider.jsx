import { Carousel } from 'antd';
import img1 from '../assets/1.jpg'
import img2 from '../assets/2.jpg'



const contentStyle = {
    height:'90vh',
    color: '#fff',
    textAlign: 'center',
    backgroundSize: 'cover',
    lineHeight:'8rem',
    fontSize:'10rem',
    fontFamily:'Sans-serif',
    color:'white',
    display:'flex'
};

const textWrapper = {
    width:'65vw',
    margin: '0 auto',
    alignSelf:'center',
    textShadow: '2px 2px 5px grey'
};

const subText = {
    fontSize:'8rem',
};
const MainSlider = () => (
    <Carousel effect='fade' autoplay autoplaySpeed={2000} dots={false}>
        <div>
            <div style={{...contentStyle,backgroundImage:`url(${img1})`}}>
                <div style={textWrapper}>
                    <span>Shop Online</span><br /><span style={subText}>Save your Time</span>
                </div>
            </div>
        </div>
        <div>
        <div style={{...contentStyle,backgroundImage:`url(${img2})`}}>
                <div style={textWrapper}>
                    <span>Shop Online</span><br /><span style={subText}>Save your Time</span>
                </div>
            </div>
        </div>
    </Carousel>
);

export default MainSlider