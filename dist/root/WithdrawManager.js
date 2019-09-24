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
var WithdrawManager_json_1 = __importDefault(require("matic-protocol/contracts-core/artifacts/WithdrawManager.json"));
var proofs_js_1 = __importDefault(require("matic-protocol/contracts-core/helpers/proofs.js"));
var ChildERC20_json_1 = __importDefault(require("matic-protocol/contracts-core/artifacts/ChildERC20.json"));
var ERC20Predicate_json_1 = __importDefault(require("matic-protocol/contracts-core/artifacts/ERC20Predicate.json"));
var bn_js_1 = __importDefault(require("bn.js"));
var ContractsBase_1 = __importDefault(require("../common/ContractsBase"));
var assert_1 = __importDefault(require("assert"));
var ethereumjs_util_1 = __importDefault(require("ethereumjs-util"));
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
            var erc20PredicateAddress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.registry.registry.methods.erc20Predicate().call()];
                    case 1:
                        erc20PredicateAddress = _a.sent();
                        console.log('erc20PredicateAddress', erc20PredicateAddress);
                        this.erc20Predicate = new this.web3Client.parentWeb3.eth.Contract(ERC20Predicate_json_1.default.abi, erc20PredicateAddress);
                        return [2 /*return*/];
                }
            });
        });
    };
    WithdrawManager.prototype.burnERC20Tokens = function (token, amount, options) {
        return this.web3Client.sendOnMatic(this._getERC20TokenContract(token).methods.withdraw(this.encode(amount)), options);
    };
    WithdrawManager.prototype.startExitWithBurntERC20Tokens = function (burnERC20TxHash, options) {
        return __awaiter(this, void 0, void 0, function () {
            var lastChildBlock, burnTx, receipt, block, headerBlockNumber, headerBlock, blockProof, receiptProof, payload;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rootChain.getLastChildBlock()];
                    case 1:
                        lastChildBlock = _a.sent();
                        return [4 /*yield*/, this.web3Client.getMaticWeb3().eth.getTransaction(burnERC20TxHash)];
                    case 2:
                        burnTx = _a.sent();
                        return [4 /*yield*/, this.web3Client.getMaticWeb3().eth.getTransactionReceipt(burnERC20TxHash)];
                    case 3:
                        receipt = _a.sent();
                        return [4 /*yield*/, this.web3Client.getMaticWeb3().eth.getBlock(burnTx.blockNumber, true /* returnTransactionObjects */)];
                    case 4:
                        block = _a.sent();
                        console.log('burnTx.blockNumber', burnTx.blockNumber, 'lastChildBlock', lastChildBlock);
                        assert_1.default.ok(new bn_js_1.default(lastChildBlock).gt(new bn_js_1.default(burnTx.blockNumber)), 'Burn transaction has not been checkpointed as yet');
                        return [4 /*yield*/, this.rootChain.findHeaderBlockNumber(burnTx.blockNumber)];
                    case 5:
                        headerBlockNumber = _a.sent();
                        return [4 /*yield*/, this.web3Client.call(this.rootChain.getRawContract().methods.headerBlocks(this.encode(headerBlockNumber)))];
                    case 6:
                        headerBlock = _a.sent();
                        console.log('headerBlockNumber', headerBlockNumber.toString(), 'headerBlock', headerBlock);
                        return [4 /*yield*/, proofs_js_1.default.buildBlockProof(this.web3Client.getMaticWeb3(), 
                            // '218278',
                            // '218279',
                            headerBlock.start, headerBlock.end, burnTx.blockNumber)];
                    case 7:
                        blockProof = _a.sent();
                        console.log('blockProof', blockProof);
                        return [4 /*yield*/, proofs_js_1.default.getReceiptProof(receipt, block, this.web3Client.getMaticWeb3())];
                    case 8:
                        receiptProof = _a.sent();
                        payload = this.buildPayload(headerBlockNumber, blockProof, burnTx.blockNumber, block.timestamp, Buffer.from(block.transactionsRoot.slice(2), 'hex'), Buffer.from(block.receiptsRoot.slice(2), 'hex'), proofs_js_1.default.getReceiptBytes(receipt), // rlp encoded
                        receiptProof.parentNodes, receiptProof.path, 1 // logIndex
                        );
                        console.log('payload', payload);
                        return [2 /*return*/, this.web3Client.send(this.erc20Predicate.methods.startExitWithBurntTokens(payload), options)];
                }
            });
        });
    };
    WithdrawManager.prototype.buildPayload = function (headerNumber, buildBlockProof, blockNumber, timestamp, transactionsRoot, receiptsRoot, receipt, receiptParentNodes, path, logIndex) {
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
            logIndex
        ]));
    };
    WithdrawManager.prototype._getERC20TokenContract = function (token) {
        return new this.web3Client.web3.eth.Contract(ChildERC20_json_1.default.abi, token);
    };
    return WithdrawManager;
}(ContractsBase_1.default));
exports.default = WithdrawManager;
