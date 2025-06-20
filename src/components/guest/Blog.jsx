import testimoniData from '../../data/testimoni.json';
import { motion } from 'framer-motion';

export default function Testimoni() {
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

      {/* Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 lg:px-0">
        {testimoniData.map((item, index) => (
          <motion.div
            key={item.id}
            className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.5, ease: 'easeOut' }}
            whileHover={{ scale: 1.03, boxShadow: '0 10px 20px rgba(0,0,0,0.12)' }}
          >
            {/* Gambar */}
            <img
              src={item.image || '/images/default.jpg'}
              alt={`Makanan - ${item.nama}`}
              className="h-48 w-full object-cover"
            />

            {/* Konten */}
            <div className="p-5 flex flex-col justify-between flex-grow">
              <div className="font-open-sans-L flex items-center justify-between text-sm text-gray-500 mb-2">
                <span>{item.nama}</span>
                <span>{item.tanggal}</span>
              </div>

              <p className="font-montserrat-M text-gray-700 text-[20px] mb-4">"{item.komentar}"</p>

              <div className="text-yellow-500 text-[18px] mt-auto">
                {'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
