import { useLocation } from "react-router-dom";

const MayRender = (props)=> {
    const {pathname} = useLocation()
    return (<>{pathname !== '/404'?props.children:''}</>)
}

export default MayRender