import { SignedOut, UserButton } from "@clerk/clerk-react";
import { CircleGauge } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { useAuthStore } from "@/store/useAuthStore";

const TopBar = () => {
  const { isAdmin } = useAuthStore();

  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-slate-900/75 backdrop-blur-md z-10">
      <div className="flex gap-2 items-center">
        <img src="/serenade-logo.png" alt="" className="h-6 w-28" />
      </div>
      <div className="flex items-center gap-4 ">
        {isAdmin && (
          <Link
            to={"/admin"}
            className="text-xs sm:text-sm flex items-center justify-center bg-blue-800/50 hover:bg-blue-900 p-2 rounded"
          >
            <CircleGauge className="size-4 mr-2" />
            Admin Dashboard
          </Link>
        )}

        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>

        <UserButton />
      </div>
    </div>
  );
};

export default TopBar;
