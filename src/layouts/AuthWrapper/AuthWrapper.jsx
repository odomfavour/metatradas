import React from 'react'
import './auth.css'

const AuthWrapper = ({ children }) => {
    return (
        <main className='auth-bg'>
            <div className="container">
                <div className="row">
                    <div className="col-lg-5 col-md-8 col-12">
                        <div className="d-flex align-items-center justify-content-center form-box">
                            <div className="auth-box">
                                {children}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7 col-md-4S"></div>
                </div>
            </div>
        </main>
    )
}

export default AuthWrapper