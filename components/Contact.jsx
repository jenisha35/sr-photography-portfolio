import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaInstagram,
  FaMapMarkerAlt
} from "react-icons/fa";
import { database } from "../src/config/firebase";
import { ref, onValue } from "firebase/database";

const Contact = () => {
  const [contactInfo, setContactInfo] = useState({
    phone: "",
    whatsapp: "",
    instagram: "",
    address: ""
  });

  const [loading, setLoading] = useState(true); // Loader state

  useEffect(() => {
    const contactRef = ref(database, "contact");

    onValue(contactRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setContactInfo(data);
      }
      setLoading(false); // ✅ Stop loader once data is fetched
    });
  }, []);

  return (
    <section className="bg-black text-white py-20 px-4 font-['Roboto'] min-h-screen">
      <motion.h2
        className="text-center text-3xl md:text-5xl text-[#d6b67b] font-bold mb-16"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Contact Us
      </motion.h2>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#d6b67b]"></div>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
          {/* Mobile */}
          <motion.div
            className="bg-[#1a1a1a] p-6 rounded-xl border border-[#2d2d2d] shadow-md hover:shadow-lg transition"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-4 mb-2 text-[#c7ad7f] text-xl font-semibold">
              <FaPhoneAlt />
              Mobile Number
            </div>
            <p className="text-gray-300 text-lg">{contactInfo.phone}</p>
          </motion.div>

          {/* WhatsApp */}
          <motion.div
            className="bg-[#1a1a1a] p-6 rounded-xl border border-[#2d2d2d] shadow-md hover:shadow-lg transition"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-4 mb-2 text-[#c7ad7f] text-xl font-semibold">
              <FaWhatsapp />
              WhatsApp
            </div>
            <a
              href={`https://wa.me/${contactInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline text-lg"
            >
              Message Us on WhatsApp
            </a>
          </motion.div>

          {/* Instagram */}
          <motion.div
            className="bg-[#1a1a1a] p-6 rounded-xl border border-[#2d2d2d] shadow-md hover:shadow-lg transition"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-4 mb-2 text-[#c7ad7f] text-xl font-semibold">
              <FaInstagram />
              Instagram
            </div>
            <a
              href={contactInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline text-lg"
            >
              @{contactInfo.instagram?.split("/").pop()}
            </a>
          </motion.div>

          {/* Address */}
          <motion.div
            className="bg-[#1a1a1a] p-6 rounded-xl border border-[#2d2d2d] shadow-md hover:shadow-lg transition"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-4 mb-2 text-[#c7ad7f] text-xl font-semibold">
              <FaMapMarkerAlt />
              Address
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              {contactInfo.address?.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Contact;
