// Resolve default export for require.
export default (module) => {
  return module.default ? module.default : module
}
