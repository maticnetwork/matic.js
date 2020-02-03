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
var DepositManager_1 = __importDefault(require("./root/DepositManager"));
var RootChain_1 = __importDefault(require("./root/RootChain"));
var Registry_1 = __importDefault(require("./root/Registry"));
var WithdrawManager_1 = __importDefault(require("./root/WithdrawManager"));
var Web3Client_1 = __importDefault(require("./common/Web3Client"));
var ContractsBase_1 = __importDefault(require("./common/ContractsBase"));
var Matic = /** @class */ (function (_super) {
    __extends(Matic, _super);
    function Matic(options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        var web3Client = new Web3Client_1.default(options.parentProvider, options.maticProvider, options.parentDefaultOptions || {}, options.maticDefaultOptions || {});
        _this = _super.call(this, web3Client) || this;
        _this.web3Client = web3Client;
        _this.registry = new Registry_1.default(options.registry, _this.web3Client);
        _this.rootChain = new RootChain_1.default(options.rootChain, _this.web3Client);
        _this.depositManager = new DepositManager_1.default(options.depositManager, _this.web3Client);
        _this.withdrawManager = new WithdrawManager_1.default(options.withdrawManager, _this.rootChain, _this.web3Client, _this.registry);
        return _this;
    }
    Matic.prototype.initialize = function () {
        return Promise.all([this.withdrawManager.initialize()]);
    };
    Matic.prototype.setWallet = function (_wallet) {
        this.web3Client.wallet = _wallet;
    };
    Matic.prototype.balanceOfERC20 = function (userAddress, token, options) {
        return __awaiter(this, void 0, void 0, function () {
            var balance;
            return __generator(this, function (_a) {
                if (options && (!token || !userAddress)) {
                    throw new Error('token address or user address is missing');
                }
                balance = this.getERC20TokenContract(token, options.parent).methods.balanceOf(userAddress).call();
                return [2 /*return*/, balance];
            });
        });
    };
    Matic.prototype.balanceOfERC721 = function (userAddress, token, options) {
        return __awaiter(this, void 0, void 0, function () {
            var balance;
            return __generator(this, function (_a) {
                if (options && (!token || !userAddress)) {
                    throw new Error('token address or user address is missing');
                }
                balance = this.getERC721TokenContract(token, options.parent).methods.balanceOf(userAddress).call();
                return [2 /*return*/, balance];
            });
        });
    };
    Matic.prototype.tokenOfOwnerByIndexERC721 = function (userAddress, token, index, options) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenID;
            return __generator(this, function (_a) {
                if (options && (!token || !userAddress)) {
                    throw new Error('token address or user address is missing');
                }
                tokenID = this.getERC721TokenContract(token, options.parent).methods.tokenOfOwnerByIndex(userAddress, index).call();
                return [2 /*return*/, tokenID];
            });
        });
    };
    Matic.prototype.transferERC20Tokens = function (token, to, amount, options) {
        return __awaiter(this, void 0, void 0, function () {
            var txObject, _options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (options && (!options.from || !amount || !token || !to)) {
                            throw new Error('options.from, to, token or amount is missing');
                        }
                        txObject = this.getERC20TokenContract(token, options.parent).methods.transfer(to, this.encode(amount));
                        return [4 /*yield*/, this._fillOptions(options, txObject, options.parent
                                ? this.web3Client.getParentWeb3()
                                : this.web3Client.getMaticWeb3())];
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
    Matic.prototype.transferERC721Tokens = function (token, to, tokenId, options) {
        return __awaiter(this, void 0, void 0, function () {
            var txObject, _options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (options && (!options.from || !tokenId || !token || !to)) {
                            throw new Error('options.from, to, token or tokenId is missing');
                        }
                        txObject = this.getERC721TokenContract(token, options.parent).methods.transferFrom(options.from, to, tokenId);
                        return [4 /*yield*/, this._fillOptions(options, txObject, options.parent
                                ? this.web3Client.getParentWeb3()
                                : this.web3Client.getMaticWeb3())];
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
    Matic.prototype.depositEther = function (amount, options) {
        if (options && (!options.from || !amount)) {
            throw new Error('options.from or amount is missing');
        }
        return this.depositManager.depositEther(amount, options);
    };
    Matic.prototype.depositDataByHash = function (txHash) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, depositReceipt, newDepositEvent, data, depositId, depositExists;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.registry.registry.methods.getChildChainAndStateSender().call()];
                    case 1:
                        _a.childChainAddress = _b.sent();
                        return [4 /*yield*/, this.web3Client.parentWeb3.eth.getTransactionReceipt(txHash)];
                    case 2:
                        depositReceipt = _b.sent();
                        if (!depositReceipt) {
                            return [2 /*return*/, 'Transaction hash is not Found'];
                        }
                        newDepositEvent = depositReceipt.logs.find(function (l) { return l.topics[0].toLowerCase() === DepositManager_1.default.NEW_DEPOSIT_EVENT_SIG; });
                        data = newDepositEvent.data;
                        depositId = parseInt(data.substring(data.length - 64), 16);
                        return [4 /*yield*/, this.depositManager.depositDataByID(depositId, this.childChainAddress)];
                    case 3:
                        depositExists = _b.sent();
                        if (!depositExists) {
                            return [2 /*return*/, 'Deposit is not processed on Matic chain'];
                        }
                        return [2 /*return*/, depositReceipt];
                }
            });
        });
    };
    Matic.prototype.approveERC20TokensForDeposit = function (token, amount, options) {
        if (options && (!options.from || !amount || !token)) {
            throw new Error('options.from, token or amount is missing');
        }
        return this.depositManager.approveERC20(token, amount, options);
    };
    Matic.prototype.depositERC20ForUser = function (token, user, amount, options) {
        if (options && (!options.from || !amount || !token)) {
            throw new Error('options.from, token or amount is missing');
        }
        return this.depositManager.depositERC20ForUser(token, amount, user, options);
    };
    Matic.prototype.safeDepositERC721Tokens = function (token, tokenId, options) {
        return __awaiter(this, void 0, void 0, function () {
            var txObject, _options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (options && (!options.from || !tokenId || !token)) {
                            throw new Error('options.from, token or tokenId is missing');
                        }
                        txObject = this.getERC721TokenContract(token, true).methods.safeTransferFrom(options.from, this.depositManager.getAddress(), tokenId);
                        return [4 /*yield*/, this._fillOptions(options, txObject, this.web3Client.getParentWeb3())];
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
    Matic.prototype.startWithdraw = function (token, amount, options) {
        this._validateInputs(token, amount, options);
        return this.withdrawManager.burnERC20Tokens(token, amount, options);
    };
    Matic.prototype.startWithdrawForNFT = function (token, tokenId, options) {
        this._validateInputs(token, tokenId, options);
        return this.withdrawManager.burnERC721Token(token, tokenId, options);
    };
    Matic.prototype.withdraw = function (txHash, options) {
        if (!txHash) {
            throw new Error("txHash not provided");
        }
        if (options && !options.from) {
            throw new Error("options.from is missing");
        }
        return this.withdrawManager.startExitWithBurntERC20Tokens(txHash, options);
    };
    Matic.prototype.withdrawNFT = function (txHash, options) {
        if (!txHash) {
            throw new Error("txHash not provided");
        }
        if (options && !options.from) {
            throw new Error("options.from is missing");
        }
        return this.withdrawManager.startExitWithBurntERC721Tokens(txHash, options);
    };
    Matic.prototype.processExits = function (tokenAddress, options) {
        return this.withdrawManager.processExits(tokenAddress, options);
    };
    Matic.prototype._validateInputs = function (token, amountOrTokenId, options) {
        if (!this.web3Client.web3.utils.isAddress(this.web3Client.web3.utils.toChecksumAddress(token))) {
            throw new Error(token + " is not a valid token address");
        }
        if (!amountOrTokenId) {
            // ${amountOrTokenId} will stringify it while printing which might be a problem
            throw new Error(amountOrTokenId + " is not a amountOrTokenId");
        }
        if (options && !options.from) {
            throw new Error("options.from is missing");
        }
    };
    return Matic;
}(ContractsBase_1.default));
exports.default = Matic;
