import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { RiLoader4Line } from 'react-icons/ri';

const Login = () => {
    const [input, setInput] = useState({
        casinoId: "",
        password: "",
    });
    const [error, setError] = useState();
    const [Loader, setLoader] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [, setUser] = useState(
        JSON.parse(localStorage.getItem("userLogin") === true)
    );
    const api_domain = process.env.REACT_APP_LOGIN_API_DOMAIN;

    const navigate = useNavigate();
    const casinoInput = (e) => {
        const { value, name } = e.target;
        setInput((oldVal) => {
            return {
                ...oldVal,
                [name]: value,
            };
        });
    };

    const handleRemberMe = (event) => {
        const input = event.target;
        const value = input.type === "checkbox" ? input.checked : input.value;
        setRememberMe(value);
    };

    const form_submit = (e) => {
        setLoader(true);
        setError();

        const username = input.casinoId;
        const password = input.password;

        setUser(username, password);
        if (username && password) {


            const data = {
                username: username,
                password: password,
            };

            axios({
                url: `${api_domain}/api/login.php`,
                method: "POST",
                data: data,
                mode: "no-cors",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST",
                    "Content-Type": "multipart/form-data",
                },
            })
                .then((res) => {
                    if (res.data.error) {
                        setError(res.data.error);
                    } else {
                        if (res.data.userid) {

                            if (rememberMe) {
                                const item = {
                                    userId: res.data.userid,
                                    username,
                                    rememberMe,
                                };

                                localStorage.setItem("userLogin", JSON.stringify(item));

                            } else {

                                const item = {
                                    userId: res.data.userid,
                                    username,
                                    rememberMe
                                };

                                localStorage.setItem("userLogin", JSON.stringify(item));
                            }

                            navigate("/");

                        } else {
                            setError("Please enter username and password");
                        }
                    }
                    setLoader(false);

                })
                .catch((err) => {
                    setError("Something when wrong.");
                    setLoader(false);

                });
        } else {
            setError("Please enter username and password");
            setLoader(false);
        }
        e.preventDefault();
    };

    return (
        <section className="login_form_sec">
            <Container>
                <Row>
                    <Col lg={6} className="m-auto">
                        <form className="login_form white_form" onSubmit={form_submit}>
                            <div className="form_shape"></div>
                            <div className="login_form_title">
                                <h2 className="h2_title">Let's Get Started</h2>
                                <p>Sign in to continue to your dashboard.</p>
                            </div>

                            <div className="form_input_wp">
                                <input
                                    type="text"
                                    className={error ? "form_input error_input" : "form_input"}
                                    placeholder="Casino ID"
                                    name="casinoId"
                                    value={input.username}
                                    onChange={(e) => casinoInput(e)}
                                />
                            </div>
                            <div className="form_input_wp">
                                <input
                                    type="password"
                                    className={error ? "form_input error_input" : "form_input"}
                                    placeholder="password"
                                    name="password"
                                    value={input.password}
                                    onChange={(e) => casinoInput(e)}
                                />
                            </div>
                            <div className="form_input_wp checkbox_wp">
                                <input
                                    type="checkbox"
                                    name="checkbox"
                                    id="checkbox"
                                    value={rememberMe}
                                    onClick={handleRemberMe}
                                />
                                <label htmlFor="checkbox">Remember Me</label>
                            </div>
                            <div className="form_submit mb_20">
                                <button type="submit" className="sec_btn">
                                    Sign In
                                </button>
                                {Loader ? <RiLoader4Line size={25} /> : ''}

                            </div>
                            <p className="form_submit_error">{error}</p>
                            <div className="form_contact">
                                <p>
                                    Don't have an account? &nbsp;
                                    <a href="https://urgentgames.com/" title="Contact Us" target="blank">
                                        Contact Us
                                    </a>
                                </p>
                            </div>
                        </form>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Login;
