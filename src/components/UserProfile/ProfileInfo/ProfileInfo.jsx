import './ProfileInfo.css'
import EditInfoForm from '../../Forms/EditInfoForm/EditInfoForm'
import useToggle from '../../../hooks/useToggleState'
import { Button, Divider } from 'antd'
import { UserContext } from '../../../contexts/userContext'
import { useContext } from 'react'

const ProfileInfo = () => {
    const user = useContext(UserContext)
    const [editMode, toggleEditMode] = useToggle(false)
    return (
        editMode?<EditInfoForm toggleEditMode={toggleEditMode} />:
        <div className='profileinfo-container'>
            <h1>Name : {user.name}</h1>
            <Divider />
            <h1>Email : {user.email}</h1>
            <Divider />
            <h1>Phone : {user.phone}</h1>
            <Divider />
            <h1>Address : {user.address.country} / {user.address.province} / {user.address.street} / {user.address.details}</h1>
            <div className='profile-address-actions-container'>
                <Button className='profile-address-edit-button' onClick={toggleEditMode}>Edit</Button>
            </div>
        </div>
    )
}

export default ProfileInfo