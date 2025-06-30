import React, { useState } from 'react'

function Onboarding() {
  const [onboarding,setOnboarding]=useState(
    {
      fullname:"",
      bio:"",
      nativeLanguage:"",
      learningLanguage:"",
      location:"",
}
  );
  return (
    <div>
         <div data-theme="forest" className="flex items-center justify-center lg:h-screen p-4 sm:p-6 md:p-8 ">
         <h1 className="text-xl md:text-2xl  font-medium text-white/75 mt-4">
           Complete Your Profile
          </h1>
          <img src='/' alt="" className='bg-gray-50 rounded-full'/>
          <button className=''>Generate Random Avator</button>          
         </div>
         {/* onboarding form */}
         <div>
            <form action="">
              <input type="text"
               name="fullname" 
               value={onboarding.fullname}
              />
            </form>
         </div>
    </div>
  )
}

export default Onboarding