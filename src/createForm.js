import React, { Component, PropTypes } from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import omit from 'lodash/omit'

import { getDisplayName, applyPathState } from './utils'

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

    registerInput = (path, getState) => {
      this.inputs.push([path, getState])
    }

    getJson = () => {
      // TODO: return the values of all registered inputs
      const reducer = (json, [path, getState]) => {
        const { value, checked, toggleable } = getState()
        if (toggleable && !checked) return json
        return applyPathState(json, path, value)
      }
      return this.inputs.reduce(reducer, {})
    }

    onSubmit = (e) => {
      e.preventDefault()
      this.props.onSubmit(this.getJson())
    }

    getChildProps = () => ({
      ...omit(this.props, ['onSubmit']),
      getJson: this.getJson,
      onSubmit: this.props.onSubmit ? this.onSubmit : undefined,
    })

    render() {
      return <WrappedComponent {...this.getChildProps()} />
    }
  }

  hoistNonReactStatics(FormHoc, WrappedComponent)

  return FormHoc
}
