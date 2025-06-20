import produkData from "../../data/produk.json";
import { motion } from "framer-motion";
import { FaRegClock, FaMapMarkerAlt, FaBookmark } from "react-icons/fa"; // Import icons

export default function RecentJobs() {
  return (
    <div className="max-w-6xl mx-auto py-8">
      {/* Combined Heading and Category Filter Buttons */}
      <div className="px-6 lg:px-0 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[55px] xl:text-[55px] font-montserrat-B text-gray-900 font-bold">
            Recent Jobs
          </h1>
          <p className="font-open-sans-L text-[16px] text-gray-600 text-left">
            8 new opportunities posted today!
          </p>
        </div>

        {/* Category Filter Buttons - Now inside the flex container */}
        <div className="flex gap-4 overflow-x-auto pb-2 flex-shrink-0">
          <button className="px-5 py-2 rounded-full bg-blue-100 text-blue-800 font-semibold text-sm whitespace-nowrap">
            Design
          </button>
          <button className="px-5 py-2 rounded-full bg-gray-100 text-gray-700 font-semibold text-sm whitespace-nowrap hover:bg-gray-200">
            Marketing
          </button>
          <button className="px-5 py-2 rounded-full bg-gray-100 text-gray-700 font-semibold text-sm whitespace-nowrap hover:bg-gray-200">
            Service
          </button>
          <button className="px-5 py-2 rounded-full bg-gray-100 text-gray-700 font-semibold text-sm whitespace-nowrap hover:bg-gray-200">
            Health Care
          </button>
          <button className="px-5 py-2 rounded-full bg-gray-100 text-gray-700 font-semibold text-sm whitespace-nowrap hover:bg-gray-200">
            Writing
          </button>
        </div>
      </div>

      {/* Card Grid */}
      <div className="grid md:grid-cols-3 gap-6 px-6 lg:px-0">
        {produkData.map((job, index) => (
          <motion.div
            key={job.id}
            className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.15,
              duration: 0.6,
              ease: "easeOut",
            }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
            }}
          >
            {/* Image (Company Banner/Job Image) */}
            <div className="relative">
              <img
                src={job.image}
                alt={job.title}
                className="w-full h-56 object-cover"
              />
              {job.isUrgent && (
                <span className="absolute top-2 left-2 bg-red-200 text-red-800 text-xs font-semibold px-2 py-1 rounded">
                  Urgent
                </span>
              )}
            </div>

            {/* Konten */}
            <div className="p-4">
              {/* Header: Avatar (Company Logo) and Status */}
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <img
                    src={job.avatar}
                    alt={job.Pembuat}
                    className="w-8 h-8 rounded-full" // Adjust size if needed
                  />
                  <span className="font-open-sans-L text-sm text-gray-700">
                    {job.Pembuat} {/* 'Pembuat' should be 'Company Name' */}
                  </span>
                </div>
                {job.isFulltime && (
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-0.5 rounded">
                    Fulltime
                  </span>
                )}
              </div>

              {/* Judul (Job Title) */}
              <h2 className="font-montserrat-M text-gray-800 text-[22px] leading-snug mb-3">
                {job.title}
              </h2>

              {/* Waktu & Lokasi */}
              <div className="font-open-sans-L text-sm text-gray-500 flex items-center gap-2 mb-2">
                <FaRegClock className="w-4 h-4" />
                <span>{job.time}</span>
                <span>•</span>
                <FaMapMarkerAlt className="w-4 h-4" />
                <span>{job.location}</span>
              </div>

              {/* Salary & Bookmark */}
              <div className="flex justify-between items-center mt-3">
                <span className="font-montserrat-B text-blue-600 text-[22px] font-bold">
                  {job.price}
                  <span className="font-montserrat-R text-sm font-normal text-gray-500">
                    /Month
                  </span>
                </span>

                {/* Bookmark Icon */}
                <button className="text-gray-400 hover:text-gray-600">
                  <FaBookmark className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}