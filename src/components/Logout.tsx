import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    useEffect(() => {
        logout();
        navigate("/login");
    }, []);

    return (<></>);
}

export default Logout;