import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 pt-16 px-8 md:px-24">
      {/* Main Content */}
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12">
        {/* Logo & Deskripsi */}
        <div className="md:col-span-1">
          <span id="logo-title" className="font-poppins-extrabold text-[38px] text-gray-900">
            Job Portal <b id="logo-dot" className="text-green-600">.</b>
          </span>
          <p className="font-open-sans-L mt-6 text-sm leading-relaxed">
            Job Portal is the heart of the design community and the best resource to discover and connect with designers and jobs worldwide.
          </p>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-montserrat-M text-[16px] text-gray-900 mb-6">Company</h3>
          <ul className="font-open-sans-L space-y-3 text-[14px]">
            <li><a href="#">About us</a></li>
            <li><a href="#">Our Team</a></li>
            <li><a href="#">Products</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        {/* Product */}
        <div>
          <h3 className="font-montserrat-M  text-[16px] text-gray-900 mb-6">Product</h3>
          <ul className="font-open-sans-L space-y-3 text-[14px]">
            <li><a href="#">Feature</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Credit</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        {/* Download */}
        <div>
          <h3 className="font-montserrat-M  text-[16px] text-gray-900 mb-6">Download</h3>
          <ul className="font-open-sans-L space-y-3 text-[14px]">
            <li><a href="#">iOS</a></li>
            <li><a href="#">Android</a></li>
            <li><a href="#">Microsoft</a></li>
            <li><a href="#">Desktop</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-montserrat-M  text-[16px] text-gray-900 mb-6">Support</h3>
          <ul className="font-open-sans-L space-y-3 text-[14px]">
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Help</a></li>
            <li><a href="#">Terms</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>
      </div>

      {/* Garis Pembatas */}
      <div className="border-t border-green-200 my-8" />

      {/* Copyright & Social */}
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 pb-8 px-4">
        <p className="font-open-sans-L text-sm text-gray-600">
          Copyright ©2025 <span className="text-green-600 font-semibold">Job Portal</span>. All Rights Reserved
        </p>
        <div className="flex gap-4">
          <a href="#" className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">
            <FaFacebookF className="text-gray-500 text-sm" />
          </a>
          <a href="#" className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">
            <FaTwitter className="text-gray-500 text-sm" />
          </a>
          <a href="#" className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">
            <FaInstagram className="text-gray-500 text-sm" />
          </a>
          <a href="#" className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">
            <FaLinkedinIn className="text-gray-500 text-sm" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
