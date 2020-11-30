import React from "react";
import Popup from "reactjs-popup";
import { DropDown } from './select';
import i18n from '../translations/config';
export const Popups = (Props: any) => {
    return (
        <Popup
            trigger={
                <button className="btn btn-sm btn-outline-secondary">
                    {" "}
                    {i18n.t("teamDetails")}{" "}
                </button>
            }
            modal
            nested
        >
            <div className="popupmodal">
                <div className="header">
                    {" "}
                    {Props.first_name}'s Team{" "}
                    <DropDown
                        id={Props.id}
                        selectValue={Props.selectValue}
                        handleChange={Props.handleChange}
                        options={Props.options}
                    />
                </div>
                <div className="content">
                    <table className="table table-bordered">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">{i18n.t("id")}</th>
                                <th scope="col">{i18n.t("fname")}</th>
                                <th scope="col">{i18n.t("lname")}</th>
                                <th scope="col">{i18n.t("email")}</th>
                                <th scope="col">{i18n.t("password")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Props.employees.map((emp: any) => {
                                return Props.selectValue.length === 0 ? (
                                    Props.id === emp.team_id ? (
                                        <tr key={emp.id}>
                                            <td>{emp.id}</td>
                                            <td>{emp.first_name}</td>
                                            <td>{emp.last_name}</td>
                                            <td>{emp.email}</td>
                                            <td>{emp.password}</td>
                                        </tr>
                                    ) : null) : (
                                        Props.selectValue === emp.team_id ? (
                                            <tr key={emp.id}>
                                                <td>{emp.id}</td>
                                                <td>{emp.first_name}</td>
                                                <td>{emp.last_name}</td>
                                                <td>{emp.email}</td>
                                                <td>{emp.password}</td>
                                            </tr>
                                        ) : null)
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </Popup>
    )
}
