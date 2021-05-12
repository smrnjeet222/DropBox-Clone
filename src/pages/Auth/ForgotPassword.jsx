import React, { useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContainer from '~/container/AuthContainer';
import { useAuth } from '~/hooks/AuthContext';


export default function ForgotPassword() {

    const emailRef = useRef();
    const { resetPassword } = useAuth();


    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await resetPassword(emailRef.current.value);
            console.log("Email Sent");
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <AuthContainer>
            <div>
                <h3>Forgot Password </h3>
                <form onSubmit={onSubmit}>
                    <br />
                    <p>Email</p>
                    <input className="my-6 border-2" type="email" ref={emailRef} required />

                    <br />
                    <button type="submit" className="px-4 py-2 text-white bg-green-500" >Reset Password</button>
                </form>
                <br />
                <br />
                <Link to="/login">Back to Login</Link>
                <br />
                <br />
            </div>
            <p>Need an account? <Link to="/sign-up">SignUp</Link></p>

        </AuthContainer>
    )
}
