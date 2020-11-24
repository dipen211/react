import * as React from 'react';
import axios from 'axios';
import { RouteComponentProps, withRouter } from 'react-router-dom';

export interface IValues {
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    password:string,
}
export interface IFormState {
    [key: string]: any;
    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
}
class Create extends React.Component<RouteComponentProps, IFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            id:'',
            first_name: '',
            last_name: '',
            email: '',
            password:'',
            values: [],
            loading: false,
            submitSuccess: false,
        }
    }
    private processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        this.setState({ loading: true });
        const formData = {
            id: this.state.id,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password:this.state.password,
        }
        this.setState({ submitSuccess: true, values: [...this.state.values, formData], loading: false });
        axios.post(`http://localhost:5000/employees`, formData).then(data => [
            setTimeout(() => {
                this.props.history.push('/');
            }, 1500)
        ]);
    }

    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value,
        })
    }
    public render() {
        const { submitSuccess, loading } = this.state;
        return (
            <div>
                <div className={"col-md-12 form-wrapper"}>
                    <h2> Create Employee </h2>
                    {!submitSuccess && (
                        <div className="alert alert-info" role="alert">
                            Fill the form below to create a new Employee
                        </div>
                    )}
                    {submitSuccess && (
                        <div className="alert alert-info" role="alert">
                            The form was successfully submitted!
                        </div>
                    )}
                    <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                    <div className="form-group col-md-12">
                            <label htmlFor="id"> ID </label>
                            <input type="text" id="id" onChange={(e) => this.handleInputChanges(e)} name="id" className="form-control" placeholder="Enter Employee's id" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="first_name"> First Name </label>
                            <input type="text" id="first_name" onChange={(e) => this.handleInputChanges(e)} name="first_name" className="form-control" placeholder="Enter Employee's first name" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="last_name"> Last Name </label>
                            <input type="text" id="last_name" onChange={(e) => this.handleInputChanges(e)} name="last_name" className="form-control" placeholder="Enter Employee's last name" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="email"> Email </label>
                            <input type="email" id="email" onChange={(e) => this.handleInputChanges(e)} name="email" className="form-control" placeholder="Enter Employee's email address" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="password"> Password </label>
                            <input type="password" id="password" onChange={(e) => this.handleInputChanges(e)} name="password" className="form-control" placeholder="Enter Employee's password" />
                        </div>
                        <div className="form-group col-md-4 pull-right">
                            <button className="btn btn-success" type="submit">
                                Create Employee
                        </button>
                            {loading &&
                                <span className="fa fa-circle-o-notch fa-spin" />
                            }
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default withRouter(Create);