import { configure } from '@kadira/storybook'

function loadStories() {
  require('../example/ExampleForm.story')
}

configure(loadStories, module)
