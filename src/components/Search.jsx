import React, { use, useEffect } from 'react'
import { useState } from 'react'
const Search = () => {
    const [searchInput, setSearchInput] = useState("divyansh006");
   

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


const fetchData = () => {
    console.log("Fetching data for:", searchInput);
    setLoading(true);
    fetch(`https://leetcode-stats-api.herokuapp.com/${searchInput}`)
      .then(res => res.json())
      
      .then(data => setUserData(data))
      .catch(err => console.error(err));
      setLoading(false);
}

  useEffect(() => {
    const timer = setTimeout(fetchData, 500);

    return () => clearTimeout(timer);
}, [searchInput]);

// const entries = Object.entries(userData.submissioncalendar);
// console.log(entries);
// const lastDateCode = entries[0][0];

 //const date = new Date(enteries)



  return (
    <div>
        <h1>Search</h1>
       <input type="text" className="search-box" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />


    <h1> {loading ? "Loading..." : error ? "Error fetching data" : "User Data"  }</h1>

        <div className="user-stats">
<p>{JSON.stringify(userData)}</p>
            <h4>No of question solved : {userData?.totalSolved || 0}</h4>
            <h4>Ranking : {userData?.ranking || "N/A"}</h4>
            <h4>Contribution Points : {userData?.contributionPoints || 0}</h4>
            <h4>Acceptance Rate : {userData?.acceptanceRate || "N/A"}</h4>
            
            <h4>weekly Question solved : </h4>
        </div>
    </div>
  )
}

export default Search
