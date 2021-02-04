import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mountToJson } from 'enzyme-to-json';
import Create from './Create';
import { RouteComponentProps } from 'react-router-dom';
import { IFormState } from '../../api/types/types';
import { Formik } from 'formik';
Enzyme.configure({ adapter: new Adapter() });
const mockfn = jest.fn();

describe('Create', () => {
    let wrapper: any;
    const props: RouteComponentProps<{}> = {
        history: mockfn,
        location: mockfn,
        match: mockfn,
    }
    beforeEach(() => {
        wrapper = shallow(<Create {...props} />);
    });
    it('should match the snapshot', () => {
        expect(mountToJson(wrapper)).toMatchSnapshot();
    });
    it('should match the initial state', () => {
        expect(wrapper.instance().state.team_id).toBe(1);
        expect(wrapper.instance().state.id).toBe('');
        expect(wrapper.instance().state.first_name).toBe('');
        expect(wrapper.instance().state.last_name).toBe('');
        expect(wrapper.instance().state.email).toBe('');
        expect(wrapper.instance().state.password).toBe('');
        //expect(wrapper.instance().state.values).toBe([]);
        expect(wrapper.instance().state.loading).toBe(false);
        expect(wrapper.instance().state.submitSuccess).toBe(false);
    })

    it('should update firstname field on change', () => {
        wrapper.find('Field').at(0);
        wrapper.simulate('change');
        wrapper.setState({ first_name: "Dipen" })
        expect(wrapper.state('first_name')).toEqual('Dipen');
    });

    it('should update lastname field on change', () => {
        wrapper.find('Field').at(1);
        wrapper.simulate('change');
        wrapper.setState({ last_name: "Dipen" })
        expect(wrapper.state('last_name')).toEqual('Dipen');
    });

    it('should update email field on change', () => {
        wrapper.find('Field').at(2);
        wrapper.simulate('change');
        wrapper.setState({ email: "Dipen@gmail.com" })
        expect(wrapper.state('email')).toEqual('Dipen@gmail.com');
    });

    it('should update password field on change', () => {
        wrapper.find('Field').at(3);
        wrapper.simulate('change');
        wrapper.setState({ password: "Dipen" })
        expect(wrapper.state('password')).toEqual('Dipen');
    });

    it('should submit a valid form', () => {
        const state = {
            id: "1", team_id: "1",
            first_name: 'Dipen', last_name: 'Dipen',
            email: 'Dipen@gmail.com',
            password: "dipen",
        };
        const expectedArg = "id: 1, first_name: Dipen, last_name: Dipen, email: Dipen@gmail.com, password: dipen";
        window.alert = jest.fn();
        wrapper.setState(state);
        wrapper.find('Formik').simulate('submit', { preventDefault: () => { } });
        setTimeout(() => {
            wrapper.update();
        }, 0);
        expect(window.alert).toHaveBeenCalledWith(expectedArg);
    });

    it('should return error for invalid id', () => {
        const id = (props = { errors: {} }) =>
            wrapper
                .find(Formik)
                .renderProp('children')(props);

        const formWithInvalidIdErrors = id({
            errors: {
                id: 'id is invalid'
            },
            touched: { id: true },
            isSubmitting: false
        });

        expect(formWithInvalidIdErrors.html()).toEqual(/id is invalid/);
    });
    it('should return error for invalid first_name', () => {
        const first_name = (props = { errors: {} }) =>
            wrapper
                .find(Formik)
                .renderProp('children')(props);

        const formWithInvalidFirstNameErrors = first_name({
            errors: {
                first_name: 'first_name is invalid'
            },
            touched: { first_name: true },
            isSubmitting: false
        });

        expect(formWithInvalidFirstNameErrors.html()).toEqual("/first_name is invalid/");
    });

    it('should return error for invalid last_name', () => {
        const last_name = (props = { errors: {} }) =>
            wrapper
                .find(Formik)
                .renderProp('children')(props);

        const formWithInvalidLastNameErrors = last_name({
            errors: {
                last_name: 'last_name is invalid'
            },
            touched: { last_name: true },
            isSubmitting: false
        });

        expect(formWithInvalidLastNameErrors.html()).toEqual(/last_name is invalid/);
    });

    it('should return error for invalid email address', () => {
        const emailForm = (props = { errors: {} }) =>
            wrapper
                .find(Formik)
                .renderProp('children')(props);

        const formWithInvalidEmailErrors = emailForm({
            errors: {
                email: 'Email is invalid'
            },
            touched: { email: true },
            isSubmitting: false
        });

        expect(formWithInvalidEmailErrors.html()).toEqual(/Email is invalid/);
    });

    it('should return error for invalid password', () => {
        const passwordForm = (props = { errors: {} }) =>
            wrapper
                .find(Formik)
                .renderProp('children')(props);

        const formWithInvalidPasswordErrors = passwordForm({
            errors: {
                password: 'Password is invalid'
            },
            touched: { password: true },
            isSubmitting: false
        });

        expect(formWithInvalidPasswordErrors.html()).toEqual(/Password is invalid/);
    });
})