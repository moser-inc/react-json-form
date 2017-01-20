export const getDisplayName = Component => Component.displayName || Component.name || 'Component'

export const splitPath = (path, at = '.') => path.split(at)

export const applyPathValue = (json, path, value) => {
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

  if (value !== undefined) current[key] = value
  return json
}
