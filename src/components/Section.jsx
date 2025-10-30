
import React from "react";
import { motion } from "framer-motion";

const Section = ({
  id,
  title,
  children,
  bgColor = "bg-gray-100",
  className = "",
}) => (
  <motion.section
    id={id}
    className={`w-full ${bgColor} py-16 px-4 sm:px-6 lg:px-8 ${className}`}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <div className="w-full text-center">
      <motion.h2
        className="text-4xl md:text-5xl font-extrabold mb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {title}
      </motion.h2>
      {children}
    </div>
  </motion.section>
);

export default Section;
