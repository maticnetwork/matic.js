import BN from 'bn.js'
// import Contract from 'web3/eth/contract'
// import RootChainManagerArtifact from 'matic-pos-portal/artifacts/RootChainManager.json'
import ChildTokenArtifact from 'matic-pos-portal/artifacts/ChildToken.json'

import ContractsBase from '../common/ContractsBase'
import { address } from '../types/Common'
import Web3Client from '../common/Web3Client'

let sigUtil = require('eth-sig-util')

const domainType = [
  { name: 'name', type: 'string' },
  { name: 'version', type: 'string' },
  { name: 'chainId', type: 'uint256' },
  { name: 'verifyingContract', type: 'address' },
]

const metaTransactionType = [
  { name: 'nonce', type: 'uint256' },
  { name: 'from', type: 'address' },
  { name: 'functionSignature', type: 'bytes' },
]

export default class NetworkAgnostic extends ContractsBase {
  web3Client: Web3Client

  constructor(web3Client: Web3Client) {
    super(web3Client)
    this.web3Client = web3Client
  }

  async transfer(tokenAddress: address, recipientAddress: address, amount: BN, user: address | string) {
    const contract = await this.getTokenContract(tokenAddress)
    let functionSignature = contract.methods.transfer(recipientAddress, amount).encodeABI()
    this.executeMetaTransaction(tokenAddress, functionSignature, user)
  }

  async getTokenContract(tokenAddress: address) {
    const contract = new this.web3Client.networkAgnosticWeb3.eth.Contract(ChildTokenArtifact.abi, tokenAddress)
    return contract
  }

  async executeMetaTransaction(tokenAddress: address, functionSignature: any | string, userAddress: address) {
    const contract = await this.getTokenContract(tokenAddress)
    const tokenName = await contract.methods.name().call()
    const parentChainId = '3' // chain id of the network tx is signed on
    let domainData = {
      name: tokenName,
      version: '1',
      chainId: parentChainId,
      verifyingContract: tokenAddress,
    }
    let nonce = await contract.methods.getNonce(userAddress).call()

    let message = {
      nonce: parseInt(nonce),
      from: userAddress,
      functionSignature: functionSignature,
      network: 'Interact with Matic Network',
    }

    const dataToSign = JSON.stringify({
      types: {
        EIP712Domain: domainType,
        MetaTransaction: metaTransactionType,
      },
      domain: domainData,
      primaryType: 'MetaTransaction',
      message: message,
    })
    return this.web3Client.parentWeb3.eth.currentProvider.send(
      {
        jsonrpc: '2.0',
        id: 999999999999,
        method: 'eth_signTypedData_v4',
        params: [userAddress, dataToSign],
      },
      async function(response) {
        if (response.error) {
          // handle error
        }
        let { r, s, v } = this.getSignatureParameters(response.result)
        sigUtil.recoverTypedSignature_v4({
          data: JSON.parse(dataToSign),
          sig: response.result,
        })
        await contract.methods.executeMetaTransaction(userAddress, functionSignature, r, s, v).send({
          from: userAddress,
        })
      }
    )
  }

  async getSignatureParameters(signature: any) {
    if (!this.web3Client.parentWeb3.utils.isHexStrict(signature)) {
      throw new Error('Given value "'.concat(signature, '" is not a valid hex string.'))
    }
    var r = signature.slice(0, 66)
    var s = '0x'.concat(signature.slice(66, 130))
    let _v = '0x'.concat(signature.slice(130, 132))
    let v = this.web3Client.parentWeb3.utils.hexToNumber(_v)
    if (![27, 28].includes(v)) v += 27
    return {
      r: r,
      s: s,
      v: v,
    }
  }
}
