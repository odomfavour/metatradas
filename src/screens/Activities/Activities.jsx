import React, { useState, useEffect } from 'react'
import WithdrawalModal from '../../components/WithdrawalModal/WithdrawalModal'
import DashboardWrapper from '../../layouts/DashboardWrapper/DashboardWrapper'
import axios from '../../api/axios'
import './activities.css'

import { BsLightningFill } from 'react-icons/bs'
import TransferModal from '../../components/TransferModal/TransferModal'
const Activities = () => {
    const [show, setShow] = useState(false);
    const [showTransfer, setShowTransfer] = useState(false);

    const handleClose = () => setShow(false);
    const handleTransferClose = () => setShowTransfer(false);
    const handleShow = () => setShow(true);
    const handleTransferShow = () => setShowTransfer(true);

    const [deposits, setDeposits] = useState([])
    const [earnings, setEarnings] = useState([])

    const token = localStorage.getItem('userToken');
    const getDeposits = async () => {

        if (token) {
            try {
                const response = await axios.get('/api/account/deposits', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                })
                console.log(response)
                if (response) {
                    let myDeposits = response.data.data
                    if (myDeposits === !null || myDeposits > 0) {
                        setDeposits(myDeposits);
                    }
                }

            } catch (error) {
                console.log(error)
            }
        }

    }
    const getDailyEarning = async () => {

        if (token) {
            try {
                const response = await axios.get('/api/account/daily-earnings', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                })
                if (response) {
                    let myEarnings = response.data.data
                    if (myEarnings === !null || myEarnings > 0) {
                        setEarnings(myEarnings);
                    }
                }

            } catch (error) {
                console.log(error)
            }
        }

    }
    useEffect(() => {
        getDeposits();
        getDailyEarning();

    }, [])

    return (
        <DashboardWrapper>
            <main className='mt-5'>
                <div className="container">
                    <section className="py-4">
                        <div className='d-flex justify-content-end '>
                            <div className="d-flex align-items-center justify-content-center transfer-btn" role="button" onClick={handleTransferShow}>
                                <div>
                                    <BsLightningFill />
                                    <p className='mb-0'>Make a Transfer</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className='py-4'>
                        <h5 className='my-3'>Deposit</h5>
                        {deposits > 0 ? <div className="row">
                            {deposits.map((deposit) => (
                                <div className="col-md-4 mb-3">
                                    <div className='transaction-card'>
                                        <p>Date: </p>
                                        <p>Amount: </p>
                                        <p>Date: </p>
                                    </div>
                                </div>
                            ))}
                        </div> :
                            <div>
                                <h5 className="text-center">You have no deposits yet</h5>
                            </div>}
                    </section>
                    <hr />
                    <section className='py-4'>
                        <div className="d-flex justify-content-between align-items-center">
                            <h5 className='my-3'>Withdrawal</h5>
                            <button className="btn btn-primary" onClick={handleShow}>Withdraw</button>
                        </div>
                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <div className='transaction-card'>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <p>Date: 20000 </p>
                                            <p>Amount: 2000</p>
                                            <p>Date: 2000 </p>
                                        </div>
                                        <div>
                                            <button className="btn btn-primary">Completed</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 mb-3">
                                <div className='transaction-card'>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <p>Date: 20000 </p>
                                            <p>Amount: 2000</p>
                                            <p>Date: 2000 </p>
                                        </div>
                                        <div>
                                            <button className="btn btn-primary">Completed</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 mb-3">
                                <div className='transaction-card'>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <p>Date: 20000 </p>
                                            <p>Amount: 2000</p>
                                            <p>Date: 2000 </p>
                                        </div>
                                        <div>
                                            <button className="btn btn-primary">Completed</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <hr />
                    <section className='py-4'>
                        <h5 className='my-3'>Earning</h5>
                        {earnings > 0 ? <div className="row">
                            {earnings.map((earning) => (
                                <div className="col-md-4 mb-3">
                                    <div className='transaction-card'>
                                        <p>Date: </p>
                                        <p>Amount: </p>
                                        <p>Date: </p>
                                    </div>
                                </div>
                            ))}
                        </div> :
                            <div>
                                <h5 className="text-center">You have no earnings yet</h5>
                            </div>}
                    </section>
                    <WithdrawalModal show={show} handleClose={handleClose} />
                    <TransferModal show={showTransfer} handleClose={handleTransferClose} />

                </div>
            </main>
        </DashboardWrapper>
    )
}

export default Activities