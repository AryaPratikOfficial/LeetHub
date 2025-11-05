import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Account from './components/Account'
import Search from './components/Search'
import Leaderboard from './components/Leaderboard'

const App = () => {
  return (
    <div>
      <h1>App</h1>
       <Routes>
         <Route path="/account" element={<Account />} />
         <Route path="/search" element={<Search />} />
         <Route path="/leaderboard" element={<Leaderboard />} />
       </Routes>
    </div>
  )
}

export default App

 