import React, { Component, PropTypes } from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import omit from 'lodash/omit'

import { getDisplayName } from './utils'

export const createInput = WrappedComponent => {
  class InputHoc extends Component {
    static displayName = `InputHoc(${getDisplayName(WrappedComponent)})`
    static contextTypes = { registerInput: PropTypes.func }
    static propTypes = {
      defaultValue: PropTypes.any,
      value: PropTypes.any,
      path: PropTypes.string,
      onChange: PropTypes.func,
    }

    state = {}
    isRegistered = false

    componentDidMount() {
      if (this.context.registerInput && this.props.path) {
        this.context.registerInput(this.props.path, this.getValue)
        this.isRegistered = true

        if (this.props.value || this.props.defaultValue) {
          this.setState({
            value: this.props.value ? this.props.value : this.props.defaultValue,
          })
        }
      }
    }

    componentDidUpdate(prevProps) {
      if (this.props.value !== prevProps.value) this.setState({ value: this.props.value })
    }

    getValue = () => this.state.value

    onChange = (...args) => {
      if (this.props.onChange) this.props.onChange(...args)

      const [e] = args
      const value = (e.target && e.target.value) ? e.target.value : e

      this.setState({ value })
    }

    render() {
      return (
        <WrappedComponent
          {...omit(this.props, ['path', 'onChange'])}
          onChange={this.isRegistered ? this.onChange : this.props.onChange}
        />
      )
    }
  }

  hoistNonReactStatics(InputHoc, WrappedComponent)

  return InputHoc
}
