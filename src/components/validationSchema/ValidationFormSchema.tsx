import * as Yup from 'yup';

const ValidationFormSchema = Yup.object().shape({
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
});

export default ValidationFormSchema;