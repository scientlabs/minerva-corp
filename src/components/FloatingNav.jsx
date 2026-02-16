import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getNavItems } from '../common/navItems';

const FloatingNav = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('');
  const [navbarHeight, setNavbarHeight] = useState(64);
  
  const navItems = useMemo(() => {
    const items = getNavItems(t);
    // Map to FloatingNav structure (no path, no subItems)
    // Also update services sectionId to 'services-header' for FloatingNav
    return items.map(item => ({
      id: item.id,
      sectionId: item.id === 'services' ? 'services-header' : item.sectionId,
      label: item.label
    }));
  }, [t]);

  useEffect(() => {
    const updateNavHeight = () => {
      const nav = document.querySelector('nav');
      if (nav) {
        setNavbarHeight(nav.getBoundingClientRect().height);
      }
    };
    
    updateNavHeight();
    window.addEventListener('resize', updateNavHeight);
    return () => window.removeEventListener('resize', updateNavHeight);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Check if contact section is visible (if so, don't highlight any floating nav items)
      const contactSection = document.getElementById('contactus');
      
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        const navbar = document.querySelector('nav');
        const navbarHeight = navbar?.getBoundingClientRect().height || 0;
        const floatingNavHeight = 56;
        const totalOffset = navbarHeight + floatingNavHeight + 50;
        
        // Check if section is visible in viewport
        const sectionTop = rect.top;
        const sectionBottom = rect.bottom;
        const viewportBottom = window.innerHeight;
        
        // Contact section is visible if it's within the viewport
        const isContactSectionVisible = sectionTop <= viewportBottom * 0.7 && sectionBottom >= totalOffset;
        
        // If contact section is visible, clear all floating nav highlights immediately
        if (isContactSectionVisible) {
          setActiveSection('');
          return; // Exit early to prevent any other highlighting
        }
      }

      const scrollPosition = window.scrollY + navbarHeight + 100; // Offset for navbars

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
        setActiveSection(currentSection.id);
      } else if (sections.length > 0) {
        // Check if we're at the top
        if (window.scrollY < 100) {
          setActiveSection('');
        } else {
          // If scrolled past all sections, highlight the last one
          const sortedSections = sections.sort((a, b) => a.top - b.top);
          const lastSection = sortedSections[sortedSections.length - 1];
          if (scrollPosition >= lastSection.bottom - 150) {
            setActiveSection(lastSection.id);
          } else {
            // Find the closest section above current scroll position
            const closestSection = sortedSections.reduce((closest, section) => {
              if (section.top <= scrollPosition && section.top > (closest?.top || 0)) {
                return section;
              }
              return closest;
            }, null);
            if (closestSection) {
              setActiveSection(closestSection.id);
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, [navbarHeight, navItems]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const floatingNavHeight = 56; // Height of floating nav (h-14 = 3.5rem = 56px)
      const offset = navbarHeight + floatingNavHeight + 20;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav 
      className="fixed left-1/2 transform -translate-x-1/2 z-50"
      style={{ top: `${navbarHeight + 8}px` }}
    >
      <div className="bg-white/95 backdrop-blur-md rounded-full shadow-lg border border-gray-200 px-2 py-2">
        <div className="flex items-center space-x-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.sectionId)}
              className={`relative px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                activeSection === item.id
                  ? 'text-white shadow-md'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
              style={activeSection === item.id ? { backgroundColor: '#E02B8A' } : {}}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default FloatingNav;

