"use client";

import React from "react";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import MinervaLogo from "../assets/MINERVA-logo.png";

const Footer = () => {
    const { t } = useTranslation();
    
    // Company items with links to About.jsx sections
    const companyItems = [
        { label: t('greeting'), link: '/about#greeting' },
        { label: t('company_overview'), link: '/about#company-overview' },
        { label: t('company_history'), link: '/about#company-history' },
        { label: t('security_policy'), link: '/about#security-policy' },
        { label: t('privacy_policy'), link: '/about#privacy-policy' },
        { label: t('environmental_policy'), link: '/about#environmental-policy' }
    ];
    
    // Services items with links to Services.jsx sections
    const servicesItems = [
        { label: t('mobile_communication'), link: '/services#mobile-communication' },
        { label: t('ict_solution'), link: '/services#ict-solution' },
        { label: t('security'), link: '/services#engineering' },
        { label: t('engineering'), link: '/services#engineering' },
        { label: t('human_resource'), link: '/services#human-resource' },
        { label: t('entertainment'), link: '/services#entertainment' }
    ];
    
    // Products items
    const productsItems = [
        { label: t('product_survillence_camera_system'), link: '/products' },
        { label: t('product_iot'), link: '/products' }
    ];


    return (
        <footer className="bg-gray-900 text-white w-full py-12 relative z-50">
            <div className="container mx-auto px-4">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <img
                         src={MinervaLogo}
                        alt="Minerva Footer Logo"
                        className="h-5 sm:h-6 md:h-14 object-contain"
                    />
                </div>

                {/* Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                    {/* Company Column */}
                    <div className="space-y-4">
                        <Link to="/about">
                            <h3 className="text-lg font-semibold mb-4 text-white hover:text-pink-400 transition-colors cursor-pointer">{t('company')}</h3>
                        </Link>
                        <ul className="space-y-2">
                            {companyItems.map((item) => (
                                <li key={item.label}>
                                    <Link to={item.link} className="text-gray-300 hover:text-white transition-colors">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services Column */}
                    <div className="space-y-4">
                        <Link to="/services">
                            <h3 className="text-lg font-semibold mb-4 text-white hover:text-pink-400 transition-colors cursor-pointer">{t('services')}</h3>
                        </Link>
                        <ul className="space-y-2">
                            {servicesItems.map((service) => (
                                <li key={service.label}>
                                    <Link to={service.link} className="text-gray-300 hover:text-white transition-colors">
                                        {service.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Products Column */}
                    <div className="space-y-4">
                        <Link to="/products">
                            <h3 className="text-lg font-semibold mb-4 text-white hover:text-pink-400 transition-colors cursor-pointer">{t('products')}</h3>
                        </Link>
                        <ul className="space-y-2">
                            {productsItems.map((product) => (
                                <li key={product.label}>
                                    <Link to={product.link} className="text-gray-300 hover:text-white transition-colors">
                                        {product.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Recruit Column */}
                    {/* <div className="space-y-4">
                        <h3 className="text-lg font-semibold mb-4 text-white">Recruit</h3>
                    </div> */}

                    {/* Contact Us Column */}
                    <div className="space-y-4">
                        <Link to="/inquiry">
                            <h3 className="text-lg font-semibold mb-4 text-white hover:text-pink-400 transition-colors cursor-pointer">{t('contact_us')}</h3>
                        </Link>
                        {/* <ul className="space-y-2">
                            <li>
                                <Link to="/inquiry" className="text-gray-300 hover:text-white transition-colors">
                                    Safety&Quality
                                </Link>
                            </li>
                            <li>
                                <Link to="/inquiry" className="text-gray-300 hover:text-white transition-colors">
                                    Governance
                                </Link>
                            </li>
                        </ul> */}
                    </div>

                    {/* Address + Map Column */}
                    <div className="space-y-4">
                      <div className="space-y-2 mb-4">
                        <address className="not-italic text-sm text-gray-300 space-y-1" aria-label="company address">
                          <div>株式会社MINERVA</div>
                          <div>〒155-0031 東京都世田谷区北沢2丁目7-14</div>
                          <div>kawano shimokitazawa south 202</div>
                        </address>
                        <p className="text-sm text-gray-300">TEL: 03-5738-7123</p>
                        <p className="text-sm text-gray-300">FAX: 03-5738-7674</p>
                      </div>
                      <div className="w-full h-64 md:h-60 rounded overflow-hidden shadow">
                        <iframe
                          title="location-map"
                          src="https://maps.google.com/maps?q=35.661668,139.669585&z=13&output=embed"
                          className="w-full h-full border-0"
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-12 pt-8 border-t border-gray-700 text-center">
                    <p className="text-sm text-gray-400">© 2025 MINERVA All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
