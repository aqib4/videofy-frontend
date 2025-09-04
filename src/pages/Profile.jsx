import React from 'react'
import { getAuthUser } from '../lib/api'

function Profile() {
    const {authUser,isLoading}=getAuthUser();
    console.log("User",authUser)
  return (
    <div>
        
    </div>
  )
}

export default Profile