import React, { Children } from 'react'
import Header from './Header/Header';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../config';


const StudentLayout = ({children}) => {

    const [user, setUser] = useState(null);
  
    const navigate = useNavigate();

    useEffect(() => {
        async function getData() {
            
            try {
            const res = await fetch (`${API_URL}/dashboard`, {
                credentials:"include",
                
            });
            if (!res.ok){
                console.log ("User data fetch failed");
                navigate("/login");
                return;
            }
            const data = await res.json();
            localStorage.setItem("User", JSON.stringify(data));
            setUser(JSON.parse(localStorage.getItem("User")));
            
            }
            catch(e){
            console.log (e, "Failed to fetch userdata");
            navigate("/login");
            }

        }
        getData();
    }, [])

  return (
    <div>
        {user  && <Header Name={user.Name} Organisation={user.Organization} Photo={user.Photo} />}
        {children}
    </div>
  )
}

export default StudentLayout