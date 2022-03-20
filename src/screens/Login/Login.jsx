import React, { useRef, useState, useEffect } from 'react'
import AuthWrapper from '../../layouts/AuthWrapper/AuthWrapper'
import { BsFillExclamationOctagonFill, BsCheck, BsX } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

import axios from '../../api/axios'

const USER_REGEX = /^[a-zA-Z][A-Za-z0-9-_]{2,23}$/;
const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();
    const [username, setUsername] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(username);
        console.log(result)
        console.log(username)
        setValidName(result)
    }, [username])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result)
        console.log(pwd)
        setValidPwd(result)
    }, [pwd])

    useEffect(() => {
        setErrMsg('')
    }, [username, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(username)
        const v2 = PWD_REGEX.test(pwd)
        if (!v1 || !v2) {
            setErrMsg("invalid Entry");
            return;
        }
        try {
            const response = await axios.post('/api/auth/login',
                JSON.stringify({ username, password: pwd }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(response.data)
            const token = response.data.data;
            localStorage.setItem("userToken", token);
            navigate("/")
            console.log(JSON.stingify(response))
            setSuccess(true)
        } catch (error) {
            if (!error?.response) {
                setErrMsg('No Server Response')
            } else if (error.response?.status === 409) {
                setErrMsg('Username Taken')
            } else {
                setErrMsg('Login Failed')
            }
            // errRef.current.focus();
        }
        // console.log(username, pwd, email, phone);
        setSuccess(true)
    }

    return (
        <AuthWrapper>
            <section>
                <a href="/">Home</a>
                <p ref={errRef} className="my-2">{errMsg}</p>
                <p>{success}</p>
                <form onSubmit={handleSubmit}>
                    <h3 className='text-center'>Log In</h3>
                    <div className="mb-3">
                        <label htmlFor="userName" className="form-label">Username
                            <span className={validName ? "valid" : "hide"}>
                                <BsCheck className='valid-icon' />
                            </span> <span className={(validName || !username) ? "hide" : "invalid"}>
                                <BsX className='invalid-icon' />
                            </span>
                        </label>
                        <input type="text" className="form-control" id="userName" placeholder="John" ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUsername(e.target.value)}
                            aria-invalid={validName ? "false" : "true"}
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <div className={userFocus && username && !validName ? "instructions info-box" : "offscreen info-box"}>
                            <small id="uidnote">
                                <BsFillExclamationOctagonFill className='me-2' />
                                4 to 24 characters.<br />
                                Must begin with a letter. <br />
                                Letters, numbers, underscores, hyphens are allowed.
                            </small>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password
                            <span className={validPwd ? "valid" : "hide"}>
                                <BsCheck className='valid-icon' />
                            </span> <span className={(validPwd || !pwd) ? "hide" : "invalid"}>
                                <BsX className='invalid-icon' />
                            </span>
                        </label>
                        <input type="password" className="form-control" id="exampleFormControlInput1" placeholder="password"
                            onChange={(e) => setPwd(e.currentTarget.value)}
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <div className={pwdFocus && !validPwd ? "instructions info-box" : "offscreen info-box"}>
                            <small id="pwdnote">
                                <BsFillExclamationOctagonFill className='me-2' />
                                8 to 24 characters.<br />
                                Must include uppercase and lowercase, a numbber and a special character. <br />
                                Allowed characters.
                            </small>
                        </div>
                    </div>
                    <button className="btn btn-primary" disabled={!validName || !validPwd ? true : false}>Submit</button>
                </form>
                <div className="d-flex justify-content-between">
                    <p>Don't have an account?</p>
                    <a href="/sign-up">Sign Up</a>
                </div>
            </section>
        </AuthWrapper>
    )
}

export default Login