import React from 'react'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div>
       <Routes>
         <Route path="/account" element={<Account />} />
         <Route path="/search" element={<Search />} />
       </Routes>
    </div>
  )
}

export default App

 