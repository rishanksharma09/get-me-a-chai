"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useSession, signIn, signOut} from "next-auth/react";
import { useEffect } from "react";
import { getuser } from "@/actions/useractions";

const Navbar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [user,setUser]=useState({});
      useEffect(() => {
        const fetchuser = async () => {
          const userData = await getuser(session.user.email);
          setUser(userData);
        }
        fetchuser();
  
      }, [session]);

  return (
    <div className="bg-slate-900 h-18 px-10 flex justify-between items-center">
      {/* Logo */}
      <Link href={"/"}>
        <div className="flex items-baseline justify-center gap-3">
          <h1 className="text-white font-bold text-2xl">Get Me a Chai!</h1>
          <img className="h-9" src="/coffee-lover.gif" alt="" />
        </div>
      </Link>

      {/* If not logged in → show login */}
      {!session && (
        <Link href={"/login"}>
          <button
            type="button"
            className="hover:cursor-pointer text-white bg-gradient-to-br from-green-400 to-blue-600 
                       hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 
                       dark:focus:ring-slate-800 font-medium rounded-lg text-sm px-5 py-2 text-center"
          >
            Login
          </button>
        </Link>
      )}

      {/* If logged in → show dropdown */}
      {session && (
        <div
          className="relative z-10 group"
          onMouseOver={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}

    //       onMouseLeave={()=>{setTimeout(() => {
    //         setIsOpen(false)
    // }, 1000)}}
        >
          <button
            className="text-white bg-blue-700 hover:bg-blue-800  
                       font-medium rounded-lg text-sm px-7 py-2.5 text-center 
                       inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {session.user?.name || "User"}
            <svg
              className="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"  
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          {<div
            onMouseEnter={()=>setIsOpen(true)}
            className={`absolute right-0 mt-2 w-44 bg-white divide-y divide-gray-100 
                       rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600
                       transition-all duration-500 ease-in-out""
                       ${isOpen? "opacity-100 scale-100": "opacity-0 scale-10"}`}
          >
            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
              <div>{session.user?.name}</div>
              <div className="font-medium truncate">{session.user?.email}</div>
            </div>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              <li>
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href={`/profile/${user.username}`}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/earnings"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  Earnings
                </Link>
              </li>
            </ul>
            <div className="py-2">
              <button
                onClick={() => signOut()}
                className="w-full text-left block px-4 py-2 text-sm text-gray-700 
                           hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 
                           dark:hover:text-white"
              >
                Sign out
              </button>
            </div>
          </div>}
        </div>
      )}
    </div>
  );
};

export default Navbar;
