import FormCmp from "../components/form";
import { EmailField, PassWordField } from "../components/form-field";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate(); 
    const loginCredential = {
        email : 'mariam@bs23.com',
        password : '12345'
    }
    const onSubmit = (data) => {
        
        if(JSON.stringify(data) === JSON.stringify(loginCredential)){
            console.log(data)
            sessionStorage.setItem("user",  JSON.stringify({...data, name : "Mariam"}));
            navigate('dashboard');
        } else alert("Please provide your valid credentials")
    };

    return(
        <div className="bg-black/75 h-screen flex items-center justify-center">
            <FormCmp customClass="bg-white rounded-xl flex flex-col p-10" onSubmit={onSubmit}>
                <EmailField customClass="w-26 p-4"  name="email"/>
                <PassWordField customClass={`w-26 mt-4 p-4 outline-0 `} name="password"/>
                <button className="px-6 py-4 bg-black rounded-md text-white mt-6">LOGIN</button>
            </FormCmp>
        </div>
    )
}

export default LoginPage;