import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Account from './components/Account'
import Search from './components/Search'

const App = () => {
  return (
    <div>
      <h1>App</h1>
       <Routes>
         <Route path="/account" element={<Account />} />
         <Route path="/search" element={<Search />} />
       </Routes>
    </div>
  )
}

export default App

 