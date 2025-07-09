import Sidebar from './Sidebar.jsx';
import Header from "./Header.jsx";

const Layout=({children}) =>{
  return (
    <div className='min-h-screen flex'>
         <Sidebar/>
         <div className='flex-1 flex flex-col bg-base-200'>
             <Header/>
             {/* main content */}
            <main className='flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto'>
              {children}
            </main>
                {/* footer */}
            <footer className='bg-base-300 p-4 text-center text-sm text-gray-500'>
                &copy; {new Date().getFullYear()} Your Company. All rights reserved.
            </footer>
         </div>
    </div>
  )
}

export default Layout