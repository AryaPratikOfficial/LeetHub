import React, { useState, useEffect } from 'react';
import { userList } from '../db/users';

const Leaderboard = () => {
  const [leetcodeData, setLeetcodeData] = useState([]);
  const [top3qsolver, setTop3qsolver] = useState([]);
  const [dailyrecords , setDailyrecords ] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
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

        // 🔹 3. Call topThree after data fetched
        const sorted = [...responses].sort((a, b) => b.data.totalSolved - a.data.totalSolved);
        setTop3qsolver(sorted.slice(0, 3));
      } catch (err) {
        console.error("Error fetching LeetCode data:", err);
      }
    };

    fetchAll();
  }, []); // Runs only once (on mount)



const calculateDaily = () => {
          leetcodeData.forEach(element => {
            // Logic to calculate daily records
                if(isToday(element.submissionCalendar[0])) {
                    setDailyrecords(prev => [...prev, {username : element.submissionCalendar[0],count : element.submissionCalendar[1]}]);
                }
                else{
                     setDailyrecords(prev => [...prev, {username : element.submissionCalendar[0],count : 0}]);
                }
          });
}

const isValid = (dateCode) => {
    const today = new Date();
    // convert karna padega coded dates ko
    
}










  return (
    <div>
      <h1>Leaderboard</h1>

      <div className="top3questionsolvers">
        <h2>Top 3 Question Solvers</h2> 
        <ul>
          <li>Rank 1: {top3qsolver[0]?.username} — {top3qsolver[0]?.data.totalSolved}</li>
          <li>Rank 2: {top3qsolver[1]?.username} — {top3qsolver[1]?.data.totalSolved}</li>
          <li>Rank 3: {top3qsolver[2]?.username} — {top3qsolver[2]?.data.totalSolved}</li>
        </ul>
      </div>

<div className="daily-leaderboard">
<h1>daily Leaderboard</h1>
     <h2> Top three daily</h2>
     <ul>
        <li></li>
        <li></li>
        <li></li>
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
