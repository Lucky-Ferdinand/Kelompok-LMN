import { MdWork, MdBusiness, MdImage, MdArticle } from "react-icons/md";
import PageHeader from "../components/admin/PageHeader";
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { jobAPI } from "../services/jobAPI";
import { blogAPI } from "../services/blogAPI";
import { companyAPI } from "../services/companyAPI";
import { sliderAPI } from "../services/sliderAPI";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    jobs: 0,
    companies: 0,
    blogs: 0,
    sliders: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [jobs, companies, blogs, sliders] = await Promise.all([
          jobAPI.fetchJobs(),
          companyAPI.fetchCompanies(),
          blogAPI.fetchBlogs(),
          sliderAPI.fetchSliders(),
        ]);
        setStats({
          jobs: jobs.length,
          companies: companies.length,
          blogs: blogs.length,
          sliders: sliders.length,
        });
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      }
    };

    loadData();
  }, []);

  const chartData = [
    { name: "Jobs", value: stats.jobs },
    { name: "Companies", value: stats.companies },
    { name: "Blogs", value: stats.blogs },
    { name: "Sliders", value: stats.sliders },
  ];

  const colors = ["#8B5CF6", "#3B82F6", "#10B981", "#FBBF24"];

  return (
    <div id="dashboard-container" className="space-y-6">
      <PageHeader title="Dashboard" breadcrumb={["Dashboard", "Overview"]}>
        <button
          onClick={() => navigate("/job")}
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-xl hover:from-purple-600 hover:to-blue-600 transition"
        >
          + Post New Job
        </button>
      </PageHeader>

      {/* Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        <StatCard
          title="Total Jobs"
          value={stats.jobs}
          icon={<MdWork className="text-2xl" />}
          color="purple"
          onClick={() => navigate("/job")}
        />
        <StatCard
          title="Active Companies"
          value={stats.companies}
          icon={<MdBusiness className="text-2xl" />}
          color="blue"
          onClick={() => navigate("/company")}
        />
        <StatCard
          title="Blog Articles"
          value={stats.blogs}
          icon={<MdArticle className="text-2xl" />}
          color="green"
          onClick={() => navigate("/blog")}
        />
        <StatCard
          title="Sliders"
          value={stats.sliders}
          icon={<MdImage className="text-2xl" />}
          color="yellow"
          onClick={() => navigate("/slider")}
        />
      </div>

      {/* Chart */}
      <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 p-6 rounded-2xl shadow-md mx-4 border border-purple-100">
        <h3 className="text-xl font-semibold text-purple-700 mb-4">Statistik Konten</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color, onClick }) {
  const colorMap = {
    purple: "bg-purple-100 text-purple-600",
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    yellow: "bg-yellow-100 text-yellow-600",
  };

  return (
    <div
      onClick={onClick}
      className="flex items-center gap-4 bg-white p-5 rounded-xl shadow hover:shadow-lg transition cursor-pointer group"
    >
      <div className={`p-4 rounded-full ${colorMap[color]} group-hover:scale-105 transition`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className="text-sm text-gray-500">{title}</p>
      </div>
    </div>
  );
}
