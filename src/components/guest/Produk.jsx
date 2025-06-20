import produkData from "../../data/produk.json";
import { motion } from "framer-motion";

export default function Products() {
  return (
    <div className="max-w-6xl mx-auto py-8">
      {/* Heading */}
      <div className="px-6 lg:px-0 mb-16">
        <h1 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[55px] xl:text-[55px] font-montserrat-B text-gray-900 font-bold">
          Produk Unggulan
        </h1>
        <p className="font-open-sans-L text-[16px] text-gray-600 max-w-2xl text-left">
          Beberapa produk makanan yang ditawarkan!
        </p>
      </div>

      {/* Card Grid */}
      <div className="grid md:grid-cols-3 gap-6 px-6 lg:px-0">
        {produkData.map((produk, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.15,
              duration: 0.6,
              ease: "easeOut",
            }}
            whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.12)" }}
          >
            {/* Gambar Produk */}
            <div className="relative">
              <img
                src={produk.image}
                alt={produk.title}
                className="w-full h-56 object-cover"
              />
              {produk.isUrgent && (
                <span className="absolute top-2 left-2 bg-red-200 text-red-800 text-xs font-semibold px-2 py-1 rounded">
                  Urgent
                </span>
              )}
            </div>

            {/* Konten */}
            <div className="p-4">
              {/* Header: Avatar dan Status */}
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <img
                    src={produk.avatar}
                    alt={produk.Pembuat}
                    className="w-5 h-5 rounded-full"
                  />
                  <span className="font-open-sans-L text-sm text-gray-700">
                    {produk.Pembuat}
                  </span>
                </div>
                {produk.isFulltime && (
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-0.5 rounded">
                    Fulltime
                  </span>
                )}
              </div>

              {/* Judul */}
              <h2 className="font-montserrat-M text-gray-800 text-[22px] leading-snug mb-3">
                {produk.title}
              </h2>

              {/* Waktu & Lokasi */}
              <div className="font-open-sans-L sStext-sm text-gray-500 flex items-center gap-2 mb-2">
                {/* Time Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{produk.time}</span>
                <span>•</span>

                {/* Location Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 11c1.656 0 3-1.344 3-3s-1.344-3-3-3-3 1.344-3 3 1.344 3 3 3z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 22s8-4.5 8-10.5S16.418 3 12 3 4 7.5 4 11.5 12 22 12 22z"
                  />
                </svg>
                <span>{produk.location}</span>
              </div>

              {/* Harga & Bookmark */}
              <div className="flex justify-between items-center mt-3">
                <span className="font-montserrat-B text-blue-600 text-[22px] font-bold">
                  {produk.price}
                  <span className="font-montserrat-R text-sm font-normal text-gray-500">
                    /Porsi
                  </span>
                </span>

                {/* Bookmark Icon */}
                <button className="text-gray-400 hover:text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 5v16l7-5 7 5V5z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
