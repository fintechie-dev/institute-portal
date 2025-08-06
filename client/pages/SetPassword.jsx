import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SetPassword=()=>{
    const [steps,setsteps] = useState(1)
    //to store the OTP
    const [otp, setOtp] = useState('');
    //store the new password entered by the user
    const [password,setPassword] = useState('');
    const [otpverified,setOtpVerified] = useState(false);
    //to get the item form local storage----- for push use localStorage.setItem(key, value)
    const email = localStorage.getItem('email');
    const navigate = useNavigate();

    //step 1
    const handleOtpSubmit = async (e)=>{
        e.preventDefault();

        const response = await fetch('http://localhost:5000/api/auth/verify-otp',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email,otp})
        });
        const data = await response.json();

        if (data.success){
            setOtpVerified(true);
            alert('OTP submitted');
            setsteps(2);
        }else{
            alert(data.message)
        }
    };

    //step 2
    const handlePasswordSubmit = async (e)=>{
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
            alert('data.message' || 'failed to set password')
        };
    };
    return(
        <div className="py-16 bg-gray-100 min-h-screen">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{
            backgroundImage:
              "url('https://scopeindia.org/images/robo-scope-site.webp')"
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">SCOPE INDIA</h2>
          <p className="text-xl text-gray-600 text-center">
            {steps === 1 ? "Verify OTP" : "Set Your Password"}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 lg:w-1/4"></span>
            <span className="text-xs text-center text-gray-500 uppercase">
              {steps === 1 ? "OTP Verification" : "New Password"}
            </span>
            <span className="border-b w-1/5 lg:w-1/4"></span>
          </div>

          {steps === 1 && (
            <form onSubmit={handleOtpSubmit}>
              <div className="mt-4">
                {/* <label className="block text-gray-700 text-sm font-bold mb-2">
                  Enter the OTP sent to your email
                </label> */}
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  placeholder="Enter OTP"
                />
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
                >
                  Verify OTP
                </button>
              </div>
            </form>
          )}

          {steps === 2 && (
            <form onSubmit={handlePasswordSubmit}>
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Set New Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  placeholder="Enter New Password"
                />
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
                >
                  Set Password
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SetPassword;