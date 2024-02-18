import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Avatar from 'react-avatar';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [showAccountDropdown, setAccountDropdown] = useState(false);
    const [user, setUser] = useState({});
    const navigate = useNavigate(); 

    useEffect(()=>{
        let USER_TOKEN = sessionStorage.getItem("token") ? JSON.parse(sessionStorage.getItem("token")) : undefined;
        const AuthStr = "Bearer " + USER_TOKEN; 
        axios.get("https://dummyjson.com/auth/me", { headers: { Authorization: AuthStr } })
         .then(response => {
             setUser({...response.data})
          })
         .catch((error) => {
             console.log('error ' + error);
          });
    },[])

    const handleSearch = () => {
        setShowSearch(!showSearch);
    }
    const handleSearchInput = (e) => {
      
    }
    const handleAccount = () =>{
        setAccountDropdown(!showAccountDropdown);
    }
    const handleLogout = () => {
        let USER_TOKEN = sessionStorage.getItem("token") ? JSON.parse(sessionStorage.getItem("token")) : undefined;

       if(USER_TOKEN){
           sessionStorage.removeItem("token");
       }
       navigate('/login');
    }

    window.addEventListener("click" , e => {
        if(!e.target.classList.contains("header-searchbar") && !e.target.classList.contains("header-search-icon")){
            setShowSearch(false);
        }
        if(!e.target.classList.contains("avatar") ){
            setAccountDropdown(false);
        }
    });

    return(
        <div className="px-8 py-10 flex items-center">
            <h3>Hello {user.firstName}!</h3>
            <div className='flex items-center ml-auto mr-6'>
                <SearchIcon 
                onClick={e => handleSearch(e)}
                className={`header-search-icon rounded-full border border-slate-400/30 text-slate-800 !w-12 !h-12 flex-none p-3 cursor-pointer ${showSearch ? '!hidden' : ''}`}/>
                <input 
                onChange={e => handleSearchInput(e)}
                className={`header-searchbar rounded-3xl border h-12 border-slate-400/30 p-4 text-slate-700 outline-0 ${showSearch ? '' : 'hidden'}`} placeholder='Search'/>
            </div>
            <div className='relative mr-6'>
                <NotificationsNoneIcon
                className={`header-search-icon rounded-full border border-slate-400/30 text-slate-800 !w-12 !h-12 flex-none p-3 cursor-pointer ${showNotification ? '!hidden' : ''}`}/>
                <ul className={`absolute hidden`}>
                </ul>
            </div>
            <div className='pl-4 border-l border-slate-400/50'>
                <Avatar 
                name={`${!user.image ? `${user.firstName} ${user.lastName}` : ''}`}
                src={`${user.image ? user.image : ''}`}
                onClick={handleAccount}
                className='avatar bg-purple-700 cursor-pointer text-white rounded-full flex justify-center items-center flex-none w-10 h-10' unstyled={true}/>
                <ul className={`absolute mt-4 right-8 shadow-md rounded-lg border border-slate-400/20 p-4 min-w-44 ${showAccountDropdown ? '' : 'hidden'}`}>
                    <li className='p-1 '>
                        <Link to={'profile'} className='px-2 py-3 pb-4 rounded-lg hover:bg-slate-400/10 block border-b border-slate-400/40'>Profile</Link>
                    </li>
                    <li
                    onClick={handleLogout} 
                    className='bg-black px-4 py-3 mt-4 text-white cursor-pointer text-center rounded-lg'>Logout</li>
                </ul>
            </div>
        </div>
    )
}

export default Header;