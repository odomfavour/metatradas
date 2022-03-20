import React, {useState, useEffect} from 'react'
import Header from '../../components/Header/Header'
import axios from '../../api/axios'

const DashboardWrapper = ({ children }) => {
    const [myDetails, setMyDetails] = useState(null)
    const getDetails = async () => {
        const token = localStorage.getItem('userToken');
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
            window.location.replace('/login')
        }

    }
    useEffect(() => {
        getDetails();

    }, [])
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