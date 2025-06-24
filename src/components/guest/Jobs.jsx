import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaRegClock, FaMapMarkerAlt, FaBookmark, FaTimes } from "react-icons/fa";
import { jobAPI } from "../../services/jobAPI";

export default function RecentJobs() {
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedJob, setSelectedJob] = useState(null); // <-- Untuk popup
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await jobAPI.fetchJobs();

        const formatted = data.map((job) => ({
          ...job,
          price: `Rp.${parseInt(job.salary_min).toLocaleString()} - Rp.${parseInt(
            job.salary_max
          ).toLocaleString()}`,
        }));

        setJobs(formatted);
        const uniqueCategories = Array.from(new Set(data.map((job) => job.category))).filter(Boolean);
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    }

    fetchData();
  }, []);

  const filteredJobs =
    selectedCategory === "All"
      ? jobs
      : jobs.filter((job) => job.category === selectedCategory);

  const handleCardClick = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 relative">
      {/* Header dan Filter */}
      {/* ... (sama seperti sebelumnya) */}

      {/* Kartu Job */}
      <div className="grid md:grid-cols-3 gap-6 px-6 lg:px-0">
        {filteredJobs.map((job, index) => (
          <motion.div
            key={job.id}
            className="bg-white shadow-md rounded-xl overflow-hidden border cursor-pointer"
            onClick={() => handleCardClick(job)}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.15,
              duration: 0.6,
              ease: "easeOut",
            }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Gambar */}
            <div className="relative">
              <img
                src={job.image}
                alt={job.title_job}
                className="w-full h-56 object-cover"
              />
              {job.isUrgent && (
                <span className="absolute top-2 left-2 bg-orange-100 text-orange-800 text-xs font-semibold px-2 py-1 rounded">
                  Urgent
                </span>
              )}
            </div>

            {/* Konten */}
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-700">{job.company_name}</span>
                {job.job_type?.toLowerCase() === "fulltime" && (
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-0.5 rounded">
                    Fulltime
                  </span>
                )}
              </div>

              <h2 className="text-lg font-semibold text-gray-800 mb-2 leading-tight">
                {job.title_job}
              </h2>

              <div className="text-sm text-gray-500 flex items-center gap-2 mb-2">
                <FaRegClock className="w-4 h-4" />
                <span>{new Date(job.created_at).toLocaleDateString()}</span>
                <span>•</span>
                <FaMapMarkerAlt className="w-4 h-4" />
                <span>{job.location}</span>
              </div>

              <div className="flex justify-between items-center mt-3">
                <span className="text-blue-600 font-bold text-lg">
                  {job.price}
                  <span className="text-sm text-gray-500 font-normal"> /Month</span>
                </span>
                <button className="text-gray-400 hover:text-gray-600">
                  <FaBookmark className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Popup Modal */}
      {showModal && selectedJob && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-xl w-full p-6 relative shadow-lg">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setShowModal(false)}
            >
              <FaTimes className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              {selectedJob.title_job}
            </h2>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Company:</strong> {selectedJob.company_name}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Location:</strong> {selectedJob.location}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Job Type:</strong> {selectedJob.job_type}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Salary:</strong> {selectedJob.price}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Category:</strong> {selectedJob.category}
            </p>
            <p className="text-sm text-gray-600 mb-3">
              <strong>Posted:</strong> {new Date(selectedJob.created_at).toLocaleString()}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Description:</strong><br />
              {selectedJob.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
