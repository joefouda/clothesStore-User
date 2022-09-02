import './About.css'
import aboutName from '../../assets/about_name.jpeg'
import aboutJob from '../../assets/about_job.jpeg'

const About = ()=> {
    return (
        <div className="about-container">
            <div className="name-section">
                <div>
                    <h2 className='about-heading'>ABOUT BUTRON</h2>
                    <p className="about-paragraph">
                    <span className='special-word'>BUTRON</span> THIS IS A NAME INSPIRED
                    BY THE WORD <span className='special-word'>PATRON</span> OR <span className='special-word'>ORNIC</span> WHICH IS A MODEL FOR THE PIECE
                    TO BE EXECUTED FROM THE CLOTH
                    <br /><br />
                    WHAT IS A PATTERN / PATRON?<br />
                    THE PATTERN
                    IS AN AREA OF PAPER ON WHICH THE SHAPE OF THE BODY IS DRAWN IN THREE DIMENSIONS, ACCORDING TO THE DIMENSIONS OF THE BODY, TO IMPLEMENT A PIECE .
                    </p>
                </div>
                <img src={aboutName} className="name-section-photo"/>
            </div>
            <div className="job-section">
                <img src={aboutJob} className="job-section-photo"/>
                <div>
                    <h2 className='about-heading'>OUR JOB</h2>
                    <p className="about-paragraph">
                    WE ALWAYS STRIVE TO PROVIDE THE BEST 
                    SUSTAINABLE FASHION FOR OUR CUSTOMERS. 
                    TO ACHIEVE SUCCESS,
                    WE ARE ALWAYS KEEN TO CREATE A BETTER FUTURE
                    </p>
                </div>
            </div>
            <div className="fashion-section">
                <h2 className='about-heading'>FOR FASHION</h2>
                <p>
                ALL OF US AT BUTRON SHARE A VALUES-BASED WAY OF WORKING, WITH RESPECT FOR THE CUSTOMER FUNDAMENTALLY
                . OUR SHARED VALUES INCLUDE HELPING TO CREATE A CORPORATE CULTURE THAT IS OPEN, DYNAMIC, ACCESSIBLE AND ACCESSIBLE TO ALL.
                </p>
            </div>
        </div>
    )
}

export default About