import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './Firebase';
import { useNavigate } from 'react-router-dom';
import Validation from '../Validation';
import React, { useState } from 'react';
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import './Login.css';

const Login= () => {
    const [value, setValue] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(true); // Added state for isLogin
    const navigate = useNavigate();

    function handleInp(event) {
        const { name, value } = event.target;
        setValue((prevValue) => ({
            ...prevValue,
            [name]: value
        }));
        console.log({ [name]: value }); // Debugging: Check state updates
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async function handleSignIn(event) {
        event.preventDefault();
        setLoading(true);
        try {
            await signIn(value.email, value.password);
            navigate('/Loggedin');
        } catch (error) {
            console.error("Error signing in:", error);
            setError({ firebase: "User not registered. Please sign up first." });
        } finally {
            setLoading(false);
        }
    }

    async function handleSignUp(event) {
        event.preventDefault();
        const errors = Validation(value);
        setError(errors);
        console.log(errors); // Debugging: Check validation errors

        if (!isValidEmail(value.email)) {
            setError((prevError) => ({
                ...prevError,
                email: "Invalid email format"
            }));
            setLoading(false);
            return;
        }

        if (Object.keys(errors).length === 0) {
            setLoading(true);
            try {
                await register(value.email, value.password);
                navigate('/Loggedin');
            } catch (error) {
                console.error("Error registering:", error);
                setError({ firebase: error.message });
            } finally {
                setLoading(false);
            }
        }
    }

    async function signIn(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("Signed in:", userCredential.user);
        } catch (error) {
            console.error("Error signing in:", error);
            throw error;
        }
    }

    async function register(email, password) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("Registered:", userCredential.user);
        } catch (error) {
            console.error("Error registering:", error);
            throw error;
        }
    }

    function togglePasswordVisibility() {
        setShowPassword(!showPassword);
    }

    return (
        <div className='wrapper'>
            <form onSubmit={isLogin ? handleSignIn : handleSignUp}>
                <h1>{isLogin ? 'Login' : 'Register'}</h1>
                <div className='input-box'>
                    <input
                        type="text"
                        name="name"
                        placeholder='Username'
                        aria-label="Username"
                        required
                        onChange={handleInp}
                    />
                    <FaUser className='icon' />
                    {error.name && <p style={{ color: "red" }}>{error.name}</p>}
                </div>

                <div className='input-box'>
                    <input
                        type="email"
                        name="email"
                        placeholder='E-mail'
                        aria-label="E-mail"
                        required
                        onChange={handleInp}
                    />
                    <MdEmail className='icon' />
                    {error.email && <p style={{ color: "red" }}>{error.email}</p>}
                </div>

                <div className='input-box'>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder='Password'
                        aria-label="Password"
                        required
                        onChange={handleInp}
                    />
                    {showPassword ? <FaEyeSlash className='icon' onClick={togglePasswordVisibility} /> : <FaEye className='icon' onClick={togglePasswordVisibility} />}
                    {error.password && <p style={{ color: "red" }}>{error.password}</p>}
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Sign Up'}
                </button>
            </form>
            <div class="appart">
            <button onClick={() => setIsLogin(true)}>Sign In</button>
            <button onClick={() => setIsLogin(false)}>Sign Up</button>
            </div>
            {error.firebase && <p style={{ color: "red" }}>{error.firebase}</p>}
        </div>
    );
};

export default Login;
