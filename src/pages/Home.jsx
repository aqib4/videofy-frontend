import { User } from "lucide-react";

const Home = () => {
  return (
    <section>
      {/* page title */}
      <div className="flex flex-col lg:flex-row lg:justify-between items-start justify-start">
        <h2 className="font-sans font-semibold text-2xl text-black/90">
          Your Friends{" "}
        </h2>
        <span className="flex items-center justify-start gap-3 border border-black/45 px-4 py-1 ring-1 ring-black/40 rounded-full text-black/70  text-md">
          <User />
          friend Requests
        </span>
      </div>

      {/* page body */}
      <div>
        
      </div>
    </section>
  );
};

export default Home;
