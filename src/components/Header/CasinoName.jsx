import { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";

const CasinoName = () => {
    const itemStr = localStorage.getItem("userLogin");
    const item = JSON.parse(itemStr);
    const [casinoInfo, casinoinfoCall] = useState([]);
    const [selectCasino, setSelectcasino] = useState();
    const api_domain = process.env.REACT_APP_LOGIN_API_DOMAIN;

    // /** On load to get user data Start */
    useEffect(() => {
        getData().then((result) => {
            casinoinfoCall(result.casino_information);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    /** set default game */
    useEffect(() => {
        if (casinoInfo.length > 0) {
            var casinoDetails = localStorage.getItem("currentCasino");
            if (casinoDetails === null) {
                localStorage.setItem("currentCasino", JSON.stringify(casinoInfo[0]));
                casinoDetails =JSON.parse(localStorage.getItem("currentCasino"));
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

    /** Select Games event */
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
        <div className="dropdown_wp casino_name_dropdown">
            <button className="sec_btn dropdown_btn transparent_btn">
                {selectCasino ? selectCasino.casino_name : ""}
                <span className="dropdown_icon">
                    <MdOutlineKeyboardArrowDown size={22} />
                </span>
            </button>

            <ul className="dropdown_list">
                {casinoInfo.map((info, index) => {
                    return (
                        <li
                            key={"token_" + index}
                            onClick={() => {
                                selectGame(index);
                            }}>
                            {info.casino_name}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default CasinoName;
