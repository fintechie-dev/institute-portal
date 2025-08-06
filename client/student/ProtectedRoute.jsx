import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({children}) {
    const [checking,setChecking] = useState(true);
    const [authorized,setAuthorized]= useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        const verifyLogin = async ()=>{
            try{
                const res = await fetch('http://localhost:5000/api/auth/check-session',{
                    credentials: 'include'
                });
                const data = await res.json();
                if(data.loggedIn){
                    setAuthorized(true);
                }else{
                    navigate('/login');
                }
            }catch(err){
                console.error('session check error',err);
                navigate('/login');
            }finally{
                setChecking(false);
            }
        };

        verifyLogin();
    },[navigate])
    if(checking) return <div>checking session... </div>;

    return authorized ? children : null
}

export default ProtectedRoute