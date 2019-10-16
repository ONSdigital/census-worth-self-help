import _ from "lodash"

// debounce with default delay, or return sync function if delay exactly zero (for unit tests)
export default (fn, delay) => {
  return (delay === 0)
    ? fn
    : _.debounce((...args) => fn(...args), delay || 1000)
}