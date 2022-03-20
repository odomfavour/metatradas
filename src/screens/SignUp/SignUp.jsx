import React, { useRef, useState, useEffect } from 'react'
import AuthWrapper from '../../layouts/AuthWrapper/AuthWrapper'

import { BsFillExclamationOctagonFill, BsCheck, BsX } from 'react-icons/bs'

import axios from '../../api/axios'


const USER_REGEX = /^[a-zA-Z][A-Za-z0-9-_]{2,23}$/;
const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;

// "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"

const SignUp = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [email, setEmail] = useState('');
  // const [emailFocus, setEmailFocus] = useState(false);

  const [phone, setPhone] = useState('');
  // const [validPhone, setValidPhone] = useState(false);
  // const [phoneFocus, setPhoneFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  // const [success, setSuccess] = useState(false);

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
    const match = pwd === matchPwd
    setValidMatch(match)
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg('')
  }, [username, pwd, matchPwd])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(username)
    const v2 = PWD_REGEX.test(pwd)
    if (!v1 || !v2) {
      setErrMsg("invalid Entry");
      return;
    }
    try {
      const response = await axios.post('/api/auth/register',
        JSON.stringify({ username, password: pwd, email, phone_number: phone }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response)
      window.location.replace('/')

    } catch (error) {
      if (!error?.response) {
        setErrMsg('No Server Response')
      } else if (error.response?.status === 409) {
        setErrMsg('Username Taken')
      } else {
        setErrMsg('Login Failed')
      }
    }
    // console.log(username, pwd, email, phone);
    // setSuccess(true)
  }

  return (
    <AuthWrapper>
      {/* {success ? (
        <section>
          <h1>Success</h1>
          <a href="#sign">Sign In</a>
        </section>
      ) : ""

      } */}
      <section>
        <p ref={errRef} className="my-2">{errMsg}</p>
        <a href="/">Home</a>
        <form onSubmit={handleSubmit}>
          <h3 className='text-center'>Sign Up</h3>

          <div className="mb-3">
            <label htmlFor="userName" className="form-label">Username
              <span className={validName ? "valid" : "hide"}>
                <BsCheck className='valid-icon' />
              </span> <span className={(validName || !username) ? "hide" : "invalid"}>
                <BsX className='invalid-icon' />
              </span>
            </label>
            <input type="text" className="form-control" id="userName" placeholder="John" ref={userRef}
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
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
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
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password
              <span className={validMatch && matchPwd ? "valid" : "hide"}>
                <BsCheck className='valid-icon' />
              </span> <span className={(validMatch || !matchPwd) ? "hide" : "invalid"}>
                <BsX className='invalid-icon' />
              </span>
            </label>
            <input type="password" className="form-control" id="confirmPassword" placeholder="password"
              onChange={(e) => setMatchPwd(e.target.value)}
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <div className={matchFocus && !validMatch ? "instructions info-box" : "offscreen info-box"}>
              <small id="confirmation">
                <BsFillExclamationOctagonFill className='me-2' />
                Must match the first password input field
              </small>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone Number</label>
            <input type="tel" className="form-control" id="phone" placeholder="0806740000"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <button className="btn btn-primary" disabled={!validName || !validPwd || !validMatch || !email || !phone ? true : false}>Submit</button>
        </form>
        <div className="d-flex justify-content-between">
          <p>Already have an account?</p>
          <a href="/login">Log in</a>
        </div>
      </section>
    </AuthWrapper>
  )
}

export default SignUp