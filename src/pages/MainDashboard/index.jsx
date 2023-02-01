import { useEffect, useState } from "react";
import CasinoChart from "./CasinoChart";
import Revenue from "./Revenue";
import ReportsFilter from "./ReportsFilter";
import GGRbyGame from "./GgrByGame";
import axios from "axios";
import moment from "moment";
import DatePicker from "react-datepicker";
import { BsCalendar2Date } from "react-icons/bs";
import { FcMoneyTransfer, FcCurrencyExchange, FcBullish, FcNews } from "react-icons/fc";
import { GiAbstract021 } from "react-icons/gi";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
moment.locale("utc");
const Casino = () => {
    const startDate = moment().subtract(30, "d");
    const [startDateDatepicker, setStartDateDatepicker] = useState(new Date(startDate));
    const [endDateDatepicker, setEndDateDatepicker] = useState(new Date());
    const [gameTransactionData, setGamedata] = useState();
    const [gameFilterTranData, setFilterGamedata] = useState();
    const [chartDate, setChartdate] = useState([]);
    const [dateCount, setDatecount] = useState([]);
    const [dateRevenue, setDaterevenue] = useState([]);
    const [dateRevenuefilter, setDaterevenuefilter] = useState([]);
    const [gameTypeData, setGameype] = useState([]);
    const [dateFilter, setDateFilter] = useState(null);
    const [loading, setLoading] = useState(null);

    const currentCasino = localStorage.getItem("currentCasino");
    const currentActivegame = JSON.parse(currentCasino);
    const casino_token = currentActivegame.casino_token;
    const casino_key = currentActivegame.casino_key;
    const tax_rate = currentActivegame.tax_rate;
    const api_domain = process.env.REACT_APP_API_DOMAIN;

    /*** DaterAnge Change function  */
    const onDatepickerChange = (dates) => {
        const [start, end] = dates;
        if (start !== null && end !== null) {
            var startDateApi = moment.utc(start).format("YYYY-MM-DD");
            var endDateApi = moment.utc(end).format("YYYY-MM-DD");

            setLoading(true);
            getGameTransaction(startDateApi, endDateApi);
            setDateFilter(1);
        }
        setStartDateDatepicker(start);
        setEndDateDatepicker(end);
    };

    /*** DaterAnge Change function End */

    /** Get All transaction Data by date Range  */
    const getGameTransaction = async (startDateApi, endDateApi) => {
     await axios
            .get(
              `  ${api_domain}/api/reports/transactions/common?token=${casino_token}&casino=${casino_key}&start=${startDateApi}&end=${endDateApi}`
            )
            .then((result) => {
                const dataresult = result.data.response;
                setFilterGamedata(dataresult);
                setLoading(false);
            })
            .catch(function (error) {
                if (error.response) {
                    toast.error(error.response.data.message, { theme: "dark", autoClose: 1500 });
                    setLoading(false);
                } else {
                    toast.error(error.message, { theme: "dark", autoClose: 1500 });
                    setLoading(false);
                }
            });
    };

    const chartDatacallback = async () => {
        if (dateFilter !== 1) {
            setLoading(true);
            const Thirtydayago = moment().subtract(30, "d").format("YYYY-MM-DD");
            const currentDate = moment().format("YYYY-MM-DD");

            await axios
                .get(
                    `${api_domain}/api/reports/transactions/common?token=${casino_token}&casino=${casino_key}&start=${Thirtydayago}&end=${currentDate}`
                )
                .then((result) => {
                    const dataresult = result.data.response;
                    setGamedata(dataresult);
                    setFilterGamedata(dataresult);

                    setLoading(false);
                })
                .catch(function (error) {
                    if (error.response) {
                        toast.error(error.response.data.message, { theme: "dark", autoClose: 1500 });
                        setLoading(false);
                    } else {
                        toast.error(error.message, { theme: "dark", autoClose: 1500 });
                        setLoading(false);
                    }
                });
        }
    };

    /** Onload UseEffect */
    useEffect(() => {
        chartDatacallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (gameTransactionData) {
            var chartdataObj = {};

            const lastToday = moment(new Date()).utc().format("YYYY-MM-DD");
            const lastYesterday = moment().subtract(1, "d").format("YYYY-MM-DD");
            const lastSevenDay = moment().utc().subtract(7, "d").format("YYYY-MM-DD");
            const lastThirtyday = moment().subtract(30, "d").format("YYYY-MM-DD");
            var total,
                totalbetToday = 0,
                totalbetYesterday = 0,
                totalbetSevenDay = 0,
                totalbetThirtyday = 0,
                totalPlayerwin = 0;

            // eslint-disable-next-line array-callback-return
            gameTransactionData.map((val, i) => {
                //  moment.utc(val.createdAt).format("DD MMM YYYY");

                var finaldatecom = moment.utc(val.createdAt).format("YYYY-MM-DD");

                //  moment().startOf("month").format("MMM YYYY");

                if (val.action === "debit") {
                    if (lastToday === finaldatecom) {
                        totalbetToday = totalbetToday + val.amount;
                    }
                    if (lastYesterday === finaldatecom) {
                        totalbetYesterday = totalbetYesterday + val.amount;
                    }

                    if (moment(finaldatecom).isBetween(lastSevenDay, lastToday)) {
                        totalbetSevenDay = totalbetSevenDay + val.amount;
                    }
                    if (moment(finaldatecom).isBetween(lastThirtyday, lastToday)) {
                        totalbetThirtyday = totalbetThirtyday + val.amount;
                    }
                } else {
                    totalPlayerwin = totalPlayerwin + val.amount;
                }

                if (!chartdataObj[finaldatecom]) {
                    total = 0;
                }
                if (val.action === "debit") {
                    total = total + val.amount;
                } else {
                    total = total - val.amount;
                }
                if (typeof total !== "undefined") {
                    chartdataObj[finaldatecom] = total;
                }
            });

            var totalggrToday = 0,
                totalggrYesterday = 0,
                totalggrSevenDay = 0,
                totalggrThirtyday = 0;
            for (var key of Object.keys(chartdataObj)) {
                // var finaldatekey = moment.utc(key).format('YYYY-MM-DD');

                if (lastToday === key) {
                    totalggrToday = totalggrToday + chartdataObj[key];
                }
                if (lastYesterday === key) {
                    totalggrYesterday = totalggrYesterday + chartdataObj[key];
                }

                if (moment(key).isBetween(lastSevenDay, lastToday)) {
                    totalggrSevenDay = totalggrSevenDay + chartdataObj[key];
                }
                if (moment(key).isBefore(key)) {
                    totalggrThirtyday = totalggrThirtyday + chartdataObj[key];
                }
            }

            setDaterevenue(() => {
                return [
                    {
                        time: "Today",
                        num:
                            totalbetToday.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            }) + " USD",
                        ggr:
                            totalggrToday.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            }) + " USD",
                    },
                    {
                        time: "Yesterday",
                        num:
                            totalbetYesterday.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            }) + " USD",
                        ggr:
                            totalggrYesterday.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            }) + " USD",
                    },
                    {
                        time: "Last 7 day's",
                        num:
                            totalbetSevenDay.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            }) + " USD",
                        ggr:
                            totalggrSevenDay.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            }) + " USD",
                    },
                    {
                        time: "Last 30 day's",
                        num:
                            totalbetThirtyday.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            }) + " USD",
                        ggr:
                            totalggrThirtyday.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            }) + " USD",
                    },
                ];
            });
        }
    }, [gameTransactionData]);

    useEffect(() => {
        if (gameFilterTranData) {
            var chartdataObj = {};
            var gameTypeobj = {};
            var total;
            var totalbetThirtyday = 0,
                totalPlayerwin = 0;

            // eslint-disable-next-line array-callback-return
            gameFilterTranData.map((val, i) => {
                var finaldate = moment.utc(val.createdAt).format("DD MMM YYYY");

                if (!chartdataObj[finaldate]) {
                    total = 0;
                }
                if (val.action === "debit") {
                    total = total + val.amount;
                } else {
                    total = total - val.amount;
                }
                if (typeof total !== "undefined") {
                    chartdataObj[finaldate] = total;
                }

                if (val.action === "debit") {
                    totalbetThirtyday = totalbetThirtyday + val.amount;
                } else {
                    totalPlayerwin = totalPlayerwin + val.amount;
                }

                if (typeof gameTypeobj[val.gameID] !== "undefined") {
                    if (val.action === "debit") {
                        gameTypeobj[val.gameID] = gameTypeobj[val.gameID] + val.amount;
                    } else {
                        gameTypeobj[val.gameID] = gameTypeobj[val.gameID] - val.amount;
                    }
                } else {
                    gameTypeobj[val.gameID] = 0;
                    if (val.action === "debit") {
                        gameTypeobj[val.gameID] = gameTypeobj[val.gameID] + val.amount;
                    } else {
                        gameTypeobj[val.gameID] = gameTypeobj[val.gameID] - val.amount;
                    }
                }
            });

            var betdate = [];
            var totalbet = [];

            for (var key of Object.keys(chartdataObj)) {
                betdate.push(key);
                totalbet.push(
                    chartdataObj[key].toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })
                );
            }

            if (betdate.length !== 0 && totalbet.length !== 0) {
                setChartdate(betdate);
                setDatecount(totalbet);
            } else {
                setDatecount(totalbet);
                setChartdate(betdate);
                toast.error("There are no records to display", { theme: "dark", autoClose: 1500 });
            }

            setDaterevenuefilter(() => {
                var totalGer = totalbetThirtyday - totalPlayerwin;
                var totalTax = (tax_rate / 100) * totalGer;
                var netGamerevenue = totalGer - totalTax;

                return [
                    {
                        id: 1,
                        icon: <FcMoneyTransfer className="mr_10" size={26} />,
                        type: "Gross Gaming Total",
                        earning:
                            totalbetThirtyday.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            }) + " USD",
                    },
                    {
                        id: 2,
                        icon: <FcCurrencyExchange className="mr_10" size={26} />,
                        type: "Payout",
                        earning:
                            totalPlayerwin.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            }) + " USD",
                    },
                    {
                        id: 3,
                        icon: <FcBullish className="mr_10" size={26} />,
                        type: "Gross Gaming Revenue (GGR)",
                        earning:
                            totalGer.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            }) + " USD",
                    },
                    {
                        id: 4,
                        icon: <FcNews className="mr_10" size={26} />,
                        type: "taxes",
                        earning:
                            totalTax.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            }) + " USD",
                    },
                    {
                        id: 5,
                        icon: <GiAbstract021 className="mr_10" size={26} />,
                        type: "Net Gaming Revenue",
                        earning:
                            netGamerevenue.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            }) + " USD",
                    },
                ];
            });

            let gameTypeggr = [];
            let promises = [];

            for (var gameID of Object.keys(gameTypeobj)) {
                let gameGGR = 0;
                gameGGR = gameTypeobj[gameID].toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                });
                promises.push(
                    axios
                        .get(
                            `${api_domain}/games/admin?action=get_game&token=${casino_token}&game_id=${gameID}&casino=${casino_key}`
                        )
                        .then((response) => {
                            gameTypeggr.push({
                                key:response.data.response.name,
                                gametotal:
                                    gameGGR.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }) + " USD",
                            });
                        })
                );
            }
            Promise.all(promises).then(() => setGameype(gameTypeggr));

            setLoading(false);
        }
    }, [api_domain, casino_key, casino_token, gameFilterTranData, tax_rate]);

    return (
        <>
            <div className="form_box_wp casino_chart">
                <div className="datepicker_wp mb_30">
                    <label className="form_input_label">
                        <div className="form_input_icon">
                            <BsCalendar2Date size={24} className="mr_10" />
                        </div>
                        Select Date
                    </label>
                    <DatePicker
                        dateFormat="dd-MM-yyyy"
                        selected={startDateDatepicker}
                        onChange={onDatepickerChange}
                        startDate={startDateDatepicker}
                        endDate={endDateDatepicker}
                        monthsShown={2}
                        selectsRange
                        className="form_input"
                    />
                </div>
                <div className="table_loader_wp">
                    <CasinoChart chartdate={chartDate} datecount={dateCount} />
                    {loading ? <Loader /> : ""}
                </div>
            </div>

            <Revenue revenueData={dateRevenue} loading={loading} />

            <ReportsFilter
                revenueFilterdata={dateRevenuefilter}
                loading={loading}
                startDate={startDateDatepicker}
                endDate={endDateDatepicker}
            />

            <GGRbyGame gameTypeggrdata={gameTypeData} loading={loading} />
        </>
    );
};

export default Casino;
