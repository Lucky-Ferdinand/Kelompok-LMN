import ListMenu from "./ListMenu";

export default function Sidebar() {
    return (
        <div
            id="sidebar"
            className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white"
        >
            {/* Logo */}
            <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-hijau">J.</span>
                <span className="text-sm text-gray-300">Job Portal</span>
            </div>

            {/* Menu Horizontal */}
            <ListMenu horizontal />

            {/* Profile */}
            <div className="flex items-center space-x-3">
                <img
                    src="https://avatar.iran.liara.run/public/28"
                    alt="Admin Avatar"
                    className="w-9 h-9 rounded-full border-2 border-hijau"
                />
                <span className="text-sm text-gray-300">Admin</span>
            </div>
        </div>
    );
}
