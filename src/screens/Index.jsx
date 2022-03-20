import React from 'react'
import DashboardWrapper from '../layouts/DashboardWrapper/DashboardWrapper'
import './home.css'
import savings from '../images/savings.svg'
import { BsWalletFill } from "react-icons/bs";
// import axios from '../api/axios'

const Index = () => {
  return (
    <DashboardWrapper>
      <div className="my-5">
        <div className="container">
          <div className="">
            <div className="row">
              <div className="col-md-3 mb-3">
                <img src={savings} alt="savings" className='img-fluid' />
              </div>
              <div className="col-md-9 mb-3">
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <div className="icon-box text-center">
                      <div className="icon">
                        <BsWalletFill className='main-icon' />
                        <div className="content">
                          <h5 className='my-3'>6000</h5>
                          <h6>USDT Wallet</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="icon-box text-center">
                      <div className="icon">
                        <BsWalletFill className='main-icon' />
                        <div className="content">
                          <h5 className='my-3'>6000</h5>
                          <h6>Trading Capital</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="icon-box text-center">
                      <div className="icon">
                        <BsWalletFill className='main-icon' />
                        <div className="content">
                          <h5 className='my-3'>6</h5>
                          <h6>Team Members</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <hr />
          <div className="">

          </div>
        </div>
      </div>
    </DashboardWrapper>
  )
}

export default Index