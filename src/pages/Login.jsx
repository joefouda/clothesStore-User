import Login from "../components/Login/Login"
import MainWrapper from "../shared/main-wrapper"

const formStyle = {
        padding: '5vh 2vw',
        width: '50vw',
        margin: 'auto',
        borderRadius: '20px',
        boxShadow: '1px 0px 10px black'
}

const LoginPage = () => {
    return (
        <MainWrapper>
            <div style={formStyle}>
                <Login />
            </div>
        </MainWrapper>
    )
}

export default LoginPage