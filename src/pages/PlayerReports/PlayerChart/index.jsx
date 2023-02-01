import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";

const PlayerChart = () => {
  const [chartdata, setChartdata] = useState();
  const [monthlist, setMonthlist] = useState([]);
  const [betsWon, setbetsWon] = useState([]);
  const [betsLost, setbetsLost] = useState([]);
  const [betsplaced, setBetsplaced] = useState([]);
  const [loading, setLoading] = useState(false);

  const currentCasino = localStorage.getItem("currentCasino");
  const currentActivegame = JSON.parse(currentCasino);
  const casino_token = currentActivegame.casino_token;
  const casino_key = currentActivegame.casino_key;
  const api_domain = process.env.REACT_APP_API_DOMAIN;

  const chartDatacallback = async () => {
    setLoading(true);
    await axios
      .get(
        `${api_domain}/api/reports/transactions/chart?token=${casino_token}&casino=${casino_key}`
      )
      .then((result) => {
        const dataresult = result.data.response;
        setChartdata(dataresult);
      })
      .catch(function (error) {
        if (error.response) {
          toast.error(error.response.data.message, {
            theme: "dark",
            autoClose: 1500,
          });
        } else {
          toast.error(error.message, { theme: "dark", autoClose: 1500 });
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    chartDatacallback();
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    var monthllistarr = [];
    var betwonarr = [];
    var betlostarr = [];
    var brtplacedarr = [];
    if (chartdata) {
      // eslint-disable-next-line array-callback-return
      chartdata.map((val, i) => {
        var cudate = val.date;
        monthllistarr.push(cudate);
        betwonarr.push(
          val.totalDebit.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        );
        betlostarr.push(
          val.totalCredit.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        );
        brtplacedarr.push(
          val.totalBet.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        );
      });
      setMonthlist(monthllistarr);
      setbetsWon(betwonarr);
      setbetsLost(betlostarr);
      setBetsplaced(brtplacedarr);

      setLoading(false);
    }
  }, [chartdata]);

  const playerChartoption = {
    options: {
      chart: {
        height: 350,
        toolbar: {
          show: false,
        },
      },

      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [1, 1, 4],
      },
      xaxis: {
        categories: monthlist,
      },
      yaxis: [
        {
          padding: {
            left: 0,
            right: 0,
          },
          axisTicks: {
            show: true,
          },
          axisBorder: {
            // offsetX: -12,
            show: true,
            color: "#008FFB",
          },
          labels: {
            formatter: function (value) {
              return (
                value.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) + " USD"
              );
            },
            style: {
              colors: "#008FFB",
            },
          },
          title: {
            text: "Total Won and Lost",
            style: {
              color: "#008FFB",
            },
          },
          tooltip: {
            enabled: true,
          },
        },
        {
          seriesName: "Bets Lost",
          opposite: true,
          labels: {
            formatter: function (value) {
              return (
                value.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) + " USD"
              );
            },
            show: false,
          },
          tooltip: {
            enabled: true,
          },
        },
        {
          seriesName: "Total Bets Placed",
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: "#FEB019",
          },
          labels: {
            style: {
              colors: "#FEB019",
            },
          },
          title: {
            text: "Total Bets Placed",
            style: {
              color: "#FEB019",
            },
          },
          tooltip: {
            enabled: true,
          },
        },
      ],
      tooltip: {
        fixed: {
          enabled: true,
          position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 30,
          offsetX: 60,
        },
      },
      legend: {
        horizontalAlign: "left",
        offsetX: 20,
        labels: {
          colors: ["#fff"],
        },
        markers: {
          offsetX: -3,
          offsetY: 2,
        },
        itemMargin: {
          horizontal: 10,
        },
      },
      // tooltip: {
      //   theme: "dark",
      //   followCursor: true,
      // },
      grid: {
        padding: {
          left: 0,
          right: 0,
        },

        yaxis: {
          lines: {
            show: true,
          },
        },
      },
    },
    series: [
      {
        name: "Bets Won",
        type: "column",
        data: betsWon,
      },
      {
        name: "Bets Lost",
        type: "column",
        data: betsLost,
      },
      {
        name: "Total Bets Placed",
        type: "line",
        data: betsplaced,
      },
    ],
  };

  return (
    <div className="form_box_wp mb_30">
      <div className="player_chart table_loader_wp">
        <h5 className="h5_title text-center">Players</h5>

        <Chart {...playerChartoption} type="bar" width="100%" height="500px" />

        {loading ? <Loader /> : ""}
      </div>
    </div>
  );
};

export default PlayerChart;
