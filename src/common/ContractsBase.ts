import BN from 'bn.js'

import Web3Client from './Web3Client'

import { address } from '../types/Common'

export default class ContractsBase {
  static MATIC_CHILD_TOKEN: address = '0x0000000000000000000000000000000000001010'

  web3Client: Web3Client
  network: any

  constructor(web3Client: Web3Client, network: any) {
    this.web3Client = web3Client
    this.network = network
  }

  public encode(number: BN | string | number) {
    if (typeof number === 'number') {
      number = new BN(number)
    } else if (typeof number === 'string') {
      if (number.slice(0, 2) === '0x') return number
      number = new BN(number)
    }
    if (BN.isBN(number)) {
      return '0x' + number.toString(16)
    }
  }

  public getERC20TokenContract(token: address, parent: boolean = false) {
    const web3 = parent ? this.web3Client.parentWeb3 : this.web3Client.web3
    return new web3.eth.Contract(this.network.abi('ChildERC20'), token)
  }

  public getERC721TokenContract(token: address, parent: boolean = false) {
    const web3 = parent ? this.web3Client.parentWeb3 : this.web3Client.web3
    return new web3.eth.Contract(this.network.abi('ChildERC721'), token)
  }

  public getChildMaticContract() {
    return new this.web3Client.web3.eth.Contract(this.network.abi('MRC20'), ContractsBase.MATIC_CHILD_TOKEN)
  }

  public getPOSERC20TokenContract(token: address, parent: boolean = false) {
    const web3 = parent ? this.web3Client.parentWeb3 : this.web3Client.web3
    return new web3.eth.Contract(this.network.abi('ChildERC20', 'pos'), token)
  }

