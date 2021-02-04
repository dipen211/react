import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mountToJson } from 'enzyme-to-json';
import EditEmployee from './Edit';
import { RouteComponentProps } from 'react-router-dom';
Enzyme.configure({ adapter: new Adapter() });
const mockfn = jest.fn();

jest.mock('axios');
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
    it("change event updates input values", done => {
        const pageIdInput = wrapper.find("input").at(0);
        pageIdInput.simulate("change", {
          target: {
            name: "pageId",
            value: 123
          }
        });
        setTimeout(() => {
          expect(pageIdInput.props().value).toEqual(123);
          done();
        }, 0);
      });

    it('Should capture firstname correctly onChange', () => {
        wrapper.find('input').at(0);
        wrapper.simulate('change', { preventDefault: () => { } });
        wrapper.setState({ first_name: "Dipen" })
        expect(wrapper.state('first_name')).toEqual('Dipen');
    })
    it('Should capture last_name correctly onChange', () => {
        wrapper.find('input').at(1);
        wrapper.simulate('change', { preventDefault: () => { } });
        wrapper.setState({ last_name: "Dipen" })
        expect(wrapper.state('last_name')).toEqual('Dipen');
    })
    it('Should capture email correctly onChange', () => {
        wrapper.find('input').at(2);
        wrapper.simulate('change', { preventDefault: () => { } });
        wrapper.setState({ email: "Dipen" })
        expect(wrapper.state('first_name')).toEqual('Dipen');
    });

    it('Should capture password correctly onChange', () => {
        wrapper.find('input').at(3);
        wrapper.simulate('change', { preventDefault: () => { } });
        wrapper.setState({ password: "Dipen" })
        expect(wrapper.state('password')).toEqual('Dipen');
    });
    it('handle Change', () => {
        wrapper.instance().handleInputChanges({ target: { value: 'test', name: 'email' } });
        wrapper.update();
        expect(wrapper.state('email')).toEqual('test');
    });
})