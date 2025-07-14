import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RequestOtp = () => {
    // to store and display messages (like errors)
    const [displayStatus, setDisplayStatus] = useState('');

    // fetches the email stored in the local storage
    const email = localStorage.getItem('email');

    const navigate = useNavigate();

    useEffect(() => {
        // redirect to login if email is not in localStorage
        if (!email) navigate('/login');
    }, [email, navigate]);

    // otp request function--send POST request to backend to generate otp
    const requestOtp = async () => {
        const response = await fetch('http://localhost:5000/api/auth/request-otp', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        });

        const data = await response.json();
        if (data.success) {
            alert('OTP sent to mail');
            navigate('/set-password');
        } else {
            setDisplayStatus(data.message);
        }
    };

    return (
        <div className="py-16 bg-gray-100 min-h-screen">
            <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                <div
                    className="hidden lg:block lg:w-1/2 bg-cover"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')",
                    }}
                ></div>
                <div className="w-full p-8 lg:w-1/2">
                    <h2 className="text-2xl font-semibold text-gray-700 text-center">Brand</h2>
                    <p className="text-xl text-gray-600 text-center mb-6">Request OTP</p>

                    {/* Display user's email from localStorage */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            type="text"
                            value={email}
                            readOnly
                            className="bg-gray-200 text-gray-700 focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full"
                        />
                    </div>

                    {/* Button to request OTP */}
                    <div className="mt-4">
                        <button
                            onClick={requestOtp}
                            className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
                        >
                            Send OTP
                        </button>
                    </div>

                    {/* Conditional display of error or status message */}
                    {displayStatus && (
                        <p className="text-red-500 text-sm mt-4 text-center">{displayStatus}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RequestOtp;
