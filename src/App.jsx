import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Account from './components/Account';
import Search from './components/Search';
import Leaderboard from './components/Leaderboard';
import Navbar from './components/Navbar';
const App = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  // 🔹 Load from sessionStorage on reload
  useEffect(() => {
    const savedName = sessionStorage.getItem("name");
    const savedUsername = sessionStorage.getItem("username");
    if (savedName && savedUsername) {
      setName(savedName);
      setUsername(savedUsername);
      setIsLoggedIn(true);
    }
  }, []);

  
  const handleLogin = (e) => {
    e.preventDefault();

    if (name.trim() === "" || username.trim() === "") {
      alert("Please enter both Name and LeetCode Username.");
      return;
    }

    sessionStorage.setItem("name", name);
    sessionStorage.setItem("username", username);

    setIsLoggedIn(true);
    navigate("/leaderboard"); 
  };

 
  const handleLogout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    setName("");
    setUsername("");
  };

  // agar login ni hua toh ye render karega
  if (!isLoggedIn) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h1>Welcome to ACM Portal </h1>
        <p>Please enter your details to continue:</p>

        <form
          onSubmit={handleLogin}
          style={{
            marginTop: "20px",
            display: "inline-block",
            textAlign: "left",
          }}
        >
          <div style={{ marginBottom: "10px" }}>
            <label>Your Name: </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="john snow"
              style={{ padding: "6px", width: "200px" }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label>LeetCode Username: </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="johnsnow"
              style={{ padding: "6px", width: "200px" }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: "8px 16px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Continue →
          </button>
        </form>
      </div>
    );
  }

  
  return (
    
    <div style={{ padding: "10px" }}>
      <Navbar name={name} username={username} onLogout={handleLogout} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
       
        
      
      </div>

      <Routes>
        <Route path="/account" element={<Account />} />
        <Route path="/search" element={<Search />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </div>
  );
};

export default App;
