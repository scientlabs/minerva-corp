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
import ScrollIndicators from "./ScrollIndicators";
import MinervaLogo from "../assets/MINERVA-logo.png";
import { getNavItems } from "../common/navItems";
import EntertainmentImage from "../assets/Entertainment.jpg";
import MobileCommunicationImage from "../assets/mobile_communication.jpg";
import ICTSolutionImage from "../assets/ict_solution.jpg";
import SecurityImage from "../assets/securityimage.jpg";
import EngineeringImage from "../assets/engineering.jpg";
import HumanResourceImage from "../assets/human_resource.jpg";

// Scroll-based animated card component
const ScrollAnimatedCard = ({ item, index, to }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center", "end start"]
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1, 0.7]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  
  return (
    <motion.div
      ref={cardRef}
      style={{ scale, opacity }}
    >
      <Link
        to={to}
        className="w-full h-full flex flex-col items-center bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      >
        <section
          id={item.title}
          className="w-full h-full flex flex-col items-center"
        >
          <div className="w-full h-4/5 overflow-hidden">
            <img
              src={item.image}
              alt={item.imageAlt || item.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 w-full">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 text-center">
              {item.title}
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-center">
              {item.description}
            </p>
          </div>
        </section>
      </Link>
    </motion.div>
  );
};

