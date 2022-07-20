import { createContext } from "react"
import  { notification } from 'antd'

export const NotificationContext = createContext([])

const openNotification = (status, message) => {
    switch(status){
        case 'error':
            notification.error({
                message,
                placement: 'bottomLeft'
            });
            break;
        case 'success':
            notification.success({
                message,
                placement: 'bottomLeft'
            });
            break;
    }
    
};

const NotificationProvider = (props) => {
    return (
        <NotificationContext.Provider value={{openNotification}}>{props.children}</NotificationContext.Provider>
    )
}

export default NotificationProvider