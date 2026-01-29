// 1. AdminDashboard.jsx (Upload + Store publicId + Delete Media)

import React, { useState, useEffect } from 'react';
import { ref, onValue, set, push, remove } from 'firebase/database';
import { database } from '../../src/config/firebase';

const CATEGORIES = [
  'wedding', 'babyshoot', 'birthday', 'drone', 'prewedding', 'candid', 'HloyCommunian', 'others'
];

const AdminDashboard = () => {
  const [contactInfo, setContactInfo] = useState({ phone: '', whatsapp: '', instagram: '', address: '' });
  const [selectedCategory, setSelectedCategory] = useState('wedding');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isVideo, setIsVideo] = useState(false);
  const [mediaData, setMediaData] = useState({});

  useEffect(() => {
    const contactRef = ref(database, 'contact');
    onValue(contactRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setContactInfo(data);
    });

    const mediaRef = ref(database, 'gallery');
    onValue(mediaRef, (snapshot) => {
      const data = snapshot.val() || {};
      setMediaData(data);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveContact = async () => {
    try {
      await set(ref(database, 'contact'), contactInfo);
      alert('Contact info saved successfully!');
    } catch (err) {
      console.error("Saving failed:", err);
      alert("Something went wrong!");
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return alert("Please choose a file");

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "sr-gallery");

    const uploadType = isVideo ? 'video/upload' : 'image/upload';
    const res = await fetch(`https://api.cloudinary.com/v1_1/dirxz3wcg/${uploadType}`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (!data.secure_url || !data.public_id) return alert("Upload failed");

    await push(ref(database, `gallery/${selectedCategory}`), {
      url: data.secure_url,
      publicId: data.public_id
    });

    alert("File uploaded and saved!");
    setSelectedFile(null);
  };

  const handleDelete = async (category, key, publicId) => {
    const confirm = window.confirm("Are you sure you want to delete this media?");
    if (!confirm) return;

    try {
      await fetch(`/api/delete-media`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicId })
      });

      await remove(ref(database, `gallery/${category}/${key}`));
      alert("Media deleted successfully!");
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete media.");
    }
  };

  return (
    <section className="bg-black text-white py-20 px-4 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-center text-4xl md:text-5xl text-[#d6b67b] font-bold mb-12">
          Admin Dashboard
        </h2>

        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-[#c7ad7f] mb-6">Contact Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input name="phone" value={contactInfo.phone} onChange={handleChange} placeholder="Phone" className="p-3 rounded bg-[#1a1a1a] border border-[#333] focus:outline-none focus:ring-2 focus:ring-[#d6b67b]" />
            <input name="whatsapp" value={contactInfo.whatsapp} onChange={handleChange} placeholder="WhatsApp" className="p-3 rounded bg-[#1a1a1a] border border-[#333] focus:outline-none focus:ring-2 focus:ring-[#d6b67b]" />
            <input name="instagram" value={contactInfo.instagram} onChange={handleChange} placeholder="Instagram Link" className="p-3 rounded bg-[#1a1a1a] border border-[#333] focus:outline-none focus:ring-2 focus:ring-[#d6b67b]" />
            <textarea name="address" value={contactInfo.address} onChange={handleChange} rows="4" placeholder="Address" className="p-3 rounded bg-[#1a1a1a] border border-[#333] col-span-1 md:col-span-2 focus:outline-none focus:ring-2 focus:ring-[#d6b67b]" />
          </div>
          <div className="text-center mt-6">
            <button onClick={handleSaveContact} className="bg-green-600 px-8 py-3 rounded font-semibold hover:bg-green-700 transition">
              Save Contact Info
            </button>
          </div>
        </div>

        <hr className="border-[#444] mb-16" />

        <div>
          <h3 className="text-2xl font-semibold text-[#c7ad7f] mb-6">Upload Gallery Media</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="p-3 rounded bg-[#1a1a1a] border border-[#2d2d2d] text-white">
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <input type="file" accept="image/*,video/*" onChange={(e) => {
              const file = e.target.files[0];
              setSelectedFile(file);
              setIsVideo(file && file.type.startsWith("video"));
            }} className="p-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-[#2d2d2d] file:text-white hover:file:bg-[#444]" />
          </div>
          <div className="text-center mt-6">
            <button onClick={handleFileUpload} className="bg-blue-600 px-8 py-3 rounded font-semibold hover:bg-blue-700 transition">
              Upload Media
            </button>
          </div>
        </div>

        <div className="mt-20">
          <h3 className="text-2xl font-semibold text-[#c7ad7f] mb-6">Delete Media</h3>
          {Object.entries(mediaData).map(([category, files]) => (
            <div key={category} className="mb-8">
              <h4 className="text-xl mb-2 capitalize text-[#d6b67b]">{category}</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(files).map(([key, item]) => {
                  if (!item?.url) {
                    console.warn("Missing item or url:", item);
                    return null;
                  }
                  return (
                    <div key={key} className="relative group">
                      {item.url.endsWith(".mp4") ? (
                        <video src={item.url} controls className="rounded-lg w-full h-auto" />
                      ) : (
                        <img src={item.url} alt="" className="rounded-lg w-full h-40 object-cover" />
                      )}
                      <button onClick={() => handleDelete(category, key, item.publicId)} className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">Delete</button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
