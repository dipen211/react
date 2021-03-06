import * as React from 'react';
import axios from 'axios';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import ValidationFormSchema from '../../validationSchema/ValidationFormSchema';
import i18n from '../../translations/config';

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
            id: 1, //this.props.match.params.id,
            employee: {},
            values: [],
            loading: false,
            submitSuccess: false,
        }
    }
    public componentDidMount = (): void => {
        this.getEmployee(this.state.id);
    }
    public getEmployee = (id: any) => {
        // axios.get(`http://localhost:5000/employees/${id}`)
        //     .then(data => {
        //         this.setState({ employee: data.data });
        //     })
    }
    private setValues = (values: IValues) => {
        this.setState({ values: { ...this.state.values, ...values } });
    }
    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        //e.preventDefault();
        this.setValues({ [e.currentTarget.id]: e.currentTarget.value })
    }
    submit = () => {
        this.setState({ loading: true });
        axios.patch(`http://localhost:5000/employees/${this.state.id}`, this.state.values).then(data => {
            this.setState({ submitSuccess: true, loading: false })
            setTimeout(() => {
                this.props.history.push('/');
            }, 1500)
        })
    }
    public render() {
        const { submitSuccess, loading } = this.state;
        return (
            <>
                <div className={"col-md-12 form-wrapper"}>
                    <h1> {i18n.t("eemployee")} </h1>
                    {!submitSuccess && (
                        <div className="alert alert-info" role="alert">
                            {i18n.t("eFillForm")}
                        </div>
                    )}
                    {submitSuccess && (
                        <div className="alert alert-info" role="alert">
                            {i18n.t("eSubmitSuccess")}
                        </div>
                    )}
                    <Formik
                        initialValues={this.state.employee}
                        validationSchema={ValidationFormSchema}
                        onSubmit={() => this.submit()}>

                        {({ errors, touched }) => {
                            return (
                                <Form id={"create-post-form"}>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="first_name"> {i18n.t("fname")} </label>
                                        <Field type="text" id="first_name" defaultValue={this.state.employee.first_name} onChange={(e:any) => this.handleInputChanges(e)} name="first_name" className={'form-control' + (errors.first_name && touched.first_name ? ' is-invalid' : '')} placeholder="Enter employee's first name" />
                                        <ErrorMessage name="first_name" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="last_name"> {i18n.t("lname")} </label>
                                        <Field type="text" id="last_name" defaultValue={this.state.employee.last_name} onChange={(e:any) => this.handleInputChanges(e)} name="last_name" className={'form-control' + (errors.first_name && touched.first_name ? ' is-invalid' : '')} placeholder="Enter employee's last name" />
                                        <ErrorMessage name="last_name" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="email"> {i18n.t("email")} </label>
                                        <Field type="email" id="email" defaultValue={this.state.employee.email} onChange={(e:any) => this.handleInputChanges(e)} name="email" className={'form-control' + (errors.first_name && touched.first_name ? ' is-invalid' : '')} placeholder="Enter employee's email address" />
                                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="password"> {i18n.t("password")} </label>
                                        <Field type="password" id="password" defaultValue={this.state.employee.password} onChange={(e:anyF) => this.handleInputChanges(e)} name="password" className={'form-control' + (errors.first_name && touched.first_name ? ' is-invalid' : '')} placeholder="Enter employee's password number" />
                                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group col-md-4 pull-right">
                                        <button className="btn btn-success" type="submit">
                                            {i18n.t("eemployee")} </button>
                                        {loading &&
                                            <span className="fa fa-circle-o-notch fa-spin" />
                                        }
                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </>
        )
    }
}
export default EditEmployee;





