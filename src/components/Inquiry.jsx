"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MinervaLogo from "../assets/MINERVA-logo.png";
import Footer from "./Footer";
import { getNavItems } from "../common/navItems";

const Inquiry = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hoveredNavItem, setHoveredNavItem] = useState(null);
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const navRef = useRef(null);
  const [activeNavItem, setActiveNavItem] = useState('contact');
  
  const navItems = getNavItems(t);
  
  const [formData, setFormData] = useState({
    contactDestination: '',
    companyName: '',
    name: '',
    phoneNumber: '',
    email: '',
    inquiryContent: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  // API endpoint for sending emails via SMTP
  //const API_URL = 'https://minmail.minerva.corp.com:3001';
  const API_URL = 'https://minmail.scient-labs.com:3443';
 // const API_URL = 'http://183.77.255.47:3001';

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


  const contactDestinations = [
    t("mobile_communication"),
    t("ict_solution"),
    t("security"),
    t("engineering"),
    t("human_resource"),
    t("entertainment"),
    t("recruit"),
    t("other")
  ];

  const handleDropdownToggle = (itemName) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.contactDestination) {
      newErrors.contactDestination = t("field_required");
    }

    if (!formData.name.trim()) {
      newErrors.name = t("field_required");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("field_required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("invalid_email");
    }

    if (!formData.inquiryContent.trim()) {
      newErrors.inquiryContent = t("field_required");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Prepare email data
      const emailData = {
        contact_destination: formData.contactDestination,
        company_name: formData.companyName || 'N/A',
        name: formData.name,
        phone_number: formData.phoneNumber || 'N/A',
        email: formData.email,
        inquiry_content: formData.inquiryContent,
      };

      // Send email via backend API
      const response = await fetch(`${API_URL}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to send email');
      }

      // Success
      setSubmitStatus('success');
      setIsSubmitting(false);
      
      // Show success message
      alert(t("form_submitted_successfully") || "Form submitted successfully!");
      
      // Reset form
      setFormData({
        contactDestination: '',
        companyName: '',
        name: '',
        phoneNumber: '',
        email: '',
        inquiryContent: ''
      });
      
      // Clear status message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
      
    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitStatus('error');
      setIsSubmitting(false);
      
      // Show error message
      alert(t("form_submission_error") || "Failed to submit form. Please try again later.");
      
      // Clear error status after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }
  };

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
                <span>{currentLang === "ja" ? t("japanese") : "ENGLISH"}</span>
              </button> */}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-lg shadow-lg p-8 md:p-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            {t("inquiry")}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Destination */}
            <div>
              <label htmlFor="contactDestination" className="block text-sm font-medium text-gray-700 mb-2">
                {t("contact_destination")} <span className="text-red-500">*</span>
              </label>
              <select
                id="contactDestination"
                name="contactDestination"
                value={formData.contactDestination}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.contactDestination ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              >
                <option value="">{t("select_destination")}</option>
                {contactDestinations.map((destination, index) => (
                  <option key={index} value={destination}>
                    {destination}
                  </option>
                ))}
              </select>
              {errors.contactDestination && (
                <p className="mt-1 text-sm text-red-500">{errors.contactDestination}</p>
              )}
            </div>

            {/* Company Name */}
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                {t("company_name")}
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                {t("name")} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                {t("phone_number")}
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {t("email")} <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Inquiry Content */}
            <div>
              <label htmlFor="inquiryContent" className="block text-sm font-medium text-gray-700 mb-2">
                {t("inquiry_content")} <span className="text-red-500">*</span>
              </label>
              <textarea
                id="inquiryContent"
                name="inquiryContent"
                value={formData.inquiryContent}
                onChange={handleChange}
                rows={6}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${
                  errors.inquiryContent ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {errors.inquiryContent && (
                <p className="mt-1 text-sm text-red-500">{errors.inquiryContent}</p>
              )}
            </div>

            {/* Status Message */}
            {submitStatus === 'success' && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  {t("form_submitted_successfully") || "Form submitted successfully!"}
                </p>
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">
                  {t("form_submission_error") || "Failed to submit form. Please try again later."}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-8 py-3 text-white rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#E02B8A' }}
                onMouseEnter={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = '#C0257A')}
                onMouseLeave={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = '#E02B8A')}
              >
                {isSubmitting ? t("submitting") : t("submit")}
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Inquiry;
