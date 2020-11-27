import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import Popup from 'reactjs-popup';
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface IState {
    employees: any[];
}

export default class Employees extends React.Component<RouteComponentProps, IState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = { employees: [] }
    }
    public componentDidMount(): void {
        axios.get(`http://localhost:5000/employees`).then(data => {
            this.setState({ employees: data.data })
        })
    }
    public deleteEmployee(id: number) {
        axios.delete(`http://localhost:5000/employees/${id}`).then(data => {
            const index = this.state.employees.findIndex(employee => employee.id === id);
            this.state.employees.splice(index, 1);
            this.props.history.push('/');
        })
    }
    public render() {
        const employees = this.state.employees;
        return (
            <div>
                {employees.length === 0 && (
                    <div className="text-center">
                        <h2>No employees found at the moment</h2>
                    </div>
                )}
                <div className="container">
                    <div className="row">
                        <table className="table table-bordered">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Firstname</th>
                                    <th scope="col">Lastname</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Password</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map(employee =>
                                    <tr key={employee.id}>
                                        <th scope="col"><Link to={`Create/${employee.id}`} className="btn btn-sm btn-outline-secondary"><FontAwesomeIcon icon={faPlusSquare} /></Link></th>
                                        <td>{employee.first_name}</td>
                                        <td>{employee.last_name}</td>
                                        <td>{employee.email}</td>
                                        <td>{employee.password}</td>
                                        <td>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="btn-group" style={{ marginBottom: "20px" }}>
                                                    <Link to={`edit/${employee.id}`} className="btn btn-sm btn-outline-secondary">Edit Employee </Link>
                                                    <button className="btn btn-sm btn-outline-secondary" onClick={() => this.deleteEmployee(employee.id)}>Delete Employee</button>
                                                    <Popup
                                                        trigger={<button className="btn btn-sm btn-outline-secondary"> Team Details </button>}
                                                        modal
                                                        nested
                                                    >
                                                        <div className="popupmodal">
                                                            <div className="header"> {employee.first_name}'s Team </div>
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
                                                                        {employees.map(emp => {
                                                                            return (
                                                                                (employee.id === emp.team_id) ? (
                                                                                    <tr key={emp.id}>
                                                                                        <td>{emp.id}</td>
                                                                                        <td>{emp.first_name}</td>
                                                                                        <td>{emp.last_name}</td>
                                                                                        <td>{emp.email}</td>
                                                                                        <td>{emp.password}</td>
                                                                                    </tr>
                                                                                ) : (
                                                                                        null
                                                                                    )
                                                                            )
                                                                        }
                                                                        )}
                                                                    </tbody>
                                                                </table>


                                                            </div>
                                                        </div>
                                                    </Popup>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
        )
    }
}