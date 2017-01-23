import React, { Component, PropTypes } from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import omit from 'lodash/omit'

import { getDisplayName, applyPathValue } from './utils'

export const createForm = WrappedComponent => {
  class FormHoc extends Component {
    static displayName = `FormHoc(${getDisplayName(WrappedComponent)})`
    static childContextTypes = { registerInput: PropTypes.func.isRequired }
    static propTypes = {
      onSubmit: PropTypes.func,
    }

    inputs = []

    getChildContext() {
      return { registerInput: this.registerInput }
    }

    registerInput = (path, getValue) => {
      this.inputs.push([path, getValue])
    }

    getJson = () => {
      // TODO: return the values of all registered inputs
      const reducer = (json, [path, getValue]) => applyPathValue(json, path, getValue())
      return this.inputs.reduce(reducer, {})
    }

    onSubmit = (e) => {
      e.preventDefault()
      this.props.onSubmit(this.getJson())
    }

    render() {
      return (
        <WrappedComponent
          {...omit(this.props, ['onSubmit'])}
          getJson={this.getJson}
          onSubmit={this.props.onSubmit ? this.onSubmit : undefined}
        />
      )
    }
  }

  hoistNonReactStatics(FormHoc, WrappedComponent)

  return FormHoc
}
