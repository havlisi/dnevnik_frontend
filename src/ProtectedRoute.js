import { Fragment, useEffect, useState } from "react";
import { get_login } from "./login_logic";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const [isLoggedUser, setLoggedUser] = useState(false);
    const navigate = useNavigate();
    
    const checkUser = () => {
        const user = get_login();
        if(!user || user === undefined){
            setLoggedUser(false);
            navigate('/error');
        }
        setLoggedUser(true);
    }

    useEffect(() => {
        checkUser();
    }, [isLoggedUser])

    return <Fragment>
        {isLoggedUser ? children : null}
    </Fragment>
}

export default ProtectedRoute;