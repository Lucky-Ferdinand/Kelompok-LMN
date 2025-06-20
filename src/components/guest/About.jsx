import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.div
      className="max-w-6xl mx-auto py-8"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="px-6 lg:px-0 mb-16">
        <motion.h1
          className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[55px] xl:text-[55px] font-montserrat-B text-gray-900 font-bold"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          viewport={{ once: true }}
        >
          About us
        </motion.h1>
        <motion.p
          className="font-open-sans-L text-[16px] text-gray-600 max-w-2xl text-left"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Kita percaya makanan dapat membuat semua orang bahagia
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Koki",
            image: "/img/guest/Koki2.png",
            desc: "10 orang",
            bg: "bg-blue-100",
            delay: 0.3,
          },
          {
            title: "Manager",
            image: "/img/guest/manager2.png",
            desc: "Sedang tidak tersedia",
            bg: "bg-red-100",
            delay: 0.4,
          },
          {
            title: "Customer Service",
            image: "/img/guest/Service2.png",
            desc: "3 sedang tersedia",
            bg: "bg-purple-100",
            delay: 0.5,
          },
          {
            title: "Driver",
            image: "/img/guest/driver2.png",
            desc: "Sedang tidak tersedia",
            bg: "bg-yellow-100",
            delay: 0.6,
          },
        ].map((card, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: card.delay, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center mb-4">
              <div className={`${card.bg} p-4 rounded-full`}>
                <img src={card.image} alt={card.title} className="w-16 h-16" />
              </div>
            </div>
            <h2 className="font-montserrat-R text-[22px] text-center mb-2">
              {card.title}
            </h2>
            <p className="font-open-sans-L text-gray-600 text-[14px] text-center">{card.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
