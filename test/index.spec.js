/* global describe, it, expect */

import chai from "chai"

import Matic from "../src"

// set up chai
chai.should()
const expect = chai.expect

describe("Matic", () => {
  it("should throw error for no required options", () => {
    expect(() => new Matic()).to.throw("maticProvider is required")
    expect(
      () => new Matic({ maticProvider: "http://localhost:8545" })
    ).to.throw("parentProvider is required")
  })
})
