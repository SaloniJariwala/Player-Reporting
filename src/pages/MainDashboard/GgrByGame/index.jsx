import { useEffect, useState } from "react";
import { Row, Col, Table } from "react-bootstrap";
import Loader from "../../../components/Loader";

const GameTypeFilter = (props) => {
    const { gameTypeggrdata } = props;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(props.loading);
    }, [props])


    return (
        <>

            <section className="reports_filter">
                <Row>
                    <Col lg={12}>
                        <div className="sec_wp mb_30">
                            <h2 className="h2_title">GGR BY GAME TYPE</h2>
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
                                <th>GGR</th>
                            </tr>
                        </thead>

                        <tbody className="table_loader_wp">
                            {gameTypeggrdata?.map((gamName, index) => {
                                return (
                                    <tr key={index + " _type "} >
                                        <td style={{ width: 20 }}>{index + 1}</td>
                                        <td>{gamName.key}</td>
                                        <td>{gamName.gametotal}</td>
                                    </tr>
                                )
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

export default GameTypeFilter;
