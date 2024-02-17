import { Outlet } from "react-router-dom";
import Header from "../components/header";
import SideNav from "../components/side-nav";

const DashboardLayout = () => {
    return(
        <>
            <SideNav/>
            <div className="pl-52"> 
                <Header/>
            </div>
            <Outlet/>
        </>
    )
}

export default DashboardLayout;