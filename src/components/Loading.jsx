import React from 'react'
import { Loader } from 'lucide-react'
function  Loading() {
  return (
    <div className='max-w flex items-center justify-center bg-black '>
         <Loader className='size-9 animate-spin text-primary' />
    </div>
  )
}

export default Loading