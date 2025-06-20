import { MdWork, MdBusiness, MdPeople, MdArticle } from "react-icons/md";
import PageHeader from "../components/admin/PageHeader";

export default function Dashboard() {
    return (
        <div id="dashboard-container" className="space-y-6">
            <PageHeader
                title="Dashboard"
                breadcrumb={['Dashboard', 'Overview']}
            >
                <button className="bg-hijau text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                    + Post New Job
                </button>
            </PageHeader>

            <div id="dashboard-grid" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                {/* Total Jobs */}
                <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition">
                    <div className="bg-hijau/20 text-hijau p-4 rounded-full">
                        <MdWork className="text-2xl" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold">128</p>
                        <p className="text-sm text-gray-500">Total Jobs</p>
                    </div>
                </div>

                {/* Active Companies */}
                <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition">
                    <div className="bg-biru/20 text-biru p-4 rounded-full">
                        <MdBusiness className="text-2xl" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold">42</p>
                        <p className="text-sm text-gray-500">Active Companies</p>
                    </div>
                </div>

                {/* Total Applicants */}
                <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition">
                    <div className="bg-merah/20 text-merah p-4 rounded-full">
                        <MdPeople className="text-2xl" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold">780</p>
                        <p className="text-sm text-gray-500">Total Applicants</p>
                    </div>
                </div>

                {/* Blog Articles */}
                <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition">
                    <div className="bg-kuning/20 text-kuning p-4 rounded-full">
                        <MdArticle className="text-2xl" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold">19</p>
                        <p className="text-sm text-gray-500">Blog Articles</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
