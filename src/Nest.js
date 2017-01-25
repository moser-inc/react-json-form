import React, { Component, PropTypes } from 'react'

export class Nest extends Component {
  static propTypes = { path: PropTypes.string }
  static contextTypes = { nestedPath: PropTypes.string }
  static childContextTypes = { nestedPath: PropTypes.string }

  getChildContext() {
    const context = {}

    if (this.props.path) {
      context.nestedPath = this.context.nestedPath ? `${this.context.nestedPath}.${this.props.path}` : this.props.path
    }

    return context
  }

  render() {
    return <span>{this.props.children}</span>
  }
}
