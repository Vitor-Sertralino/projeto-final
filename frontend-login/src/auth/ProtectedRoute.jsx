import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectRoute() {
    const { isAuth } = useAuth()
    return isAuth ? <Outlet /> : <Navigate to="/" replace />
}