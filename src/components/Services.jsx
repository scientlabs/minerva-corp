"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "./Footer";
import { getNavItems } from "../common/navItems";
import ictSystemDevelopmentImage from "../assets/ict_system_development.jpg";
import mobileEngineeringImage from "../assets/mobile_engineering.jpg";
import mobileOptimizationImage from "../assets/mobile_optimization.jpg";
import coreNetworkImage from "../assets/core-network_image.jpg";
import ictInfrastructureConstructionImage from "../assets/ict_infrastructure_construction.jpg";
import hrStaffingImage from "../assets/hr_staffing.jpg";
import hrRecruitmentImage from "../assets/hr_recruitment.jpg";
import hrBpoServicesImage from "../assets/hr_bpo.jpg";
import entertainmentImage from "../assets/entertainment_event.jpg";
import engineeringNetworkCameraImage from "../assets/engineering_network_camera.jpg";
import engineeringAccessControlSystemImage from "../assets/engineering_access_control.jpg";
import engineeringLanElectricalWorkImage from "../assets/engineering_lan.jpg";

const Services = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hoveredNavItem, setHoveredNavItem] = useState(null);
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const navRef = useRef(null);
  const [activeNavItem, setActiveNavItem] = useState('services');
  const location = useLocation();
  
  const navItems = getNavItems(t);

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
  const [activeSection, setActiveSection] = useState('mobile-communication');
  
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
      setCurrentLang(savedLanguage);
    } else {
      i18n.changeLanguage("ja");
      localStorage.setItem("language", "ja");
    }
  }, [i18n]);

  // Handle hash navigation on page load and hash changes
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      // Wait for the page to fully render
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          const navHeight = navRef.current?.offsetHeight || 0;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navHeight - 20;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          // Update active section
          setActiveSection(hash.substring(1));
        }
      }, 100);
    }
  }, [location]);

  const handleDropdownToggle = (itemName) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  // Table of contents items with IDs
  const tocItems = [
    { id: "mobile-communication", label: t("mobile_communication") },
    { id: "ict-solution", label: t("ict_solution") },
    { id: "engineering", label: t("engineering") },
    { id: "human-resource", label: t("human_resource") },
    { id: "entertainment", label: t("entertainment") }
  ];

  // Section IDs (static, never change)
  const sectionIds = ["mobile-communication", "ict-solution", "engineering", "human-resource", "entertainment"];

  // Intersection Observer to track active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle TOC click with smooth scroll
  const handleTocClick = (e, itemId) => {
    e.preventDefault();
    setActiveSection(itemId);
    const element = document.getElementById(itemId);
    if (element) {
      const navHeight = navRef.current?.offsetHeight || 0;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight - 20;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Process steps for Mobile Communication
  const processSteps = [
    { step: "01", title: t("area_simulation") },
    { step: "02", title: t("location_negotiation") },
    { step: "03", title: t("regulatory_check") },
    { step: "04", title: t("survey_design") },
    { step: "05", title: t("strength_analysis") },
    { step: "06", title: t("contract_signing") },
    { step: "07", title: t("construction_meeting") },
    { step: "08", title: t("resident_tenant_response") },
    { step: "09", title: t("construction_start") },
    { step: "10", title: t("radio_emission") },
    { step: "11", title: t("completion") }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <nav ref={navRef} className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left Section - Logo */}
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-3">
                <img
                  src={'https://minerva-corp.com/wp-content/uploads/2024/12/MINERVA%E9%80%8F%E9%81%8E%E3%83%AD%E3%82%B4.png'}
                  alt="Minerva Logo"
                  className="h-5 sm:h-6 md:h-14 object-contain"
                />
              </Link>
            </div>

            <div className="flex items-center space-x-6">
              {navItems.map((item) => (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => setHoveredNavItem(item.id)}
                  onMouseLeave={() => setHoveredNavItem(null)}
                >
                  <Link
                    to={item.path}
                    className={`font-medium transition-all duration-300 px-3 py-1 rounded-full ${
                      activeNavItem === item.id
                        ? 'text-white shadow-md'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                    style={activeNavItem === item.id ? { backgroundColor: '#E02B8A' } : {}}
                  >
                    {item.label}
                  </Link>
                  
                  {/* Dropdown Menu */}
                  {hoveredNavItem === item.id && item.subItems && item.subItems.length > 0 && (
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

      {/* Fixed Table of Contents */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
      >
        <ul className="space-y-3">
          {tocItems.map((item, index) => {
            const isActive = activeSection === item.id;
            return (
              <li key={index} className="flex items-center">
                <span 
                  className={`mr-2 w-2 h-2 rounded-full flex-shrink-0 transition-all duration-200 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ backgroundColor: '#E02B8A' }}
                />
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleTocClick(e, item.id)}
                  className={`block transition-all duration-200 text-sm py-1 ${
                    isActive
                      ? 'font-bold'
                      : 'hover:underline'
                  }`}
                  style={{
                    color: '#E02B8A'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#C0257A';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#E02B8A';
                    }
                  }}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ color: '#E02B8A' }}>
            {t("services")}
          </h1>
          {/* <p className="text-xl text-gray-600">{t("services")}</p> */}
        </motion.div>

        {/* Mobile Communication Section */}
        <motion.section
          id="mobile-communication"
          className="bg-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Dark Blue Header Banner */}
          <div className="bg-blue-900 py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white">{t("mobile_communication")}</h2>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="space-y-20">
              {/* Mobile Engineering Subsection - Text Left, Image Right */}
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="flex-1">
                  <h3 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#1e3a8a' }}>
                    {t("mobile_engineering")}
                  </h3>
                  <div className="w-20 h-1 mb-6" style={{ backgroundColor: '#1e3a8a' }}></div>
                  <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                    <p>{t("mobile_desc")}</p>
                    <p>{t("mobile_desc2")}</p>
                  </div>
                </div>
                <div className="flex-1">
                  <img
                    src={mobileEngineeringImage}
                    alt="Mobile Engineering"
                    className="w-full h-auto rounded-lg shadow-lg object-cover"
                  />
                </div>
              </div>

              {/* Optimization Subsection - Image Left, Text Right */}
              <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
                <div className="flex-1">
                  <h3 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#1e3a8a' }}>
                    {t("optimization")}
                  </h3>
                  <div className="w-20 h-1 mb-6" style={{ backgroundColor: '#1e3a8a' }}></div>
                  <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                    <p>{t("optimization_desc")}</p>
                    <p>{t("optimization_desc2")}</p>
                  </div>
                </div>
                <div className="flex-1">
                  <img
                    src={mobileOptimizationImage}
                    alt="Optimization"
                    className="w-full h-auto rounded-lg shadow-lg object-cover"
                  />
                </div>
              </div>

              {/* Core Network Subsection - Text Left, Image Right */}
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="flex-1">
                  <h3 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#1e3a8a' }}>
                    {t("core_network")}
                  </h3>
                  <div className="w-20 h-1 mb-6" style={{ backgroundColor: '#1e3a8a' }}></div>
                  <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                    <p>{t("network_desc")}</p>
                    <p>{t("network_desc2")}</p>
                  </div>
                </div>
                <div className="flex-1">
                  <img
                    src={coreNetworkImage}
                    alt="Core Network"
                    className="w-full h-auto rounded-lg shadow-lg object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-300"></div>
        </motion.section>

        {/* ICT Solution Section */}
        <motion.section
          id="ict-solution"
          className="bg-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Dark Blue Header Banner */}
          <div className="bg-blue-900 py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white">{t("ict_solution")}</h2>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="space-y-20">
              {/* System Development Subsection - Text Left, Image Right */}
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="flex-1">
                  <h3 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#1e3a8a' }}>
                    {t("system_development")}
                  </h3>
                  <div className="w-20 h-1 mb-6" style={{ backgroundColor: '#1e3a8a' }}></div>
                  <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                    <p>{t("system_development_desc")}</p>
                  </div>
                </div>
                <div className="flex-1">
                  <img
                    src={ictSystemDevelopmentImage}
                    alt="System Development"
                    className="w-full h-auto rounded-lg shadow-lg object-cover"
                  />
                </div>
              </div>

              {/* Infrastructure Construction Subsection - Image Left, Text Right */}
              <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
                <div className="flex-1">
                  <h3 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#1e3a8a' }}>
                    {t("infrastructure_construction")}
                  </h3>
                  <div className="w-20 h-1 mb-6" style={{ backgroundColor: '#1e3a8a' }}></div>
                  <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                    <p>{t("infrastructure_construction_desc")}</p>
                  </div>
                </div>
                <div className="flex-1">
                  <img
                    src={ictInfrastructureConstructionImage}
                    alt="Infrastructure Construction"
                    className="w-full h-auto rounded-lg shadow-lg object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-300"></div>
        </motion.section>

        {/* Engineering Section */}
        <motion.section
          id="engineering"
          className="bg-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Dark Blue Header Banner */}
          <div className="bg-blue-900 py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white">{t("engineering")}</h2>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="space-y-20">
              {/* Network Camera Subsection - Text Left, Image Right */}
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="flex-1">
                  <h3 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#1e3a8a' }}>
                    {t("network_camera")}
                  </h3>
                  <div className="w-20 h-1 mb-6" style={{ backgroundColor: '#1e3a8a' }}></div>
                  <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                    <p>{t("network_camera_desc")}</p>
                  </div>
                </div>
                <div className="flex-1">
                  <img
                    src={engineeringNetworkCameraImage}
                    alt="Network Camera"
                    className="w-full h-auto rounded-lg shadow-lg object-cover"
                  />
                </div>
              </div>

              {/* Access Control System Subsection - Image Left, Text Right */}
              <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
                <div className="flex-1">
                  <h3 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#1e3a8a' }}>
                    {t("access_control_system")}
                  </h3>
                  <div className="w-20 h-1 mb-6" style={{ backgroundColor: '#1e3a8a' }}></div>
                  <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                    <p>{t("access_control_system_desc")}</p>
                  </div>
                </div>
                <div className="flex-1">
                  <img
                    src={engineeringAccessControlSystemImage}
                    alt="Access Control System"
                    className="w-full h-auto rounded-lg shadow-lg object-cover"
                  />
                </div>
              </div>

              {/* LAN and Low-voltage Electrical Work Subsection - Text Left, Image Right */}
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="flex-1">
                  <h3 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#1e3a8a' }}>
                    {t("lan_electrical_work")}
                  </h3>
                  <div className="w-20 h-1 mb-6" style={{ backgroundColor: '#1e3a8a' }}></div>
                  <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                    <p>{t("lan_electrical_work_desc")}</p>
                  </div>
                </div>
                <div className="flex-1">
                  <img
                    src={engineeringLanElectricalWorkImage}
                    alt="LAN and Low-voltage Electrical Work"
                    className="w-full h-auto rounded-lg shadow-lg object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-300"></div>
        </motion.section>

        {/* Human Resource Solutions Section */}
        <motion.section
          id="human-resource"
          className="bg-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Dark Blue Header Banner */}
          <div className="bg-blue-900 py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white">{t("human_resource")}</h2>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="space-y-20">
              {/* Staffing Subsection - Text Left, Image Right */}
              <div id="staffing" className="flex flex-col lg:flex-row items-center gap-12">
                <div className="flex-1">
                  <h3 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#1e3a8a' }}>
                    {t("staffing")}
                  </h3>
                  <div className="w-20 h-1 mb-6" style={{ backgroundColor: '#1e3a8a' }}></div>
                  <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                    <p>{t("staffing_desc")}</p>
                  </div>
                </div>
                <div className="flex-1">
                  <img
                    src={hrStaffingImage}
                    alt="Staffing"
                    className="w-full h-auto rounded-lg shadow-lg object-cover"
                  />
                </div>
              </div>

              {/* Recruitment Subsection - Image Left, Text Right */}
              <div id="recruitment" className="flex flex-col lg:flex-row-reverse items-center gap-12">
                <div className="flex-1">
                  <h3 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#1e3a8a' }}>
                    {t("recruitment")}
                  </h3>
                  <div className="w-20 h-1 mb-6" style={{ backgroundColor: '#1e3a8a' }}></div>
                  <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                    <p>{t("recruitment_desc")}</p>
                    <p>{t("recruitment_desc2")}</p>
                  </div>
                </div>
                <div className="flex-1">
                  <img
                    src={hrRecruitmentImage}
                    alt="Recruitment"
                    className="w-full h-auto rounded-lg shadow-lg object-cover"
                  />
                </div>
              </div>

              {/* BPO Services Subsection - Text Left, Image Right */}
              <div id="bpo-services" className="flex flex-col lg:flex-row items-center gap-12">
                <div className="flex-1">
                  <h3 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#1e3a8a' }}>
                    {t("bpo_services")}
                  </h3>
                  <div className="w-20 h-1 mb-6" style={{ backgroundColor: '#1e3a8a' }}></div>
                  <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                    <p>{t("bpo_services_desc")}</p>
                    <p>{t("bpo_services_desc2")}</p>
                  </div>
                </div>
                <div className="flex-1">
                  <img
                    src={hrBpoServicesImage}
                    alt="BPO Services"
                    className="w-full h-auto rounded-lg shadow-lg object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-300"></div>
        </motion.section>

        {/* Entertainment Section */}
        <motion.section
          id="entertainment"
          className="bg-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Dark Blue Header Banner */}
          <div className="bg-blue-900 py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white">{t("entertainment")}</h2>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="space-y-20">
              {/* Event Production Subsection - Text Left, Image Right */}
              <div id="event-production" className="flex flex-col lg:flex-row items-center gap-12">
                <div className="flex-1">
                  <h3 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#1e3a8a' }}>
                    {t("event_production")}
                  </h3>
                  <div className="w-20 h-1 mb-6" style={{ backgroundColor: '#1e3a8a' }}></div>
                  <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                    <p>{t("event_production_desc")}</p>
                    <p>{t("event_production_desc2")}</p>
                  </div>
                </div>
                <div className="flex-1">
                  <img
                    src={entertainmentImage}
                    alt="Event Production"
                    className="w-full h-auto rounded-lg shadow-lg object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Inquiry Section */}
        <motion.section
          id="inquiry-section"
          className="py-16 bg-blue-50"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{t("inquiry")}</h2>
            <p className="text-gray-700 mb-8 text-lg">{t("inquiry_desc")}</p>
            <Link
              to="/inquiry"
              className="inline-block px-8 py-3 text-white rounded-lg font-medium transition-colors duration-200"
              style={{ backgroundColor: '#E02B8A' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#C0257A'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#E02B8A'}
            >
              {t("view_more")}
            </Link>
          </div>
        </motion.section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Services;