  public getPOSERC721TokenContract(token: address, parent: boolean = false) {
    const web3 = parent ? this.web3Client.parentWeb3 : this.web3Client.web3
    return new web3.eth.Contract(
      [
        {
          inputs: [
            { internalType: 'string', name: 'name_', type: 'string' },
            { internalType: 'string', name: 'symbol_', type: 'string' },
            { internalType: 'address', name: 'childChainManager', type: 'address' },
          ],
          stateMutability: 'nonpayable',
          type: 'constructor',
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, internalType: 'address', name: 'owner', type: 'address' },
            { indexed: true, internalType: 'address', name: 'approved', type: 'address' },
            { indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
          ],
          name: 'Approval',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, internalType: 'address', name: 'owner', type: 'address' },
            { indexed: true, internalType: 'address', name: 'operator', type: 'address' },
            { indexed: false, internalType: 'bool', name: 'approved', type: 'bool' },
          ],
          name: 'ApprovalForAll',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            { indexed: false, internalType: 'address', name: 'userAddress', type: 'address' },
            { indexed: false, internalType: 'address payable', name: 'relayerAddress', type: 'address' },
            { indexed: false, internalType: 'bytes', name: 'functionSignature', type: 'bytes' },
          ],
          name: 'MetaTransactionExecuted',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
            { indexed: true, internalType: 'bytes32', name: 'previousAdminRole', type: 'bytes32' },
            { indexed: true, internalType: 'bytes32', name: 'newAdminRole', type: 'bytes32' },
          ],
          name: 'RoleAdminChanged',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
            { indexed: true, internalType: 'address', name: 'account', type: 'address' },
            { indexed: true, internalType: 'address', name: 'sender', type: 'address' },
          ],
          name: 'RoleGranted',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
            { indexed: true, internalType: 'address', name: 'account', type: 'address' },
            { indexed: true, internalType: 'address', name: 'sender', type: 'address' },
          ],
          name: 'RoleRevoked',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, internalType: 'address', name: 'from', type: 'address' },
            { indexed: true, internalType: 'address', name: 'to', type: 'address' },
            { indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
          ],
          name: 'Transfer',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, internalType: 'address', name: 'user', type: 'address' },
            { indexed: false, internalType: 'uint256[]', name: 'tokenIds', type: 'uint256[]' },
          ],
          name: 'WithdrawnBatch',
          type: 'event',
        },
        {
          inputs: [],
          name: 'BATCH_LIMIT',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'CHILD_CHAIN_ID',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'CHILD_CHAIN_ID_BYTES',
          outputs: [{ internalType: 'bytes', name: '', type: 'bytes' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'DEFAULT_ADMIN_ROLE',
          outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'DEPOSITOR_ROLE',
          outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'ERC712_VERSION',
          outputs: [{ internalType: 'string', name: '', type: 'string' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'ROOT_CHAIN_ID',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'ROOT_CHAIN_ID_BYTES',
          outputs: [{ internalType: 'bytes', name: '', type: 'bytes' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'address', name: 'to', type: 'address' },
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
          ],
          name: 'approve',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
          name: 'balanceOf',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'baseURI',
          outputs: [{ internalType: 'string', name: '', type: 'string' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'address', name: 'user', type: 'address' },
            { internalType: 'bytes', name: 'depositData', type: 'bytes' },
          ],
          name: 'deposit',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'address', name: 'userAddress', type: 'address' },
            { internalType: 'bytes', name: 'functionSignature', type: 'bytes' },
            { internalType: 'bytes32', name: 'sigR', type: 'bytes32' },
            { internalType: 'bytes32', name: 'sigS', type: 'bytes32' },
            { internalType: 'uint8', name: 'sigV', type: 'uint8' },
          ],
          name: 'executeMetaTransaction',
          outputs: [{ internalType: 'bytes', name: '', type: 'bytes' }],
          stateMutability: 'payable',
          type: 'function',
        },
        {
          inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
          name: 'getApproved',
          outputs: [{ internalType: 'address', name: '', type: 'address' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'getChainId',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'pure',
          type: 'function',
        },
        {
          inputs: [],
          name: 'getDomainSeperator',
          outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
          name: 'getNonce',
          outputs: [{ internalType: 'uint256', name: 'nonce', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [{ internalType: 'bytes32', name: 'role', type: 'bytes32' }],
          name: 'getRoleAdmin',
          outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'bytes32', name: 'role', type: 'bytes32' },
            { internalType: 'uint256', name: 'index', type: 'uint256' },
          ],
          name: 'getRoleMember',
          outputs: [{ internalType: 'address', name: '', type: 'address' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [{ internalType: 'bytes32', name: 'role', type: 'bytes32' }],
          name: 'getRoleMemberCount',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'bytes32', name: 'role', type: 'bytes32' },
            { internalType: 'address', name: 'account', type: 'address' },
          ],
          name: 'grantRole',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'bytes32', name: 'role', type: 'bytes32' },
            { internalType: 'address', name: 'account', type: 'address' },
          ],
          name: 'hasRole',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'address', name: 'owner', type: 'address' },
            { internalType: 'address', name: 'operator', type: 'address' },
          ],
          name: 'isApprovedForAll',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'name',
          outputs: [{ internalType: 'string', name: '', type: 'string' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
          name: 'ownerOf',
          outputs: [{ internalType: 'address', name: '', type: 'address' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'bytes32', name: 'role', type: 'bytes32' },
            { internalType: 'address', name: 'account', type: 'address' },
          ],
          name: 'renounceRole',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'bytes32', name: 'role', type: 'bytes32' },
            { internalType: 'address', name: 'account', type: 'address' },
          ],
          name: 'revokeRole',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'address', name: 'from', type: 'address' },
            { internalType: 'address', name: 'to', type: 'address' },
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
          ],
          name: 'safeTransferFrom',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'address', name: 'from', type: 'address' },
            { internalType: 'address', name: 'to', type: 'address' },
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
            { internalType: 'bytes', name: '_data', type: 'bytes' },
          ],
          name: 'safeTransferFrom',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'address', name: 'operator', type: 'address' },
            { internalType: 'bool', name: 'approved', type: 'bool' },
          ],
          name: 'setApprovalForAll',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }],
          name: 'supportsInterface',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'symbol',
          outputs: [{ internalType: 'string', name: '', type: 'string' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [{ internalType: 'uint256', name: 'index', type: 'uint256' }],
          name: 'tokenByIndex',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'address', name: 'owner', type: 'address' },
            { internalType: 'uint256', name: 'index', type: 'uint256' },
          ],
          name: 'tokenOfOwnerByIndex',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
          name: 'tokenURI',
          outputs: [{ internalType: 'string', name: '', type: 'string' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'totalSupply',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'address', name: 'from', type: 'address' },
            { internalType: 'address', name: 'to', type: 'address' },
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
          ],
          name: 'transferFrom',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
          name: 'withdraw',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [{ internalType: 'uint256[]', name: 'tokenIds', type: 'uint256[]' }],
          name: 'withdrawBatch',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
      token
    )
  }

  public getPOSERC1155TokenContract(token: address, parent: boolean = false) {
    const web3 = parent ? this.web3Client.parentWeb3 : this.web3Client.web3
    return new web3.eth.Contract(this.network.abi('ChildERC1155', 'pos'), token)
  }
}
