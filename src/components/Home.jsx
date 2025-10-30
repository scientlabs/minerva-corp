"use client";

import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Section from "./Section";
import Footer from "./Footer";
import VideoSlider from "./VideoSlider";
import minerva_logo from '../assets/MINERVA透過ロゴ.png';

// VideoSlider moved to ./VideoSlider

const Home = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  const [currentLang, setCurrentLang] = useState('ja');
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
      setCurrentLang(savedLanguage);
    } else {
      i18n.changeLanguage("ja"); // Set Japanese as default if nothing is stored
      localStorage.setItem("language", "ja"); // Store it so it persists
    }
  }, []);

  const navigationItems = [
    { name: "Home", hasDropdown: false },
    { name: t("company"), hasDropdown: false },
    { name: t("services"), hasDropdown: true },
    { name: t("products"), hasDropdown: true },
    { name: t("recruit"), hasDropdown: false }
  ];

  const handleDropdownToggle = (itemName) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Row - Logo, Company Name, and Utility Links */}
          <div className="flex justify-between items-center h-16">
            {/* Left Section - Logo and Company Name */}
            <div className="flex items-center space-x-4">
              {/* Minerva Logo */}
              <div className="flex items-center space-x-3">
                {/* <div className="w-10 h-10 bg-red-600 rounded flex items-center justify-center">
                          <div className="w-6 h-6 bg-white rounded-sm transform rotate-45"></div>
                        </div> */}
                <img
                  src={minerva_logo}
                  alt="Minerva Logo"
                  className="h-5 sm:h-6 md:h-14 object-contain"
                />
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200">
                {t("contact_us")}
              </a>

              <button
                type="button"
                onClick={() => {
                  const next = currentLang === "ja" ? "en" : "ja";
                  i18n.changeLanguage(next);
                  setCurrentLang(next);
                  localStorage.setItem("language", next);
                }}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded font-medium flex items-center space-x-2"
                aria-pressed={currentLang === "ja" ? "false" : "true"}
                title="Toggle language"
              >
                <FontAwesomeIcon icon={faGlobe} />
                <span>{currentLang === "ja" ? t("japanese") : "ENGLISH"}</span>
              </button>
            </div>

          </div>

          {/* Bottom Row - Navigation Links */}
          <div className="hidden lg:flex items-center justify-start space-x-8 pb-4">
            {navigationItems.map((item, index) => (
              <div key={index} className="relative">
                <button
                  onClick={() => item.hasDropdown && handleDropdownToggle(item.name)}
                  className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200"
                >
                  <span>{item.name}</span>
                  {item.hasDropdown && (
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''
                        }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>

                {/* Dropdown Menu */}
                {item.hasDropdown && activeDropdown === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-50"
                  >
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Option 1
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Option 2
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Option 3
                    </a>
                  </motion.div>
                )}
              </div>
            ))}
          </div>


        </div>
      </nav>

      {/* Fixed Background Video Slider (plays one video at a time) */}
      <div className="fixed inset-0 z-0">
        {/* Video slider component */}
        {
          /* Localized component inside Home to keep state simple */
        }
        <VideoSlider />
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/30">
          <div className="flex w-full justify-between px-4 md:px-20">
            <motion.div
              className="text-center text-2xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg"
              initial={{ x: -1000, opacity: 0 }}
              animate={{
                x: 0,
                opacity: 1,
                textShadow: [
                  '0px 0px 0px rgba(255,255,255,0)',
                  '0px 0px 30px rgba(127,156,245,0.8)',
                  '0px 0px 10px rgba(255,255,255,0.4)'
                ]
              }}
              transition={{
                duration: 2,
                ease: "easeOut"
              }}
            >
              {t("empowering_your_future")}
            </motion.div>

            <motion.div
              className="text-center text-2xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg"
              initial={{ x: 1000, opacity: 0 }}
              animate={{
                x: 0,
                opacity: 1,
                textShadow: [
                  '0px 0px 0px rgba(255,255,255,0)',
                  '0px 0px 30px rgba(127,156,245,0.8)',
                  '0px 0px 10px rgba(255,255,255,0.4)'
                ]
              }}
              transition={{
                duration: 2,
                ease: "easeOut"
              }}
            >
              {t("ict_header")}
            </motion.div>
          </div>
        </div>
      </div>
      <div className="h-[100vh]"></div>
      {/* Scrollable Content Over Fixed Background */}
      <div className="relative z-20 bg-transparent">

        {/* Japanese Text Section */}
        <Section id="japanese-text" className="py-32 bg-white/80 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Side - Main Headline */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center lg:text-left"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  {t("leading_change")}
                </h1>
              </motion.div>

              {/* Right Side - Body Text */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center lg:text-left"
              >
                <div className="space-y-4 text-lg md:text-xl text-gray-700 leading-relaxed">
                  <p>{t("5g_ai_lead")}</p>
                  <p>{t("various_changes")}</p>
                  <p className="mt-6">{t("make_tomorrow_better")}</p>
                  <p>{t("in_order_to")}</p>
                  <p>{t("use_technology")}</p>
                  <p>{t("solving_issues")}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </Section>

        {/* Service Section */}

        <Section id="service" className="py-20 bg-gray-900/90 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-7xl font-bold text-white mb-16"
            >
              {t("services")}
            </motion.h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Service Cards */}
              <div className="space-y-8">
                {/* Career Communication Card */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center hover:bg-white/20 transition-all duration-300"
                >
                  <h3 className="text-2xl font-bold text-white mb-2">{t("mobile_communication")}</h3>
                  {/* <p className="text-blue-200 mb-4">Mobile Communication</p> */}
                  <p className="text-white/90 leading-relaxed mb-6">
                    {t("mobile_communication_desc")}
                  </p>
                  <button className="bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors duration-200">
                    View all
                  </button>
                </motion.div>

              </div>

              {/* Right Side - Network Visualization */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                <div className="bg-gray-800 rounded-lg p-8 h-96 flex items-center justify-center">
                  {/* Network Visualization SVG */}
                  <img src={'https://minerva-corp.com/wp-content/uploads/2025/06/２-1536x1024.jpg'} alt="Network Visualization" className="w-full h-full object-contain" />
                </div>
              </motion.div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Service Cards */}
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative"
                >
                  <div className="bg-gray-800 rounded-lg p-8 h-96 flex items-center justify-center">
                    {/* Network Visualization SVG */}
                    <img src={'https://minerva-corp.com/wp-content/uploads/2025/06/４.jpg'} alt="Network Visualization" className="w-full h-full object-contain" />
                  </div>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center hover:bg-white/20 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-white mb-2">{t("ict_solution")}</h3>
                {/* <p className="text-blue-200 mb-4">ICT Solution</p> */}
                <p className="text-white/90 leading-relaxed mb-6">
                  {t("ict_solution_desc")}
                </p>
                <button className="bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors duration-200">
                  View all
                </button>
              </motion.div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Service Cards */}
              <div className="space-y-8">
                {/* Career Communication Card */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center hover:bg-white/20 transition-all duration-300"
                >
                  <h3 className="text-2xl font-bold text-white mb-2">{t("security")}</h3>
                  {/* <p className="text-blue-200 mb-4">Security</p> */}
                  <p className="text-white/90 leading-relaxed mb-6">
                    {t("security_desc")}
                  </p>
                  <button className="bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors duration-200">
                    View all
                  </button>
                </motion.div>

              </div>

              {/* Right Side - Network Visualization */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                <div className="bg-gray-800 rounded-lg p-8 h-96 flex items-center justify-center">
                  {/* Network Visualization SVG */}
                  <img src={'https://minerva-corp.com/wp-content/uploads/2025/10/トップ→セキュリティ.jpg'} alt="Network Visualization" className="w-full h-full object-contain" />
                </div>
              </motion.div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Service Cards */}
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative"
                >
                  <div className="bg-gray-800 rounded-lg p-8 h-96 flex items-center justify-center">
                    {/* Network Visualization SVG */}
                    <img src={'https://minerva-corp.com/wp-content/uploads/2025/06/３.jpg'} alt="Network Visualization" className="w-full h-full object-contain" />
                  </div>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center hover:bg-white/20 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-white mb-2">{t("engineering")}</h3>
                {/* <p className="text-blue-200 mb-4">Engineering</p> */}
                <p className="text-white/90 leading-relaxed mb-6">
                  {t("engineering_desc")}
                </p>
                <button className="bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors duration-200">
                  View all
                </button>
              </motion.div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Service Cards */}
              <div className="space-y-8">
                {/* Career Communication Card */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center hover:bg-white/20 transition-all duration-300"
                >
                  <h3 className="text-2xl font-bold text-white mb-2">{t("human_resource")}</h3>
                  {/* <p className="text-blue-200 mb-4">Human Resources Solutions</p> */}
                  <p className="text-white/90 leading-relaxed mb-6">
                    {t("human_resource_desc")}
                  </p>
                  <button className="bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors duration-200">
                    View all
                  </button>
                </motion.div>

              </div>

              {/* Right Side - Network Visualization */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                <div className="bg-gray-800 rounded-lg p-8 h-96 flex items-center justify-center">
                  {/* Network Visualization SVG */}
                  <img src={'https://minerva-corp.com/wp-content/uploads/2025/06/５.jpg'} alt="Network Visualization" className="w-full h-full object-contain" />
                </div>
              </motion.div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Service Cards */}
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative"
                >
                  <div className="bg-gray-800 rounded-lg p-8 h-96 flex items-center justify-center">
                    {/* Network Visualization SVG */}
                    <img src={'https://minerva-corp.com/wp-content/uploads/2025/06/５－２　エンターテインメント.jpg'} alt="Network Visualization" className="w-full h-full object-contain" />
                  </div>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center hover:bg-white/20 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-white mb-2">{t("entertainment")}</h3>
                {/* <p className="text-blue-200 mb-4">Entertainment</p> */}
                <p className="text-white/90 leading-relaxed mb-6">
                  {t("entertainment_desc")}
                </p>
                <button className="bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors duration-200">
                  View all
                </button>
              </motion.div>
            </div>
          </div>

        </Section>

        {/* Products Section */}
        <Section id="products" className="py-20 bg-gradient-to-br from-blue-900/90 to-purple-900/90 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold text-center mb-12 text-white"
            >
              {t("products")}
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Product #01", description: "Network infrastructure construction", icon: "🌐", color: "from-blue-500 to-blue-600" },
                { title: "Product #02", description: "Solution Products", icon: "⚙️", color: "from-green-500 to-green-600" },
                { title: "Product #03", description: "Devices", icon: "📱", color: "from-purple-500 to-purple-600" }
              ].map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className={`bg-gradient-to-br ${product.color} rounded-xl p-8 text-center text-white shadow-xl hover:shadow-2xl transition-all duration-300`}
                >
                  <div className="text-6xl mb-6">{product.icon}</div>
                  <h3 className="text-2xl font-bold mb-4">{product.title}</h3>
                  <p className="text-lg opacity-90">{product.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>
        {/* footer */}
        <Footer />
      </div>

    </div>
  );
};

export default Home;
