import { Navigate } from "react-router";

const AuthAlert = ({data}) => {
    alert(data)
    return (
        <div>
            <Navigate to="/" />
        </div>
    );
};

export default AuthAlert;