import React, { Component } from 'react'
import { createForm, createInput } from '../src'
import JSONTree from 'react-json-tree'

const Input = createInput(props => <input type="text" {...props} />)

const UserFields = () => (
  <section>
    <h3>User</h3>
    <div>Name: <Input path="user.name" /></div>
    <div>Email: <Input path="user.email" /></div>
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

class ExampleForm extends Component {
  state = { data: {} }

  updateData = () => this.setState({ data: this.props.getJson() })

  render () {
    return (
      <form>
        <UserFields />
        <CompanyFields />
        <button type="button" onClick={this.updateData}>Submit</button>
        <JSONTree data={this.state.data} />
      </form>
    )
  }
}

export default createForm(ExampleForm)
