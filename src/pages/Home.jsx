import { User } from "lucide-react";
import FriendCard from "../components/FriendCard";
import NewFriends from "../components/NewFriends";

const Home = () => {
  return (
    <section className="bg-black py-4 px-10 h-full" >
      {/* page title */}
      <div className="flex flex-col lg:flex-row lg:justify-between items-start justify-start ">
        <h2 className="font-sans font-semibold text-2xl text-white/90">
          Your Friends{" "}
        </h2>
        <span className="flex items-center justify-start gap-3 border border-white/45 px-4 py-1 ring-1 ring-black/40 rounded-full text-white  text-md">
          <User />
          friend Requests
        </span>
      </div>

      {/* page body */}
     <FriendCard/>
     <h2 className="text-xl md:text-2xl text-white font-sans font-semibold">Meet New Learners</h2>
     <p className="text-white/75">Discover Perfect language exchange partners based on your profile</p>
     <NewFriends/>
    </section>
  );
};

export default Home;
