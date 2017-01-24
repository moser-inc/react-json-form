export const getDisplayName = Component => Component.displayName || Component.name || 'Component'

export const splitPath = (path, at = '.') => path.split(at)

export const applyPathState = (json, path, value) => {
  if (value === undefined) return json

  let current = json
  let key = path

  if (path.includes('.')) {
    const keys = splitPath(path)

    for (key of keys.slice(0, keys.length - 1)) {
      if (!current[key]) current[key] = {}
      current = current[key]
    }

    key = keys[keys.length - 1]
  }

  if (key.endsWith('[]')) {
    key = key.slice(0, key.length - 2)
    if (!current[key]) current[key] = []
    current[key].push(value)
  } else {
    current[key] = value
  }

  return json
}
