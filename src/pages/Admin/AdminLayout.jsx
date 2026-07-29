import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader/AdminHeader";
import AdminSidebar from "./AdminSidebar/AdminSidebar";

export default function AdminLayout({children}){
    return (
        <>
            <AdminSidebar />
            <AdminHeader />
            {children}
        </>
    )
}