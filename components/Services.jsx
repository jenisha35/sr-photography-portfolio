import React from "react";
import { motion } from "framer-motion";

const services = [
  {
    title: "Wedding Photography",
    description: "Capture your big day with timeless elegance and rich emotions.",
    image: "/services/wedding.jpg",
    isVideo: false,
  },
  {
    title: "Pre-Wedding Shoots",
    description: "Tell your love story before the vows with cinematic moments.",
    image: "/services/prewedding.jpg",
    isVideo: false,
  },
  {
    title: "Baby Shoots",
    description: "Precious moments of your little one, beautifully framed forever.",
    image: "/services/baby.jpg",
    isVideo: false,
  },
  {
    title: "Drone Photography",
    description: "Stunning aerial views for weddings, events, and home shoots.",
    image: "/services/drone.mp4", // replace with actual path
    isVideo: true,
  },
  {
    title: "Candid Moments",
    description: "Unposed, raw emotions captured in the most natural way.",
    image: "/services/candid.jpg",
    isVideo: false,
  },
  {
    title: "Birthday Parties",
    description: "Vibrant, colorful memories of your most special birthday events.",
    image: "/services/birthday.jpg",
    isVideo: false,
  },
  {
    title: "Holy Communion",
    description: "Spiritual and joyful moments documented with grace.",
    image: "/services/communion.jpg",
    isVideo: false,
  },
];

const Services = () => {
  return (
    <section className="bg-[#0f0f0f] py-16 px-6 md:px-20 lg:px-40 font-['Roboto']">
      <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-12 text-[#d6b67b] tracking-wide">
        Our Services
      </h2>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <motion.div
            key={index}
className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl overflow-hidden shadow-lg transform transition duration-500 ease-in-out hover:shadow-2xl hover:scale-105"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {service.isVideo ? (
              <video
                src={service.image}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-48 object-cover"
              />
            ) : (
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-5">
              <h3 className="text-xl font-semibold text-[#c7ad7f] mb-2">
                {service.title}
              </h3>
              <p className="text-gray-300 text-sm">{service.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
