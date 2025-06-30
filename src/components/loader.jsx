import React from 'react'
import { LoaderIcon } from 'lucide-react'
function Loader() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
         <loaderIcon className='size-9 animate-spin text-primary' />
    </div>
  )
}

export default Loader