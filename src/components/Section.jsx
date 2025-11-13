
import React from "react";
import { motion } from "framer-motion";

const Section = ({
  id,
  title,
  children,
  bgColor = "bg-gray-100",
  className = "",
  titleStyle = {},
  textAlign = "center",
}) => (
  <motion.section
    id={id}
    className={`w-full overflow-x-hidden ${bgColor} py-16 px-4 sm:px-6 lg:px-8 ${className}`}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <div className={`w-full overflow-x-hidden ${textAlign === "left" ? "text-left" : textAlign === "right" ? "text-right" : "text-center"}`}>
      <motion.h2
        className="text-5xl md:text-6xl font-bold mb-4"
        style={titleStyle}
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
