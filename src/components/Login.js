import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import axios from '../api/axios';
const LOGIN_URL = 'https://digitain-coffee-break.herokuapp.com/users/login';

const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/table";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])
    const [isRadio, setIsRadio] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let jobType;
        if(isRadio === 1) {
            jobType = 'CALL'
        }
        if(isRadio === 2) {
            jobType = 'CHAT'
        }
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email: user, password : pwd, jobType }),
                {
                    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true },
                    withCredentials: false
                }
            );
            const accessToken = response?.data?.accessToken;
            localStorage.setItem('accessToken', JSON.stringify(accessToken));
            setUser('');
            setPwd('');
            navigate("/table", { replace: true });
            
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (

        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Email:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <div style={{display: 'flex', alignItems: 'center'}}>
                <label htmlFor="username">Call:</label>
                <input
                type='radio'
                id='radio1'
                style={{marginTop: 20, marginLeft: 10}}
                value='1'
                onChange={(e) => setIsRadio(1)}
                checked={isRadio === 1}
                />
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                <label htmlFor="username">Chat:</label>
                <input
                type='radio'
                style={{marginTop: 20, marginLeft: 10}}
                id='radio2'
                value='1'
                onChange={(e) => setIsRadio(2)}
                checked={isRadio === 2}
                />
                </div>
               
                <button>Sign In</button>
            </form>
            <p>
                Need an Account?<br />
                <span className="line">
                    <Link to="/register">Sign Up</Link>
                </span>
            </p>
            <p>
                <span className="line">
                    <Link to="/forgotPassword">Forgot Password</Link>
                </span>
            </p>
        </section>

    )
}

export default Login