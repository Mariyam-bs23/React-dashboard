import FormCmp from "../components/form";
import { InputField, PassWordField } from "../components/form-field";
import { useNavigate } from "react-router-dom";
import axiosinstance from "../utils/axiosinstance";
import { authUtils } from "../utils/authUtils";

const LoginPage = () => {
    const navigate = useNavigate(); 

    const onSubmit = async (data) => {
        try {
            const response = await axiosinstance.post('/auth/signin', data);
            
            // Use authUtils to handle login response
            if (authUtils.handleLoginResponse(response)) {
                navigate('/dashboard');
            }
            
        } catch (error) {
            console.error('Login error:', error);
        } 
    };

    return(
        <div className="bg-black/75 h-screen flex items-center justify-center">
            <FormCmp customClass="bg-white rounded-xl flex flex-col p-10" onSubmit={onSubmit}>
                <InputField placeholder="Username" customClass="w-26 p-4" name="username"/>
                <PassWordField placeholder="Password" customClass={`w-26 mt-4 p-4 outline-0 `} name="password"/>
                <button type="submit" className="px-6 py-4 bg-black rounded-md text-white mt-6">LOGIN</button>
            </FormCmp>
        </div>
    )
}

export default LoginPage;