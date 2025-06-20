import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm border-b border-gray-100 sticky top-0 z-50"> {/* Adjusted shadow and added sticky position */}
      {/* Logo */}
      <div className="basis-1/5 flex justify-start pl-6"> {/* Adjusted basis and alignment */}
        <span id="logo-title" className="font-poppins-extrabold text-[32px] text-gray-900">
          Job Portal <b id="logo-dot" className="text-green-600">.</b>
        </span>
      </div>

      {/* Navigation */}
      <nav className="basis-3/5 hidden lg:flex justify-center"> {/* Added hidden on small screens and lg:flex */}
        <ul className="flex justify-center gap-8 text-sm font-medium text-gray-900">
          <li>
            <Link to="/guest" className="font-montserrat-M text-[16px] hover:text-green-600">Home</Link>
          </li>
          <li>
            <Link to="/jobs" className="font-montserrat-M text-[16px] hover:text-green-600">Browse Jobs</Link> {/* New link */}
          </li>
          <li>
            <Link to="/employers" className="font-montserrat-M text-[16px] hover:text-green-600">Employers</Link> {/* New link */}
          </li>
          <li>
            <Link to="/candidates" className="font-montserrat-M text-[16px] hover:text-green-600">Candidates</Link> {/* New link */}
          </li>
          <li>
            <Link to="/blog" className="font-montserrat-M text-[16px] hover:text-green-600">Blog</Link> {/* New link (your Testimoni component) */}
          </li>
          {/* ... potentially other links like 'Pages' */}
        </ul>
      </nav>

      {/* Actions */}
      <div className="basis-1/5 flex justify-end pr-6 items-center gap-4 font-medium"> {/* Adjusted basis and alignment */}
        <Link to="/register" className="font-montserrat-M text-green-600 text-[16px] hover:text-green-800">Apply Now</Link> {/* Changed text */}
        <Link
          to="/login"
          className="font-open-sans-R bg-green-600 hover:bg-green-700 text-[18px] text-white px-5 py-2 rounded-md shadow-md transition"
        >
          Sign in
        </Link>
        {/* Potentially add a mobile menu icon here for small screens */}
      </div>
    </header>
  );
}
