import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ref, onValue } from "firebase/database";
import { database } from "../src/config/firebase";

const Gallery = () => {
  const [galleryData, setGalleryData] = useState({});
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true); // ⬅️ loader state

  useEffect(() => {
    const galleryRef = ref(database, "gallery");
    onValue(galleryRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setGalleryData(data);
      setLoading(false); // ⬅️ stop loading after data is fetched
    });
  }, []);

  const handleCategoryClick = (category) => {
    setActiveCategory(category === activeCategory ? null : category);
  };

  const openMedia = (media, index, category) => {
    setSelectedMedia(media);
    setCurrentCategory(category);
    setCurrentIndex(index);
  };

  const closeMedia = () => {
    setSelectedMedia(null);
    setCurrentCategory(null);
    setCurrentIndex(0);
  };

  const showNext = () => {
    const mediaList = getMediaList(currentCategory);
    const nextIndex = (currentIndex + 1) % mediaList.length;
    setSelectedMedia(mediaList[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const showPrev = () => {
    const mediaList = getMediaList(currentCategory);
    const prevIndex = (currentIndex - 1 + mediaList.length) % mediaList.length;
    setSelectedMedia(mediaList[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  const getMediaList = (category) => {
    const categoryData = galleryData[category];
    if (!categoryData) return [];
    return Array.isArray(categoryData)
      ? categoryData
      : Object.values(categoryData).map(item => item?.url || item); // fallback for new/old data format
  };

  return (
    <section className="bg-black py-16 px-4 min-h-screen text-white font-['Roboto']">
      <h2 className="text-center text-3xl md:text-5xl text-[#d6b67b] font-bold mb-12">
        Our Gallery
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-60">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#d6b67b]"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {Object.keys(galleryData).map((category) => {
            const mediaList = getMediaList(category);
            return (
              <div key={category}>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  onClick={() => handleCategoryClick(category)}
                  className="cursor-pointer overflow-hidden rounded-xl shadow-md hover:scale-105 transition-transform duration-500"
                >
                  {mediaList[0]?.endsWith(".mp4") ? (
                    <video
                      src={mediaList[0]}
                      className="w-full h-60 object-cover"
                      muted
                      autoPlay
                      loop
                    />
                  ) : (
                    <img
                      src={mediaList[0]}
                      alt={category}
                      className="w-full h-60 object-cover"
                    />
                  )}
                  <p className="mt-2 text-center capitalize text-[#c7ad7f] text-lg font-medium">
                    {category} Moments
                  </p>
                </motion.div>

                {activeCategory === category && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                    {mediaList.map((media, i) =>
                      media.endsWith(".mp4") ? (
                        <video
                          key={i}
                          src={media}
                          controls
                          className="rounded-lg w-full h-auto"
                        />
                      ) : (
                        <img
                          key={i}
                          src={media}
                          alt={`${category}-${i}`}
                          className="rounded-lg cursor-pointer hover:scale-105 transition-transform duration-500"
                          onClick={() => openMedia(media, i, category)}
                        />
                      )
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {selectedMedia && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-[999]"
          onClick={closeMedia}
        >
          <div
            className="relative max-w-3xl w-full px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-white text-3xl font-bold"
              onClick={closeMedia}
            >
              &times;
            </button>
            <button
              className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white text-4xl font-bold"
              onClick={showPrev}
            >
              &#8249;
            </button>
            <button
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white text-4xl font-bold"
              onClick={showNext}
            >
              &#8250;
            </button>

            {selectedMedia.endsWith(".mp4") ? (
              <video
                src={selectedMedia}
                controls
                className="w-full max-h-[90vh] rounded-lg"
              />
            ) : (
              <img
                src={selectedMedia}
                alt="Preview"
                className="w-full max-h-[90vh] object-contain rounded-lg"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
