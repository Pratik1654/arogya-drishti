"use client";

import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRef } from "react";


const features = [
  {
    title: "Gaming",
    img: "/game.jpg",
    points: [
      "High refresh rate for smoother visuals",
      "AMD FreeSync support",
      "Low response time for competitive edge",
      "RGB lighting and aggressive design",
    ],
  },
  {
    title: "Daily Use",
    img: "/daily.jpg",
    points: [
      "Optimized for reading and browsing",
      "Blue light filter for eye comfort",
      "Energy-efficient display",
      "Minimalistic design for home/office",
    ],
  },
  {
    title: "Accessories",
    img: "/Accessories.jpg",
    points: [
      "Compatible with VESA mounts",
      "Comes with HDMI & DisplayPort cables",
      "In-built speakers for convenience",
      "Ergonomic stand options",
    ],
  },
  {
    title: "Comfort",
    img: "/Comfort.jpg",
    points: [
      "Height and tilt adjustable",
      "Flicker-free technology",
      "Matte finish to reduce glare",
      "Built for long hours of use",
    ],
  },
];

const newReleases = [
  { name: "UltraSharp X99", price: 399, img: "/ultrasharp.jpg", badge: "HOT" },
  { name: "ViewMate Pro", price: 299, img: "/viewmate.jpg", badge: "NEW" },
  { name: "PixelPrime Elite", price: 499, img: "/pixelprime.jpg", badge: "HOT" },
  { name: "SpectraView Z", price: 549, img: "/spectraview.jpg", badge: "NEW" },
  { name: "NanoEdge Vision", price: 439, img: "/nanoedge.jpg", badge: "HOT" },
];

