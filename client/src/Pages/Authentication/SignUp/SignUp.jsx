import React,{useEffect} from 'react'

import {useForm} from 'react-hook-form'
import {useNavigate,Link} from 'react-router-dom'

import './SignUp.scss'
import userAuthStore from '../../../store/useAuth.store';
import Loader from '../../../Components/Loader/Loader';

function SignUp() {

    const { register, handleSubmit, formState: { errors } } = useForm(); // Initialize useForm

    const { register: registerUser, isLoading, error:registrationError ,isAuthenticated } = userAuthStore();

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);
    
    const onSubmit = async(data)=>{

        try {
            await registerUser({
                email: data.email,
                name: data.name,
                password: data.password,
                address: data.address,
                phoneNumber: data.phoneNumber,
            });

        } catch (err) {
            console.error("Error during registration", err);
        }
    }

    return (
        <div className='signUpPageContainer'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    placeholder="Enter your Phone Number"
                    className={`${errors.phoneNumber ? 'border-red-500' : ''}`}
                    {...register('phoneNumber', { required: 'Phone Number is required' })}
                />
                <input
                    type='text'
                    placeholder='Enter your name'
                    className=''
                    {...register('name',{required:'Name is required'})}
                />
                <input
                    type='password'
                    placeholder='Enter your password'
                    className=''
                    {...register('password',{required:'password is required'})}
                />
                <input
                    type='email'
                    placeholder='Enter your email'
                    className=''
                    {...register('email',{required:'email is required'})}
                />
                <input
                    type='text'
                    placeholder='Enter your address'
                    className=''
                    {...register('address',{required:'address is required'})}
                />
                    <button
                        className="bg-red-600 text-white py-3 px-6 custom600:px-3 custom600:py-2 custom600:mt-3 rounded-md mt-6 hover:bg-red-500 transition-colors"
                        type="submit"
                    >
                        Submit
                    </button>
                    <p className='LoginLink'>Already have an account?<Link to="/login"><span className=''> Login</span></Link></p>
            </form>
            {isLoading && (
                    // <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    //     <ClipLoader size={50} color="#ffffff" />
                    //     <p>Registering your account...</p>
                    // </div>
                    <Loader/>
            )}
        </div>
    )
}

export default SignUp
