import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Pagenf = () => {
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-center flex flex-col items-center justify-center px-4">
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold text-pink-400 mb-4"
      >
        😵‍💫 Lost in Focus...
      </motion.h1>
      <p className="text-[#99b3ff] text-lg mb-8">
        This page is as blurry as a photo without autofocus.
      </p>
      <Link
        to="/"
        className="bg-pink-500 text-black px-6 py-2 rounded-full hover:bg-pink-400 transition"
      >
        🔙 Go Back to Homepage
      </Link>
    </div>
  );
};

export default Pagenf;