const Home = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hoveredNavItem, setHoveredNavItem] = useState(null);
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const scrollRef = useRef(null);
  const navRef = useRef(null);
  const servicesRef = useRef(null);
  const productsRef = useRef(null);
  const [isContactSectionVisible, setIsContactSectionVisible] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState('');

  // Scroll tracking for services section background transition
  const { scrollYProgress: servicesScrollProgress } = useScroll({
    target: servicesRef,
    offset: ["start 0.9", "start 0.1"]
  });

  // Scroll tracking for products section background transition (from dark to white/80)
  const { scrollYProgress: productsScrollProgress } = useScroll({
    target: productsRef,
    offset: ["start 0.9", "start 0.1"]
  });

  // Interpolate background color from white to #1E2635 (for services section)
  // #1E2635 = rgb(30, 38, 53)
  const servicesBackgroundColor = useTransform(
    servicesScrollProgress,
    [0, 1],
    ["rgb(255, 255, 255)", "rgb(30, 38, 53)"]
  );

  // Immediate background color switch to white/80 when products section is active
  // white/80 = rgba(255, 255, 255, 0.8)
  const productsBackgroundColor = useTransform(
    productsScrollProgress,
    (products) => {
      // Immediately switch to white/80 when products section is active
      return products > 0 ? "rgba(255, 255, 255, 0.8)" : "rgb(30, 38, 53)";
    }
  );

  // Combined background color: immediately switch to white/80 when products section is active
  const backgroundColor = useTransform(
    [servicesScrollProgress, productsScrollProgress],
    ([services, products]) => {
      // If products section is being scrolled (products > 0), immediately use white/80
      // Otherwise use servicesBackgroundColor
      if (products > 0) {
        // Immediately switch to white/80
        return `rgba(255, 255, 255, 0.8)`;
      } else {
        // Interpolate from white to #1E2635 based on services scroll progress
        const r = 255 - (255 - 30) * services;
        const g = 255 - (255 - 38) * services;
        const b = 255 - (255 - 53) * services;
        return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
      }
    }
  );

  // Interpolate text color from dark (gray-900) to white
  const titleColor = useTransform(
    servicesScrollProgress,
    [0, 1],
    ["rgb(17, 24, 39)", "rgb(255, 255, 255)"] // gray-900 to white
  );

  // Interpolate text color from white back to dark (for products section)
  const productsTextColor = useTransform(
    productsScrollProgress,
    [0, 1],
    ["rgb(255, 255, 255)", "rgb(17, 24, 39)"] // white to gray-900
  );

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
    // { title: t("solution_products"), description: "TSP-S01", icon: "📱", image: "https://www.tspco.jp/wp-content/uploads/top_productimg04.png", color: "from-purple-500 to-purple-600" },
    { title: t("other_products"), description: "TSP-S01", icon: "📱", image: "	https://www.tspco.jp/wp-content/uploads/top_productimg05.png", color: "from-purple-500 to-purple-600" }
  ];

  const navItems = getNavItems(t);

  const serviceItems = [
    {
      title: t("mobile_communication"),
      description: t("mobile_communication_desc"),
      image: MobileCommunicationImage,
      imageAlt: "Mobile Communication",
      link: "/services#mobile-communication"
    },
    {
      title: t("ict_solution"),
      description: t("ict_solution_desc"),
      image: ICTSolutionImage,
      imageAlt: "ICT Solution",
      link: "/services#ict-solution"
    },
    {
      title: t("security"),
      description: t("security_desc"),
      image: SecurityImage,
      imageAlt: "Security",
      link: "/services#engineering"
    },
    {
      title: t("engineering"),
      description: t("engineering_desc"),
      image: EngineeringImage,
      imageAlt: "Engineering",
      link: "/services#engineering"
    },
    {
      title: t("human_resource"),
      description: t("human_resource_desc"),
      image: HumanResourceImage,
      imageAlt: "Human Resource",
      link: "/services#human-resource"
    },
    {
      title: t("entertainment"),
      description: t("entertainment_desc"),
      image: EntertainmentImage,
      imageAlt: "Entertainment",
      link: "/services#entertainment"
    }
  ];

  const handleDropdownToggle = (itemName) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  // Scroll detection for active section and Contact section
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('nav');
      const navbarHeight = navbar?.getBoundingClientRect().height || 0;
      const scrollPosition = window.scrollY + navbarHeight + 100;

      // Check contact section visibility
      const contactSection = document.getElementById('contactus');
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        const floatingNavHeight = 56;
        const totalOffset = navbarHeight + floatingNavHeight + 50;
        const sectionTop = rect.top;
        const sectionBottom = rect.bottom;
        const viewportTop = totalOffset;
        const viewportBottom = window.innerHeight;
        const isVisible = sectionTop <= viewportBottom * 0.7 && sectionBottom >= viewportTop;
        setIsContactSectionVisible(isVisible);

        // If contact section is visible, set it as active
        if (isVisible) {
          setActiveNavItem('contact');
          return;
        }
      }

      // Find which section is currently in view
      const sections = navItems.map(item => {
        const element = document.getElementById(item.sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          const elementBottom = elementTop + rect.height;

          return {
            id: item.id,
            top: elementTop,
            bottom: elementBottom,
            isInView: scrollPosition >= elementTop - 150 && scrollPosition < elementBottom - 100
          };
        }
        return null;
      }).filter(Boolean);

      // Find the first section that's in view
      const currentSection = sections.find(s => s.isInView);

      if (currentSection) {
        setActiveNavItem(currentSection.id);
      } else if (sections.length > 0) {
        if (window.scrollY < 100) {
          setActiveNavItem('');
        } else {
          // Find the closest section above current scroll position
          const sortedSections = sections.sort((a, b) => a.top - b.top);
          const closestSection = sortedSections.reduce((closest, section) => {
            if (section.top <= scrollPosition && section.top > (closest?.top || 0)) {
              return section;
            }
            return closest;
          }, null);
          if (closestSection) {
            setActiveNavItem(closestSection.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <nav ref={navRef} className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Row - Logo, Company Name, and Utility Links */}
          <div className="flex justify-between items-center h-16">
            {/* Left Section - Logo and Company Name */}
            <div className="flex items-center space-x-4">
              {/* Minerva Logo */}
              <div className="flex items-center space-x-3">
                <img
                  src={MinervaLogo}
                  alt="Minerva Logo"
                  className="h-5 sm:h-6 md:h-14 object-contain"
                />
              </div>
            </div>

            <div className="flex items-center space-x-6">
              {navItems.map((item) => (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => setHoveredNavItem(item.id)}
                  onMouseLeave={() => setHoveredNavItem(null)}
                >
                  <button
                    onClick={() => {
                      setActiveDropdown(null);
                      const section = document.getElementById(item.sectionId);
                      if (section) {
                        const navbar = document.querySelector('nav');
                        const navbarHeight = navbar?.getBoundingClientRect().height || 0;
                        const floatingNavHeight = 56;
                        const offset = navbarHeight + floatingNavHeight + 20;
                        const elementPosition = section.getBoundingClientRect().top + window.scrollY;

                        window.scrollTo({
                          top: elementPosition - offset,
                          behavior: 'smooth'
                        });
                      }
                    }}
                    className={`font-medium transition-all duration-300 px-3 py-1 rounded-full ${activeNavItem === item.id
                        ? 'text-white shadow-md'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    style={activeNavItem === item.id ? { backgroundColor: '#E02B8A' } : {}}
                  >
                    {item.label}
                  </button>
                  
                  {/* Dropdown Menu */}
                  {hoveredNavItem === item.id && item.subItems &&  item.subItems.length > 0 && (
                    <div 
                      className="absolute top-full left-0 pt-2 w-48 z-50"
                      onMouseEnter={() => setHoveredNavItem(item.id)}
                      onMouseLeave={() => setHoveredNavItem(null)}
                    >
                      <div className="bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                        <ul className="space-y-1">
                          {item.subItems.map((subItem, index) => {
                            const isActive = activeNavItem === item.id;
                            return (
                              <li key={index}>
                                <Link
                                  to={subItem.link}
                                  className={`block px-4 py-2 text-sm transition-colors ${
                                    isActive
                                      ? 'bg-pink-50 text-pink-600 font-medium'
                                      : 'text-gray-700 hover:bg-gray-100 hover:text-pink-600'
                                  }`}
                                >
                                  {subItem.label}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              ))}
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
      {/* <FloatingNav /> */}

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
                Empowering <br/> 
                Your&nbsp;
                <span className="bg-gradient-to-r from-pink-600 via-pink-500 to-white bg-clip-text text-transparent transition-colors duration-700">
                  Future
                </span>

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
        <motion.div style={{ backgroundColor }}>
          <Section id="japanese-text" className="py-32 bg-transparent">
            <div className="max-w-6xl mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left Side - Main Headline */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="text-center lg:text-left"
                >
                  <motion.h1
                    className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                    style={{ color: titleColor }}
                  >
                    {t("leading_change")}
                  </motion.h1>
                </motion.div>


                { /* Right Side - Body Text */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-center lg:text-left"
                >

                  <motion.div
                    className="space-y-4 text-xl md:text-2xl leading-relaxed"
                    style={{ color: titleColor }}
                  >
                    <p>{t("5g_ai_lead")}</p>
                    <p>{t("various_changes")}</p>
                    <p className="mt-6">{t("make_tomorrow_better")}</p>
                    <p>{t("in_order_to")}</p>
                    <p>{t("use_technology")}</p>
                    <p>{t("solving_issues")}</p>
                  </motion.div>
                  <div className="flex justify-end">
                    <Link
                      to="/about"
                      className="mt-8 px-6 py-3 text-white rounded-full transition-colors duration-100"
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
        </motion.div>
        
        {/* Spacing after Japanese Text Section */}
        <motion.div className="h-16 md:h-24" style={{ backgroundColor }}></motion.div>
        
          <div ref={servicesRef} id="services" className="relative">

           {/* Arrange services into 2 rows, each with 3 columns */}
           <motion.div
             className="w-full py-12 px-4 sm:px-6 lg:px-8"
             style={{ backgroundColor }}
           >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex justify-between items-center">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-6xl font-bold"
                style={{ color: titleColor }}
              >
                {t("services")}
              </motion.h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {serviceItems.slice(0, 4).map((item, index) => (
                <ScrollAnimatedCard
                  key={index}
                  item={item}
                  index={index}
                  to={item.link}
                />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-10">
              {serviceItems.slice(4, 6).map((item, index) => (
                <ScrollAnimatedCard
                  key={index + 4}
                  item={item}
                  index={index + 4}
                  to={item.link}
                />
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Spacing after Services Section */}
        <motion.div className="h-16 md:h-24" style={{ backgroundColor }}></motion.div>

        {/* Products Section */}
        <motion.section
          ref={productsRef}
          id="products"
          className="w-full py-16 md:py-20 backdrop-blur-sm"
          style={{ backgroundColor: productsBackgroundColor }}
        >
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
                <div
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
                </div>
              ))}
            </div>
          </div>
        </motion.section>
        
        {/* Spacing after Products Section */}
        <motion.div className="h-16 md:h-24" style={{ backgroundColor }}></motion.div>
        
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
