import React, { useState } from 'react'

const Account = () => {

    




  return (
    <div>
      <input type="text" className="search-box" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
    </div>
  )
}

export default Account
