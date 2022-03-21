import React, { useState, useEffect } from 'react'
import Header from '../../components/Header/Header'
import axios from '../../api/axios'
import { useNavigate } from 'react-router-dom'

const DashboardWrapper = ({ children }) => {
    const token = localStorage.getItem('userToken');
    const navigate = useNavigate();
    const [myDetails, setMyDetails] = useState(null);

    useEffect(() => {
        const getDetails = async () => {
            if (token !== null) {
                console.log('token', token)
                try {
                    const response = await axios.get('api/account/me', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token
                        },
                    })
                    console.log(response)
                    if (response.data._un_authorized === true) {
                        alert(response.data.error)
                        navigate('/login')
                    }
                    let details = response?.data?.data;
                    setMyDetails(details);
                } catch (error) {
                    console.log(error)
                }
            } else {
                navigate("/login")
            }

        }
        getDetails();
        return () => {
            console.log('unmounting')
        }
       
    }, [navigate, token])

    return (
        <main>
            <Header detail={myDetails} />
            <div>
                {children}
            </div>
        </main>
    )
}

export default DashboardWrapper