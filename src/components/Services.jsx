"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "./Footer";

const Services = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const navRef = useRef(null);

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
      i18n.changeLanguage("ja");
      localStorage.setItem("language", "ja");
    }
  }, [i18n]);


  const handleDropdownToggle = (itemName) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  // Table of contents items
  const tocItems = [
    t("mobile_communication"),
    t("ict_solution"),
    t("engineering"),
    t("human_resource"),
    t("staffing"),
    t("recruitment"),
    t("bpo_services"),
    t("entertainment"),
    t("event_production")
  ];

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
      <nav ref={navRef} className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Row - Logo, Company Name, and Utility Links */}
          <div className="flex justify-between items-center h-16">
            {/* Left Section - Logo and Company Name */}
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
              <Link
                to="/inquiry"
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200"
              >
                {t("contact_us")}
              </Link>
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


        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t("services_title")}
          </h1>
          <p className="text-xl text-gray-600">{t("services")}</p>
        </motion.div>

        {/* Table of Contents */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gray-50 rounded-lg p-6 md:p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t("table_of_contents")}</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {tocItems.map((item, index) => (
              <li key={index}>
                <a
                  href={`#${item.replace(/\s+/g, '-').toLowerCase()}`}
                  className="hover:underline transition-colors"
                  style={{ color: '#E02B8A' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#C0257A'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#E02B8A'}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Mobile Communication Section */}
        <motion.section
          id="mobile-communication"
          className="py-16 bg-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">{t("mobile_communication")}</h2>
            
            <div className="space-y-16">
              {/* Mobile Subsection */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">{t("mobile")}</h3>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>{t("mobile_desc")}</p>
                  <p>{t("mobile_desc2")}</p>
                </div>
              </div>

              {/* Network Subsection */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">{t("network")}</h3>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>{t("network_desc")}</p>
                  <p>{t("network_desc2")}</p>
                </div>
              </div>

              {/* Process Flow */}
              <div className="mt-16 pt-8 border-t-2 border-gray-200">
                <div className="overflow-x-auto pb-6 -mx-4 px-4">
                  <div className="flex gap-3 md:gap-4 min-w-max items-start">
                    {processSteps.map((step, index) => (
                      <React.Fragment key={index}>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.05 }}
                          className="flex-shrink-0 w-28 md:w-36 lg:w-40"
                        >
                          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 md:p-4 text-center hover:shadow-lg transition-all border-2 border-blue-200 min-h-[120px] md:min-h-[140px] flex flex-col justify-center">
                            <div className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#E02B8A' }}>{step.step}</div>
                            <div className="text-xs md:text-sm text-gray-700 font-medium leading-tight">{step.title}</div>
                          </div>
                        </motion.div>
                        {index < processSteps.length - 1 && (
                          <div className="hidden md:flex items-center justify-center pt-8 px-2">
                            <svg className="w-5 h-5 md:w-6 md:h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-gray-300"></div>
        </motion.section>

        {/* ICT Solution Section */}
        <motion.section
          id="ict-solution"
          className="py-16 bg-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">{t("ict_solution")}</h2>
            
            <div className="space-y-16">
              {/* System Development Subsection */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">{t("system_development")}</h3>
                <p className="text-gray-700 leading-relaxed">{t("system_development_desc")}</p>
              </div>

              {/* Infrastructure Construction Subsection */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">{t("infrastructure_construction")}</h3>
                <p className="text-gray-700 leading-relaxed">{t("infrastructure_construction_desc")}</p>
              </div>
            </div>
          </div>
          <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-gray-300"></div>
        </motion.section>

        {/* Engineering Section */}
        <motion.section
          id="engineering"
          className="py-16 bg-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">{t("engineering")}</h2>
            
            <div className="space-y-16">
              {/* Network Camera Subsection */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">{t("network_camera")}</h3>
                <p className="text-gray-700 leading-relaxed">{t("network_camera_desc")}</p>
              </div>

              {/* Access Control System Subsection */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">{t("access_control_system")}</h3>
                <p className="text-gray-700 leading-relaxed">{t("access_control_system_desc")}</p>
              </div>

              {/* LAN and Low-voltage Electrical Work Subsection */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">{t("lan_electrical_work")}</h3>
                <p className="text-gray-700 leading-relaxed">{t("lan_electrical_work_desc")}</p>
              </div>
            </div>
          </div>
          <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-gray-300"></div>
        </motion.section>

        {/* Human Resource Solutions Section */}
        <motion.section
          id="human-resource"
          className="py-16 bg-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">{t("human_resource")}</h2>
            
            <div className="space-y-16">
              {/* Staffing Subsection */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">{t("staffing")}</h3>
                <p className="text-gray-700 leading-relaxed">{t("staffing_desc")}</p>
              </div>

              {/* Recruitment Subsection */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">{t("recruitment")}</h3>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>{t("recruitment_desc")}</p>
                  <p>{t("recruitment_desc2")}</p>
                </div>
              </div>

              {/* BPO Services Subsection */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">{t("bpo_services")}</h3>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>{t("bpo_services_desc")}</p>
                  <p>{t("bpo_services_desc2")}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-gray-300"></div>
        </motion.section>

        {/* Entertainment Section */}
        <motion.section
          id="entertainment"
          className="py-16 bg-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">{t("entertainment")}</h2>
            
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">{t("event_production")}</h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>{t("event_production_desc")}</p>
                <p>{t("event_production_desc2")}</p>
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
