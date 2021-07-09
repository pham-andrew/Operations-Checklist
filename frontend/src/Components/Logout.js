
import Cookies from "js-cookie";
import { Redirect } from "react-router";

const Logout = () => {
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    const redirectBackHome=()=>{
        setTimeout(redirect, 1000)
    }

    const redirect=()=>{
        return window.location.href = '/login'
    }

    redirectBackHome()

    return(
        <div>
            <p>You have been logged out...</p>
        </div>
    )
}

export default Logout;