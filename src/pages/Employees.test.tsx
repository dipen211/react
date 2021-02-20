import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mountToJson } from 'enzyme-to-json';
import Employees from './Employees';
import { IProps, IState } from "../api/types/stateProps";

Enzyme.configure({ adapter: new Adapter() });
const mockfn = jest.fn();
// var handleChange = jest.fn();
// jest
//     .spyOn(Employees.prototype, 'handleChange')
//     .mockImplementation(handleChange);
describe('Employee', () => {
    let wrapper: any;
    const mockCallBack = jest.fn();
    const props: IProps = {
        history: mockfn,
        location: mockfn,
        match: mockfn,
        employees: mockfn,
        selectValue: mockfn,
        isOpen: mockfn,
        onClick: mockCallBack,
    }
    const resp = {
        employee: [
            {
                "id": "1",
                "team_id": "2",
                "first_name": "Dipen",
                "last_name": "Patel",
                "email": "pateldipen161@gmail.com",
                "password": "scvbhjkloijuhg"
            }
        ]
    }
    beforeEach(() => {
        wrapper = mount(<Employees {...props} />);
    });
    it('should match the snapshot', () => {
        expect(mountToJson(wrapper)).toMatchSnapshot();
    });
    it('handle handleChange', () => {
        wrapper.instance().handleChange({ target: { value: resp.employee, name: 'selectValue' } });
        wrapper.update();
        expect(wrapper.state('selectValue')).toEqual(resp.employee);
    });
    it('should check componentDidMount()', () => {
        const instance = wrapper.instance();
        jest.spyOn(instance, 'getData');
        instance.componentDidMount();
        expect(instance.getData).toHaveBeenCalledTimes(1);
    });
    it('handle deleteEmployee', () => {
        //const mockCallBack = jest.fn();
        const button = shallow((<Employees {...props} />));
        wrapper.find('button').first();
        wrapper.simulate('click');
        expect(wrapper.length).toBe(1);
        expect(mockCallBack).toHaveBeenCalled();
        //wrapper.simulate('click');
        //expect(useRefSpy).toHaveBeenCalled();
        // wrapper.instance().deleteEmployee({ target: { value: 1, name: 'id' } });
        // wrapper.update();
        //expect(wrapper.state('selectValue')).toEqual(resp.employee);
    });
    it('should fetch employee', () => {
        wrapper.instance().componentDidMount().then((resp: any) => {
            expect(wrapper.state('employees')).toContain(resp.employee);
        })
    });
    it('Should confirm onDelete', () => {
        window.confirm = jest.fn();
        wrapper.find('button[className="btn"]');
        wrapper.simulate('click');
        expect(wrapper.instance().deleteEmployee).toBeCalled();
    });
});