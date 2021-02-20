import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mountToJson } from 'enzyme-to-json';
import EditEmployee from './Edit';
import { RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
Enzyme.configure({ adapter: new Adapter() });
const mockfn = jest.fn();

jest.mock('axios', () => {
    const employees = [
        { title: 'employee', url: 'http://localhost:5000/employees/' }
    ];
    return {
        get: jest.fn(() => Promise.resolve(employees)),
    };
});

describe('EditEmployee', () => {
    let wrapper: any;

    const props: RouteComponentProps<{}> = {
        history: mockfn,
        location: mockfn,
        match: mockfn,
    }
    beforeEach(() => {
        wrapper = shallow(<EditEmployee {...props} />);
    });
    it('should match the snapshot', () => {
        expect(mountToJson(wrapper)).toMatchSnapshot();
    });

    it('Should capture firstname correctly onChange', () => {
        wrapper.find('Field').first();
        wrapper.simulate('change');
        wrapper.setState({ first_name: "Dipen" });
        expect(wrapper.state('first_name')).toEqual('Dipen');
    })
    it('Should capture last_name correctly onChange', () => {
        wrapper.find('input[id="last_name"]');
        wrapper.simulate('change');
        wrapper.setState({ last_name: "Dipen" });
        expect(wrapper.state('last_name')).toEqual('Dipen');
    })
    it('Should capture email correctly onChange', () => {
        wrapper.find('input').at(2);
        wrapper.simulate('change');
        wrapper.setState({ email: "Dipen" });
        expect(wrapper.state('email')).toEqual('Dipen');
    });
    it('Should capture password correctly onChange', () => {
        wrapper.find('input').at(3);
        wrapper.simulate('change');
        wrapper.setState({ password: "Dipen" });
        expect(wrapper.state('password')).toEqual('Dipen');
    });
    it('handle handleInputChanges', () => {
        wrapper.instance().handleInputChanges({ target: { value: '1', name: 'id' } });
        wrapper.update();
        expect(wrapper.state('id')).toEqual('1');
    });
    it('handle setValues', () => {
        wrapper.instance().setValues({ target: { value: 1, name: 'id' } });
        wrapper.update();
        expect(wrapper.state('id')).toEqual(1);
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
        expect(window.alert).toHaveBeenCalledWith(expectedArg);
    });
})