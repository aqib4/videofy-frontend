import React, { useState } from 'react'

function counter() {
    const[counter,setCounter]=useState(0);
    
  return (
    <div>
        {counter}
       <button onClick={()=>setCounter(counter++)}>Click</button>
    </div>
  )
}

export default counter