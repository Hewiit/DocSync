/**
 * Validates the parameters. If validation succeeds, the method returns true.
 * @param {*} param0
 * @returns true
 */
function checkParams({ url = '', method = 'GET' }) {
  if (!url) {
    throw new Error('url must be not null')
  }
  if (method.toUpperCase() !== 'GET' && method.toUpperCase() !== 'POST') {
    throw new Error('Illegal request method, Methods can only be "GET" or "POST"')
  }
  return true
}

/**
 * General method for loading data, such as loading lists or initializing data.
 * @param {*} param0
 */
export function loadData({ url = '', method = 'GET', data, beforeRequest, afterRequest }) {
  if (checkParams({ url, method })) {
    return this[`${method.toLowerCase()}`]({ url, data, beforeRequest, afterRequest })
  }
  throw new Error('params check failed')
}

/**
 * Method for fuzzy searching.
 * @param {*} param0
 */
export function likeSearch({ url = '', method = 'GET', data, beforeRequest, afterRequest }) {
  if (checkParams({ url, method })) {
    return this[`${method.toLowerCase()}`]({ url, data, beforeRequest, afterRequest })
  }
  throw new Error('params check failed')
}

/**
 * Adds a new data entry.
 * @param {*} param0
 */
export function addItem({ url = '', method = 'GET', data, beforeRequest, afterRequest }) {
  if (checkParams({ url, method })) {
    return this[`${method.toLowerCase()}`]({ url, data, beforeRequest, afterRequest })
  }
  throw new Error('params check failed')
}

/**
 * Deletes n data entries.
 * @param {*} items
 * @param {*} param1
 */
export function deleteItems({ url = '', method = 'GET', data, beforeRequest, afterRequest }) {
  if (checkParams({ url, method })) {
    return this[`${method.toLowerCase()}`]({ url, data, beforeRequest, afterRequest })
  }
  throw new Error('params check failed')
}

/**
 * Updates a data entry.
 * @param {*} item
 * @param {*} param1
 */
export function updateItem({ url = '', method = 'GET', data, beforeRequest, afterRequest }) {
  if (checkParams({ url, method })) {
    return this[`${method.toLowerCase()}`]({ url, data, beforeRequest, afterRequest })
  }
  throw new Error('params check failed')
}

export default {
  loadData,
  addItem,
  deleteItems,
  updateItem
}
