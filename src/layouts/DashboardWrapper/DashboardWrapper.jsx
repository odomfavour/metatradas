import React, {useState, useEffect, useCallback} from 'react'
import Header from '../../components/Header/Header'
import axios from '../../api/axios'
import { useNavigate } from 'react-router-dom'

const DashboardWrapper = ({ children }) => {
    const token = localStorage.getItem('userToken');
    const navigate = useNavigate();
    const [myDetails, setMyDetails] = useState(null)
    const getDetails = useCallback(
        async () => {
        
            if (token) {
                try {
                    const response = await axios.get('api/account/me', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token
                        },
                    })
                    console.log(response)
                    let details = response.data.data;
                    setMyDetails(details);
                } catch (error) {
                    console.log(error)
                }
            } else {
                navigate("/login")
            }
    
        },
      [token, navigate],
    )
    
    useEffect(() => {
        getDetails();

    })

    return (
        <main>
            <Header detail={myDetails}/>
            <div>
                {children}
            </div>
        </main>
    )
}

export default DashboardWrapper