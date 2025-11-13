"use client";

import React from "react";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import MinervaLogo from "../assets/MINERVA-logo.png";

const Footer = () => {
    const { t } = useTranslation();
    const company = [t('greeting'), t('company_overview'), t('company_history'), t('security_policy'), t('privacy_policy'), t('environmental_policy')];
    const services = [t('mobile_communication'), t('ict_solution'), t('security'), t('engineering'), t('human_resource'), t('entertainment')];
    const products = [t('product_survillence_camera_system'), t('product_iot')];


    return (
        <footer className="bg-gray-900 text-white w-full py-12">
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
                            {company.map((item) => (
                                <li key={item}>
                                    <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                                        {item}
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
                            {services.map((service) => (
                                <li key={service}>
                                    <Link to="/services" className="text-gray-300 hover:text-white transition-colors">
                                        {service}
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
                            {products.map((product) => (
                                <li key={product}>
                                    <Link to="/products" className="text-gray-300 hover:text-white transition-colors">
                                        {product}
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
                        <ul className="space-y-2">
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
                        </ul>
                    </div>

                    {/* Address + Map Column */}
                    <div className="space-y-4">
                        <div className="space-y-2 mb-4">
                            <p className="text-sm text-gray-300">
                                MINERVA Co., Ltd. 2-7-14-202 Kitazawa, Setagaya-ku, Tokyo 155-0031
                            </p>
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
                    <p className="text-sm text-gray-400">© 2025 MINERVA_HP All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
