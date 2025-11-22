/**
 * Common navigation items configuration
 * This function returns navigation items based on the translation function
 * @param {Function} t - Translation function from react-i18next
 * @returns {Array} Array of navigation items
 */
export const getNavItems = (t) => {
  return [
    { 
      id: 'company', 
      sectionId: 'japanese-text', 
      label: t("company") || "Company",
      path: "/about",
      subItems: [
        { label: t('greeting'), link: '/about#greeting' },
        { label: t('company_overview'), link: '/about#company-overview' },
        { label: t('company_history'), link: '/about#company-history' },
        { label: t('security_policy'), link: '/about#security-policy' },
        { label: t('privacy_policy'), link: '/about#privacy-policy' },
        { label: t('environmental_policy'), link: '/about#environmental-policy' }
      ]
    },
    { 
      id: 'services', 
      sectionId: 'services', 
      label: t("services") || "Services",
      path: "/services",
      subItems: [
        { label: t('mobile_communication'), link: '/services#mobile-communication' },
        { label: t('ict_solution'), link: '/services#ict-solution' },
        { label: t('security'), link: '/services#engineering' },
        { label: t('engineering'), link: '/services#engineering' },
        { label: t('human_resource'), link: '/services#human-resource' },
        { label: t('entertainment'), link: '/services#entertainment' }
      ]
    },
    { 
      id: 'products', 
      sectionId: 'products', 
      label: t("products") || "Products",
      path: "/products",
      subItems: [
        { label: t('product_survillence_camera_system'), link: '/products' },
        { label: t('product_iot'), link: '/products' }
      ]
    },
    { 
      id: 'contact', 
      sectionId: 'contactus', 
      label: t("contact_us") || "Contact",
      path: "/inquiry",
      subItems: []
    }
  ];
};

