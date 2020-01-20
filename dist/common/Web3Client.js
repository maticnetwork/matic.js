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
var web3_1 = __importDefault(require("web3"));
var Web3Client = /** @class */ (function () {
    function Web3Client(parentProvider, maticProvider, parentDefaultOptions, maticDefaultOptions) {
        this.parentWeb3 = new web3_1.default(parentProvider);
        this.web3 = new web3_1.default(maticProvider);
        this.parentDefaultOptions = parentDefaultOptions;
        this.maticDefaultOptions = maticDefaultOptions;
    }
    Object.defineProperty(Web3Client.prototype, "wallet", {
        set: function (_wallet) {
            this.parentWeb3.eth.accounts.wallet.add(_wallet);
            this.web3.eth.accounts.wallet.add(_wallet);
        },
        enumerable: true,
        configurable: true
    });
    Web3Client.prototype.call = function (method, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, method.call(options || this.parentDefaultOptions)];
            });
        });
    };
    Web3Client.prototype._fillOptions = function (options, txObject, web3) {
        return __awaiter(this, void 0, void 0, function () {
            var _options, from, _a, gasLimit, gasPrice, nonce, chainId;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _options = options || this.parentDefaultOptions;
                        if (!_options.from)
                            return [2 /*return*/, new Error('from is not specified')];
                        from = _options.from;
                        delete txObject.chainId;
                        return [4 /*yield*/, Promise.all([
                                !(_options.gasLimit || _options.gas)
                                    ? txObject.estimateGas({ from: from, value: _options.value })
                                    : _options.gasLimit || _options.gas,
                                !_options.gasPrice ? web3.eth.getGasPrice() : _options.gasPrice,
                                !_options.nonce
                                    ? web3.eth.getTransactionCount(from, 'pending')
                                    : _options.nonce,
                                !_options.chainId ? web3.eth.net.getId() : _options.chainId,
                            ])];
                    case 1:
                        _a = _b.sent(), gasLimit = _a[0], gasPrice = _a[1], nonce = _a[2], chainId = _a[3];
                        return [2 /*return*/, {
                                from: from,
                                gas: gasLimit,
                                gasLimit: gasLimit,
                                gasPrice: gasPrice,
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
    Web3Client.prototype.wrapWeb3Promise = function (promise, options) {
        var _emptyFunc = function () { };
        return promise
            .on('transactionHash', options.onTransactionHash || _emptyFunc)
            .on('receipt', options.onReceipt || _emptyFunc)
            .on('error', options.onError || _emptyFunc);
    };
    Web3Client.prototype.callOnMatic = function (method, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, method.call(options || this.maticDefaultOptions)];
            });
        });
    };
    Web3Client.prototype.sendOnMatic = function (method, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _options;
            return __generator(this, function (_a) {
                _options = options || this.maticDefaultOptions;
                if (!_options.from)
                    return [2 /*return*/, new Error('from is not specified')];
                console.log('sending tx on matic with', _options);
                return [2 /*return*/, this.wrapWeb3Promise(method.send(_options), _options)];
            });
        });
    };
    Web3Client.prototype.send = function (txObject, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _options;
            return __generator(this, function (_a) {
                _options = options || {};
                // since we use the delegated proxy patterns, the following should be a good way to provide enough gas
                // apparently even when provided with a buffer of 20k, the call reverts. This shouldn't be happening because the actual gas used is less than what the estimation returns
                // providing higher buffer for now
                // @todo handle hex values of gas
                _options.gas = options.parent ? _options.gas + 1000000 : _options.gas;
                _options.gasPrice = options.parent ? _options.gasPrice : 0;
                return [2 /*return*/, this.wrapWeb3Promise(txObject.send(_options), _options)];
            });
        });
    };
    Web3Client.prototype.getParentWeb3 = function () {
        return this.parentWeb3;
    };
    Web3Client.prototype.getMaticWeb3 = function () {
        return this.web3;
    };
    Web3Client.prototype.setParentDefaultOptions = function (options) {
        this.parentDefaultOptions = options;
    };
    Web3Client.prototype.setMaticDefaultOptions = function (options) {
        this.maticDefaultOptions = options;
    };
    Web3Client.prototype.setParentProvider = function (provider) {
        this.parentWeb3 = new web3_1.default(provider);
    };
    return Web3Client;
}());
exports.default = Web3Client;
