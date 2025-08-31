import React from "react"
import { CircleChevronRight } from 'lucide-react'

export const Nav = () => {
  return (
    <div className="flex justify-between items-center bg-[#D7E0CA] px-4 py-3 rounded-full">
      <div className="flex items-center">
        <a href="http://localhost:5173" target="_blank">
          <img src="credit-agency-logo-137000.png" className="w-10 h-10 "/>
        </a>
      </div>
      <div className="flex gap-2 justify-between items-center">
        <button className="flex text-white cursor-pointer">Register</button>
        <button className="group flex items-center  text-white  bg-[#137000] gap-2 px-4 py-2 cursor-pointer rounded-full">Log In
            
           <CircleChevronRight className="w-4.5 h-4.5 transition-transform duration-300 group-hover:translate-x-[5px]"/> 
           
        </button>
      </div>
    </div>
  );
};
