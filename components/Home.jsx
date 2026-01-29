import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AnimatedCounter = ({ targetNumber, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const increment = targetNumber / (duration / 10);
      const counter = setInterval(() => {
        start += increment;
        if (start >= targetNumber) {
          setCount(targetNumber);
          clearInterval(counter);
        } else {
          setCount(Math.ceil(start));
        }
      }, 10);
    }
  }, [inView, targetNumber, duration]);

  return (
    <span ref={ref} className="text-[#c7ad7f] font-semibold text-lg md:text-xl">
      {count.toLocaleString()}+
    </span>
  );
};

const Home = () => {
  const bg_url = ["/bg.jpg", "/bg4.jpg", "/bg2.jpg", "/bg3.jpg"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % bg_url.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen w-screen overflow-hidden">
        {bg_url.map((bg, i) => (
          <div
            key={i}
            className={`absolute top-0 left-0 h-full w-full bg-cover bg-center transition-opacity duration-1000 ease-in opacity-0 ${
              i === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            style={{ backgroundImage: `url(${bg})` }}
          />
        ))}

        <div className="absolute inset-0 bg-black/70 z-10" />

        <motion.div
          className="relative z-20 flex flex-col justify-center items-center h-full text-white text-center px-4"
          initial={{ opacity: 0, y: -120 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <h1 className="mb-2 text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent px-2">
            SR Photography
          </h1>
          <p className="mt-4 text-sm md:text-lg text-[#c7ad7f] px-2">
            Crafting Timeless Memories Through Every Click
          </p>
        </motion.div>
      </section>

      {/* About Section */}
      <section
        id="about-us"
        className="bg-[#0f0f0f] px-6 py-16 md:px-20 lg:px-40 font-['Roboto']"
      >
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-5xl font-extrabold text-center mb-8 text-[#d6b67b] tracking-wide"
        >
          About SR Photography
        </motion.h2>

        <div className="space-y-6 text-base md:text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            SR Photography is a creative studio based in{" "}
            <span className="text-[#f1ddab] font-medium">KanyaKumari</span>,
            capturing unforgettable moments with elegance and emotion. Our
            portfolio spans weddings, fashion, corporate events, and portraits.
          </motion.p>

          {/* Stats Background Section */}
          <motion.div
            className="relative h-[300px] w-full bg-cover bg-center rounded-md overflow-hidden"
            style={{ backgroundImage: `url('/aboutbg.jpg')` }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute inset-0 bg-black/70 z-10" />
            <div className="relative z-20 flex flex-col justify-center items-center h-full px-4 text-white gap-8">
              <h2 className="text-2xl md:text-4xl font-bold text-white">
                Let Our Numbers Tell the Story
              </h2>
              <section className="flex flex-wrap justify-center gap-8">
                {[
                  { label: "Years of Experience", value: 30 },
                  { label: "Happy Clients", value: 5000 },
                  { label: "Photos Clicked", value: 100000 } ].map((stat, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center  w-[140px] text-center"
                  >
                    <p className="text-xs md:text-sm">{stat.label}</p>
                    <AnimatedCounter targetNumber={stat.value} />
                  </div>
                ))}
              </section>
            </div>
          </motion.div>

          <motion.p
            id="aboutp3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            We believe that the best photos are not posed —{" "}
            <span className="italic text-[#f1ddab]">they’re felt</span>. Let us
            tell your story through our lens.
          </motion.p>
        </div>
      </section>
    </>
  );
};

export default Home;
