import React, { Component } from 'react'
import { BasicForm as Form, Nest, createInput } from '../src'
import JSONTree from 'react-json-tree'

const Input = createInput()(props => <input type="text" {...props} />)
const Checkbox = createInput({ toggleable: true })(props => <input type="checkbox" {...props} />)

const UserFields = () => (
  <section>
    <h3>User</h3>
    <div>Name: <Input path="name" /></div>
    <div>Email: <Input path="email" /></div>
    <h4>Likes:</h4>
    <div><Checkbox path="likes[]" value="pizza" /> Pizza</div>
    <div><Checkbox path="likes[]" value="computers" /> Computers</div>
    <div><Checkbox path="likes[]" value="trump" /> Trump</div>
  </section>
)

const CompanyFields = () => (
  <section>
    <h3>Company</h3>
    <div>Name: <Input path="name" /></div>
    <div>Address: <Input path="address" /></div>
    <div>Phone: <Input path="phone" /></div>
    <div>Website: <Input path="website" /></div>
  </section>
)

export default class ExampleForm extends Component {
  state = { data: {} }

  updateData = data => this.setState({ data })

  render () {
    return (
      <Form onSubmit={this.updateData}>
        <Nest path="user">
          <UserFields />
        </Nest>
        <Nest path="company">
          <CompanyFields />
        </Nest>

        <button type="submit">Submit</button>

        <JSONTree
          data={this.state.data}
          shouldExpandNode={() => true}
        />
      </Form>
    )
  }
}
