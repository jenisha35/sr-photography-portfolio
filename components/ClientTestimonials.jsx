import React from 'react';
import { motion } from 'framer-motion';

const ClientTestimonials = () => {
  const testimonials = [
  {
    name: "Divya & Arjun",
    role: "Wedding Couple",
    initials: "DA",
    feedback:
      "SR Photography turned our big day into an unforgettable memory. Every candid moment was captured so naturally — we couldn’t have asked for more!",
  },
  {
    name: "Sneha Reddy",
    role: "Mother (Baby Shoot)",
    initials: "SR",
    feedback:
      "They were so gentle and patient during my baby's photoshoot. The pictures are dreamy and timeless. A truly professional and caring team!",
  },
  {
    name: "Rakesh Menon",
    role: "Drone Client (Housewarming)",
    initials: "RM",
    feedback:
      "The drone shots of our housewarming ceremony were cinematic! The aerial views gave a whole new dimension to our memories.",
  },
  {
    name: "Nandhini & Surya",
    role: "Pre-Wedding Shoot",
    initials: "NS",
    feedback:
      "From location scouting to lighting, every detail was perfect. Our pre-wedding shoot felt like a movie — romantic and real!",
  },
  {
    name: "Haritha Varun",
    role: "Bride (Engagement)",
    initials: "HV",
    feedback:
      "Their eye for emotion is unmatched. Our engagement photos radiate love and joy — every frame tells our story beautifully.",
  },
];


  return (
    <section className="bg-[#0f0f0f] py-16 px-6 md:px-20 lg:px-40 font-['Roboto']">
      <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-12 text-[#d6b67b] tracking-wide">
        What Our Clients Say
      </h2>
      <div className="grid gap-10 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            className="bg-[#1a1a1a] rounded-xl p-6 text-white shadow-lg border border-[#2d2d2d] hover:scale-105 transition-transform duration-300"
           initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center gap-4 mb-4">
              {/* Initials-based Avatar */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 flex items-center justify-center font-bold text-black text-lg">
                {t.initials}
              </div>
              <div>
                <h4 className="font-semibold text-[#c7ad7f]">{t.name}</h4>
                <p className="text-sm text-gray-400">{t.role}</p>
              </div>
            </div>
            <p className="text-sm text-gray-300">"{t.feedback}"</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ClientTestimonials;
