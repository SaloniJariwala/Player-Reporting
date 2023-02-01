import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import FavIcon from "../../assets/images/favicon.ico";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { SideBarData } from "./SideBarData";

const SideBar = ({ sideBar, sideBarButton, mobileHeader }) => {
    return (
        <>
            <aside className="sidebar">
                <div className="sidebar_top">
                    <Link to="/" title="Logo" className="site_logo">
                        <img src={sideBar ? FavIcon : Logo} alt="Logo" />
                    </Link>

                    <button className="sidebar_collapse_button">
                        {sideBar ? (
                            <MdOutlineKeyboardArrowRight size={22} onClick={sideBarButton} />
                        ) : (
                            <MdOutlineKeyboardArrowLeft size={22} onClick={sideBarButton} />
                        )}
                    </button>
                </div>

                <nav className="sidebar_menulist">
                    <ul>
                        {SideBarData.map((data, index) => {
                            return (
                                <li key={index}>
                                    <NavLink
                                        className={({ isActive }) => (isActive ? "isActive" : null)}
                                        to={data.path}
                                        title={data.title}>
                                        <span>
                                            {data.icon}
                                            {sideBar ? null : data.title}
                                        </span>
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </aside>
        </>
    );
};

export default SideBar;
