import FormCmp from "../components/form";
import { InputField, PassWordField } from "../components/form-field";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
    
    const navigate = useNavigate(); 

    const onSubmit = (data) => {
        axios.post("https://dummyjson.com/auth/login", data)
        .then(response => {
            sessionStorage.setItem("token",  JSON.stringify(response.data.token));
            navigate('/dashboard');
        })
        .catch(error => console.log(error))
    };

    return(
        <div className="bg-black/75 h-screen flex items-center justify-center">
            <FormCmp customClass="bg-white rounded-xl flex flex-col p-10" onSubmit={onSubmit}>
                <InputField placeholder="Username" customClass="w-26 p-4" name="username"/>
                <PassWordField placeholder="Password" customClass={`w-26 mt-4 p-4 outline-0 `} name="password"/>
                <button className="px-6 py-4 bg-black rounded-md text-white mt-6">LOGIN</button>
            </FormCmp>
        </div>
    )
}

export default LoginPage;