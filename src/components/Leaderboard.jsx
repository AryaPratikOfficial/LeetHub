import React, { useState, useEffect } from 'react';
import { userList } from '../db/users';

const Leaderboard = () => {
  const [leetcodeData, setLeetcodeData] = useState([]);
  const [top3qsolver, setTop3qsolver] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        
// pahle che chk karega ki sessionStorage me data hai ki ni
        const cached = sessionStorage.getItem('leetcodeData');
        if (cached) {
          console.log("📦 Using cached data from sessionStorage");
          const parsed = JSON.parse(cached);
          setLeetcodeData(parsed);

          
          const sorted = [...parsed].sort((a, b) => b.data.totalSolved - a.data.totalSolved);
          setTop3qsolver(sorted.slice(0, 3));
          return; 
        }

        console.log("🌐 Fetching fresh data from API...");

        // 🔹 1. Fetch all users in parallel
        const responses = await Promise.all(
          userList.users.map(async (user) => {
            const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${user.username}`);
            const data = await res.json();
            return { username: user.username, data };
          })
        );

        // 🔹 2. Save all fetched data once
        setLeetcodeData(responses);
        sessionStorage.setItem('leetcodeData', JSON.stringify(responses));

        // 🔹 3. Calculate top 3
        const sorted = [...responses].sort((a, b) => b.data.totalSolved - a.data.totalSolved);
        setTop3qsolver(sorted.slice(0, 3));

      } catch (err) {
        console.error("Error fetching LeetCode data:", err);
      }
    };

    fetchAll();
  }, []); // Runs only once (on mount)

  // 🔹 Manual refresh button for dev
  const refreshCache = () => {
    sessionStorage.removeItem('leetcodeData');
    window.location.reload();
  };

  return (
    <div>
      <h1>Leaderboard</h1>
      <button onClick={refreshCache}>♻️ Refresh Cache</button>

      <div className="top3questionsolvers">
        <h2>Top 3 Question Solvers</h2>
        <ul>
          <li>Rank 1: {top3qsolver[0]?.username} — {top3qsolver[0]?.data.totalSolved}</li>
          <li>Rank 2: {top3qsolver[1]?.username} — {top3qsolver[1]?.data.totalSolved}</li>
          <li>Rank 3: {top3qsolver[2]?.username} — {top3qsolver[2]?.data.totalSolved}</li>
        </ul>
      </div>

<div className="daily-dashboard">
  <h1>🧩 Daily Problem Solving Dashboard</h1>

  <p>Here’s today’s quick summary of all ACM members’ problem-solving activity 👇</p>

  <div className="daily-summary">
    <h3>📅 Date: {new Date().toLocaleDateString()}</h3>
    <p>Total Questions Solved Today: <strong>42</strong></p>
    <p>Active Users Today: <strong>7</strong></p>
    <p>Average Problems per Active User: <strong>6</strong></p>
  </div>

  <h2>🔥 Top 3 Daily Solvers (dummy) </h2>
  <ul>
    <li>🥇 <strong>Divyansh006</strong> — 11 problems solved</li>
    <li>🥈 <strong>Rajat2004</strong> — 9 problems solved</li>
    <li>🥉 <strong>PratikArya07</strong> — 7 problems solved</li>
  </ul>

  
</div>

      <div className="stats-section">
        {leetcodeData.length === 0 ? (
          <p>Loading user stats...</p>
        ) : (
          <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th>Username</th>
                <th>Total Solved</th>
                <th>Easy</th>
                <th>Medium</th>
                <th>Hard</th>
                <th>Ranking</th>
                <th>Acceptance Rate (%)</th>
              </tr>
            </thead>
            <tbody>
              {leetcodeData.map((item, index) => (
                <tr key={index}>
                  <td>{item.username}</td>
                  <td>{item.data.totalSolved || 0}</td>
                  <td>{item.data.easySolved || 0}</td>
                  <td>{item.data.mediumSolved || 0}</td>
                  <td>{item.data.hardSolved || 0}</td>
                  <td>{item.data.ranking || "N/A"}</td>
                  <td>{item.data.acceptanceRate || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
