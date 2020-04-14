import { signTypedData } from 'eth-sig-util'
import EthUtil from 'ethereumjs-util'

export class Utils {
  getOrderHash(order) {
    const orderData = Buffer.concat([
      EthUtil.toBuffer(order.id),
      EthUtil.toBuffer(order.token),
      EthUtil.setLengthLeft(order.amount, 32),
    ])
    return EthUtil.keccak256(orderData)
  }

    getTypedData({ token, spender, tokenIdOrAmount, data, expiration, chainId }) {
    return {
      types: {
        EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' },
          { name: 'contract', type: 'address' },
        ],
        TokenTransferOrder: [
          { name: 'spender', type: 'address' },
          { name: 'tokenIdOrAmount', type: 'uint256' },
          { name: 'data', type: 'bytes32' },
          { name: 'expiration', type: 'uint256' },
        ],
      },
      domain: {
        name: 'Matic Network',
        version: '1',
        chainId: chainId,
        contract: token,
      },
      primaryType: 'TokenTransferOrder',
      message: {
        spender,
        tokenIdOrAmount,
        data,
        expiration,
      },
    }
  }

  signEIP712TypedData(data, privateKey) {
    return signTypedData(EthUtil.toBuffer(privateKey), {
      data: data,
    })
  }
}