export default function Home() {
  const footerRef = useRef<HTMLDivElement>(null);
  const [blurred, setBlurred] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const carouselRef = useRef<HTMLDivElement>(null);
  const newReleaseRef = useRef<HTMLDivElement | null>(null);

  // Start the carousel animation
  useEffect(() => {
    const startAnimation = async () => {
      await controls.start({
        x: ["0%", `-${100 * (newReleases.length / (newReleases.length + 1))}%`],
        transition: {
          repeat: Infinity,
          ease: "linear",
        },
      });
    };
    startAnimation();
  }, [controls]);

  // Handle hover state changes
  useEffect(() => {
    if (isHovered) {
      controls.stop(); // Smoothly stops the animation
    } else {
      controls.start({
        x: ["0%", `-${100 * (newReleases.length / (newReleases.length + 1))}%`],
        transition: {
          repeat: Infinity,
          duration: 10,
          ease: "linear",
        },
      });
    }
  }, [isHovered, controls]);

  useEffect(() => {
    setTimeout(() => {
      setBlurred(false);
    }, 2000);

    // Auto-scroll carousel
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === 3 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background Image */}
      <div className="absolute inset-0 z-[-1] blur-sm">
        <Image
          src="/background.jpg"
          alt="Background"
          fill
          className="object-cover"
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center p-6 z-10 bg-black/20">
        {/* Animated Navigation Links */}
        <nav className="absolute top-0 right-0 text-l font-bold p-6 flex space-x-5">
          {[
            "New Release",
            "Bestseller",
            "Sign Up",
            "About",
            "Contact",
          ].map((link, index) => (
            <motion.h6
              key={index}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
              className="hover:underline hover:text-[#C21E8A] transition duration-200"
            >
              <span
                onClick={() => {
                  if (link === "New Release" && newReleaseRef.current) {
                    newReleaseRef.current.scrollIntoView({ behavior: "smooth" });
                  } else if (
                    (link === "About" || link === "Contact") &&
                    footerRef.current
                  ) {
                    footerRef.current.scrollIntoView({ behavior: "smooth" });
                  } else {
                    window.location.href = `/${link.replace(/\s+/g, "").toLowerCase()}`;
                  }
                }}
                className="cursor-pointer hover:underline hover:text-[#C21E8A] transition duration-200"
              >
                {link}
              </span>
            </motion.h6>
          ))}
        </nav>
      </header>

      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center h-[60vh] text-white text-center z-10 -transform-y-9 mt-11">
        <motion.h1
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: -3, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-8xl font-bold"
        >
          Gear-up
        </motion.h1>
        <motion.p
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-2xl mt-4 text-#b0b0b0"
        >
          Click, Compare, Find What's Rare
        </motion.p>
        {/* Chatbot Button */}
        <Link href="/chatwithai">
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="mt-9 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-900 text-white text-lg font-semibold rounded-lg shadow-lg hover:scale-110 transition-transform duration-300 border-2 border-cyan-400 shadow-[0_0_15px_#00FFFF,0_0_30px_#00FFFF] animate-wiggle cursor-pointer"
          >
            Chat with AI
          </motion.button>
        </Link>
      </div>

      <div className="w-[80%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-15 py-10 mb-55 opacity-70">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 + index * 0.2 }}
            className="min-h-[350px] bg-white bg-opacity-20 shadow-lg rounded-lg p-6 flex flex-col items-center text-center text-black hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            <Image
              src={feature.img}
              alt={feature.title}
              width={180}
              height={120}
              className="mb-4 rounded-md"
            />
            <h3 className="text-xl text-blue-700 font-bold mb-3">
              {feature.title}
            </h3>
            <ul className="text-left text-base text-black space-y-2">
              {feature.points.map((point, i) => (
                <li key={i}>• {point}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* New Releases Section with Smooth Hover Behavior */}
      <div ref={newReleaseRef} className="w-full py-16 overflow-hidden relative">
        <h2 className="text-center text-3xl font-bold text-white mb-10">
          New Releases
        </h2>
        
        <div 
          className="relative h-[350px] w-full cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          ref={carouselRef}
        >
          <motion.div
            className="absolute left-0 flex space-x-8"
            animate={controls}
            style={{
              width: `${newReleases.length * 320}px`,
            }}
          >
            {[...newReleases, ...newReleases].map((item, index) => (
              <motion.div
                key={`${item.name}-${index}`}
                className="w-[280px] h-[300px] bg-white bg-opacity-20 rounded-xl shadow-lg p-5 flex-shrink-0 relative overflow-hidden cursor-pointer"
                whileHover={{ 
                  scale: 1.1,
                  transition: { duration: 0.3 }
                }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
              >
                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold 
                  ${item.badge === "HOT" ? 'bg-red-500' : 'bg-blue-500'}`}>
                  {item.badge}
                </div>
                <div className="w-full h-40 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                  <Image
                    src={item.img}
                    alt={item.name}
                    width={280}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-white">
                  <h3 className="text-xl font-semibold mb-1">{item.name}</h3>
                  <p className="text-lg text-blue-300 font-bold">${item.price}</p>
                  <button className="mt-2 px-4 py-1 bg-blue-600 rounded-lg text-sm hover:bg-blue-700 transition">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative w-full max-w-4xl mx-auto overflow-hidden mt-70 mb-90 opacity-90 hover:scale-105 transition-transform duration-300 cursor-pointer">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {["guardians", "thor", "justice", "avengers"].map((movie, index) => (
            <div
              key={movie}
              className={`min-w-full transform transition-all duration-500 ${
                index === currentSlide ? "scale-100" : "scale-75 opacity-50"
              }`}
            >
              <Image
                src={`/${movie}.jpg`}
                alt={movie}
                width={800}
                height={450}
                className="w-full h-[450px] object-cover rounded-lg shadow-lg"
              />
              {index === currentSlide && (
                <div className="absolute bottom-5 left-5 text-white">
                  <h2 className="text-xl font-bold">
                    {movie === "guardians"
                      ? "Guardians Of The Galaxy"
                      : movie === "thor"
                      ? "Thor: Ragnarok"
                      : movie === "justice"
                      ? "Justice League"
                      : "The Avengers"}
                  </h2>
                  <p className="text-sm">
                    {movie === "guardians"
                      ? "A group of intergalactic criminals must pull together..."
                      : movie === "thor"
                      ? "Thor is imprisoned on the other side of the universe..."
                      : movie === "justice"
                      ? "Fueled by his restored faith in humanity..."
                      : "Earth's mightiest heroes must come together..."}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
          onClick={() => setCurrentSlide((prev) => (prev === 0 ? 3 : prev - 1))}
        >
          &lt;
        </button>
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
          onClick={() => setCurrentSlide((prev) => (prev === 3 ? 0 : prev + 1))}
        >
          &gt;
        </button>
      </div>

      {/* Footer */}
      <footer
        ref={footerRef}
        className="bg-gray bg-opacity-90 text-white p-6 mt-10"
      >
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
          <div>
            <h4 className="text-lg font-bold">About Us</h4>
            <p>
              Your trusted tech partner, providing innovative solutions
              worldwide.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold">Address</h4>
            <p>123 Tech Street, Innovation City</p>
            <p>Technology Park, USA</p>
          </div>
          <div>
            <h4 className="text-lg font-bold">Contact</h4>
            <p>Email: support@techsavvy.com</p>
            <p>Phone: +123 456 7890</p>
          </div>
          <div>
            <h4 className="text-lg font-bold">Support</h4>
            <p>Available 24/7</p>
            <p>
              <a href="/faq" className="text-blue-400 hover:underline">
                FAQs
              </a>
            </p>
          </div>
        </div>
        <div className="text-center mt-5 border-t border-gray-700 pt-4">
          <p className="text-sm">&copy; 2025 TechSavvy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}