import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SetPassword=()=>{
    //to store the OTP
    const [otp, setOtp] = useState('');
    //store the new password entered by the user
    const [password,setPassword] = useState('');
    //to get the item form local storage----- for push use localStorage.setItem(key, value)
    const email = localStorage.getItem('email');
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();

        const response = await fetch('http://localhost:5000/api/auth/set-password',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email,otp,password})
        });
        const data = await response.json();

        if (data.success){
            alert('password set successfully');
            navigate('/login');
        }else{
            alert('data.message')
        }
    };
    return(
        <div>
            <h2>Set Password</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e)=>setOtp(e.target.value)}
                    required />
                <input
                    type="password"
                    placeholder="Enter New Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required />
                <button type="submit">Set Password</button>
            </form>
        </div>
    )
}
export default SetPassword;