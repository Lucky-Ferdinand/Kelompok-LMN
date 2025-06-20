import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between bg-white px-6 py-4 shadow-md">
      {/* Logo */}
      <div className="basis-1/4 flex justify-end pr-6">
        <span id="logo-title" className="font-poppins-extrabold text-[32px] text-gray-900">
          Sedap <b id="logo-dot" className="text-green-600">.</b>
        </span>
      </div>

      {/* Navigation */}
      <nav className="basis-1/2">
        <ul className="flex justify-center gap-8 text-sm font-medium text-gray-900">
          <li>
            <Link to="/guest" className="font-montserrat-M text-[16px] hover:text-green-600">Home</Link>
          </li>
          <li>
            <Link to="/guest" className="font-montserrat-M  text-[16px] hover:text-green-600">About</Link>
          </li>
          <li>
            <Link to="/guest" className="font-montserrat-M  text-[16px] hover:text-green-600">Produk</Link>
          </li>
          <li>
            <Link to="/guest" className="font-montserrat-M  text-[16px] hover:text-green-600">Testimoni</Link>
          </li>
        </ul>
      </nav>

      {/* Actions */}
      <div className="basis-1/4 flex justify-start pl-6 items-center gap-4 font-medium">
        <Link to="/register" className="font-montserrat-M text-green-600 text-[16px] hover:text-green-800">Daftar</Link>
        <Link
          to="/login"
          className="font-open-sans-R bg-green-600 hover:bg-green-700 text-[18px] text-white px-5 py-2 rounded-md shadow-md transition"
        >
          Sign in
        </Link>
      </div>
    </header>
  );
}
