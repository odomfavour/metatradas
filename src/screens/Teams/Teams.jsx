import React, { useEffect, useState } from 'react'
import DashboardWrapper from '../../layouts/DashboardWrapper/DashboardWrapper'
import avatar from '../../images/avatar.jpg'
import axios from '../../api/axios'


const Teams = () => {
    const [team, setTeam] = useState([])
    const getTeams = async () => {
        const token = localStorage.getItem('userToken');
        if (token) {
            try {
                const response = await axios.get('/api/accounts/list', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                })
                console.log(response)
                if (response) {
                    let teams = response.data.data
                    setTeam(teams);
                }

            } catch (error) {
                console.log(error)
            }
        }

    }
    useEffect(() => {
        getTeams();

    }, [])

    return (
        <DashboardWrapper>
            <div className="container">
                <div className="mt-5">
                    <div className="text-center">
                        <h3 className='mb-3'>Teams</h3>
                    </div>
                    <div className="mt-5">
                        {team ? <div className="row">
                            {team.map((member) => {
                                return <div className="col-md-3 col-12 mb-3" key={member.id}>
                                    <div className="member-card">
                                        <div className="member-image">
                                            <img src={avatar} alt="" className='img-fluid' />
                                        </div>
                                        <div className="member-info p-3">
                                            <h5>{member.first_name} {member.last_name}</h5>
                                            <p>{member.email}</p>
                                            <p>{member.phone_number}</p>
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div> : <div className="text-center">
                            <h3>No Teams</h3>
                            </div>}
                    </div>
                </div>
            </div>
        </DashboardWrapper>
    )
}

export default Teams