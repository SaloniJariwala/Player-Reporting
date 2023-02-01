import React, { useEffect, useState } from "react";
import { GoCloudDownload } from "react-icons/go";
import DataTable, { createTheme } from "react-data-table-component";
import axios from "axios";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";

const CasinoSetting = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState();
  const currentCasino = localStorage.getItem("currentCasino");
  const currentActivegame = JSON.parse(currentCasino);
  const casino_token = currentActivegame.casino_token;
  const casino_key = currentActivegame.casino_key;
  const api_domain = process.env.REACT_APP_API_DOMAIN;

  /** Set dark theme in table  */
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

  /*** Set Column in table */
  const columns = [
    {
      name: "Game Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Game Provider",
      selector: (row) => row.gameType,
      sortable: true,
    },
    {
      name: "RTP",
      selector: (row) => {
        return row.rtp ? row.rtp + " % " : "";
      },
      sortable: false,
    },
    {
      name: "Bonuses",
      selector: (row) => {
        return row.gameType ? 0 : "";
      },
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => {
        return (
          <>
            {row.gameType ? (
              <input
                type="checkbox"
                id={row.id}
                value={row.disabledByCasino}
                data-val={row.disabledByCasino ? "1" : "0"}
                onClick={() => {
                  changeStatus(row.id, row.disabledByCasino);
                }}
                defaultChecked={row.disabledByCasino ? false : true}
              />
            ) : (
              ""
            )}
          </>
        );
      },
      sortable: false,
      width: 50,
    },
    {
      name: "Downloads",
      selector: (row) => {
        return row.gameType ? (
          <a
            href="https://portal.urgentgames.com/s/Marketing"
            title={"demo"}
            target={"blank"}
          >
            <GoCloudDownload size={22} />
          </a>
        ) : (
          ""
        );
      },
      sortable: false,
    },
  ];

  /** Fetch Casino Details  */
  const getAvailablegame = async (page) => {
    setLoading(true);
    await axios
      .get(
        `${api_domain}/games/admin?action=available_games&token=${casino_token}&casino=${casino_key}&page=${page}`
      )
      .then((result) => {
        setData(result.data.response);
        setTotalRows(result.data.totalGamesCount);
        setPerPage(result.data.limit);
        setTotalPages(result.data.pages);
        setLoading(false);
      })
      .catch(function (error) {
        if (error.response) {
          toast.error(error.response.data.message, {
            theme: "dark",
            autoClose: 1500,
          });
          setLoading(false);
        } else {
          toast.error(error.message, { theme: "dark", autoClose: 1500 });
          setLoading(false);
        }
      });
  };

  /** enable & disable game  */
  const changeStatus = async (gameId, gameStatus) => {
    if (document.getElementById(gameId).getAttribute("data-val") === 1) {
      await axios
        .get(
          `${api_domain}/games/admin?action=enable_game&token=${casino_token}&game_id=${gameId}&casino=${casino_key}`
        )
        .then((result) => {
          setLoading(false);
          toast.success("Game Enable Successfully.", {
            theme: "dark",
            autoClose: 1500,
          });
          document.getElementById(gameId).setAttribute("data-val", 0);
        })
        .catch(function (error) {
          if (error.response) {
            setLoading(false);
            toast.error(error.response.data.message, {
              theme: "dark",
              autoClose: 1500,
            });
          } else {
            toast.error(error.message, { theme: "dark", autoClose: 1500 });
            setLoading(false);
          }
        });
    } else {
      await axios
        .get(
          `${api_domain}/games/admin?action=disable_game&token=${casino_token}&game_id=${gameId}&casino=${casino_key}`
        )
        .then((result) => {
          setLoading(false);
          toast.success("Game Disable Successfully.", {
            theme: "dark",
            autoClose: 1500,
          });
          document.getElementById(gameId).setAttribute("data-val", 1);
        })
        .catch(function (error) {
          if (error.response) {
            setLoading(false);
            toast.error(error.response.data.message, {
              theme: "dark",
              autoClose: 1500,
            });
          } else {
            toast.error(error.message, { theme: "dark", autoClose: 1500 });
            setLoading(false);
          }
        });
    }
  };

  /** Change Page event */
  const handlePageChange = (page) => {
    getAvailablegame(page);
  };

  /** Custom Pagination HTML */
  const BootyPagination = ({ onChangePage, currentPage }) => {
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
                aria-label="previous page"
              >
                <MdOutlineKeyboardArrowLeft size={22} />
              </button>
            </li>
            {(() => {
              const arr = [];
              for (let i = 1; i <= totalPages; i++) {
                const className =
                  i === currentPage ? "page-item active" : "page-item";
                arr.push(
                  <li key={"pagination" + i} className={className}>
                    <button
                      className="page-link"
                      onClick={handlePageNumber}
                      value={i}
                    >
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
                aria-label="next page"
              >
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
    getAvailablegame(1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
  );
};

export default CasinoSetting;
