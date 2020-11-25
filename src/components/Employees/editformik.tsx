import * as React from 'react';
import axios from 'axios';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export interface IValues {
    [key: string]: any;
}
export interface IFormState {
    id: number,
    employee: any;
    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
}
class EditEmployee extends React.Component<RouteComponentProps<any>, IFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            employee: {},
            values: [],
            loading: false,
            submitSuccess: false,
        }
    }
    public componentDidMount(): void {
        axios.get(`http://localhost:5000/employees/${this.state.id}`).then(data => {
            this.setState({ employee: data.data });
        })
    }

    public render() {
        const { submitSuccess } = this.state;
        return (
            <div>
                <div className={"col-md-12 form-wrapper"}>
                    <h1> Employee Details Edit</h1>
                    {!submitSuccess && (
                        <div className="alert alert-info" role="alert">
                            Fill the form below to edit Employee
                        </div>
                    )}
                    {submitSuccess && (
                        <div className="alert alert-info" role="alert">
                            Employee's details has been edited successfully
                        </div>
                    )}
                    <Formik
                        initialValues={this.state.employee}
                        validationSchema={Yup.object().shape({
                            id: Yup.string()
                                .required('ID is required'),
                            first_name: Yup.string()
                                .required('First Name is required'),
                            last_name: Yup.string()
                                .required('Last Name is required'),
                            email: Yup.string()
                                .email('Email is invalid')
                                .required('Email is required'),
                            password: Yup.string()
                                .required('Password is required')
                                .min(6, 'Password must be at least 6 characters'),
                        })}
                        onSubmit={async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
                            e.preventDefault();
                            this.setState({ loading: true });
                            axios.patch(`http://localhost:5000/employees/${this.state.id}`, this.state.values).then(data => {
                                this.setState({ submitSuccess: true, loading: false })
                                setTimeout(() => {
                                    this.props.history.push('/');
                                }, 1500)
                            })
                        }}>
                        {({ errors, touched, isSubmitting }) => {
                            return (
                                <Form>
                                    <div className="form-row">
                                        <div className="form-group col-6">
                                            <label>First Name</label>
                                            <input name="first_name" defaultValue={this.state.employee.first_name} type="text" />
                                            <ErrorMessage name="first_name" component="div" className="invalid-feedback" />
                                        </div>
                                        <div className="form-group col-6">
                                            <label>Last Name</label>
                                            <input name="last_name" defaultValue={this.state.employee.last_name} type="text" />
                                            <ErrorMessage name="last_name" component="div" className="invalid-feedback" />
                                        </div>
                                        <div className="form-group col-6">
                                            <label>Email</label>
                                            <input name="email" defaultValue={this.state.employee.email} type="text" />
                                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                        </div>
                                        <div className="form-group col-12">
                                            <label>Password</label>
                                            <input name="password" defaultValue={this.state.employee.password} type="password" />
                                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                            Save
                                        </button>
                                        </div>
                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </div>
        )
    }
}
export default withRouter(EditEmployee);