"use client";

import React, { useState } from "react";

const Footer = () => {
    return (
        <footer className="bg-white text-black w-full py-12">
            <div className="container mx-auto px-4">
                <div className="flex justify-center mb-8">
                    <img
                        src={'https://minerva-corp.com/wp-content/uploads/2024/12/MINERVA%E9%80%8F%E9%81%8E%E3%83%AD%E3%82%B4.png'}
                        alt="Minerva Footer Logo"
                        className="h-5 sm:h-6 md:h-14 object-contain"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                    {/* Product Column */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold mb-4">Product</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-gray-300">Network Infrastructure Construction</a></li>
                            <li><a href="#" className="hover:text-gray-300">Solution Products</a></li>
                            <li><a href="#" className="hover:text-gray-300">Devices</a></li>
                        </ul>
                    </div>

                    {/* Our Businesses Column */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold mb-4">Our Businesses</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-gray-300">Enterprise Solutions</a></li>
                            <li><a href="#" className="hover:text-gray-300">Solutions for Local Governments</a></li>
                            <li><a href="#" className="hover:text-gray-300">Solutions for Telecom Carriers</a></li>
                        </ul>
                    </div>

                    {/* News Column */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold mb-4">News</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-gray-300">Latest Updates</a></li>
                            <li><a href="#" className="hover:text-gray-300">Press Releases</a></li>
                            <li><a href="#" className="hover:text-gray-300">Events</a></li>
                        </ul>
                    </div>

                    {/* About Column */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold mb-4">About</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-gray-300">Message</a></li>
                            <li><a href="#" className="hover:text-gray-300">Philosophy & Vision</a></li>
                            <li><a href="#" className="hover:text-gray-300">Company Overview</a></li>
                            <li><a href="#" className="hover:text-gray-300">Maps</a></li>
                        </ul>
                    </div>

                    {/* Contact Us Column */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-gray-300">Careers</a></li>
                            <li><a href="#" className="hover:text-gray-300">Safety&Quality</a></li>
                            <li><a href="#" className="hover:text-gray-300">Governance</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-700 text-center">
                    <p className="text-sm">
                        © 2025 MINERVA_HP All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;