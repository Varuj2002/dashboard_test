import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import { Link } from "react-router-dom";
import ModalEmail from "./Modal";


const REGISTER_URL = 'https://digitain-coffee-break.herokuapp.com/users/forgot_password';



const ForgotPassword = () => {
    let REGEX_EMAIL = new RegExp('@[digitain]+\.com');
    const userRef = useRef();
    const errRef = useRef();
    const [homeText, setHomeText] = useState('');

    const [validName, setValidName] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
 
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [email, setEmail] = useState('')
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        userRef.current.focus();
    }, [])


    useEffect(()=>{
        setValidEmail(REGEX_EMAIL.test(email))
    }, [email])


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify(
                    {email},
                    ),
                {
                    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true },
                    withCredentials: false
                }
            );
            localStorage.setItem('changePasswordEmal', email);
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
        <ModalEmail setHomeText={setHomeText} openModal={openModal} email={email} setOpenModal={setOpenModal} />
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <div style={{display: 'flex', justifyContent:'center'}}>
                    {!!homeText ? <Link to="/login">{homeText}</Link> : <button onClick={()=>{setOpenModal(true)}}>Write Code</button>}
                    </div>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Forgot Password</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">
                        Email:
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="email"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="uidnote"
                        />
                        <p id="pwdnote" className={"instructions"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must ending @digitain.com.<br />
                        </p>

                        <button disabled={!validEmail ? true : false}>Take Code</button>
                    </form>
                </section>
            )}
        </>
    )
}

export default ForgotPassword