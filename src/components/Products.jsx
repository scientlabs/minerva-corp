"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "./Footer";
import { getNavItems } from "../common/navItems";

const Products = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hoveredNavItem, setHoveredNavItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const navRef = useRef(null);
  const [activeNavItem, setActiveNavItem] = useState('products');
  
  const navItems = getNavItems(t);

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

  // Product categories and products based on TSP website
  const productCategories = [
    {
      id: 'security-camera',
      name: t("security_camera_system"),
      subcategories: [
        {
          id: 'wireless',
          name: t("wireless_camera_system"),
          products: [
            {
              name: "TSP-W1-0412",
              description: t("tsp_w1_0412_desc"),
              image: "https://www.tspco.jp/wp-content/uploads/TSP-W1-0412_set.png",
              category: "ワイヤレスカメラシステム"
            },
            {
              name: "TSP-S01",
              description: t("tsp_s01_desc"),
              image: "https://www.tspco.jp/wp-content/uploads/TSP-S01_1-_800.png",
              category: "ワイヤレスカメラシステム"
            },
            {
              name: "TSP-W1-0415",
              description: t("tsp_w1_0415_desc"),
              image: "https://www.tspco.jp/wp-content/uploads/TSP-W1-0415_600.png",
              category: "ワイヤレスカメラシステム"
            }
          ]
        },
        {
          id: 'network',
          name: t("network_camera"),
          products: [
            {
              name: "TSP-PT-5M",
              description: t("tsp_pt_5m_desc"),
              image: "https://www.tspco.jp/wp-content/uploads/TSP-PT-5M_s.png",
              category: "ネットワークカメラ"
            },
            {
              name: "TSP-PD-5M",
              description: t("tsp_pd_5m_desc"),
              image: "https://www.tspco.jp/wp-content/uploads/TSP-PD-5M_s.png",
              category: "ネットワークカメラ"
            },
            {
              name: "TSP-PB-5M",
              description: t("tsp_pb_5m_desc"),
              image: "https://www.tspco.jp/wp-content/uploads/TSP-PB-5M_s.png",
              category: "ネットワークカメラ"
            },
            {
              name: "TSP-P1-0411/0211",
              description: t("tsp_p1_0411_desc"),
              image: "https://www.tspco.jp/wp-content/uploads/TSP-P1-0411_0211_set.png",
              category: "ネットワークカメラ"
            }
          ]
        },
        {
          id: 'recorder',
          name: t("recorder"),
          products: [
            {
              name: "TSP-P1-NVR11",
              description: t("tsp_p1_nvr11_desc"),
              image: "https://www.tspco.jp/wp-content/uploads/TSP-P1-NVR11_ph01_s.png",
              category: "レコーダー"
            },
            {
              name: "TSP-W1-NVR12",
              description: t("tsp_w1_nvr12_desc"),
              image: "	https://www.tspco.jp/wp-content/uploads/TSP-W1-0412_set.png",
              category: "レコーダー"
            },
            {
              name: "TSP-W1-NVR15",
              description: t("tsp_w1_nvr15_desc"),
              image: "https://www.tspco.jp/wp-content/uploads/TSP-W1-NVR15_500.png",
              category: "レコーダー"
            }
          ]
        }
      ]
    },
    {
      id: 'access-control',
      name: t("access_control_system"),
      subcategories: [
        {
          id: 'biometric',
          name: t("biometric_device"),
          products: [
            {
              name: "AC-2200",
              description: t("ac_2200_desc"),
              image: "https://www.tspco.jp/wp-content/uploads/AC2200_03-1_s.png",
              category: "生体認証デバイス"
            },
            {
              name: "UBio-X Face Premium",
              description: t("ubio_face_premium_desc"),
              image: "https://www.tspco.jp/wp-content/uploads/230905_UBio-X-Face-Pro_02_s-1.png",
              category: "生体認証デバイス"
            },
            {
              name: "UBio-X Face Pro",
              description: t("ubio_face_pro_desc"),
              image: "https://www.tspco.jp/wp-content/uploads/230905_UBio-X-Face-Pro_02_s.png",
              category: "生体認証デバイス"
            }
          ]
        }
      ]
    },
    {
      id: 'network-equipment',
      name: t("network_equipment"),
      subcategories: [
        {
          id: 'network-devices',
          name: t("network_devices"),
          products: [
            {
              name: "8ポートギガビットイーサネットPoE+スイッチ",
              description: t("poe_switch_desc"),
              image: "https://www.tspco.jp/wp-content/uploads/max_561402pro_800_r.png",
              category: "ネットワーク機器"
            }
          ]
        }
      ]
    },
    // {
    //   id: 'solution',
    //   name: t("solution_products"),
    //   subcategories: [
    //     {
    //       id: 'solutions',
    //       name: t("solutions"),
    //       products: [
    //         {
    //           name: "VIPORE",
    //           description: t("vipore_desc"),
    //           image: "https://www.tspco.jp/wp-content/uploads/top_productimg04-e1747103985344.png",
    //           category: "ソリューション商材"
    //         }
    //       ]
    //     }
    //   ]
    // }
  ];

  // Get all products for display
  const getAllProducts = () => {
    const products = [];
    productCategories.forEach(category => {
      category.subcategories.forEach(subcategory => {
        subcategory.products.forEach(product => {
          products.push({ ...product, categoryId: category.id });
        });
      });
    });
    return products;
  };

  const allProducts = getAllProducts();
  const filteredProducts = selectedCategory 
    ? allProducts.filter(p => p.categoryId === selectedCategory)
    : allProducts;

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
            {t("products_title")}
          </h1>
          <p className="text-xl text-gray-600">{t("products_description")}</p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-2 rounded-lg font-medium transition-colors text-white ${
                selectedCategory === null ? '' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              style={selectedCategory === null ? { backgroundColor: '#E02B8A' } : { color: '#E02B8A' }}
            >
              {t("all_products")}
            </button>
            {productCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-lg font-medium transition-colors text-white ${
                  selectedCategory === category.id ? '' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={selectedCategory === category.id ? { backgroundColor: '#E02B8A' } : { color: '#E02B8A' }}
              >
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={`${product.name}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-contain p-4"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=Product';
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                  {product.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">{t("no_products_found")}</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Products;
