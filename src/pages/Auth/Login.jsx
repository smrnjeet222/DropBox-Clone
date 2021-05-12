import React, { useRef } from 'react'
import { useAuth } from '~/hooks/AuthContext';
import AuthContainer from '~/container/AuthContainer';
import { Link, useHistory } from 'react-router-dom';

export default function Login() {

    const emailRef = useRef();
    const pwdRef = useRef();
    const history = useHistory();

    const { login } = useAuth();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(emailRef.current.value, pwdRef.current.value)
            await history.push('/')
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <AuthContainer>
            <div>
                <h3>Login </h3>
                <form onSubmit={onSubmit}>
                    <br />
                    <p>Email</p>
                    <input className="my-6 border-2" type="email" ref={emailRef} required />

                    <p>Password</p>
                    <input className="my-6 border-2" type="password" ref={pwdRef} required />

                    <br />
                    <button type="submit" className="px-4 py-2 text-white bg-green-500" >Log In</button>
                </form>
                <br />
                <br />
                <Link to="/forgot-password">Forgot Password?</Link>
                <br />
                <br />
            </div>
            <p>Need an account? <Link to="/sign-up">SignUp</Link></p>
        </AuthContainer>
    )
}
