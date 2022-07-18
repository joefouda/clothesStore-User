import { createContext } from "react"
import  { notification } from 'antd'

export const NotificationContext = createContext([])

const openNotification = (status, message) => {
    console.log(status, message)
    switch(status){
        case 'error':
            notification.error({
                message,
                placement: 'topLeft'
            });
        case 'success':
            notification.success({
                message,
                placement: 'bottomLeft'
            });
    }
    
};

const NotificationProvider = (props) => {
    return (
        <NotificationContext.Provider value={{openNotification}}>{props.children}</NotificationContext.Provider>
    )
}

export default NotificationProvider