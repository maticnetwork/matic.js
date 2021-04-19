import { IMapPromiseOption } from '../interfaces'

const runPromises = (promises: Array<Promise<any>>, converter: Function) => {
  const maps = promises.map((val, index) => {
    return converter(val, index)
  })
  return Promise.all(maps)
}

export function mapPromise(values: Array<any>, converter: Function, option: IMapPromiseOption = {} as any) {
  const valuesLength = values.length
  const concurrency = option.concurrency || valuesLength

  let result = []

  const limitPromiseRun = async() => {
    const promises = values.splice(0, concurrency)
    const promiseResult = await runPromises(promises, converter)
    result = result.concat(promiseResult)

    if (valuesLength > result.length) {
      await limitPromiseRun()
    }
    return result
  }

  return limitPromiseRun()
}
