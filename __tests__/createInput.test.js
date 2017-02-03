import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'
import { createInput } from '../src/createInput'

const textInputExpected = shallow(<input type="text" />)
const Input = createInput()(props => <input type="text" {...props} />)

describe('createInput', () => {
  it('should render a wrapped component without onChange', () => {
    const input = shallow(<Input onChange={() => {} } />)
    expect(input.html()).toEqual(textInputExpected.html())
  })
})
