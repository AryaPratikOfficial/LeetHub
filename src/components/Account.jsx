import React, { useState } from 'react'

import { useEffect } from 'react'
const Account = (currentUser , currentUserName) => {

  const [leetcodeData, setLeetcodeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) return;

      const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${currentUser.username}`);
      const data = await res.json();
      setLeetcodeData(data);
    };

    fetchData();
  }, [currentUser]);


  return (
    <div>
     <h1>Account</h1>
 <h1> hi , { currentUserName}</h1>




     <div className="ai-recommendation">
  <h1>Smart Revision Problem</h1>

  <p>
    This daily challenge is AI-selected based on your weekly progress, problem types solved,
    incorrect submissions, and failed test cases. It helps you strengthen weak areas and revise effectively.
  </p>

  <div className="problem-card">
    <h2>Problem Name: Two Sum</h2>
    <h3>Difficulty: Easy</h3>

    <p>
      Description: Given an array of integers <code>nums</code> and an integer <code>target</code>,
      return indices of the two numbers such that they add up to <code>target</code>. You may assume that
      each input would have exactly one solution, and you may not use the same element twice.
      You can return the answer in any order.
    </p>

    <a
      href="https://leetcode.com/problems/two-sum/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Solve on LeetCode
    </a>
  </div>
</div>

    </div>
  )
}

export default Account
