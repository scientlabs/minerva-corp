"use client";

import React, { useState } from "react";

const Footer = () => {

    const services = ["Mobile Communication", "ICT Solution", "Security", "Engineering", "Human Resource", "Entertainment"];

    return (
        <footer className="bg-gray-900 text-white w-full py-12">
            <div className="container mx-auto px-4">
                <div className="flex justify-center mb-8">
                    <img
                        src={
                            "https://minerva-corp.com/wp-content/uploads/2024/12/MINERVA%E9%80%8F%E9%81%8E%E3%83%AD%E3%82%B4.png"
                        }
                        alt="Minerva Footer Logo"
                        className="h-5 sm:h-6 md:h-14 object-contain"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
                    {/* Product Column */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
                    </div>

                    {/* Our Businesses Column */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold mb-4 text-white">Services</h3>
                        <ul className="space-y-2">
                            {services.map((service) =>
                                <li key={service}>
                                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                        {service}
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* News Column */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold mb-4 text-white">Products</h3>
                    </div>

                    {/* About Column */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold mb-4 text-white">Recruit</h3>
                    </div>

                    {/* Contact Us Column */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    Safety&Quality
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    Governance
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2 mb-4">
                            <p className="text-sm text-gray-300">MINERVA Co. , Ltd. 2-7-14-202 Kitazawa, Setagaya-ku, Tokyo 155-0031</p>
                            <p className="text-sm text-gray-300">TEL: 03-5738-7123</p>
                            <p className="text-sm text-gray-300">FAX: 03-5738-7674</p>
                        </div>
                        <div className="w-full h-64 md:h-60 rounded overflow-hidden shadow">
                            <iframe
                                title="location-map"
                                src={"https://maps.google.com/maps?q=35.661668,139.669585&z=13&output=embed"}
                                className="w-full h-full border-0"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>


                <div className="mt-12 pt-8 border-t border-gray-700 text-center">
                    <p className="text-sm text-gray-400">© 2025 MINERVA_HP All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;