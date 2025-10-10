"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRef } from "react";
import Image from 'next/image'

const simulations = [
  {
    title: "Virus Spread Simulation",
    img: "/spread.png",
    points: [
      "Real-time pathogen spread modeling",
      "Mutation tracking and prediction",
      "Infection rate analytics",
      "Variant evolution patterns",
    ],
    type: "html",
    file: "/pandemic-simulator.html"
  },
  {
    title: "Virus Mutation Simulator",
    img: "/mutate.png",
    points: [
      "Advanced AI mutation prediction",
      "Custom virus creation",
      "Reinforcement learning model",
      "Real-time visualization",
    ],
    type: "html", 
    file: "/virus-mutation-simulation.html"
  },
  {
    title: "Emergency AI Assist",
    img: "/assist.png",
    points: [
      "Predictive outbreak detection",
      "Automated response planning",
      "Real-time risk assessment",
      "Smart resource allocation",
    ],
    type: "react",
    link: "/chatwithai"
  },
];


export default function Home() {
  const footerRef = useRef<HTMLDivElement>(null);
  const [blurred, setBlurred] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [activeSimulation, setActiveSimulation] = useState<string | null>(null);
  const controls = useAnimation();
  const carouselRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setBlurred(false);
    }, 2000);
  }, []);

  const openSimulation = (simulation: any) => {
    if (simulation.type === "html") {
      setActiveSimulation(simulation.file);
    }
  };

  const closeSimulation = () => {
    setActiveSimulation(null);
  };

  // If a simulation is active, show only that simulation
  if (activeSimulation) {
    return (
      <div className="relative w-full h-screen bg-black">
        {/* Close Button */}
        
        {/* Home Button */}
        <button
          onClick={closeSimulation}
          className="absolute top-4 left-4 z-50 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Back to Home
        </button>
        
        {/* Simulation Iframe */}
        <iframe
          src={activeSimulation}
          className="w-full h-full border-none"
          title="Simulation"
        />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-cyan-200">
      {/* Background with medical pattern */}
      <div className="absolute inset-0 z-[-1] opacity-10">
        <div className="w-full h-full bg-[url('/medical-pattern.png')] bg-repeat"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center p-6 z-11 bg-blue-100/80 backdrop-blur-sm shadow-sm">
        <motion.h1
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-2xl font-bold text-blue-800"
        >
          Arogya Drishti
        </motion.h1>

        {/* Navigation Links */}
        <nav className="flex space-x-8">
  <Link href="/publiccare">
    <motion.h6
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="text-gray-700 font-semibold hover:text-blue-600 transition duration-200 cursor-pointer"
    >
      Public Care
    </motion.h6>
  </Link>
  {["Contact"].map((link, index) => (
    <motion.h6
      key={index}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.7 + index * 0.2 }}
      className="text-gray-700 font-semibold hover:text-blue-600 transition duration-200 cursor-pointer"
      onClick={() => link === "Contact" && document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })}
    >
      {link}
    </motion.h6>
  ))}
</nav>
      </header>

      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center h-[50vh] text-center z-10 pt-20">
        <motion.h1
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-6xl font-bold text-blue-900 mb-4"
        >
          Arogya Drishti.
        </motion.h1>
        <motion.p
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-xl text-blue-800 mb-8"
        >
          Seeing Beyond Illness, Towards Wellness.
        </motion.p> 
      </div>

      {/* Simulations Grid */}
      <div className="w-[85%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-12 mb-16 justify-center">
        {simulations.map((sim, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 + index * 0.2 }}
            className="min-h-[360px] bg-blue-50 shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300 border border-gray-200"
            onClick={() => sim.type === "html" ? openSimulation(sim) : null}
          >
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Image 
                src={sim.img} 
                alt={sim.title}
                width={48}  
                height={48}
                className="w-12 h-12 rounded-lg object-cover"
              />
            </div>
            <h3 className="text-xl text-blue-800 font-bold mb-4">
              {sim.title}
            </h3>
            <ul className="text-left text-sm text-gray-700 space-y-2 mb-6 flex-grow">
              {sim.points.map((point, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  {point}
                </li>
              ))}
            </ul>
            
            {/* Button - Different behavior for HTML vs React */}
            {sim.type === "react" ? (
              <Link href={sim.link || "#"} className="w-full">
                <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 font-medium text-sm cursor-pointer">
                  Chat With AI
                </button>
              </Link>
            ) : (
              <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 font-medium text-sm cursor-pointer">
                Launch Simulation
              </button>
            )}
          </motion.div>
        ))}
      </div>


      {/* Footer */}
      <footer id="footer"
        ref={footerRef}
        className="bg-gray-800 text-white p-8 mt-16"
      >
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h4 className="text-lg font-bold mb-4">Arogya Drishti</h4>
            <p className="text-gray-300">
              Population-Scale Disease & Mutation Sandbox for proactive public health management.
            </p>
          </div>
          <div>
  <h4 className="text-lg font-bold mb-4">Emergency Contact</h4>
  <p className="text-gray-300">Email: governmentemail@mail.com</p>
  <div className="space-y-2 mt-3">
    <p className="text-gray-300">Ambulance: <span className="text-white">108</span></p>
    <p className="text-gray-300">Railway Accident: <span className="text-white">1072</span></p>
    <p className="text-gray-300">Medical Advice Service: <span className="text-white">104</span></p>
    <p className="text-gray-300">Emergency & Disaster: <span className="text-white">108 / 1077</span></p>
    <p className="text-gray-300">Women Crisis Center: <span className="text-white">1091</span></p>
  </div>
</div>
          <div>
            <h4 className="text-lg font-bold mb-4">Research Partners</h4>
            <p className="text-gray-300">Global Health Organization</p>
            <p className="text-gray-300">University Research Division</p>
          </div>
        </div>
        <div className="text-center mt-8 border-t border-gray-700 pt-6">
          <p className="text-sm text-gray-400">&copy; 2025 ArogyaDrishti. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}