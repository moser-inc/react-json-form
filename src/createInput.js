import React, { Component, PropTypes } from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import omit from 'lodash/omit'

import { getDisplayName } from './utils'

export const createInput = ({ toggleable } = {}) => WrappedComponent => {
  class InputHoc extends Component {
    static displayName = `InputHoc(${getDisplayName(WrappedComponent)})`

    static contextTypes = {
      nestedPath: PropTypes.string,
      registerInput: PropTypes.func,
      uncheckPath: PropTypes.func,
    }

    static propTypes = {
      defaultValue: PropTypes.any,
      value: PropTypes.any,
      path: PropTypes.string,
      onChange: PropTypes.func,
    }

    state = {
      registered: false,
      toggleable: undefined,
      value: undefined,
      checked: undefined,
    }

    componentDidMount() {
      if (this.context.registerInput && this.props.path) {
        this.path = this.context.nestedPath ? `${this.context.nestedPath}.${this.props.path}` : this.props.path
        this.deregister = this.context.registerInput(this.path, this.getState, this.uncheck)

        const updates = { registered: true, toggleable }

        if (this.props.value) {
          updates.value = this.props.value
        } else if (this.props.defaultValue) {
          updates.value = this.props.defaultValue
        }

        if (toggleable) {
          if (this.props.checked !== undefined) {
            updates.checked = this.props.checked
          } else if (this.props.defaultChecked !== undefined) {
            updates.checked = this.props.defaultChecked
          }
        }

        this.setState(updates)
      }
    }

    componentWillUnmount() {
      if (this.deregister) this.deregister()
    }

    componentDidUpdate(prevProps) {
      if (this.state.registered) {
        if (this.props.value !== prevProps.value) this.setState({ value: this.props.value })
        if (toggleable && this.props.checked !== prevProps.checked) {
          if (!this.path.endsWith('[]')) this.context.uncheckPath(this.path)
          this.setState({ checked: this.props.checked })
        }
      }
    }

    getState = () => this.state
    uncheck = () => this.setState({ checked: false })

    onChange = (...args) => {
      if (this.props.onChange) this.props.onChange(...args)

      const [e] = args

      const updates = { value: (e && e.target && e.target.value) ? e.target.value : e }
      if (toggleable && e.target) {
        if (!this.path.endsWith('[]')) this.context.uncheckPath(this.path)
        updates.checked = e.target.checked
      }

      this.setState(updates)
    }

    getChildProps() {
      const props = {
        ...omit(this.props, ['path', 'onChange']),
        onChange: this.state.registered ? this.onChange : this.props.onChange,
      }

      if (toggleable) props.checked = this.state.checked || false

      return props
    }

    render() {
      return <WrappedComponent {...this.getChildProps()} />
    }
  }

  hoistNonReactStatics(InputHoc, WrappedComponent)

  return InputHoc
}
