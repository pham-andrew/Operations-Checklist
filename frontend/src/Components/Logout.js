
import Cookies from "js-cookie";
import { Redirect } from "react-router";

const Logout = () => {
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    return(
        <div>
            <p>You have been logged out...</p>
        </div>
    )
}

export default Logout;