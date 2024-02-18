import { useState , useEffect } from "react";
import axios from "axios";

const ProfilePage = () => {
    const [user, setUser] = useState(null);

    useEffect(()=>{
        let USER_TOKEN = sessionStorage.getItem("token") ? JSON.parse(sessionStorage.getItem("token")) : undefined;
        console.log(USER_TOKEN)
        const AuthStr = "Bearer " + USER_TOKEN; 
        axios.get("https://dummyjson.com/auth/me", { headers: { Authorization: AuthStr } })
         .then(response => {
            console.log(response.data !== undefined)
             setUser(response.data)
          })
         .catch((error) => {
             console.log('error ' , error);
          });
    },[])

    return(
        <div className="pl-52">
        {user  ? 
         <div className="px-8 mt-8 grid grid-cols-12 gap-8">
         <div className="col-span-6">
             <div className="rounded-lg border border-gray-400/40 shadow-md">
                 <div className="font-bold text-xl text-slate-700 bg-gray-300/10 h-32 p-6">
                     <h2>Your Profile</h2>
                 </div>
                 <div className="p-6"> 
                     <img className="w-40 rounded-full border border-gray-400 -mt-20" src={user.image}/>
                     <h3 className="mt-6 font-medium uppercase text-gray-600">{user.firstName} {user.lastName}</h3>
                     <p className="text-md mt-2 text-gray-600">{user.age} years old</p>
                     <p className="text-md mt-2 text-gray-400">{user.phone}</p>
                 </div>
             </div>
             <div className="rounded-lg border border-gray-400/40 shadow-md mt-6">
                 <div className="font-bold text-xl text-slate-700 bg-gray-300/10 px-6 py-6">
                     <h2>Email</h2>
                 </div>
                 <div className="p-6"> 
                     <h3 className="font-medium text-gray-600">{user.email}</h3>
                 </div>
             </div>
             
         </div>
         <div className="col-span-6">
             <div className="rounded-lg border border-gray-400/40 shadow-md">
                 <div className="font-bold text-xl text-slate-700 bg-gray-300/10 px-6 py-6">
                     <h2>Bank</h2>
                 </div>
                 <div className="py-6 px-8"> 
                     <h3 className="font-medium text-gray-600 uppercase">Card No : <span className="font-normal">{user.bank.cardNumber}</span></h3>
                     <h3 className="font-medium text-gray-600 uppercase mt-3">Card Type : <span className="font-normal">{user.bank.cardType}</span></h3>
                     <h3 className="font-medium text-gray-600 uppercase mt-3">Currency : <span className="font-normal">{user.bank.currency}</span></h3>
                     <h3 className="font-medium text-gray-600 uppercase mt-3">Expiry : <span className="font-normal">{user.bank.cardExpire}</span></h3>
                 </div>
             </div>
             <div className="rounded-lg border border-gray-400/40 shadow-md mt-6">
                 <div className="font-bold text-xl text-slate-700 bg-gray-300/10 px-6 py-6">
                     <h2>Address</h2>
                 </div>
                 <div className="py-6 px-8 "> 
                     <h3 className="font-medium text-gray-600 uppercase">Area : <span className="font-normal capitalize">{user.address.address}</span></h3>
                     <h3 className="font-medium text-gray-600 uppercase mt-3">State : <span className="font-normal capitalize">{user.address.state}</span></h3>
                     <h3 className="font-medium text-gray-600 uppercase mt-3">City : <span className="font-normal capitalize">{user.address.city}</span></h3>
                     <h3 className="font-medium text-gray-600 uppercase mt-3">Postal Code : <span className="font-normal capitalize">{user.address.postalCode}</span></h3>
                 </div>
             </div>
         </div>
        </div>
        : <h2 className="px-8">No user to show</h2>}
       
    </div>
    )
}

export default ProfilePage;