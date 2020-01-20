"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
var ethereumjs_util_1 = __importDefault(require("ethereumjs-util"));
var bn_js_1 = __importDefault(require("bn.js"));
var WithdrawManager_json_1 = __importDefault(require("matic-protocol/contracts-core/artifacts/WithdrawManager.json"));
var ERC20Predicate_json_1 = __importDefault(require("matic-protocol/contracts-core/artifacts/ERC20Predicate.json"));
var ERC721Predicate_json_1 = __importDefault(require("matic-protocol/contracts-core/artifacts/ERC721Predicate.json"));
var MintableERC721Predicate_json_1 = __importDefault(require("matic-protocol/contracts-core/artifacts/MintableERC721Predicate.json"));
var ChildERC721Mintable_json_1 = __importDefault(require("matic-protocol/contracts-core/artifacts/ChildERC721Mintable.json"));
var proofs_js_1 = __importDefault(require("matic-protocol/contracts-core/helpers/proofs.js"));
var ContractsBase_1 = __importDefault(require("../common/ContractsBase"));
var logger = {
    info: require('debug')('maticjs:WithdrawManager'),
    debug: require('debug')('maticjs:debug:WithdrawManager')
};
var WithdrawManager = /** @class */ (function (_super) {
    __extends(WithdrawManager, _super);
    function WithdrawManager(withdrawManager, rootChain, web3Client, registry) {
        var _this = _super.call(this, web3Client) || this;
        _this.withdrawManager = new _this.web3Client.parentWeb3.eth.Contract(WithdrawManager_json_1.default.abi, withdrawManager);
        _this.rootChain = rootChain;
        _this.registry = registry;
        return _this;
    }
    WithdrawManager.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var erc20PredicateAddress, erc721PredicateAddress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.registry.registry.methods
                            .erc20Predicate()
                            .call()];
                    case 1:
                        erc20PredicateAddress = _a.sent();
                        return [4 /*yield*/, this.registry.registry.methods
                                .erc721Predicate()
                                .call()];
                    case 2:
                        erc721PredicateAddress = _a.sent();
                        this.erc20Predicate = new this.web3Client.parentWeb3.eth.Contract(ERC20Predicate_json_1.default.abi, erc20PredicateAddress);
                        this.erc721Predicate = new this.web3Client.parentWeb3.eth.Contract(ERC721Predicate_json_1.default.abi, erc721PredicateAddress);
                        return [2 /*return*/];
                }
            });
        });
    };
    WithdrawManager.prototype.burnERC20Tokens = function (token, amount, options) {
        return __awaiter(this, void 0, void 0, function () {
            var txObject, _options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        txObject = this.getERC20TokenContract(token).methods.withdraw(this.encode(amount));
                        return [4 /*yield*/, this._fillOptions(options, txObject, this.web3Client.getMaticWeb3())];
                    case 1:
                        _options = _a.sent();
                        if (options.encodeAbi) {
                            _options.data = txObject.encodeABI();
                            _options.to = token;
                            return [2 /*return*/, _options];
                        }
                        return [2 /*return*/, this.web3Client.send(txObject, _options)];
                }
            });
        });
    };
    WithdrawManager.prototype.burnERC721Token = function (token, tokenId, options) {
        return __awaiter(this, void 0, void 0, function () {
            var txObject, _options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        txObject = this.getERC721TokenContract(token).methods.withdraw(this.encode(tokenId));
                        return [4 /*yield*/, this._fillOptions(options, txObject, this.web3Client.getMaticWeb3())];
                    case 1:
                        _options = _a.sent();
                        if (options.encodeAbi) {
                            _options.data = txObject.encodeABI();
                            _options.to = token;
                            return [2 /*return*/, _options];
                        }
                        return [2 /*return*/, this.web3Client.send(txObject, _options)];
                }
            });
        });
    };
    WithdrawManager.prototype.processExits = function (token, options) {
        return __awaiter(this, void 0, void 0, function () {
            var txObject, _options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = options || {};
                        if (!options || !options.gas || options.gas < 2000000) {
                            console.log('processExits can be gas expensive, sending in 2000000 gas but even this might not be enough');
                            options.gas = 2000000;
                        }
                        txObject = this.withdrawManager.methods.processExits(token);
                        return [4 /*yield*/, this._fillOptions(options, txObject, this.web3Client.getParentWeb3())];
                    case 1:
                        _options = _a.sent();
                        if (options.encodeAbi) {
                            _options.data = txObject.encodeABI();
                            _options.to = this.withdrawManager.options.address;
                            return [2 /*return*/, _options];
                        }
                        return [2 /*return*/, this.web3Client.send(txObject, options)];
                }
            });
        });
    };
    WithdrawManager.prototype.startExitWithBurntERC20Tokens = function (burnTxHash, options) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, txObject, _options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._buildPayloadForExit(burnTxHash)];
                    case 1:
                        payload = _a.sent();
                        txObject = this.erc20Predicate.methods.startExitWithBurntTokens(payload);
                        return [4 /*yield*/, this._fillOptions(options, txObject, this.web3Client.getParentWeb3())];
                    case 2:
                        _options = _a.sent();
                        if (options.encodeAbi) {
                            _options.data = txObject.encodeABI();
                            _options.to = this.erc20Predicate.options.address;
                            return [2 /*return*/, _options];
                        }
                        return [2 /*return*/, this.web3Client.send(txObject, _options)];
                }
            });
        });
    };
    WithdrawManager.prototype.startExitWithBurntERC721Tokens = function (burnTxHash, options) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, txObject, _options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._buildPayloadForExit(burnTxHash)];
                    case 1:
                        payload = _a.sent();
                        txObject = this.erc721Predicate.methods.startExitWithBurntTokens(payload);
                        return [4 /*yield*/, this._fillOptions(options, txObject, this.web3Client.getParentWeb3())];
                    case 2:
                        _options = _a.sent();
                        if (options.encodeAbi) {
                            _options.data = txObject.encodeABI();
                            _options.to = this.erc721Predicate.options.address;
                            return [2 /*return*/, _options];
                        }
                        return [2 /*return*/, this.web3Client.send(txObject, _options)];
                }
            });
        });
    };
    /**
     * Start an exit for a token that was minted and burnt on the side chain
     * Wrapper over contract call: [MintableERC721Predicate.startExitForMintableBurntToken](https://github.com/maticnetwork/contracts/blob/e2cb462b8487921463090b0bdcdd7433db14252b/contracts/root/predicates/MintableERC721Predicate.sol#L31)
     * @param burnTxHash Hash of the burn transaction on Matic
     * @param predicate address of MintableERC721Predicate
     */
    WithdrawManager.prototype.startExitForMintableBurntToken = function (burnTxHash, predicate, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, payload, mint, _predicate, txObject, _options;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._buildPayloadAndFindMintTransaction(burnTxHash)];
                    case 1:
                        _a = _b.sent(), payload = _a.payload, mint = _a.mint;
                        _predicate = new this.web3Client.parentWeb3.eth.Contract(MintableERC721Predicate_json_1.default.abi, predicate);
                        txObject = _predicate.methods.startExitForMintableBurntToken(payload, mint);
                        return [4 /*yield*/, this._fillOptions(options, txObject, this.web3Client.parentWeb3)];
                    case 2:
                        _options = _b.sent();
                        return [2 /*return*/, this.web3Client.send(txObject, _options)];
                }
            });
        });
    };
    /**
     * Start an exit for a token with metadata (token uri) that was minted and burnt on the side chain
     * Wrapper over contract call: [MintableERC721Predicate.startExitForMetadataMintableBurntToken](https://github.com/maticnetwork/contracts/blob/e2cb462b8487921463090b0bdcdd7433db14252b/contracts/root/predicates/MintableERC721Predicate.sol#L66)
     * @param burnTxHash Hash of the burn transaction on Matic
     * @param predicate address of MintableERC721Predicate
     */
    WithdrawManager.prototype.startExitForMetadataMintableBurntToken = function (burnTxHash, predicate, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, payload, mint, _predicate, txObject, _options;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._buildPayloadAndFindMintTransaction(burnTxHash)];
                    case 1:
                        _a = _b.sent(), payload = _a.payload, mint = _a.mint;
                        _predicate = new this.web3Client.parentWeb3.eth.Contract(MintableERC721Predicate_json_1.default.abi, predicate);
                        txObject = _predicate.methods.startExitForMetadataMintableBurntToken(payload, mint);
                        return [4 /*yield*/, this._fillOptions(options, txObject, this.web3Client.parentWeb3)];
                    case 2:
                        _options = _b.sent();
                        return [2 /*return*/, this.web3Client.send(txObject, _options)];
                }
            });
        });
    };
    WithdrawManager.prototype._buildPayloadAndFindMintTransaction = function (burnTxHash) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, burnReceipt, withdrawEvent, tokenId, contract, mintEvents, mintTxHash, mint, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this._buildPayloadForExit(burnTxHash)];
                    case 1:
                        payload = _c.sent();
                        return [4 /*yield*/, this.web3Client.web3.eth.getTransactionReceipt(burnTxHash)];
                    case 2:
                        burnReceipt = _c.sent();
                        withdrawEvent = burnReceipt.logs.find(function (l) { return l.topics[0].toLowerCase() === WithdrawManager.WITHDRAW_EVENT_SIG; });
                        tokenId = withdrawEvent.data;
                        logger.debug({ burnTxHash: burnTxHash, burnReceipt: burnReceipt, withdrawEvent: withdrawEvent, tokenId: tokenId });
                        contract = new this.web3Client.web3.eth.Contract(ChildERC721Mintable_json_1.default.abi, burnReceipt.to);
                        return [4 /*yield*/, contract.getPastEvents('Transfer', { filter: { tokenId: tokenId }, fromBlock: 0, toBlock: 'latest' })];
                    case 3:
                        mintEvents = _c.sent();
                        logger.debug({ mintEvents: mintEvents });
                        if (!mintEvents || !mintEvents.length) {
                            throw new Error('Could not retrieve the mint event');
                        }
                        mintTxHash = mintEvents.find(function (event) { return event.raw.topics[3] === tokenId; })
                            .transactionHash;
                        return [4 /*yield*/, this.web3Client.web3.eth.getTransaction(mintTxHash)];
                    case 4:
                        mint = _c.sent();
                        _b = (_a = ethereumjs_util_1.default).bufferToHex;
                        return [4 /*yield*/, proofs_js_1.default.getTxBytes(mint)];
                    case 5:
                        mint = _b.apply(_a, [_c.sent()]);
                        return [2 /*return*/, { payload: payload, mint: mint }];
                }
            });
        });
    };
    WithdrawManager.prototype._buildPayloadForExit = function (burnTxHash) {
        return __awaiter(this, void 0, void 0, function () {
            var lastChildBlock, burnTx, receipt, block, headerBlockNumber, headerBlock, blockProof, receiptProof;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rootChain.getLastChildBlock()];
                    case 1:
                        lastChildBlock = _a.sent();
                        return [4 /*yield*/, this.web3Client
                                .getMaticWeb3()
                                .eth.getTransaction(burnTxHash)];
                    case 2:
                        burnTx = _a.sent();
                        return [4 /*yield*/, this.web3Client
                                .getMaticWeb3()
                                .eth.getTransactionReceipt(burnTxHash)];
                    case 3:
                        receipt = _a.sent();
                        return [4 /*yield*/, this.web3Client
                                .getMaticWeb3()
                                .eth.getBlock(burnTx.blockNumber, true /* returnTransactionObjects */)];
                    case 4:
                        block = _a.sent();
                        logger.info({ 'burnTx.blockNumber': burnTx.blockNumber, lastCheckPointedBlockNumber: lastChildBlock });
                        assert_1.default.ok(new bn_js_1.default(lastChildBlock).gte(new bn_js_1.default(burnTx.blockNumber)), 'Burn transaction has not been checkpointed as yet');
                        return [4 /*yield*/, this.rootChain.findHeaderBlockNumber(burnTx.blockNumber)];
                    case 5:
                        headerBlockNumber = _a.sent();
                        return [4 /*yield*/, this.web3Client.call(this.rootChain
                                .getRawContract()
                                .methods.headerBlocks(this.encode(headerBlockNumber)))];
                    case 6:
                        headerBlock = _a.sent();
                        logger.info({ 'headerBlockNumber': headerBlockNumber.toString(), headerBlock: headerBlock });
                        return [4 /*yield*/, proofs_js_1.default.buildBlockProof(this.web3Client.getMaticWeb3(), headerBlock.start, headerBlock.end, burnTx.blockNumber)
                            // console.log('blockProof', blockProof)
                        ];
                    case 7:
                        blockProof = _a.sent();
                        return [4 /*yield*/, proofs_js_1.default.getReceiptProof(receipt, block, this.web3Client.getMaticWeb3())];
                    case 8:
                        receiptProof = _a.sent();
                        return [2 /*return*/, this._encodePayload(headerBlockNumber, blockProof, burnTx.blockNumber, block.timestamp, Buffer.from(block.transactionsRoot.slice(2), 'hex'), Buffer.from(block.receiptsRoot.slice(2), 'hex'), proofs_js_1.default.getReceiptBytes(receipt), // rlp encoded
                            receiptProof.parentNodes, receiptProof.path, 
                            // @todo logIndex can vary
                            1)];
                }
            });
        });
    };
    WithdrawManager.prototype._encodePayload = function (headerNumber, buildBlockProof, blockNumber, timestamp, transactionsRoot, receiptsRoot, receipt, receiptParentNodes, path, logIndex) {
        return ethereumjs_util_1.default.bufferToHex(ethereumjs_util_1.default.rlp.encode([
            headerNumber,
            buildBlockProof,
            blockNumber,
            timestamp,
            ethereumjs_util_1.default.bufferToHex(transactionsRoot),
            ethereumjs_util_1.default.bufferToHex(receiptsRoot),
            ethereumjs_util_1.default.bufferToHex(receipt),
            ethereumjs_util_1.default.bufferToHex(ethereumjs_util_1.default.rlp.encode(receiptParentNodes)),
            ethereumjs_util_1.default.bufferToHex(ethereumjs_util_1.default.rlp.encode(path)),
            logIndex,
        ]));
    };
    WithdrawManager.WITHDRAW_EVENT_SIG = '0x9b1bfa7fa9ee420a16e124f794c35ac9f90472acc99140eb2f6447c714cad8eb'.toLowerCase();
    return WithdrawManager;
}(ContractsBase_1.default));
exports.default = WithdrawManager;
