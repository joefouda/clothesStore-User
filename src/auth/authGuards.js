import { Outlet, Navigate, useLocation } from 'react-router-dom';
import Authentication from './authentication';

export const LogOutGuard = () => {
    return (!Authentication.isAuthinticated()) ? <Outlet /> : <Navigate to="/" />
}

export const LogInGuard = () => {
    const location = useLocation()
    return Authentication.isAuthinticated() ? <Outlet /> : <Navigate to="/login" replace state={{from:location}}/>
}

export const Redirect = () => {
    return <Navigate to="/404" />
}