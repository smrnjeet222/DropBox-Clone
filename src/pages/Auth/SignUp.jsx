import React, { useRef } from 'react'
import { useAuth } from '~/hooks/AuthContext';
import AuthContainer from '~/container/AuthContainer';
import { Link, useHistory } from 'react-router-dom';

export default function SignUp() {

    const emailRef = useRef();
    const pwdRef = useRef();
    const pwdConfirmRef = useRef();
    const history = useHistory();

    const { signUp } = useAuth();

    const onSubmit = async (e) => {
        e.preventDefault();
        if (pwdRef.current.value === pwdConfirmRef.current.value) {
            try {
                await signUp(emailRef.current.value, pwdRef.current.value)
                await history.push('/')
            } catch (e) {
                console.error(e);
            }
        } else {
            console.error("PASSWORD DOESN'T MATCH");
        }
    };

    return (
        <AuthContainer>
            <div>
                <h3>SignUp </h3>
                <form onSubmit={onSubmit}>
                    <br />
                    <p>Email</p>
                    <input className="my-6 border-2" type="email" ref={emailRef} required />

                    <p>Password</p>
                    <input className="my-6 border-2" type="password" ref={pwdRef} required />

                    <p>Confirm Password</p>
                    <input className="my-6 border-2" type="password" ref={pwdConfirmRef} required />
                    <br />
                    <button type="submit" className="px-4 py-2 text-white bg-green-500" >Sign Up</button>
                </form>
                <br />
            </div>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </AuthContainer>
    )
}
