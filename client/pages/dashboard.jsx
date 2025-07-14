import React, { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const shownAlertRef = useRef(false);
  const isFreshLogin = new URLSearchParams(location.search).get("fresh") === "true";

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/check-session', {
          method: 'GET',
          credentials: 'include'
        });
        const data = await response.json();

        if (!data.loggedIn && !shownAlertRef.current) {
          shownAlertRef.current = true;
          alert('Session Expired, Please Log In again');
          navigate('/login');
        }
      } catch (err) {
        console.error("Session check failed:", err);
      }
    };

    let timer;
    let interval;

    if (!isFreshLogin) {
      // Not fresh login, check immediately
      timer = setTimeout(checkSession, 700);
    }

    // Start periodic check only after 5 mins
    interval = setInterval(checkSession, 5 * 60 * 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [navigate, location.search]);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/logout', {
        method: 'GET',
        credentials: 'include'
      });
      const data = await response.json();
      if (data.success) {
        alert('Logged out successfully');
        window.location.href = '/login';
      } else {
        alert('Logout failed: ' + data.message);
      }
    } catch (err) {
      console.error('Logout error:', err);
      alert('Something went wrong during logout.');
    }
  };

  return (
    <div className="min-h-screen bg-[#04145f] text-white flex flex-col items-center justify-center font-sans">
      <h1 className="text-5xl font-bold mb-10">Student Dashboard</h1>
      <button
        onClick={handleLogout}
        className="bg-[#eeaf10] hover:bg-yellow-400 text-[#04145f] font-semibold py-2 px-6 rounded transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
