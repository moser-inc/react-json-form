import React from 'react'
import { storiesOf } from '@kadira/storybook'

import ExampleForm from './ExampleForm'

storiesOf('ExampleForm', module)
  .add('default', () => <ExampleForm />)
