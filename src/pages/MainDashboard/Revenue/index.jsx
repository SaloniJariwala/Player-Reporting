import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Loader from "../../../components/Loader";

const Revenue = (props) => {
    const [loading, setLoading] = useState(false);
    const [revenueData, setRevenue] = useState([
        {
            time: "Today",
            num: "0",
            ggr: "0.00",
        },
        {
            time: "Yesterday",
            num: "0",
            ggr: "0.00",
        },
        {
            time: "Last 7 day's",
            num: "0",
            ggr: "0.00",
        },
        {
            time: "Last 30 day's",
            num: "0.00",
            ggr: "0.00",
        },
    ]);

    useEffect(() => {
        setLoading(props.loading);
        if (props.revenueData.length !== 0) {
            setRevenue(props.revenueData);
        }
    }, [props]);

    return (
        <>
            <section className="revenue_sec pt_60">
                <Row>
                    <Col lg={12}>
                        <div className="sec_wp mb_30">
                            <h2 className="h2_title">revenue by period</h2>
                            <div className="divider"></div>
                        </div>
                    </Col>
                </Row>

                <div className="revenue_box table_loader_wp">
                    <Row>
                        {revenueData.map((data, index) => {
                            const { time, num, ggr } = data;
                            return (
                                <Col lg={3} sm={6} key={index}>
                                    <div className="revenue_box_content text-center">
                                        <h5 className="h5_title">{time}</h5>
                                        <h4 className="h4_title">
                                            {num.toLocaleString(undefined, {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            })}
                                        </h4>
                                        <p className="m-0">GGR {ggr}</p>
                                    </div>
                                </Col>
                            );
                        })}
                    </Row>
                    {loading ? <Loader /> : ""}
                </div>
            </section>
        </>
    );
};

export default Revenue;
