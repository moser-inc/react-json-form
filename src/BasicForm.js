import React from 'react'
import omit from 'lodash/omit'

import { createForm } from './createForm'

export const BasicForm = createForm(props => <form {...omit(props, ['getJson'])} />)
