import Login from "../components/Login/Login"
import MainWrapper from "../shared/main-wrapper"
import FormWrapper from "../shared/form.wrapper/form.wrapper"

const LoginPage = () => {
    return (
        <MainWrapper>
            <FormWrapper>
                <Login />
            </FormWrapper>
        </MainWrapper>
    )
}

export default LoginPage