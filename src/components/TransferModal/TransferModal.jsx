import React, { useState, useEffect, useRef } from 'react'
import { Modal } from 'react-bootstrap'
import axios from '../../api/axios'
import { BsFillExclamationOctagonFill, BsCheck, BsX } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

const USER_REGEX = /^[a-zA-Z][A-Za-z0-9-_]{2,23}$/;

const TransferModal = ({ show, handleClose }) => {
    const userRef = useRef();
    const [username, setUsername] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [amount, setAmount] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const result = USER_REGEX.test(username);
        console.log(result)
        console.log(username)
        setValidName(result)
    }, [username])

    const handleSubmit = async (e) => {
        const token = localStorage.getItem('userToken');
        e.preventDefault();
        const v1 = USER_REGEX.test(username)
        if (!v1 || !amount) {
            setErrMsg("invalid Entry");
            return;
        }
        if (token) {
            console.log(username, amount)
            try {
                const response = await axios.post('/api/transfers/create',
                    JSON.stringify({ receiver_username: username, amount }),
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token
                        },
                    }
                );
                console.log(response)
                if (response.data.success === false) {
                    if (response.data._un_authorized === true) {
                        alert(response.data.error)
                        navigate('/login')
                    } else {
                        alert(response.data.error)
                    }

                } else {
                    alert('Transfer was made successfully')
                    setAmount(null)
                    setUsername(null);
                }
                setSuccess(true)
            } catch (error) {
                console.log(error)
                if (!error?.response) {
                    alert('No Server Response. Probably a network issue')
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
    }

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Make a Transfer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <p className="my-2">{errMsg}</p>
            <p>{success}</p>
                <form action="" onSubmit={handleSubmit}>
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
                        <label htmlFor="amount" className="form-label">Amount</label>
                        <input type="number" className="form-control" id="amount" placeholder="1000" onChange={(e) => setAmount(e.target.value)} />
                    </div>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-primary" disabled={!validName || !amount ? true : false}>Proceed</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}

export default TransferModal