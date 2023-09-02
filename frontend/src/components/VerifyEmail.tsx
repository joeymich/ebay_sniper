import { useState } from 'react';
import { CenteredLayout } from '../layouts/CenteredLayout';
import { Link } from 'react-router-dom';

import httpClient from '../httpClient';


export function VerifyEmail() {

    const [verificationCode, setVerificationCode] = useState<string>('');


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log('submit')
        try {
            e.preventDefault();
            setVerificationCode('');
            const resp = await httpClient.post(`/auth/verify/${verificationCode}`)
            const data = await resp.data;
            console.log(data);
        } catch (e: any) {
            if (e.response.status == 401)
                alert('invalid code');
            console.error(e);
        }
    }

    const handleResendCode = async () => {
        console.log('resend code')
        try {
            const resp = await httpClient.get('/auth/resend');
            const data = await resp.data;
            console.log(data);
        } catch (e: any) {
            if (e.response.status == 401)
                alert('must log in');
            console.error(e);
        }
    }

    return (
        <CenteredLayout>
            <div
                className='w-full max-w-sm'
            >
                <form
                    className='bg-white shadow-md border rounded-xl px-8 py-8 mb-4'
                    onSubmit={handleSubmit}
                >
                    <div>
                        <h1
                            className='text-2xl font-bold mb-2'
                        >
                            Verify your email
                        </h1>
                        <p
                            className='text-sm mb-5'
                        >
                            A verification code has been sent to your email. Please enter the code below to continue.
                        </p>
                    </div>
                    <div className='mb-4'>
                        <label
                            className='block text-gray-700 text-sm font-bold mb-2'
                            htmlFor='code'
                        >
                            Verification Code
                        </label>
                        <input
                            className='shadow-sm appearance-none border rounded-xl w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            placeholder='6 digit code'
                            type='text'
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            id='code'
                        />
                    </div>
                    <button
                        className='text-blue-500 hover:text-blue-600 mb-2'
                        type='button'
                        onClick={handleResendCode}
                    >
                        Resend Code
                    </button>
                    <button
                        className='w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-xl focus:outline-none focus:shadow-outline mb-4'
                        type='submit'
                    >
                        Submit
                    </button>
                </form>
            </div>
        </CenteredLayout>
    )
}