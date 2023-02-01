import React, { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import Loader from "../../../components/Loader";
import axios from "axios";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { toast } from "react-toastify";

const CasinoTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [totalPages, setTotalPages] = useState();

    const currentCasino = localStorage.getItem("currentCasino");
    const currentActivegame = JSON.parse(currentCasino);
    const casino_token = currentActivegame.casino_token;
    const casino_key = currentActivegame.casino_key;
    const api_domain = process.env.REACT_APP_API_DOMAIN;

    //** Set Table Dark Theme  */
    createTheme(
        "solarized",
        {
            text: {
                primary: "#ffffff",
                secondary: "#8651d6",
            },
            background: {
                default: "rgb(22 22 22 / 20%)",
            },
            context: {
                background: "#cb4b16",
                text: "#FFFFFF",
            },
            divider: {
                default: "rgba(225,225,225,0.08)",
            },
        },
        "dark"
    );

    /** Set Table Column  */
    const columns = [
        {
            name: "Player",
            selector: (row) => row.remoteId,
            sortable: true,
        },
        {
            name: "Registered",
            selector: (row) => row.createdAt,
            sortable: true,
        },
        {
            name: "Bet history",
            selector: (row) => row.txnsCount,
            sortable: false,
        },
        {
            name: "Return",
            selector: (row) =>
                row.returnValue.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                }) + " USD",
            sortable: true,
        },
    ];

    /** Data Fetch Function   */
    const casinoPlyerreports = async (page) => {
        await axios
            .get(
                `${api_domain}/api/reports/player/limited?token=${casino_token}&casino=${casino_key}&page=${page}`	
            )
            .then((result) => {
                setData(result.data.response.data);
                setTotalRows(result.data.response.count);
                setTotalPages(result.data.response.totalPages);

                setLoading(false);
            })
            .catch(function (error) {
                if (error.response) {
                    toast.error(error.response.data.message, { theme: "dark", autoClose: 1500 });
                } else {
                    toast.error(error.message, { theme: "dark", autoClose: 1500 });
                }
                setLoading(false);
            });
    };

    /** On Page change event */
    const handlePageChange = (page) => {
        setLoading(true);
        casinoPlyerreports(page);
    };

    //** Set Custom pagination */
    const BootyPagination = ({
        rowsPerPage,
        rowCount,
        onChangePage,
        onChangeRowsPerPage, // available but not used here
        currentPage,
    }) => {
        const handleBackButtonClick = () => {
            onChangePage(currentPage - 1);
        };

        const handleNextButtonClick = () => {
            onChangePage(currentPage + 1);
        };

        const handlePageNumber = (e) => {
            onChangePage(Number(e.target.value));
        };

        const nextDisabled = currentPage === totalPages;
        const previosDisabled = currentPage === 1;

        return (
            <div className="pagination_wp mt_30">
                <nav>
                    <ul className="pagination">
                        <li className="page-item">
                            <button
                                className="page-link"
                                onClick={handleBackButtonClick}
                                disabled={previosDisabled}
                                aria-disabled={previosDisabled}
                                aria-label="previous page">
                                <MdOutlineKeyboardArrowLeft size={22} />
                            </button>
                        </li>

                        {(() => {
                            const arr = [];
                            for (let i = 1; i <= totalPages; i++) {
                                const className = i === currentPage ? "page-item active" : "page-item";
                                arr.push(
                                    <li key={"pagination" + i} className={className}>
                                        <button className="page-link" onClick={handlePageNumber} value={i}>
                                            {i}
                                        </button>
                                    </li>
                                );
                            }
                            return arr;
                        })()}

                        <li className="page-item">
                            <button
                                className="page-link"
                                onClick={handleNextButtonClick}
                                disabled={nextDisabled}
                                aria-disabled={nextDisabled}
                                aria-label="next page">
                                <MdOutlineKeyboardArrowRight size={22} />
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    };

    /** Call Default function  */
    useEffect(() => {
        casinoPlyerreports(1);
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="player_reports_table table_loader_wp">
                <DataTable
                    theme="solarized"
                    columns={columns}
                    data={data}
                    pagination
                    paginationComponent={BootyPagination}
                    paginationServer
                    paginationTotalRows={totalRows}
                    subHeader
                    onChangePage={handlePageChange}
                />

                {loading ? <Loader /> : ""}
            </div>
        </>
    );
};

export default CasinoTable;
