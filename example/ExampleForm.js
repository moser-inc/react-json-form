import React, { Component } from 'react'
import { BasicForm as Form, createInput } from '../src'
import JSONTree from 'react-json-tree'

const Input = createInput()(props => <input type="text" {...props} />)
const Checkbox = createInput({ toggleable: true })(props => <input type="checkbox" {...props} />)

const UserFields = () => (
  <section>
    <h3>User</h3>
    <div>Name: <Input path="user.name" /></div>
    <div>Email: <Input path="user.email" /></div>
    <h4>Likes:</h4>
    <div><Checkbox path="user.likes[]" value="pizza" /> Pizza</div>
    <div><Checkbox path="user.likes[]" value="computers" /> Computers</div>
    <div><Checkbox path="user.likes[]" value="trump" /> Trump</div>
  </section>
)

const CompanyFields = () => (
  <section>
    <h3>Company</h3>
    <div>Name: <Input path="company.name" /></div>
    <div>Address: <Input path="company.address" /></div>
    <div>Phone: <Input path="company.phone" /></div>
    <div>Website: <Input path="company.website" /></div>
  </section>
)

export default class ExampleForm extends Component {
  state = { data: {} }

  updateData = data => this.setState({ data })

  render () {
    return (
      <Form onSubmit={this.updateData}>
        <UserFields />
        <CompanyFields />

        <button type="submit">Submit</button>

        <JSONTree
          data={this.state.data}
          shouldExpandNode={() => true}
        />
      </Form>
    )
  }
}
