import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react"; // View Profile aur Logout icons
import { Link } from "react-router-dom";

const UserMenu = ({ user, logoutHandler, isMobile = false }) => (
    <Popover>
        <PopoverTrigger asChild>
            <div className="cursor-pointer active:scale-95 transition-transform">
                <Avatar className={`${isMobile ? 'h-9 w-9' : 'h-10 w-10'} border border-gray-200`}>
                    <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} />
                    <AvatarFallback>{user?.fullname?.charAt(0)}</AvatarFallback>
                </Avatar>
            </div>
        </PopoverTrigger>
        <PopoverContent className="w-80 mt-2 p-4 shadow-xl border-gray-100" align="end">
            <div className="flex gap-4 items-center mb-4 p-2 bg-gray-50/50 rounded-lg">
                <Avatar className="h-12 w-12 border border-white shadow-sm">
                    <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} />
                    <AvatarFallback>{user?.fullname?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="overflow-hidden">
                    <h4 className="font-bold text-gray-900 truncate">{user?.fullname}</h4>
                    <p className="text-xs text-gray-500 line-clamp-1">{user?.profile?.bio || "No bio added"}</p>
                </div>
            </div>
            <div className="flex flex-col gap-1 border-t pt-3">
                {user.role === "student" && (
                    <Link to="/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-gray-700 hover:bg-gray-100 transition-colors font-medium">
                        <User2 size={20} className="text-gray-500" /> View Profile
                    </Link>
                )}
                <button 
                    onClick={logoutHandler} 
                    className="flex items-center gap-3 px-3 py-2.5 rounded-md text-red-600 hover:bg-red-50 transition-colors font-medium w-full text-left"
                >
                    <LogOut size={20} /> Logout
                </button>
            </div>
        </PopoverContent>
    </Popover>
);

export default UserMenu;