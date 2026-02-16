import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
// import { useDispatch, useSelector } from 'react-redux'
// import { setLoading, setUser } from '@/redux/authSlice'
// import { Loader2 } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    // const { loading,user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    // const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            // dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                // dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } 
        // finally {
        //     dispatch(setLoading(false));
        // }
    }

    // useEffect(()=>{
    //     if(user){
    //         navigate("/");
    //     }
    // },[])

    return (
        <div>
            <Navbar />
            {/* <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Login</h1>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            // onChange={changeEventHandler}
                            placeholder="suraj@gmail.com"
                        />
                    </div>

                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            // onChange={changeEventHandler}
                            placeholder="********"
                        />
                    </div>
                    <div className='flex items-center justify-between'>
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    // onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    // onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    {
                        // loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Login</Button>
                        <Button type="submit" className="w-full my-4">Login</Button>
                    }
                    <span className='text-sm'>Don't have an account? <Link to="/signup" className='text-blue-600'>Signup</Link></span>
                </form>
            </div> */}

            <main className="flex items-center justify-center w-full px-4">
                <form onSubmit={submitHandler} className="flex w-full flex-col max-w-96">

                    <svg className="size-10" width="30" height="33" viewBox="0 0 30 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="m8 4.55 6.75 3.884 6.75-3.885M8 27.83v-7.755L1.25 16.19m27 0-6.75 3.885v7.754M1.655 8.658l13.095 7.546 13.095-7.546M14.75 31.25V16.189m13.5 5.976V10.212a2.98 2.98 0 0 0-1.5-2.585L16.25 1.65a3.01 3.01 0 0 0-3 0L2.75 7.627a3 3 0 0 0-1.5 2.585v11.953a2.98 2.98 0 0 0 1.5 2.585l10.5 5.977a3.01 3.01 0 0 0 3 0l10.5-5.977a3 3 0 0 0 1.5-2.585"
                            stroke="#1d293d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
            
                    <h2 className="text-4xl font-medium text-gray-900">Login</h2>
            
                    <p className="mt-4 text-base text-gray-500/90">
                        Please enter email, password and role to access.
                    </p>
            
                    <div className="mt-10">
                        <label className="font-medium">Email</label>
                        <input
                            className="mt-2 rounded-md ring ring-gray-200 focus:ring-2 focus:ring-primary outline-none px-3 py-3 w-full"
                            required
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="Please enter your email"
                        />
                    </div>
            
                    <div className="mt-6">
                        <label className="font-medium">Password</label>
                        <input
                            placeholder="Please enter your password"
                            className="mt-2 rounded-md ring ring-gray-200 focus:ring-2 focus:ring-primary outline-none px-3 py-3 w-full"
                            required
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                        />
                    </div>
                    
                    <div className="mt-6">
                        <label className="font-medium">Role</label>

                        <RadioGroup className="flex items-center gap-4 mt-2">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer accent-primary"
                                />
                                <Label className="font-medium text-md" htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer accent-primary"
                                />
                                <Label className="font-medium text-md" htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                        
                    </div>
            
                    <button
                        type="submit"
                        className="mt-8 py-3 w-full cursor-pointer rounded-md bg-primary text-white transition hover:bg-primary-foreground"
                    >
                        Login
                    </button>
                    <p className='text-center py-8'>
                        Don't have an account? <Link to="/signup" className="text-primary hover:underline">Sign up</Link>
                    </p>
                </form>
            </main>
        </div>
    )
}

export default Login