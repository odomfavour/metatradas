import React, { useEffect, useState, useCallback } from 'react'
import DashboardWrapper from '../../layouts/DashboardWrapper/DashboardWrapper'
import './subscription.css'
import axios from '../../api/axios'

import subImage from '../../images/digital-currency.svg'

const Subscription = () => {
    const [packages, setPackages] = useState([]);
    const [subscription, setSubscription] = useState(null)

    const token = localStorage.getItem('userToken');

    const getPackages = useCallback(
        async () => {
            if (token) {
                try {
                    const response = await axios.get('/api/packages/list', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token
                        },
                    })
                    console.log(response)
                    if (response) {
                        let subPackages = response.data.data;
                        setPackages(subPackages);
                    }
    
                } catch (error) {
                    console.log(error)
                }
            } else {
                window.location.replace('/')
            }
    
        },
      [token],
    )
    
    const convertDate = (timestamp) => {
        const d = new Date(timestamp);
        let date = d.getHours() + ":" + d.getMinutes() + ", " + d.toDateString();
        return date;
    }
    const getMyPackage = useCallback(
        async () => {
            if (token) {
                try {
                    const response = await axios.get('/api/packages/subscription', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token
                        },
                    })
                    console.log(response)
                    if (response) {
                        let activePackage = response.data.data
                        let startDateTimestamp = response.data.data.start_date
                        let EndDateTimestamp = response.data.data.end_date
                        activePackage.startDate = convertDate(startDateTimestamp);
                        activePackage.endDate = convertDate(EndDateTimestamp );
    
                        setSubscription(activePackage);
                    }
    
                } catch (error) {
                    console.log(error)
                }
            } else {
                window.location.replace('/')
            }
        },
      [token],
    )
    
    useEffect(() => {
        getPackages();
        getMyPackage();

    })

    return (
        <DashboardWrapper>
            <div className="container">
                <div className="mt-5">
                    <div className="text-center">
                        <h3>Subscription Plans</h3>
                        <p>Choose a plan that works for you and your team</p>
                    </div>
                    <div className="row">
                        {packages.map((pack) => (
                            <div className="col-md-4 col-12 mb-3" key={pack.id}>
                                <div className="sub-card">
                                    <div className="d-flex align-items-center mb-4">
                                        {pack.name === 'Basic' ? <div className='card-shade green-shade me-3'>
                                        </div> : <div className='card-shade orange-shade me-3'>
                                        </div>}

                                        <div>
                                            <h4 className='mb-0'>{pack.name}</h4>
                                            <h5 className='mb-0'>{pack.price}</h5>
                                            <p className='mb-0'>{pack.min_return_per_month} to {pack.max_return_per_month}</p>
                                        </div>
                                    </div>
                                    <div className="sub-card-benefit">
                                        <ul>
                                            <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi, aliquam.</li>
                                            <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi, aliquam.</li>
                                            <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi, aliquam.</li>
                                            <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi, aliquam.</li>
                                            <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi, aliquam.</li>
                                        </ul>
                                        <div className="mt-4 px-5">
                                            <div className="d-grid gap-2">
                                                <button className="btn btn-primary" type="button">Buy Package</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* <div className="col-md-4">
                            <div className="sub-card">
                                <div className="d-flex align-items-center">
                                    <div className='card-shade green-shade me-3'>
                                    </div>
                                    <div>
                                        <h4>Basic</h4>
                                        <h5 className='mb-0'>10</h5>
                                    </div>
                                </div>
                                <div className="sub-card-benefit">
                                    <ul>
                                        <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi, aliquam.</li>
                                        <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi, aliquam.</li>
                                        <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi, aliquam.</li>
                                        <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi, aliquam.</li>
                                        <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi, aliquam.</li>
                                    </ul>
                                    <div className="mt-4 px-5">
                                        <div class="d-grid gap-2">
                                            <button class="btn btn-primary" type="button">Button</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="sub-card">
                                <div className="d-flex align-items-center">
                                    <div className='card-shade orange-shade me-3'>
                                    </div>
                                    <div>
                                        <h4>Startup</h4>
                                        <h5 className='mb-0'>10</h5>
                                    </div>
                                </div>
                                <div className="sub-card-benefit">
                                    <ul>
                                        <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi, aliquam.</li>
                                        <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi, aliquam.</li>
                                        <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi, aliquam.</li>
                                        <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi, aliquam.</li>
                                        <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi, aliquam.</li>
                                    </ul>
                                    <div className="mt-4 px-5">
                                        <div class="d-grid gap-2">
                                            <button class="btn btn-primary" type="button">Button</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="sub-card">
                                <div className="d-flex align-items-center">
                                    <div className='card-shade blue-shade me-3'>
                                    </div>
                                    <div>
                                        <h4>Enterprice</h4>
                                        <h5 className='mb-0'>10</h5>
                                    </div>
                                </div>
                                <div className="sub-card-benefit">
                                    <ul>
                                        <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi, aliquam.</li>
                                        <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi, aliquam.</li>
                                        <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi, aliquam.</li>
                                        <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi, aliquam.</li>
                                        <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi, aliquam.</li>
                                    </ul>
                                    <div className="mt-4 px-5">
                                        <div class="d-grid gap-2">
                                            <button class="btn btn-primary" type="button">Button</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                    <div className="my-plan my-5">
                        <h3>My Subscription</h3>
                        <div className="row">
                            <div className="col-md-5 col-12 mb-3">
                                <img src={subImage} alt="subscription to a plan" className='img-fluid' />
                            </div>
                            <div className="col-md-1 mb-3"></div>
                            <div className="col-md-5 col-12 d-flex align-items-center mb-3">
                                {subscription ? <div className='transaction-card w-100'>
                                    <p><span className='bold-text'>Account ID:</span> {subscription.account_id} </p>
                                    <p><span className='bold-text'>Package ID:</span> {subscription.package_id} </p>
                                    <p><span className='bold-text'>Start Date:</span> {subscription.startDate}</p>
                                    <p><span className='bold-text'>End Date:</span> {subscription.endDate}</p>
                                </div> : <div>
                                    <h5>You do not have an active subscription</h5>
                                </div>}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardWrapper>
    )
}

export default Subscription