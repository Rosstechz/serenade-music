import { UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex items-center justify-between mb-8 ">
      <div className="flex items-center gap-3">
        <Link to={"/"} className="rounded-lg">
          <img
            src="/serenade-logo.png"
            alt="logo"
            className="w-[100px] h-[30px] sm:w-32 sm:h-10"
          />
        </Link>
      </div>

      <div>
        <h1 className="font-bold text-[20px] sm:text-3xl mb-2 sm:mr-2">
          Manage Your Music
        </h1>
      </div>

      <div>
        <UserButton />
      </div>
    </div>
  );
};

export default Header;
