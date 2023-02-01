import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { BiUser } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import {
  MdOutlineDriveFileRenameOutline,
  MdOutlineCasino,
  MdOutlineRemoveCircleOutline,
} from "react-icons/md";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { IoIosAdd } from "react-icons/io";
import axios from "axios";
import { toast } from "react-toastify";
import { RiLoader4Line } from "react-icons/ri";

const DashBoard = () => {
  const [, setInputfieldsToAdd] = useState(1);
  const [committedFieldsToAdd, ] = useState(0);
  const itemStr = localStorage.getItem("userLogin");
  const item = JSON.parse(itemStr);
  const [info, infoCall] = useState({ first_name: "", last_name: "" });
  const [casinoInfo, casinoinfoCall] = useState([]);
  const [errormsg, setErrormsg] = useState({
    confirmPassword: "",
  });
  const [isDisabled, setIsDiabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const api_domain = process.env.REACT_APP_LOGIN_API_DOMAIN;

  useEffect(() => {
    const number = committedFieldsToAdd;
    setInputfieldsToAdd(number + 1);
  }, [committedFieldsToAdd]);

  const formSubmit = (e) => {
    setIsLoading(true);
    var user_id = item.userId;
    var first_name = e.target.elements["first_name"].value;
    var last_name = e.target.elements["last_name"].value;
    var password = e.target.elements["password"].value;
    var confirmPassword = e.target.elements["confirmPassword"].value;
    var error = 0;
    setErrormsg({
      confirmPassword: "",
    });
    if (password !== "" || confirmPassword !== "") {
      if (password !== confirmPassword) {
        setErrormsg((prev) => {
          const stateObj = { ...prev };
          stateObj["confirmPassword"] =
            "Password and Confirm Password does not match.";
          return stateObj;
        });
        e.target.elements["confirmPassword"].focus();
        setIsLoading(false);
        error = 1;
      } else {
        error = 0;
      }
    }

    if (error === 0) {
      const data = {
        user_id: user_id,
        author_id: "user_" + user_id,
        first_name: first_name,
        last_name: last_name,
        password: password,
        casinoData: JSON.stringify(casinoInfo),
      };
      axios({
        url: `${api_domain}/api/updateuserinfo.php`,
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
          const result = res.data;
          setIsLoading(false);
          if (result === 1) {
            toast.success("Changes Saved.", { theme: "dark", autoClose: 1500 });
          } else {
            toast.error(result, { theme: "dark", autoClose: 1500 });
          }
        })
        .catch((err) => {
          setIsLoading(false);
          toast.error(err, { theme: "dark", autoClose: 1500 });
        });
    }

    e.preventDefault();
  };

  useEffect(() => {
    getData().then((result) => {
      casinoinfoCall(result.casino_information);
      infoCall(result);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      // Don't forget to return something
      return res.data;
    } catch (err) {
      toast.error(err, { theme: "dark", autoClose: 1500 });
    }
  }

  const handleChangeData = (evt) => {
    setIsDiabled(false);
    const value = evt.target.value;
    infoCall({
      ...info,
      [evt.target.name]: value,
    });
  };

  const handleChange = (i, e) => {
    setIsDiabled(false);
    let newFormValues = [...casinoInfo];
    newFormValues[i][e.target.name] = e.target.value;
    casinoinfoCall(newFormValues);
  };

  const addFormFields = () => {
    casinoinfoCall([
      ...casinoInfo,
      {
        casino_name: "",
        casino_url: "",
        casino_token: "",
        casino_key: "",
        tax_rate: "",
      },
    ]);
  };

  const removeFormFields = (i) => {
    setIsDiabled(false);
    let newFormValues = [...casinoInfo];
    newFormValues.splice(i, 1);
    casinoinfoCall(newFormValues);
  };
  /** New From Data End */

  return (
    <>
      <section className="dashboard_sec">
        <form
          className="dashboard_form"
          onSubmit={(e) => {
            formSubmit(e);
          }}
        >
          <div className="form_box_wp mb_30">
            <div className="form_box">
              <h4 className="form_title h4_title">Profile Information</h4>
              <Row>
                <Col lg={6}>
                  <div className="form_input_wp">
                    <label className="form_input_label">
                      <div className="form_input_icon">
                        <BiUser size={20} />
                      </div>
                      Username
                    </label>
                    <input
                      type="text"
                      className="form_input"
                      placeholder="Enter Username"
                      name="user_login"
                      value={info.user_login ? info.user_login : ""}
                      readOnly
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="form_input_wp">
                    <label className="form_input_label">
                      <div className="form_input_icon">
                        <HiOutlineMail size={20} />
                      </div>
                      Email
                    </label>
                    <input
                      type="email"
                      className="form_input"
                      placeholder="Enter Email"
                      value={info.email ? info.email : ""}
                      readOnly
                    />
                  </div>
                </Col>

                <Col lg={6}>
                  <div className="form_input_wp">
                    <label className="form_input_label">
                      <div className="form_input_icon">
                        <MdOutlineDriveFileRenameOutline size={20} />
                      </div>
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form_input"
                      placeholder="Enter First Name"
                      name="first_name"
                      value={info.first_name || ""}
                      onChange={(e) => {
                        handleChangeData(e);
                      }}
                    />
                  </div>
                </Col>

                <Col lg={6}>
                  <div className="form_input_wp">
                    <label className="form_input_label">
                      <div className="form_input_icon">
                        <MdOutlineDriveFileRenameOutline size={20} />
                      </div>
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form_input"
                      placeholder="Enter Last Name"
                      name="last_name"
                      value={info.last_name || ""}
                      onChange={(e) => {
                        handleChangeData(e);
                      }}
                    />
                  </div>
                </Col>
              </Row>
            </div>

            <div className="divider my_30"></div>

            <div className="form_box">
              <h4 className="form_title h4_title">Password Settings</h4>
              <Row>
                <Col lg={6}>
                  <div className="form_input_wp">
                    <label className="form_input_label">
                      <div className="form_input_icon">
                        <AiOutlineEyeInvisible size={20} />
                      </div>
                      New password
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="form_input"
                      placeholder="Enter New password"
                      onChange={(e) => {
                        handleChangeData(e);
                      }}
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="form_input_wp">
                    <label className="form_input_label">
                      <div className="form_input_icon">
                        <AiOutlineEyeInvisible size={20} />
                      </div>
                      Repeat password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      className="form_input"
                      placeholder="Enter Repeat password"
                      onChange={(e) => {
                        handleChangeData(e);
                      }}
                    />
                    {errormsg.confirmPassword ? (
                      <p className="form_submit_error">
                        {errormsg.confirmPassword}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                </Col>
              </Row>
            </div>
          </div>

          <div className="form_box_wp">
            <div className="form_box">
              <h4 className="form_title h4_title">Casino Token Settings</h4>

              {casinoInfo.map((element, index) => (
                <React.Fragment key={"casino" + index}>
                  <div className="form_box_wp">
                    {index ? (
                      <button
                        type="button"
                        className="form_remove_btn button remove"
                        onClick={() => removeFormFields(index)}
                      >
                        <MdOutlineRemoveCircleOutline size={20} />
                      </button>
                    ) : null}

                    <Row>
                      <Col lg={6}>
                        <div className="form_input_wp" key={index}>
                          <label className="form_input_label">
                            <div className="form_input_icon">
                              <MdOutlineCasino size={20} />
                            </div>
                            Casino Name
                          </label>
                          <input
                            type="text"
                            className="form_input"
                            name="casino_name"
                            value={element.casino_name || ""}
                            onChange={(e) => handleChange(index, e)}
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="form_input_wp" key={index}>
                          <label className="form_input_label">
                            <div className="form_input_icon">
                              <MdOutlineCasino size={20} />
                            </div>
                            Casino URL
                          </label>
                          <input
                            type="text"
                            className="form_input"
                            name="casino_url"
                            value={element.casino_url || ""}
                            onChange={(e) => handleChange(index, e)}
                          />
                        </div>
                      </Col>

                      <Col lg={6}>
                        <div className="form_input_wp" key={index}>
                          <label className="form_input_label">
                            <div className="form_input_icon">
                              <MdOutlineCasino size={20} />
                            </div>
                            Casino Token
                          </label>
                          <input
                            type="text"
                            className="form_input"
                            name="casino_token"
                            value={element.casino_token || ""}
                            onChange={(e) => handleChange(index, e)}
                          />
                        </div>
                      </Col>

                      <Col lg={6}>
                        <div className="form_input_wp" key={index}>
                          <label className="form_input_label">
                            <div className="form_input_icon">
                              <MdOutlineCasino size={20} />
                            </div>
                            Casino ID
                          </label>
                          <input
                            type="text"
                            className="form_input"
                            name="casino_key"
                            value={element.casino_key || ""}
                            onChange={(e) => handleChange(index, e)}
                          />
                        </div>
                      </Col>

                      <Col lg={6}>
                        <div className="form_input_wp" key={index}>
                          <label className="form_input_label">
                            <div className="form_input_icon">
                              <MdOutlineCasino size={20} />
                            </div>
                            Tax Rate(for example 7%)
                          </label>
                          <input
                            type="text"
                            className="form_input"
                            name="tax_rate"
                            value={element.tax_rate || ""}
                            onChange={(e) => handleChange(index, e)}
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="divider my_30"></div>
                </React.Fragment>
              ))}
            </div>
            <div className="form_btn">
              <button
                type="button"
                className="sec_btn"
                onClick={() => {
                  addFormFields();
                }}
              >
                <IoIosAdd size={22} />
                Add fields
              </button>
            </div>
          </div>

          <div className="dashboard_form_btn form_btn table_loader_wp">
            {isLoading ? (
              <div className="table_loader">
                {" "}
                <RiLoader4Line size={45} />
              </div>
            ) : (
              ""
            )}

            <button type="submit" className="sec_btn" disabled={isDisabled}>
              Save Changes
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default DashBoard;
