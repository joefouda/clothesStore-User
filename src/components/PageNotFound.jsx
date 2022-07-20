import { useNavigate } from 'react-router-dom';
import { Button, Result } from 'antd';
import MainWrapper from '../shared/main-wrapper';

const PageNotFound = () => {
    const navigate = useNavigate()
    return (
        <MainWrapper>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary" onClick={()=> navigate('/')}>Back Home</Button>}
            />
        </MainWrapper>
    )
}

export default PageNotFound;