import { useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
const ProtectedRoutes = () => {
    const navigate = useNavigate()
    
    
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            navigate('/login', { replace: true })
        }
    },[])
    return <Outlet/>
}

export default ProtectedRoutes;