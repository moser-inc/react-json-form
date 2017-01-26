# react-json-form

`react-json-form` is an attempt at simplifying the creation of forms that output nested JSON objects.

## Installation

### Yarn
```
$ yarn add react-json-form
```

### NPM
```
$ npm install --save react-json-form
```

## Usage

```jsx
import React from 'react'
import { render } from 'react-dom'
import { BasicForm as Form, createInput } from 'react-json-form'

const Input = createInput(props => <input {...props} />)

render(
  <Form onSubmit={json => console.log(json)}>
    Name: <Input type="text" path="name" /><br />
    Age: <Input type="number" path="age" /><br />
    <button type="submit">Show me the JSON</button>
  </Form>,
  document.getElementById('root')
)
```
