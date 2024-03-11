'use client'

// react 
import { useFormState, useFormStatus } from 'react-dom';

// font 
import { lato } from "../ui/fonts";
import LoginForm from '../ui/login-form';
import YouGPTLogo from '../ui/yougpt-logo';



const Page = () => {
    

    return (
        <main className='flex items-center justify-center md:h-screen'>
            <div className='relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32'>
                <div className='flex h-20 w-full items-end rounded-lg  p-3 md:h-36'>
                    <div className='text-white md:w-full'>
                        <YouGPTLogo />
                    </div>
                </div>
                <LoginForm />
            </div>
        </main>
    );
}

export default Page;