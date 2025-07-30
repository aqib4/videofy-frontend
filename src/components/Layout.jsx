import Sidebar from './Sidebar.jsx';
import Header from "./Header.jsx";

const Layout=({children}) =>{
  const showSideBar = children?.props?.showSideBar !== false;

  return (
    <div className='min-h-screen flex'>
      {showSideBar && <Sidebar />}
      <div className='flex-1 flex flex-col bg-base-200'>
             <Header/>
             {/* main content */}
            <main className='flex-1  overflow-y-auto'>
              {children}
            </main>
              
         </div>
    </div>
  )
}

export default Layout