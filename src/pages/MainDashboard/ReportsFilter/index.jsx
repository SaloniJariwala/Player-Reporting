import { useEffect, useState } from "react";
import { Row, Col, Table } from "react-bootstrap";
import { FcMoneyTransfer, FcCurrencyExchange, FcBullish, FcNews } from "react-icons/fc";
import { GiAbstract021 } from "react-icons/gi";
import Loader from "../../../components/Loader";
import moment from 'moment';
moment.locale('utc');
const ReportsFilter = (props) => {

    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const [revenueFilter, setRevenuefilter] = useState([{
        id: 1,
        icon: <FcMoneyTransfer className="mr_10" size={26} />,
        type: "Gross Gaming Total",
        earning: "0.00",
    },
    {
        id: 2,
        icon: <FcCurrencyExchange className="mr_10" size={26} />,
        type: "Payout",
        earning: "0.00",
    },
    {
        id: 3,
        icon: <FcBullish className="mr_10" size={26} />,
        type: "Gross Gaming Revenue (GGR)",
        earning: "0.00",
    },
    {
        id: 4,
        icon: <FcNews className="mr_10" size={26} />,
        type: "taxes",
        earning: "0.00",
    },
    {
        id: 5,
        icon: <GiAbstract021 className="mr_10" size={26} />,
        type: "Net Gaming Revenue",
        earning: "0.00",
    }]);

    useEffect(() => {
        setLoading(props.loading);
        if (props.revenueFilterdata.length !== 0) {
            setRevenuefilter(props.revenueFilterdata);
        }
        setStartDate(moment.utc(props.startDate).format('YYYY-MM-DD'));
        setEndDate(moment.utc(props.endDate).format('YYYY-MM-DD'));
    }, [props])

    return (
        <>
            <section className="reports_filter py_60">
                <Row>
                    <Col lg={12}>
                        <div className="sec_wp mb_30">
                            <h2 className="h2_title">advance revenue reports filter</h2>
                            <div className="divider"></div>
                        </div>
                    </Col>
                </Row>


                <div className="table_loader_wp">

                    <Table responsive hover variant="dark">
                        <thead>
                            <tr>
                                <th style={{ width: 20 }}>#</th>
                                <th>Type</th>
                                <th> {startDate} TO {endDate} Earning</th>
                            </tr>
                        </thead>
                        <tbody>
                            {revenueFilter.map((data) => {
                                const { id, icon, type, earning } = data;
                                return (
                                    <tr key={id}>
                                        <td>{id}</td>
                                        <td>
                                            {icon} {type}
                                        </td>
                                        <td>{earning}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                    {
                        loading ? <Loader /> : ""
                    }
                </div>

            </section>
        </>
    );
};

export default ReportsFilter;
