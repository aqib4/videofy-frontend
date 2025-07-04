import { Navigate, Routes } from "react-router";
import { Route } from "react-router";
import Home from "./pages/Home.jsx";
import Chat from "./pages/Chat.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/Signup.jsx";
import Notifications from "./pages/Notifications.jsx";
import Onboarding from "./pages/Onboarding.jsx";
import Call from "./pages/Call.jsx";
import {Toaster} from "react-hot-toast";
import Loader from "./components/loader.jsx";
import useAuthUser from "./hooks/useAuthUser.jsx";


function App() {
  
    const {isLoading,authUser}=useAuthUser();
    console.log("authUser", authUser);
    
    //this will convert the authUser object to a boolean value, true if it exists,
    //false if it doesn't.
    const isAuthenticated =Boolean(authUser);
    const isOnboarded= authUser?.isOnboarded;

    
     if(isLoading){
      return <Loader />
     }
    
  return (
    <>
        <Routes>
          <Route path="/" element={(isAuthenticated && isOnboarded)? (<Home/>):
           <Navigate to={!isAuthenticated ? "/login" : "/onbaording"} /> }/>
          <Route path="/signup" element={ !isAuthenticated ? <SignUp/> : <Navigate to={"/"} /> } />
          <Route path="/login" element={!isAuthenticated ? <Login/> : <Navigate to={"/"}/> } />
          <Route path="/onbaording" element={(isAuthenticated && !isOnboarded) ? <Onboarding/>  : <Navigate to={!isAuthenticated ? "/login": "/"}/> } />
          <Route path="/chat" element={(isAuthenticated && isOnboarded) ? <Chat/>  : 
          <Navigate to={!isAuthenticated? "/login":"/chat"}/> 
          } />
          <Route path="/notification" element={isAuthenticated ? <Notifications/>  : <Navigate to="/login"/> } />
          <Route path="/call" element={isAuthenticated ? <Call/>  : <Navigate to="/login"/> } />
        </Routes> 
        <Toaster/>
         </>
  )
}

export default App
