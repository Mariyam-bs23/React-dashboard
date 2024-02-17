import { Link } from "react-router-dom"
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import PersonIcon from '@mui/icons-material/Person';

const SideNav = () => {
    const nav_items = [
        {
            icon: <HomeIcon/>,
            title : "Home",
            path : "/dashboard",
        },
        {
            icon: <BarChartIcon/>,
            title : "Analytics",
            path : "/dashboard",
        },
        {
            icon: <PersonIcon/>,
            title : "Account",
            path : "profile",
        },
    ];

    return(
        <div className="h-screen w-52 fixed left-0 inset-y-0 border-r border-slate-400/40">
            <Link className="p-8 border-b border-slate-400/40 block text-center font-bold text-lg" to={"/"}>
                <span>LOGO</span>
            </Link>
            <ul className="px-5">
                {nav_items && nav_items.length > 0 && nav_items.map((value , index) => {
                    return(
                        <li key={index} className="flex items-center gap-2 py-3 px-3 mt-3 transition-all ease-out duration-200 rounded-lg text-slate-800 hover:bg-black hover:text-white">
                            {value.icon}
                            <Link className="block" to={value.path}>{value.title}</Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

 export default SideNav;