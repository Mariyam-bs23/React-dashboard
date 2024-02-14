import { Link } from "react-router-dom"

const SideNav = () => {
    const nav_items = [
        {
            title : "Home",
            path : "/",
        },
        {
            title : "Analytics",
            path : "/",
        },
        {
            title : "Settings",
            path : "/",
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
                        <li key={index} className="py-3 px-3 mt-3 transition-all ease-out duration-200 rounded-lg text-slate-800 hover:bg-black hover:text-white">
                            <Link className="block" to={value.path}>{value.title}</Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

 export default SideNav;