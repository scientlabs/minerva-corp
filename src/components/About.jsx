"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "./Footer";
import { getNavItems } from "../common/navItems";
import companyInfoImage from "../assets/company-info.jpg";
import MinervaLogo from "../assets/MINERVA-logo.png";


const About = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const navRef = useRef(null);
  const titleRef = useRef(null);
  const offsetRef = useRef(0);
  const lastScrollY = useRef(typeof window !== 'undefined' ? window.scrollY : 0);
  const [currentLang, setCurrentLang] = useState('ja');
  const [activeNavItem, setActiveNavItem] = useState('company');
  const [hoveredNavItem, setHoveredNavItem] = useState(null);
  const [activeSection, setActiveSection] = useState('greeting');
  const location = useLocation();

  const navItems = getNavItems(t);

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

  // Section IDs (static, never change)
  const sectionIds = ["greeting", "company-overview", "company-history", "security-policy", "privacy-policy", "environmental-policy"];

  // Table of contents items
  const tocItems = [
    { id: "greeting", label: t("greeting") },
    { id: "company-overview", label: t("company_overview") },
    { id: "company-history", label: t("company_history") },
    { id: "security-policy", label: t("security_policy") },
    { id: "privacy-policy", label: t("privacy_policy") },
    { id: "environmental-policy", label: t("environmental_policy") }
  ];

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

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const factor = 0.5;       // sensitivity: higher => bigger movement per scroll
    const maxOffset = 120;    // max pixels the title can move down/up
    let ticking = false;

    const onScroll = () => {
      const currentY = window.scrollY;
      const dy = currentY - lastScrollY.current; // positive when scrolling down
      lastScrollY.current = currentY;

      // offset decreases by dy*factor. So when dy < 0 (scroll up), offset increases -> title moves down
      offsetRef.current = Math.max(
        -maxOffset,
        Math.min(maxOffset, offsetRef.current - dy * factor)
      );

      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(() => {
          if (titleRef.current) {
            titleRef.current.style.transform = `translateY(${offsetRef.current}px)`;
          }
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
                  src={MinervaLogo}
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
                    className={`font-medium transition-all duration-300 px-3 py-1 rounded-full ${activeNavItem === item.id
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
                                  className={`block px-4 py-2 text-sm transition-colors ${isActive
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
              {/* <button
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
                <span className="text-sm md:text-base lg:text-lg">
                  {currentLang === "ja" ? t("japanese") : "ENGLISH"}
                </span>
              </button> */}
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
                  className={`block transition-all duration-200 text-xl py-2 ${isActive ? 'font-extrabold' : 'font-semibold hover:underline'}`}
                  style={{ color: '#E02B8A' }}
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
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-start gap-10 mb-4">
            <h1
              ref={titleRef}
              className="flex-none text-4xl md:text-5xl lg:text-6xl font-bold"
              style={{
                color: '#E02B8A',
                writingMode: 'vertical-rl',
                textOrientation: 'upright',
                lineHeight: 1,
                textAlign: 'center',
                display: 'inline-block',
              }}
            >
              {t("company")}
            </h1>

            <div className="flex-1">
              <img
                src={companyInfoImage}
                alt="Company Information"
              />
            </div>
          </div>
        </motion.div>

        {/* Greeting Section */}
        <motion.section
          id="greeting"
          className="py-16 bg-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">{t("greeting")}</h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p className="font-bold text-xl" style={{ color: '#E02B8A' }}>{t("greeting_tagline")}</p>
              <p>{t("greeting_desc1")}</p>
              <p>{t("greeting_desc2")}</p>
              <p>{t("greeting_desc3")}</p>
              <p>{t("greeting_desc4")}</p>
            </div>
          </div>
        </motion.section>

        {/* Company Overview Section */}
        <motion.section
          id="company-overview"
          className="py-16 bg-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">{t("company_overview")}</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <tbody>
                  <tr className="border-b border-gray-300">
                    <td className="border-r border-gray-300 p-4 font-bold bg-gray-50 w-1/3">{t("company_name_label")}</td>
                    <td className="p-4">{t("company_name_value")}</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="border-r border-gray-300 p-4 font-bold bg-gray-50">{t("ceo_label")}</td>
                    <td className="p-4">{t("ceo_value")}</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="border-r border-gray-300 p-4 font-bold bg-gray-50">{t("established_label")}</td>
                    <td className="p-4">{t("established_value")}</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="border-r border-gray-300 p-4 font-bold bg-gray-50">{t("capital_label")}</td>
                    <td className="p-4">{t("capital_value")}</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="border-r border-gray-300 p-4 font-bold bg-gray-50">{t("headquarters_label")}</td>
                    <td className="p-4">{t("headquarters_value")}</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="border-r border-gray-300 p-4 font-bold bg-gray-50">{t("osaka_office_label")}</td>
                    <td className="p-4">{t("osaka_office_value")}</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="border-r border-gray-300 p-4 font-bold bg-gray-50">{t("employees_label")}</td>
                    <td className="p-4">{t("employees_value")}</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="border-r border-gray-300 p-4 font-bold bg-gray-50">{t("contact_label")}</td>
                    <td className="p-4">TEL 03-5738-7123 <br/> FAX 03-5738-7674</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="border-r border-gray-300 p-4 font-bold bg-gray-50">{t("banks_label")}</td>
                    <td className="p-4">{t("banks_value2")}</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="border-r border-gray-300 p-4 font-bold bg-gray-50">{t("licenses_label")}</td>
                    <td className="p-4">
                      <div>{t("licenses_value1")}</div>
                      <div>{t("licenses_value2")}</div>
                      </td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="border-r border-gray-300 p-4 font-bold bg-gray-50">{t("affiliations_label")}</td>
                    <td className="p-4">{t("affiliations_value")}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </motion.section>

        {/* Company History Section */}
        <motion.section
          id="company-history"
          className="py-16 bg-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">{t("company_history")}</h2>
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row border-l-4 pl-6" style={{ borderColor: '#E02B8A' }}>
                <div className="font-bold text-lg mb-2 md:mb-0 md:w-32 flex-shrink-0">2016年11月</div>
                <div className="text-gray-700">{t("history_2016")}</div>
              </div>
              <div className="flex flex-col md:flex-row border-l-4 pl-6" style={{ borderColor: '#E02B8A' }}>
                <div className="font-bold text-lg mb-2 md:mb-0 md:w-32 flex-shrink-0">2021年4月</div>
                <div className="text-gray-700">{t("history_2021")}</div>
              </div>
              <div className="flex flex-col md:flex-row border-l-4 pl-6" style={{ borderColor: '#E02B8A' }}>
                <div className="font-bold text-lg mb-2 md:mb-0 md:w-32 flex-shrink-0">2024年10月</div>
                <div className="text-gray-700">{t("history_2024_1")}</div>
              </div>
              <div className="flex flex-col md:flex-row border-l-4 pl-6" style={{ borderColor: '#E02B8A' }}>
                <div className="font-bold text-lg mb-2 md:mb-0 md:w-32 flex-shrink-0">2024年10月</div>
                <div className="text-gray-700">{t("history_2024_2")}</div>
              </div>
              <div className="flex flex-col md:flex-row border-l-4 pl-6" style={{ borderColor: '#E02B8A' }}>
                <div className="font-bold text-lg mb-2 md:mb-0 md:w-32 flex-shrink-0">2025年10月</div>
                <div className="text-gray-700">{t("history_2025")}</div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Security Policy Section */}
        <motion.section
          id="security-policy"
          className="py-16 bg-gray-50"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">{t("security_policy")}</h2>
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <div>
                <h3 className="font-bold text-xl mb-2">{t("security_policy_purpose")}</h3>
                <p>{t("security_policy_purpose_desc")}</p>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">{t("security_policy_scope")}</h3>
                <p>{t("security_policy_scope_desc")}</p>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">{t("security_policy_basic")}</h3>
                <ol className="list-decimal list-inside space-y-3 ml-4">
                  <li>{t("security_policy_item1")}</li>
                  <li>{t("security_policy_item2")}</li>
                  <li>{t("security_policy_item3")}</li>
                  <li>{t("security_policy_item4")}</li>
                  <li>{t("security_policy_item5")}</li>
                </ol>
              </div>
              <p className="text-sm text-gray-600 mt-8">{t("security_policy_date")}</p>
            </div>
          </div>
        </motion.section>

        {/* Privacy Policy Section */}
        <motion.section
          id="privacy-policy"
          className="py-16 bg-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">{t("privacy_policy")}</h2>
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <div>
                <h3 className="font-bold text-xl mb-2">{t("privacy_policy_management")}</h3>
                <p>{t("privacy_policy_management_desc")}</p>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">{t("privacy_policy_usage")}</h3>
                <p>{t("privacy_policy_usage_desc")}</p>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">{t("privacy_policy_disclosure")}</h3>
                <p>{t("privacy_policy_disclosure_desc")}</p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                  <li>{t("privacy_policy_disclosure_item1")}</li>
                  <li>{t("privacy_policy_disclosure_item2")}</li>
                  <li>{t("privacy_policy_disclosure_item3")}</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">{t("privacy_policy_security")}</h3>
                <p>{t("privacy_policy_security_desc")}</p>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">{t("privacy_policy_inquiry")}</h3>
                <p>{t("privacy_policy_inquiry_desc")}</p>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">{t("privacy_policy_compliance")}</h3>
                <p>{t("privacy_policy_compliance_desc")}</p>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">{t("privacy_policy_contact")}</h3>
                <p>{t("privacy_policy_contact_desc")}</p>
                <ul className="list-inside ml-4 mt-2">
                  <li>{t("privacy_policy_contact_desc1")}</li>
                  <li>{t("privacy_policy_contact_desc2")}</li>
                  <li>{t("privacy_policy_contact_desc3")}</li>
                  <li>{t("privacy_policy_contact_desc4")}</li>
                </ul> 
              </div>
            </div>
          </div>
        </motion.section>

        {/* Environmental Policy Section */}
        <motion.section
          id="environmental-policy"
          className="py-16 bg-gray-50"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">{t("environmental_policy")}</h2>
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <div>
                <h3 className="font-bold text-xl mb-2" style={{ color: '#E02B8A' }}>{t("environmental_policy_basic")}</h3>
                <p>{t("environmental_policy_basic_desc")}</p>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2" style={{ color: '#E02B8A' }}>{t("environmental_policy_policy")}</h3>
                <p>{t("environmental_policy_policy_desc1")}</p>
                <p className="mt-4">{t("environmental_policy_policy_desc2")}</p>
                <ul className="space-y-2 ml-4 mt-4">
                  <li>{t("environmental_policy_item_a")}</li>
                  <li>{t("environmental_policy_item_b")}</li>
                  <li>{t("environmental_policy_item_c")}</li>
                </ul>
                <p className="mt-4">{t("environmental_policy_policy_desc3")}</p>
                <p className="mt-2">{t("environmental_policy_policy_desc4")}</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          id="inquiry-section"
          className="py-16 bg-white"
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

export default About;
