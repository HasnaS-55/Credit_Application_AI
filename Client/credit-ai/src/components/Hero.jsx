import React from "react";
import { Nav } from "./Nav.jsx";
import { CircleChevronRight, Bot, HandCoins, MessageCircleReply, BadgePercent } from "lucide-react";

const cards = [
    {
        id: 1,
        title: "Instant AI decision",
        sub_head: "Get a real answer in minutes, no queues or phone calls",
        icon: <Bot className="w-8 h-8 text-white bg-black/15 p-1 rounded-md"/>,
        color: "bg-[#6E9D36]"
    }, {
        id: 2,
        title: "Flexible payments",
        sub_head: "Choose plan lengths and amounts that match your budget",
        icon: <HandCoins className="w-8 h-8 text-white bg-black/15 p-1 rounded-md"/>,
        color: "bg-[#3C76C9]"
    }, {
        id: 3,
        title: "Straightforward answers",
        sub_head: "We explain the key factors behind your result and what to do next",
        icon: <MessageCircleReply className="w-8 h-8 text-white bg-black/15 p-1 rounded-md"/>,
        color: "bg-[#137000]"
    }
]

// Carousel items data
const carouselItems = [
    { id: 1, content: <h6 className="bg-[#D7E0CA] rounded-full px-3 py-1 text-lg whitespace-nowrap">Get your electronic item fast</h6> },
    { id: 2, content: <BadgePercent className="text-[#D7E0CA] bg-[#6E9D36] rounded-md w-10 h-10 p-2" /> },
    { id: 3, content: <h6 className="text-lg whitespace-nowrap">Flexible to fit your budget</h6> },
    { id: 4, content: <img src="ChatGPT Image Aug 31, 2025, 04_51_34 PM.png" className="w-[200px] h-[50px] bg-[#D7E0CA] rounded-lg object-cover" /> },
    { id: 5, content: <h6 className="text-lg whitespace-nowrap">Works with top electronics stores</h6> }
];

export const Hero = () => {
  return (
    <div className="flex flex-col w-full h-screen bg-white ">
      
      <div className="h-[80%] flex flex-col gap-0 items-center">
        <Nav />
        <div className="flex-1 flex justify-center items-center gap-8 px-8 w-3/4">
          
          
          <div className="w-1/2 flex flex-col justify-center gap-8">
            <h4 className="text-start text-4xl font-semibold leading-relaxed">
              Our{" "}
              <span className="bg-[#BDDCFF] rounded-full px-2 py-1 whitespace-nowrap">
                AI analyzes
              </span>{" "}
              your form and delivers a clear credit decision in minutes
            </h4>
            <div className="flex gap-4 items-center">
              <button className="group flex items-center text-white bg-[#137000] gap-2 px-6 py-3 cursor-pointer rounded-full">
                Log In
                <CircleChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button className="flex bg-[#D7E0CA] px-6 py-3 text-[#6E9D36] rounded-full cursor-pointer">
                Register
              </button>
            </div>
          </div>

         
          <div className="w-1/2 flex flex-col gap-6">
            
            <div className="flex gap-6 ">
              {cards.slice(0, 2).map(card => (
                <div key={card.id} className="flex-1 flex"> 
                  <div className={`${card.color} rounded-xl shadow-md flex flex-col justify-between p-5 h-full`}>
                    <div>
                      <h4 className="text-2xl text-start font-semibold text-white">{card.title}</h4>
                      <p className="text-md text-start text-white/90 mt-2">{card.sub_head}</p>
                    </div>
                    <div className="flex justify-start">
                      {card.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
           
            <div >
              <div className={`${cards[2].color} rounded-xl shadow-md flex flex-col justify-between p-5 h-full`}>
                <div>
                  <h4 className="text-2xl text-start font-semibold text-white">{cards[2].title}</h4>
                  <p className="text-md text-start text-white/90 mt-2">{cards[2].sub_head}</p>
                </div>
                <div className="flex justify-start">
                  {cards[2].icon}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="h-[10%] overflow-hidden relative">
        <div className="absolute inset-0 flex items-center">
          
          <div className="flex items-center animate-infinite-scroll">
            
            {[...carouselItems, ...carouselItems].map((item, index) => (
              <div key={`${item.id}-${index}`} className="mx-8 flex-shrink-0">
                {item.content}
              </div>
            ))}
          </div>
        </div>
      </div>

      
      <style>
        {`
          @keyframes infinite-scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-infinite-scroll {
            animation: infinite-scroll 20s linear infinite;
            display: flex;
            width: max-content;
          }
          .animate-infinite-scroll:hover {
            animation-play-state: paused;
          }
        `}
      </style>
    </div>
  );
};