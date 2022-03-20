import React from 'react'
import DashboardWrapper from '../../layouts/DashboardWrapper/DashboardWrapper'

const Settings = () => {
    return (
        <DashboardWrapper>
            <div className="container">
                <div className="mt-5">
                    <button className='btn btn-primary me-3'>Change password</button>
                    <button className='btn btn-outline-primary'>Change password</button>

                    <div className="mt-5">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="password mb-3">
                                    <form action="">
                                        <div class="mb-3">
                                            <label for="exampleFormControlInput1" class="form-label">Old Password</label>
                                            <input type="password" class="form-control" id="exampleFormControlInput1" placeholder="password" />
                                        </div>
                                        <div class="mb-3">
                                            <label for="exampleFormControlInput1" class="form-label">New Password</label>
                                            <input type="password" class="form-control" id="exampleFormControlInput1" placeholder="password" />
                                        </div>
                                        <button className="btn btn-primary">Change Password</button>
                                    </form>
                                </div>
                                <div className="wallet mb-3">
                                    <form action="">
                                        <div class="mb-3">
                                            <label for="exampleFormControlInput1" class="form-label">Old Wallet</label>
                                            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="password" />
                                        </div>
                                        <div class="mb-3">
                                            <label for="exampleFormControlInput1" class="form-label">New Wallet</label>
                                            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="password" />
                                        </div>
                                        <button className="btn btn-primary">Change Wallet</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardWrapper>
    )
}

export default Settings