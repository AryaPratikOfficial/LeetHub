import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ name, username, onLogout }) => {
  const navigate = useNavigate();

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 20px',
        background: '#282c34',
        color: '#fff',
        fontFamily: 'sans-serif',
      }}
    >
     
      <div
        style={{ fontSize: '20px', fontWeight: 'bold', cursor: 'pointer' }}
        onClick={() => navigate('/leaderboard')}
      >
        ACM Portal 🧠
      </div>

     
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/account" style={linkStyle}>
          Account
        </Link>
        <Link to="/search" style={linkStyle}>
          Search
        </Link>
        <Link to="/leaderboard" style={linkStyle}>
          Leaderboard
        </Link>
      </div>

     
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span>
          👋 {name} 
        </span>
        <button
          onClick={onLogout}
          style={{
            background: '#ff4d4d',
            border: 'none',
            color: '#fff',
            padding: '6px 10px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

// Small style helper
const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontWeight: '500',
};

export default Navbar;
