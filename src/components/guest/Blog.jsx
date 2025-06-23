import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Blog() {
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    const storedBlogs = localStorage.getItem("blogs");
    if (storedBlogs) {
      const parsed = JSON.parse(storedBlogs);

      const formatted = parsed.map((item) => ({
        ...item,
        image: item.image || "/images/default.jpg",
        content: item.content || "-",
        author_name: item.author_name || "Tidak diketahui",
        published_at: item.published_at || "Tidak diketahui",
      }));

      setBlogData(formatted);
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-12">
      {/* Header */}
      <div className="px-6 lg:px-0 mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-[32px] sm:text-[40px] md:text-[55px] font-bold text-gray-900 font-montserrat-B">
            From blog
          </h1>
          <p className="font-open-sans-L text-gray-500 text-base mt-1">
            Latest News & Events
          </p>
        </div>
      </div>

      {/* Blog Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 lg:px-0">
        {blogData.length === 0 ? (
          <p className="text-gray-500">Belum ada blog tersedia.</p>
        ) : (
          blogData.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5, ease: "easeOut" }}
              whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.12)" }}
            >
              {/* Gambar */}
              <img
                src={item.image}
                alt={`Blog oleh ${item.author_name}`}
                className="h-48 w-full object-cover"
              />

              {/* Konten */}
              <div className="p-5 flex flex-col justify-between flex-grow">
                <div className="font-open-sans-L flex items-center justify-between text-sm text-gray-500 mb-2">
                  <span>{item.author_name}</span>
                  <span>{item.published_at}</span>
                </div>

                <h2 className="font-bold text-lg text-gray-800 mb-2">
                  {item.title_blog}
                </h2>

                <p className="font-open-sans-L text-gray-700 text-sm">
                  {item.content}
                </p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
