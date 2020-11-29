import React from "react";
import Popup from "reactjs-popup";
import { DropDown } from './select';
export const Popups = (Props: any) => {
    return (
        <Popup
            trigger={
                <button className="btn btn-sm btn-outline-secondary">
                    {" "}
                    Team Details{" "}
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
                                <th scope="col">ID</th>
                                <th scope="col">Firstname</th>
                                <th scope="col">Lastname</th>
                                <th scope="col">Email</th>
                                <th scope="col">Password</th>
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
