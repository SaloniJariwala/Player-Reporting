import { useEffect, useState } from "react";
import { NavLink} from "react-router-dom";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { TbFileInvoice } from "react-icons/tb";
import { AiOutlineLogout } from "react-icons/ai";
import { MdLocationPin } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";

const UserProfile = () => {
    const itemStr = localStorage.getItem("userLogin");
    const item = JSON.parse(itemStr);
    const [casinoInfo, casinoinfoCall] = useState([]);
    const [info, infoCall] = useState({});
    const [selectCasino, setSelectcasino] = useState();
    const api_domain = process.env.REACT_APP_LOGIN_API_DOMAIN;

    /** On load to get user data Start */
    useEffect(() => {
        getData().then((result) => {
            casinoinfoCall(result.casino_information);
            infoCall(result);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    /** set default game */
    useEffect(() => {
        if (casinoInfo.length > 0) {
            var casinoDetails = localStorage.getItem("currentCasino");
            if (casinoDetails === null) {
                localStorage.setItem("currentCasino", JSON.stringify(casinoInfo[0]));
                casinoDetails = JSON.parse(localStorage.getItem("currentCasino"));
            }
            setSelectcasino(casinoDetails);
        }
    }, [casinoInfo]);

    /** user information function */
    async function getData() {
        try {
            const data = {
                userid: item.userId,
            };

            let res = await axios({
                url: `${api_domain}/api/userinfomation.php`,
                method: "POST",
                data: data,
                mode: "no-cors",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST",
                    "Content-Type": "multipart/form-data",
                },
            });

            return res.data;
        } catch (err) {
            toast.error(err, { theme: "dark", autoClose: 1500 });
        }
    }
    /** On load to get user data end */

    /** User logout */
    const userLogout = () => {
      localStorage.removeItem("userLogin");
        localStorage.removeItem("currentCasino");
        // <Navigate to="/login" />
    };

    /** Select Games event */
    // eslint-disable-next-line no-unused-vars
    const selectGame = (index) => {
        localStorage.setItem("currentCasino", JSON.stringify(casinoInfo[index]));
        const casinoDetails = localStorage.getItem("currentCasino");
        setSelectcasino(JSON.parse(casinoDetails));

        // <Navigate to={`${location.pathname}?site=${index}`} />
        // navigate(`${location.pathname}/:site=${index}`, { replace: true });
        // <Navigate to={location.pathname + "?" + casinoInfo[index]}{ replace: true } />
        window.location.reload(false);
    };

    return (
        <div className="dropdown_wp dropdown_user_profile">
            <button className="sec_btn dropdown_btn secondary_btn">
                <div className="dropdown_user_profile_img">
                    <img src={info.profile_img} alt="" width={42} height={42} />
                </div>

                <div className="dropdown_user_profile_title">
                    <strong>{info.user_login}</strong>
                    <span>
                        <MdLocationPin />
                        <strong>{selectCasino ? selectCasino.casino_name : ""}</strong>
                    </span>
                </div>

                <span className="dropdown_icon">
                    <MdOutlineKeyboardArrowDown size={22} />
                </span>
            </button>

            <ul className="dropdown_list">
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) => (isActive ? "isActive" : null)}
                        title=" My profile">
                        <CgProfile size={24} /> My profile
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/invoices"
                        className={({ isActive }) => (isActive ? "isActive" : null)}
                        title="invoices">
                        <TbFileInvoice size={24} /> invoices
                    </NavLink>
                </li>
                <li>
                    <div className="divider"></div>
                    <NavLink to="/login" onClick={userLogout} title="logout">
                        <AiOutlineLogout size={24} /> logout
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default UserProfile;
