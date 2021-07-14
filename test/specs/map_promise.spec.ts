import { expect } from 'chai'
import { mapPromise } from '@maticnetwork/maticjs'

describe('Map promise', () => {
  it('map promise without concurrent', async () => {
    const result = await mapPromise([1, 2, 3, 4, 5], val => {
      return Promise.resolve(val * 2)
    })
    expect(result)
      .to.be.an('array')
      .eql([2, 4, 6, 8, 10])
  })

  it('map promise using conncurrency less than value supplied', async () => {
    let result = await mapPromise(
      [1, 2, 3, 4, 5],
      val => {
        return Promise.resolve(val * 2)
      },
      {
        concurrency: 1,
      }
    )
    expect(result)
      .to.be.an('array')
      .eql([2, 4, 6, 8, 10])

    result = await mapPromise(
      result,
      val => {
        return Promise.resolve(val * 2)
      },
      {
        concurrency: 2,
      }
    )
    expect(result)
      .to.be.an('array')
      .eql([4, 8, 12, 16, 20])
  })

  it('map promise using conncurrency greater than value supplied', async () => {
    let result = await mapPromise(
      [1, 2, 3, 4, 5],
      val => {
        return Promise.resolve(val * 2)
      },
      {
        concurrency: 10,
      }
    )
    expect(result)
      .to.be.an('array')
      .eql([2, 4, 6, 8, 10])

    result = await mapPromise(
      result,
      val => {
        return Promise.resolve(val * 2)
      },
      {
        concurrency: Infinity,
      }
    )
    expect(result)
      .to.be.an('array')
      .eql([4, 8, 12, 16, 20])
  })

  it('map promise using conncurrency 0', async () => {
    let result = await mapPromise(
      [1, 2, 3, 4, 5],
      val => {
        return Promise.resolve(val * 2)
      },
      {
        concurrency: 0,
      }
    )
    expect(result)
      .to.be.an('array')
      .eql([2, 4, 6, 8, 10])
  })
})
