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
      subItems: [t('greeting'), t('company_overview'), t('company_history'), t('security_policy'), t('privacy_policy'), t('environmental_policy')]
    },
    { 
      id: 'services', 
      sectionId: 'services', 
      label: t("services") || "Services",
      path: "/services",
      subItems: [t('mobile_communication'), t('ict_solution'), t('security'), t('engineering'), t('human_resource'), t('entertainment')]
    },
    { 
      id: 'products', 
      sectionId: 'products', 
      label: t("products") || "Products",
      path: "/products",
      subItems: [t('product_survillence_camera_system'), t('product_iot')]
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

