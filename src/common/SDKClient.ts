import Network from '@maticnetwork/meta/network'
import BN from 'bn.js'
import ContractsBase from '../common/ContractsBase'
import Web3Client from '../common/Web3Client'
import { address, SendOptions } from '../types/Common'

export default class SDKClient extends ContractsBase {
  static initializeNetwork(network = 'testnet', version = 'mumbai') {
    const _network = new Network(network, version)
    if (!_network) throw new Error(`network ${network} - ${version} is not supported`)
    return _network
  }

  constructor(options: any = {}) {
    const web3Client = new Web3Client(
      options.parentProvider || options.network.Main.RPC,
      options.maticProvider || options.network.Matic.RPC,
      options.parentDefaultOptions || {},
      options.maticDefaultOptions || {},
      options.network.Main.SupportsEIP1559,
      options.network.Matic.SupportsEIP1559
    )
    super(web3Client, options.network)
  }

  setWallet(_wallet) {
    this.web3Client.wallet = _wallet
  }

  async balanceOfERC20(userAddress: address, token: address, options: SendOptions = {}) {
    if (!token || !userAddress) {
      throw new Error('token address or user address is missing')
    }

    const balance = this.getERC20TokenContract(token, options.parent)
      .methods.balanceOf(userAddress)
      .call()
    return balance
  }

  async balanceOfERC721(userAddress: address, token: address, options: SendOptions = {}) {
    if (options && (!token || !userAddress)) {
      throw new Error('token address or user address is missing')
    }

    const balance = this.getERC721TokenContract(token, options.parent)
      .methods.balanceOf(userAddress)
      .call()
    return balance
  }

  async tokenOfOwnerByIndexERC721(userAddress: address, token: address, index: number, options?: SendOptions) {
    if (options && (!token || !userAddress)) {
      throw new Error('token address or user address is missing')
    }

    const tokenID = this.getERC721TokenContract(token, options.parent)
      .methods.tokenOfOwnerByIndex(userAddress, index)
      .call()
    return tokenID
  }

  async transferERC20Tokens(token: address, to: address, amount: BN | string, options?: SendOptions) {
    if (options && (!options.from || !amount || !token || !to)) {
      throw new Error('options.from, to, token or amount is missing')
    }
    const txObject = this.getERC20TokenContract(token, options.parent).methods.transfer(to, this.encode(amount))
    const onRootChain = options.parent ? true : false
    const web3Options = await this.web3Client.fillOptions(txObject, onRootChain, options)
    if (web3Options.encodeAbi) {
      return Object.assign(web3Options, { data: txObject.encodeABI(), to: token })
    }
    return this.web3Client.send(txObject, web3Options, options)
  }

  async transferERC721Tokens(token: address, to: address, tokenId: string, options?: SendOptions) {
    if (options && (!options.from || !tokenId || !token || !to)) {
      throw new Error('options.from, to, token or tokenId is missing')
    }

    const txObject = this.getERC721TokenContract(token, options.parent).methods.transferFrom(options.from, to, tokenId)
    const onRootChain = options.parent ? true : false
    const web3Options = await this.web3Client.fillOptions(txObject, onRootChain, options)
    if (web3Options.encodeAbi) {
      return Object.assign(web3Options, { data: txObject.encodeABI(), to: token })
    }
    return this.web3Client.send(txObject, web3Options, options)
  }

  async transferERC1155Tokens(
    token: address,
    to: address,
    tokenIds: (BN | string)[],
    values: (BN | string)[],
    options: SendOptions
  ) {
    if (!options || !options.from) {
      throw new Error('options.from is missing')
    }
    if (!to || !token || !tokenIds || !values) {
      throw new Error('to address, token, tokenId or value are missing')
    }
    if (tokenIds.length !== values.length) {
      throw new Error('Token ids and values arrays are not equal in length')
    }

    Object.assign(options, { to })
    const txObject =
      tokenIds.length > 1
        ? this.getPOSERC1155TokenContract(token, true).methods.safeBatchTransferFrom(
            options.from,
            to,
            tokenIds,
            values,
            '0x'
          )
        : this.getPOSERC1155TokenContract(token, true).methods.safeTransferFrom(
            options.from,
            to,
            tokenIds,
            values,
            '0x'
          )
    const web3Options = await this.web3Client.fillOptions(txObject, true /* onRootChain */, options)
    if (web3Options.encodeAbi) {
      return Object.assign(web3Options, { data: txObject.encodeABI(), to: token })
    }
    return this.web3Client.send(txObject, web3Options, options)
  }

  async transferMaticEth(to: address, amount: BN | string, options?: SendOptions) {
    if (options && (!options.from || !amount || !to)) {
      throw new Error('options.from, to or amount is missing')
    }
    const token = ContractsBase.MATIC_CHILD_TOKEN
    const txObject = this.getChildMaticContract().methods.transfer(to, this.encode(amount))
    options.value = this.encode(amount)
    const web3Options = await this.web3Client.fillOptions(txObject, false /* onRootChain */, options)
    if (web3Options.encodeAbi) {
      return Object.assign(web3Options, { data: txObject.encodeABI(), to: token })
    }
    return this.web3Client.send(txObject, web3Options, options)
  }
}
