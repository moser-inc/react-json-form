import React, { Component, PropTypes } from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'

import { getDisplayName, applyPathValue } from './utils'

export const createForm = WrappedComponent => {
  class FormHoc extends Component {
    static displayName = `FormHoc(${getDisplayName(WrappedComponent)})`
    static childContextTypes = { registerInput: PropTypes.func.isRequired }

    inputs = []

    getChildContext() {
      return { registerInput: this.registerInput }
    }

    registerInput = (path, getValue) => {
      this.inputs.push([path, getValue])
    }

    getJson = () => {
      // TODO: return the values of all registered inputs
      return this.inputs.reduce((json, [path, getValue]) => applyPathValue(json, path, getValue()), {})
    }

    render() {
      return <WrappedComponent {...this.props} getJson={this.getJson} />
    }
  }

  hoistNonReactStatics(FormHoc, WrappedComponent)

  return FormHoc
}
