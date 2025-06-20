import { MdWork, MdArticle, MdImage, MdBusiness } from "react-icons/md";
import { NavLink } from "react-router-dom";

export default function ListMenu({ horizontal = false }) {
    const menuClass = ({ isActive }) =>
        `flex items-center space-x-2 px-4 py-2 rounded-lg text-sm transition
        ${isActive ? "text-hijau bg-green-200 font-bold" : "text-white hover:text-hijau hover:bg-green-200"}`;

    const wrapperClass = horizontal ? "flex space-x-4" : "flex flex-col space-y-3";

    return (
        <ul className={wrapperClass}>
            <li>
                <NavLink to="/job" className={menuClass}>
                    <MdWork className="text-lg" />
                    {!horizontal && <span>Jobs</span>}
                </NavLink>
            </li>
            <li>
                <NavLink to="/blog" className={menuClass}>
                    <MdArticle className="text-lg" />
                    {!horizontal && <span>Blog</span>}
                </NavLink>
            </li>
            <li>
                <NavLink to="/slider" className={menuClass}>
                    <MdImage className="text-lg" />
                    {!horizontal && <span>Sliders</span>}
                </NavLink>
            </li>
            <li>
                <NavLink to="/company" className={menuClass}>
                    <MdBusiness className="text-lg" />
                    {!horizontal && <span>Companies</span>}
                </NavLink>
            </li>
        </ul>
    );
}

