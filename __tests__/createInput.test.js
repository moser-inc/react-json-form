import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'
import { createInput } from '../src/createInput'

const BasicInput = () => (<input type="text" />)
const textInputExpected = shallow(<BasicInput type="text" />)
const Input = createInput()(props => <BasicInput {...props} />)
const InputControlled = createInput({ controlled: true })(props => <BasicInput type="text" {...props} />)

describe('createInput', () => {
  it('should render without onChange', () => {
    const input = shallow(<Input onChange={() => {} } />)
    expect(input.html()).toEqual(textInputExpected.html())
  })

  it('should omit path from rendered component', () => {
    const input = shallow(<Input path="user.name" onChange={() => {} } />)
    expect(input.html()).toEqual(textInputExpected.html())
  })

  it('should render without onChange and value for controlled input', () => {
    const input = shallow(<InputControlled value="foo" onChange={() => {}} />)
    expect(input.html()).toEqual(textInputExpected.html())
  })

  it('should render without onChange and defaultValue for controlled input', () => {
    const input = shallow(<InputControlled defaultValue="foo" onChange={() => {}} />)
    expect(input.html()).toEqual(textInputExpected.html())
  })
})
