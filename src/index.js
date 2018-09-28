import Web3 from "web3"

import RootChainArtifacts from "./artifacts/RootChain"
import ChildERC20Artifacts from "./artifacts/ChildERC20"
import StandardTokenArtifacts from "./artifacts/StandardToken"

export default class Matic {
  constructor(options = {}) {
    this._throwIfNull(!options.maticProvider, "maticProvider is required")
    this._throwIfNull(!options.parentProvider, "parentProvider is required")

    this._web3 = new Web3(options.maticProvider)
    this._parentWeb3 = new Web3(options.parentProvider)

    // create rootchain contract
    this._rootChainContract = new this._parentWeb3.eth.Contract(
      RootChainArtifacts.abi,
      options.rootChainAddress
    )

    // internal cache
    this._tokenCache = {}
  }

  //
  // Getters & setters
  //

  get web3() {
    return this._web3
  }

  get parentWeb3() {
    return this._parentWeb3
  }

  get newAccount() {
    return this._parentWeb3.eth.accounts.wallet.create(1)
  }

  get wallet() {
    return this._parentWeb3.eth.accounts.wallet[0]
  }

  set wallet(_wallet) {
    this._web3.eth.accounts.wallet.add(_wallet)
    this._parentWeb3.eth.accounts.wallet.add(_wallet)
  }

  //
  // Actions
  //

  async approveTokens(token, spender, amount, options = {}) {
    const _tokenContract = new this._parentWeb3.eth.Contract(
      StandardTokenArtifacts.abi,
      token
    )

    return _tokenContract.methods.approve(spender, amount).send({
      from: this.wallet.address,
      ...options
    })
  }

  async depositEthers(user, amount, options = {}) {
    return this._rootChainContract.methods.depositEthers(user, amount).send({
      from: this.wallet.address,
      ...options
    })
  }

  async depositTokens(token, user, amount, options = {}) {
    return this._rootChainContract.methods
      .depositTokens(token, user, amount)
      .send({
        from: this.wallet.address,
        ...options
      })
  }

  async transferTokens(token, user, amount, options = {}) {
    const _tokenContract = this._getChildTokenContract(token)
    return _tokenContract.methods.transfer(user, amount).send({
      from: this.wallet.address,
      ...options
    })
  }

  async startWithdraw(token, amount, options = {}) {
    const _tokenContract = this._getChildTokenContract(token)
    return _tokenContract.methods.withdraw(amount).send({
      from: this.wallet.address,
      ...options
    })
  }

  //
  // Internal methods
  //

  _throwIfNull(value, message) {
    if (!value) {
      throw new Error(message)
    }
  }

  _getChildTokenContract(token) {
    const _token = token.toLowerCase()

    let _tokenContract = this._tokenCache[_token]
    if (!_tokenContract) {
      _tokenContract = new this._web3.eth.Contract(
        ChildERC20Artifacts.abi,
        _token
      )
      // update token cache
      this._tokenCache[_token] = _tokenContract
    }

    return _tokenContract
  }
}
