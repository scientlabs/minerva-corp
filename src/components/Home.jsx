"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Section from "./Section";
import Footer from "./Footer";
import VideoSlider from "./VideoSlider";
import FlipCard from "./FlipCard";
import ScrollCircularReveal from "./ScrollCircularReveal";
import FloatingNav from "./FloatingNav";
import ScrollIndicators from "./ScrollIndicators";

const Home = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const scrollRef = useRef(null);
  const navRef = useRef(null);
  const [isContactSectionVisible, setIsContactSectionVisible] = useState(false);
  // const { scrollYProgress } = useScroll();

  // As you scroll, the circle radius grows (covering more area)
  // const clipSize = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };


  // Handle clicks outside navigation to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const productItems = [
    { title: t("security_camera_system"), description: "TSP-PT-5M", icon: "🌐", image: "https://www.tspco.jp/wp-content/uploads/top_productimg01.png", color: "from-blue-500 to-blue-600" },
    { title: t("access_control_system"), description: "TSP-W1-0412", icon: "⚙️", image: "	https://www.tspco.jp/wp-content/uploads/top_productimg02.png", color: "from-green-500 to-green-600" },
    { title: t("network_equipment"), description: "8ポートギガビットイーサネットPoE+スイッチ", icon: "📱", image: "https://www.tspco.jp/wp-content/uploads/top_productimg03.png", color: "from-purple-500 to-purple-600" },
    { title: t("solution_products"), description: "TSP-S01", icon: "📱", image: "https://www.tspco.jp/wp-content/uploads/top_productimg04.png", color: "from-purple-500 to-purple-600" },
    { title: t("other_products"), description: "TSP-S01", icon: "📱", image: "	https://www.tspco.jp/wp-content/uploads/top_productimg05.png", color: "from-purple-500 to-purple-600" }
  ];

  const serviceItems = [
    {
      title: t("mobile_communication"),
      description: t("mobile_communication_desc"),
      image: 'https://minerva-corp.com/wp-content/uploads/2025/06/２-1536x1024.jpg',
      imageAlt: "Mobile Communication"
    },
    {
      title: t("ict_solution"),
      description: t("ict_solution_desc"),
      image: 'https://minerva-corp.com/wp-content/uploads/2025/06/４.jpg',
      imageAlt: "ICT Solution"
    },
    {
      title: t("security"),
      description: t("security_desc"),
      image: 'https://minerva-corp.com/wp-content/uploads/2025/10/トップ→セキュリティ.jpg',
      imageAlt: "Security"
    },
    {
      title: t("engineering"),
      description: t("engineering_desc"),
      image: 'https://minerva-corp.com/wp-content/uploads/2025/06/３.jpg',
      imageAlt: "Engineering"
    },
    {
      title: t("human_resource"),
      description: t("human_resource_desc"),
      image: 'https://minerva-corp.com/wp-content/uploads/2025/06/５.jpg',
      imageAlt: "Human Resource"
    },
    {
      title: t("entertainment"),
      description: t("entertainment_desc"),
      image: 'https://minerva-corp.com/wp-content/uploads/2025/06/５－２　エンターテインメント.jpg',
      imageAlt: "Entertainment"
    }
  ];

  const handleDropdownToggle = (itemName) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  // Scroll detection for Contact section
  useEffect(() => {
    const handleScroll = () => {
      const contactSection = document.getElementById('contactus');
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        const navbar = document.querySelector('nav');
        const navbarHeight = navbar?.getBoundingClientRect().height || 0;
        const floatingNavHeight = 56;
        const totalOffset = navbarHeight + floatingNavHeight + 50;

        // Check if section is visible in viewport (with some threshold)
        const sectionTop = rect.top;
        const sectionBottom = rect.bottom;
        const viewportTop = totalOffset;
        const viewportBottom = window.innerHeight;

        // Section is visible if it's within the viewport
        const isVisible = sectionTop <= viewportBottom * 0.7 && sectionBottom >= viewportTop;
        setIsContactSectionVisible(isVisible);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <nav ref={navRef} className="bg-white border-b border-gray-200 sticky top-0 z-50">
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
                  src={'https://minerva-corp.com/wp-content/uploads/2024/12/MINERVA%E9%80%8F%E9%81%8E%E3%83%AD%E3%82%B4.png'}
                  alt="Minerva Logo"
                  className="h-5 sm:h-6 md:h-14 object-contain"
                />
              </div>
            </div>

            <div className="flex items-center space-x-6">
              {/* <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200">
                {t("contact_us")}
              </a> */}
              <button
                onClick={() => {
                  setActiveDropdown(null);
                  const contactSection = document.getElementById('contactus');
                  if (contactSection) {
                    const navbar = document.querySelector('nav');
                    const navbarHeight = navbar?.getBoundingClientRect().height || 0;
                    const floatingNavHeight = 56;
                    const offset = navbarHeight + floatingNavHeight + 20;
                    const elementPosition = contactSection.getBoundingClientRect().top + window.scrollY;

                    window.scrollTo({
                      top: elementPosition - offset,
                      behavior: 'smooth'
                    });
                  }
                }}
                className={`font-medium transition-all duration-300 px-3 py-1 rounded-full ${isContactSectionVisible
                    ? 'text-white shadow-md'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                style={isContactSectionVisible ? { backgroundColor: '#E02B8A' } : {}}
              >
                {t("contact_us")}
              </button>
              <button
                type="button"
                onClick={() => {
                  const next = currentLang === "ja" ? "en" : "ja";
                  i18n.changeLanguage(next);
                  setCurrentLang(next);
                  localStorage.setItem("language", next);
                }}
                className="text-gray-700 transition-colors duration-200 focus:outline-none rounded font-medium flex items-center space-x-2 group"
                onMouseEnter={(e) => e.currentTarget.style.color = '#E02B8A'}
                onMouseLeave={(e) => e.currentTarget.style.color = ''}
                aria-pressed={currentLang === "ja" ? "false" : "true"}
                title="Toggle language"
              >
                <FontAwesomeIcon icon={faGlobe} />
                <span>{currentLang === "ja" ? t("japanese") : "ENGLISH"}</span>
              </button>
            </div>

          </div>



        </div>
      </nav>

      {/* Floating Navigation Bar */}
      <FloatingNav />

      {/* Fixed Background Video Slider (plays one video at a time) */}
      <div className="fixed inset-0 z-0">
        {/* Video slider component */}
        <VideoSlider />




        <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/30">
          <div className="flex flex-col justify-center w-full px-4 md:px-20 py-8 md:py-12 space-y-8">
            <motion.div
              className="text-left leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 2,
                ease: "easeOut"
              }}
            >
              <div className="text-5xl md:text-7xl lg:text-9xl font-normal text-white">
                {t("empowering_your_future")}
              </div>
            </motion.div>

            <motion.div
              className="text-right leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 2,
                delay: 0.3,
                ease: "easeOut"
              }}
            >
              <div className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal text-white">
                {t("ict_header")}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="h-[100vh]"></div>
      {/* Scrollable Content Over Fixed Background */}
      <div className="relative z-40 bg-transparent pt-14">
        {/* Add padding-top to account for floating nav */}

        {/* Japanese Text Section */}
        <Section id="japanese-text" className="py-32 bg-white/90 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Side - Main Headline */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center lg:text-left"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  {t("leading_change")}
                </h1>
              </motion.div>


              { /* Right Side - Body Text */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center lg:text-left"
              >

                <div className="space-y-4 text-xl md:text-2xl leading-relaxed">
                  <p>{t("5g_ai_lead")}</p>
                  <p>{t("various_changes")}</p>
                  <p className="mt-6">{t("make_tomorrow_better")}</p>
                  <p>{t("in_order_to")}</p>
                  <p>{t("use_technology")}</p>
                  <p>{t("solving_issues")}</p>
                </div>
                <div className="flex justify-end">
                  <Link
                    to="/about"
                    className="mt-8 px-6 py-3 text-white rounded-full transition-colors duration-200"
                    style={{ backgroundColor: '#E02B8A' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#C0257A'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#E02B8A'}>
                    {t("learn_more_about_us")}
                  </Link>
                </div>
              </motion.div>

            </div>
          </div>
        </Section>
        <div className="relative">
          <Section id="services-header" className="bg-white" title={t("services")} bgColor="bg-white">
          </Section>
          {/* <div className="absolute right-0 top-0 bottom-0 w-2 md:w-5" style={{ backgroundColor: '#E02B8A' }}></div> */}
        </div>

        {serviceItems.map((item, index) => (
          <section key={index} id={item.title} className="w-full overflow-x-hidden backdrop-blur-sm py-2 px-4 sm:px-6 lg:px-8">
            <div>
              <FlipCard
                title={item.title}
                description={item.description}
                image={item.image}
                imageAlt={item.imageAlt}
                linkTo="/services"
              />
            </div>
          </section>
        ))}


        {/* Products Section */}
        <section id="products" className="w-full py-16 md:py-20 bg-white/90 backdrop-blur-sm">
          <div className="w-full relative">
            {/* Title and More Button */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex justify-between items-center">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-6xl font-bold"
                // style={{ color: '#E02B8A' }}
              >
                {t("products")}
              </motion.h2>
              <Link
                to="/products"
                className="px-6 py-3 text-white rounded-full transition-colors duration-200"
                style={{ backgroundColor: '#E02B8A' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#C0257A'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#E02B8A'}>
                <span className="flex items-center gap-2">
                  {t("view_all")} <FaChevronRight className="text-white text-sm" />
                </span>
              </Link>
            </div>

            {/* Scroll Buttons */}
            <button
              onClick={scrollLeft}
              className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-4 rounded-full z-20 transition backdrop-blur-sm shadow-lg"
              aria-label="Scroll left"
            >
              <FaChevronLeft size={24} />
            </button>

            <button
              onClick={scrollRight}
              className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-4 rounded-full z-20 transition backdrop-blur-sm shadow-lg"
              aria-label="Scroll right"
            >
              <FaChevronRight size={24} />
            </button>

            {/* Horizontal Scroll Container - Full Width */}
            <div
              ref={scrollRef}
              className="flex gap-6 md:gap-8 lg:gap-12 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory px-4 md:px-8 lg:px-12 py-8"
              style={{ 
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {productItems.map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex-shrink-0 w-80 md:w-96 lg:w-[450px] bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 snap-center overflow-hidden"
                >
                  {/* Product Image */}
                  <div className="w-full h-64 md:h-80 bg-white flex items-center justify-center p-6">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-contain" 
                    />
                  </div>
                  
                  {/* Separator Line */}
                  <div className="border-t border-gray-200 mx-4"></div>
                  
                  {/* Text Content */}
                  <div className="p-4 md:p-6">
                    
                    {/* Title with Link and Navigation Icon */}
                    <Link 
                      to="/products"
                      className="flex items-center justify-between group"
                    >
                      <h3 
                        className="text-lg md:text-xl font-bold flex-1"
                        style={{ color: '#E02B8A' }}
                      >
                        {product.title}
                      </h3>
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center ml-3 flex-shrink-0 transition-transform group-hover:translate-x-1"
                        style={{ backgroundColor: '#E02B8A' }}
                      >
                        <FaChevronRight className="text-white text-sm" />
                      </div>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <Section id="contactus" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold text-center mb-12 text-gray-900"
            >
              {t("inquiry")}
              <p className="text-xl flex justify-end">TEL: 03-5738-7123</p>
            </motion.h2>
            <p className="text-xl md:text-2xl text-center">{t("inquiry_desc")}</p>
            <div className="flex justify-end">

              <Link
                to="/inquiry"
                className="mt-8 px-6 py-3 text-white rounded-full transition-colors duration-200"
                style={{ backgroundColor: '#E02B8A' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#C0257A'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#E02B8A'}>
                {t("inquiry_here")}
              </Link>
            </div>
          </div>
        </Section>
        {/* footer */}
        <Footer />
      </div>

      <ScrollIndicators />
    </div>
  );
};

export default Home;
