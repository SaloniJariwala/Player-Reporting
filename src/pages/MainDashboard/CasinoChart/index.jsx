import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const CasinoChart = (props) => {

    const [chartDate, setChartdate] = useState([]);
    const [dateCount, setDatecount] = useState([]);

    useEffect(() => {
        setChartdate(props.chartdate);
        setDatecount(props.datecount);
    }, [props])


    const dashboardChartoption = {
        options: {
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false,
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            title: {
                text: 'GGR amount in underfiend',
                align: 'center',
                style: {
                    color: "#FEB019",
                },
            },
            xaxis: {
                categories: chartDate,
                labels: {
                    style: {
                        colors: "#008FFB",
                    },
                },
            },
            yaxis: [{
                labels: {
                    formatter: function (value) {
                        return (value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " USD";
                    },
                    style: {
                        colors: "#008FFB",
                    },
                },
            }],
            tooltip: {
                theme: "dark",
                followCursor: true,
            }
        },
        series: [
            {
                name: "GGR",
                data: dateCount
            }
        ]
    }


    return (
        <div className="casino_chart mt_30 table_loader_wp">
            <h5 className="h5_title text-center">Report BY Month</h5>
            <Chart {...dashboardChartoption} type="line" width="100%" height="450px" />
        </div>
    );
};

export default CasinoChart;
