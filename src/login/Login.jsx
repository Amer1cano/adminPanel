import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useLoginMutation } from './services/authApi'; // Import your RTK Query hook
import { useDispatch } from 'react-redux';
// import { loginSuccess } from '../../features/auth/authSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLoginMutation } from '../services/adminApi';
import { loginSuccess } from '../features/userSlice';

const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // Use the RTK Query mutation hook
    const [login, { isLoading }] = useLoginMutation();

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const data = await login({ phone_number: phoneNumber, password }).unwrap();
            if (data?.success) {
                dispatch(loginSuccess(data?.data?.tokens?.accessToken?.token));
                toast.success(data?.message);
                navigate("/home");
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            toast.error('Login failed. Please try again.');
            console.error('Login error:', error);
        }
    };

    return (
        <div className="bg-cosmos bg-no-repeat bg-center bg-ful py-20 max-md:bg-none px">
            <div className="m-auto pt-20 w-[30rem] h-[28rem] bg-blue-600 px-10 p-16 rounded-xl">
                <form className="grid grid-cols-1 gap-16" onSubmit={handleLogin}>
                    <input 
                        onChange={(e) => setPhoneNumber(e?.target?.value)}
                        className="outline-none px-6 py-4 rounded-lg text-xl"
                        type="text" 
                        required 
                        placeholder="Number" 
                    />
                    <input 
                        onChange={(e) => setPassword(e?.target?.value)}
                        className="outline-none px-6 py-4 rounded-lg text-xl"
                        type="password" 
                        required 
                        placeholder="Password" 
                    />
                    <button 
                        className="bg-white px-6 py-4 rounded-lg text-xl"
                        type="submit"
                        disabled={isLoading} // Disable button while loading
                    >
                        {isLoading ? 'Loading...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
