import React, { Component, PropTypes } from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import omit from 'lodash/omit'
import { List } from 'immutable'

import { getDisplayName, applyPathState } from './utils'

export const createForm = WrappedComponent => {
  class FormHoc extends Component {
    static displayName = `FormHoc(${getDisplayName(WrappedComponent)})`
    static childContextTypes = { registerInput: PropTypes.func.isRequired }
    static propTypes = {
      onSubmit: PropTypes.func,
    }

    inputs = List()

    registerInput = (path, getState) => {
      const input = [path, getState]

      this.inputs = this.inputs.push(input)

      return () => {
        const i = this.inputs.indexOf(input)
        if (i === -1) return
        this.inputs = this.inputs.delete(i)
      }
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

    getChildContext() {
      return { registerInput: this.registerInput }
    }

    getChildProps() {
      return {
        ...omit(this.props, ['onSubmit']),
        getJson: this.getJson,
        onSubmit: this.props.onSubmit ? this.onSubmit : undefined,
      }
    }

    render() {
      return <WrappedComponent {...this.getChildProps()} />
    }
  }

  hoistNonReactStatics(FormHoc, WrappedComponent)

  return FormHoc
}
