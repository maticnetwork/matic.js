"use strict";
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
var bn_js_1 = __importDefault(require("bn.js"));
var ChildERC20_json_1 = __importDefault(require("matic-protocol/contracts-core/artifacts/ChildERC20.json"));
var ChildERC721_json_1 = __importDefault(require("matic-protocol/contracts-core/artifacts/ChildERC721.json"));
var ContractsBase = /** @class */ (function () {
    function ContractsBase(web3Client) {
        this.web3Client = web3Client;
    }
    ContractsBase.prototype.encode = function (number) {
        if (typeof number === 'number') {
            number = new bn_js_1.default(number);
        }
        else if (typeof number === 'string') {
            if (number.slice(0, 2) === '0x')
                return number;
            number = new bn_js_1.default(number);
        }
        if (bn_js_1.default.isBN(number)) {
            return '0x' + number.toString(16);
        }
    };
    ContractsBase.prototype.getERC20TokenContract = function (token, parent) {
        if (parent === void 0) { parent = false; }
        var web3 = parent ? this.web3Client.parentWeb3 : this.web3Client.web3;
        return new web3.eth.Contract(ChildERC20_json_1.default.abi, token);
    };
    ContractsBase.prototype.getERC721TokenContract = function (token, parent) {
        if (parent === void 0) { parent = false; }
        var web3 = parent ? this.web3Client.parentWeb3 : this.web3Client.web3;
        return new web3.eth.Contract(ChildERC721_json_1.default.abi, token);
    };
    ContractsBase.prototype._fillOptions = function (options, txObject, web3) {
        return __awaiter(this, void 0, void 0, function () {
            var from, _a, gasLimit, gasPrice, nonce, chainId;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        delete txObject.chainId;
                        from = options.from;
                        if (!from) {
                            throw new Error('`from` required in options or set wallet using maticObject.wallet = <private key>');
                        }
                        return [4 /*yield*/, Promise.all([
                                !(options.gasLimit || options.gas)
                                    ? txObject.estimateGas({ from: from, value: options.value })
                                    : options.gasLimit || options.gas,
                                !options.gasPrice ? web3.eth.getGasPrice() : options.gasPrice,
                                !options.nonce
                                    ? web3.eth.getTransactionCount(from, 'pending')
                                    : options.nonce,
                                !options.chainId ? web3.eth.net.getId() : options.chainId,
                            ])];
                    case 1:
                        _a = _b.sent(), gasLimit = _a[0], gasPrice = _a[1], nonce = _a[2], chainId = _a[3];
                        return [2 /*return*/, {
                                from: from,
                                gas: this.encode(gasLimit),
                                gasPrice: this.encode(gasPrice),
                                nonce: nonce,
                                chainId: chainId,
                                value: options.value || 0,
                                to: options.to || null,
                                data: options.data,
                            }];
                }
            });
        });
    };
    ContractsBase.prototype.wrapWeb3Promise = function (promise, options) {
        var _emptyFunc = function () { };
        return promise
            .on('transactionHash', options.onTransactionHash || _emptyFunc)
            .on('receipt', options.onReceipt || _emptyFunc)
            .on('error', options.onError || _emptyFunc);
    };
    return ContractsBase;
}());
exports.default = ContractsBase;
