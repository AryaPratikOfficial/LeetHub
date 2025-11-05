import React, { use, useEffect } from 'react'
import { useState } from 'react'
const Search = () => {
    const [searchInput, setSearchInput] = useState("");
   

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [weeklySolved, setWeeklySolved] = useState(0);


const fetchData = () => {
  if(searchInput.trim() === "") return;
    console.log("Fetching data for:", searchInput);
    setLoading(true);
    fetch(`https://leetcode-stats-api.herokuapp.com/${searchInput}`)
      .then(res => res.json())
      
      .then(data => setUserData(data))
      .catch(err => console.error(err) );
      setLoading(false);
}

  useEffect(() => {
    const timer = setTimeout(fetchData, 500);

    return () => clearTimeout(timer);
}, [searchInput]);

useEffect(() => {
// Calculate weekly solved questions

const now = Date.now() / 1000; // current time in seconds
const weekAgo = now - 7 * 24 * 60 * 60; // 7 days ago

let weeklySolvedCount = 0;

// loop through all timestamps
for (const [timestamp, count] of Object.entries(userData?.submissionCalendar || {})) {
  const ts = Number(timestamp);
  if (ts >= weekAgo) {
    weeklySolvedCount += count;
  }
}

setWeeklySolved(weeklySolvedCount);

}, [userData]);

console.log(userData);
  return (
    <div>
        <h1>Search</h1>
       <input type="text" className="search-box" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />


    <h1> {loading ? "Loading..." : error ? "Error fetching data" : "User Data"  }</h1>

           <div style={userData?.status=="error" ? {opacity : 1} : {opacity : 0}} className="not-found">
            Not found 
           </div>


        <div style={ userData==null ? {opacity : 0.1} : {opacity : 1}} className="user-stats">

            <h4>No of question solved : {userData?.totalSolved || 0}</h4>
            <h4>Ranking : {userData?.ranking || "N/A"}</h4>
            <h4>Contribution Points : {userData?.contributionPoints || 0}</h4>
            <h4>Acceptance Rate : {userData?.acceptanceRate || "N/A"}</h4>

            <h4>weekly Question solved :{weeklySolved} </h4>
        </div>


    </div>
  )
}

export default Search
