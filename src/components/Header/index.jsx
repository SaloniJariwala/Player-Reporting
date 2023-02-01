import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import Logo from "../../assets/images/logo.png";
import { Link, useLocation } from "react-router-dom";
import CasinoName from "./CasinoName";
import UserProfile from "./UserProfile";

const Header = ({ header_menu_button, mobileHeader }) => {
    const [pagename, setPageName] = useState();
    const [playerToggle, setPlayerToggle] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/player-reports") {
            setPageName("Player Reports");
        } else if (location.pathname === "/casino-settings") {
            setPageName("Casino Settings");
        } else if (location.pathname === "/casino") {
            setPageName("Main Dashboard");
        } else if (location.pathname === "/invoices") {
            setPageName("Invoices");
        } else {
            setPageName("Home - Dashboard");
        }
    }, [location.pathname]);

    const player_toggle_button = () => {
        setPlayerToggle(!playerToggle);
    };

    return (
        <>
            <header className="site_header">
                <div className="top_header for_mob">
                    <Link to="/" title="Logo" className="site_logo">
                        <img width={190} height={60} src={Logo} alt="Logo" />
                    </Link>

                    <button
                        type="button"
                        className="player_toggle menu_toggle"
                        onClick={player_toggle_button}>
                        <FaRegUserCircle size={25} />
                    </button>

                    <button type="button" className="menu_toggle" onClick={header_menu_button}>
                        {mobileHeader ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
                    </button>
                </div>

                <div className="main_header_content">
                    <h5 className="my_0">{pagename} </h5>

                    <div className={playerToggle ? "header_right player_open" : "header_right"}>
                        <ul>
                            <li>
                                <CasinoName />
                            </li>

                            <li>
                                <UserProfile />
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
