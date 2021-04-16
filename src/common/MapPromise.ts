export function mapPromise(values: Array<any>, converter: Function) {
  const maps = values.map((val, index) => {
    return converter(val, index)
  })
  return Promise.all(maps)
}
