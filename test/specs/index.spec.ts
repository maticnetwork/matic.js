import Matic from '@maticnetwork/maticjs'
import { expect } from 'chai'

describe('Matic SDK', () => {
  it('should throw error for no required options', () => {
    expect(() => new Matic()).to.throw('maticProvider is required')
    expect(() => new Matic({ maticProvider: 'http://localhost:8545' })).to.throw('parentProvider is required')
  })

  describe('getters and setters', () => {
    let maticObject
    let kovanTx

    beforeEach(() => {
      kovanTx = '0xb2b90497065c19f7b94d676e5b91bcd23ea71b0b2b4dc71afc184735410bbc42'

      maticObject = new Matic({
        maticProvider: 'https://kovan.infura.io',
        parentProvider: 'https://kovan.infura.io',
      })
    })

    it('should create web3 object properly', async () => {
      maticObject.web3.should.not.equal(null)
      maticObject.parentWeb3.should.not.equal(null)
    })

    it('should fetch tx properly', async () => {
      const s = await maticObject.getTx(kovanTx)
      s.hash.should.equal(kovanTx)
    })

    it('should fetch receipt properly', async () => {
      const s = await maticObject.getReceipt(kovanTx)
      s.transactionHash.should.equal(kovanTx)
    })

    it('should create account', async () => {
      const n = maticObject.newAccount()
      n.should.not.equal(null)
      maticObject.wallet.should.not.equal(null)
    })

    it('should set wallet', async () => {
      const pk = '0x3a1076bf45ab87712ad64ccb3b10217737f7faacbf2872e88fdd9a537d8fe266'
      maticObject.wallet = pk
      maticObject.wallet.should.not.equal(null)
      maticObject.wallet.privateKey.should.equal(pk)
    })
  })
})
