import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const PrivateRoutes = () => {
    const inAuthenticated = useSelector((state) => state.auth.user)
    return(
        inAuthenticated ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateRoutes