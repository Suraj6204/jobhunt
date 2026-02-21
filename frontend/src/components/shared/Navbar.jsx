import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut, User2, Menu } from "lucide-react"; // Menu icon add kiya
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const NavLinks = () => (
    <ul className="flex flex-col lg:flex-row font-medium items-start lg:items-center gap-0 lg:gap-8 w-full">
      {[
        { name: "Home", path: "/" },
        { name: "Jobs", path: "/jobs" },
        { name: "Browse", path: "/browse" },
      ].map((link) => (
        <li
          key={link.name}
          className="w-full border-b border-gray-100 lg:border-none"
        >
          <Link
            to={link.path}
            className="block py-4 lg:py-0 text-gray-700 hover:text-primary transition-colors text-lg lg:text-base"
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 md:px-8">
        {/* Logo */}
        <div>
          <h1 className="text-xl md:text-2xl font-bold">
            Job
            <span className="text-[oklch(39.288%_0.0643_347.669)]">Hunt</span>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-12">
          <NavLinks />
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-primary hover:bg-primary-foreground text-white">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <UserMenu logoutHandler={logoutHandler} user={user} />
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center gap-4">
          {/* Profile Icon - Clicking this shows Profile/Logout */}
          {user && (
            <UserMenu
              logoutHandler={logoutHandler}
              user={user}
              isMobile={true}
            />
          )}

          {/* Hamburger Menu - Clicking this shows Home/Jobs/Browse */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-100 rounded-full"
              >
                <Menu />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-75 sm:w-95 p-0">

              <div className="flex flex-col h-[calc(100vh-80px)] justify-between p-6">
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Menu
                  </p>
                  {/* Navigation Links with lines (from Step 1) */}
                  <NavLinks />
                </div>

                {/* Bottom Section for Auth Buttons */}
                {!user && (
                  <div className="flex flex-col gap-3 pt-6 border-t mt-auto">
                    <Link to="/login" className="w-full">
                      <Button
                        variant="outline"
                        className="w-full py-6 text-base font-semibold shadow-sm"
                      >
                        Login
                      </Button>
                    </Link>
                    <Link to="/signup" className="w-full">
                      <Button className="w-full py-6 text-base font-semibold shadow-md bg-primary hover:bg-primary-foreground">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
