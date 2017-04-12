import React, { Component } from 'react';
import JSONTree from 'react-json-tree';

import { BasicForm as Form, Nest, createInput } from '../src';

const Input = createInput()(props => <input type="text" {...props} />);

const Checkbox = createInput({ toggleable: true })(({ children, ...props }) => (
  <label><input type="checkbox" {...props} /> {children}</label>
));

const Radio = createInput({ toggleable: true })(({ children, ...props }) => (
  <label><input type="radio" {...props} /> {children}</label>
));

const UserFields = () => (
  <section>
    <h3>User</h3>
    <div>Name: <Input path="name" /></div>
    <div>Email: <Input path="email" /></div>
    <h4>Likes:</h4>
    <div><Checkbox path="likes[]" value="pizza">Pizza</Checkbox></div>
    <div><Checkbox path="likes[]" value="computers">Computers</Checkbox></div>
    <div><Checkbox path="likes[]" value="kittens">Kittens</Checkbox></div>
  </section>
);

const CompanyFields = () => (
  <section>
    <h3>Company</h3>
    <div>Name: <Input path="name" /></div>
    <div>Address: <Input path="address" /></div>
    <div>Phone: <Input path="phone" /></div>
    <div>Website: <Input path="website" /></div>
  </section>
);

export default class ExampleForm extends Component {
  state = { data: {} };

  updateData = data => this.setState({ data });

  render() {
    return (
      <Form onSubmit={this.updateData}>
        <Nest path="user">
          <UserFields />
        </Nest>
        <Nest path="company">
          <CompanyFields />
        </Nest>
        <section>
          <h4>Type</h4>
          <div><Radio path="type" value="personal">Personal</Radio></div>
          <div><Radio path="type" value="corporate">Corporate</Radio></div>
        </section>

        <button type="submit">Submit</button>

        <JSONTree data={this.state.data} shouldExpandNode={() => true} />
      </Form>
    );
  }
}
