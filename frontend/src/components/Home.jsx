import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { X } from "lucide-react";
import { Link } from 'react-router-dom';
import Intro from './dashboard/Intro';

const Home = () => {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <div>
        {isVisible && (
          <div className="relative flex items-center justify-between bg-red-200 border border-red-200 p-4 rounded-lg mb-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-2 rounded-full">
                <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              
              <div>
                <p className="text-sm font-semibold text-red-900">Profile Incomplete</p>
                <p className="text-xs text-red-700">Please add your bio and profile photo to get noticed by recruiters.</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link to="/profile" className="text-xs font-bold text-red-900 underline hover:text-red-800">
                Update Now
              </Link>
              
              <button 
                onClick={() => setIsVisible(false)}
                className="p-1 hover:bg-red-200/50 rounded-full transition-colors text-red-600"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        )}
        <Navbar />
        <Intro />
    </div>
  )
}

export default Home