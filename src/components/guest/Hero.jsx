import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="mt-10 max-w-7xl mx-auto bg-[#FFF9F5] px-6 lg:px-24 flex flex-col-reverse lg:flex-row items-center justify-between gap-10 rounded-[60px] min-h-[700px] overflow-hidden">
      {/* LEFT SIDE */}
      <motion.div
        className="flex flex-col justify-center text-center lg:text-left max-w-2xl h-full py-12"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Subjudul kecil */}
        <motion.p
          className="font-montserrat-M text-green-600 font-semibold mb-4"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2" />
          BEST FOOD PLACE
        </motion.p>

        {/* Judul utama */}
        <motion.h1
          className="font-montserrat-B text-[32px] sm:text-[40px] md:text-[48px] lg:text-[69px] font-bold text-gray-900 leading-tight"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Tempat Makanan <br className="hidden sm:inline" />
          Yang Enak & Murah
        </motion.h1>

        {/* Deskripsi */}
        <motion.p
          className="font-open-sans-R text-gray-600 mt-4 text-[16px] lg:text-[16px]"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Tersedia berbagai pilihan makanan lezat dan terjangkau. Beli sekarang
          sebelum kehabisan!
        </motion.p>

        {/* Form Pencarian */}
        <motion.div
          className="mt-8 bg-white p-4 rounded-3xl shadow-md grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-4 items-center"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl">
            <FaSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Cari makanan, restoran..."
              className="font-open-sans-R text-[18px] outline-none bg-transparent w-full"
            />
          </div>
          <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl">
            <FaMapMarkerAlt className="text-gray-400" />
            <input
              type="text"
              placeholder="Lokasi"
              className="font-open-sans-R text-[14px] outline-none bg-transparent w-full"
            />
          </div>
          <button className="font-open-sans-R bg-green-600 text-[18px] text-white font-semibold px-6 py-3 rounded-xl w-full sm:w-auto">
            Cari Sekarang
          </button>
        </motion.div>

        {/* Pencarian Populer */}
        <motion.p
          className="font-open-sans-R mt-4 text-[16px] text-gray-600"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <span className="font-montserrat-B font-bold text-gray-800">
            Pencarian Populer:
          </span>{" "}
          Nasi Goreng, Ayam Geprek, Mie Ayam, Soto, Sate
        </motion.p>
      </motion.div>

      {/* RIGHT SIDE */}
      <motion.div
        className="w-full lg:w-[50%] h-[300px] lg:h-[400px] flex items-center justify-center"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {/* Ganti dengan gambar makanan jika tersedia */}
        <motion.span
          id="logo-title"
          className="font-poppins-extrabold text-[64px] lg:text-[96px] text-gray-900 leading-none"
          initial={{ scale: 0.9, y: 60 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          Sedap<b className="text-green-600">.</b>
        </motion.span>
      </motion.div>
    </section>
  );
}
