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
var DepositManager_json_1 = __importDefault(require("../artifacts/DepositManager.json"));
var bn_js_1 = __importDefault(require("bn.js"));
var assert_1 = __importDefault(require("assert"));
var DepositManager = /** @class */ (function () {
    function DepositManager(depositManagerContractAddress, _parentWeb3, _defaultOptions) {
        this.depositManagerContract = new _parentWeb3.eth.Contract(DepositManager_json_1.default.abi, depositManagerContractAddress);
        this._defaultOptions = _defaultOptions || {};
    }
    // setDepositManagerAddress(depositManagerContractAddress: address) {
    //   this.depositManagerContract.options.address = depositManagerContractAddress
    // }
    DepositManager.prototype.depositERC20 = function (token, amount, options) {
        return this._send(this.depositManagerContract.methods.depositERC20(token, this.encode(amount)), options);
    };
    DepositManager.prototype.depositERC721 = function (token, tokenId, options) {
        return this._send(this.depositManagerContract.methods.depositERC721(token, tokenId), options);
    };
    DepositManager.prototype.depositBulk = function (tokens, amountOrTokenIds, user, options) {
        return this._send(this.depositManagerContract.methods.depositBulk(tokens, amountOrTokenIds, user), options);
    };
    DepositManager.prototype.depositERC20ForUser = function (token, amount, user, options) {
        return this._send(this.depositManagerContract.methods.depositERC20ForUser(token, user, amount), options);
    };
    DepositManager.prototype.depositERC721ForUser = function (token, tokenId, user, options) {
        return this._send(this.depositManagerContract.methods.depositERC721ForUser(token, user, tokenId), options);
    };
    DepositManager.prototype.depositEther = function (amount, options) {
        if (options === void 0) { options = {}; }
        return this._send(this.depositManagerContract.methods.depositEther(), Object.assign(options, { value: amount }));
    };
    DepositManager.prototype.getAddress = function () {
        return this.depositManagerContract.options.address;
    };
    DepositManager.prototype.setDefaultOptions = function (_defaultOptions) {
        this._defaultOptions = _defaultOptions;
    };
    DepositManager.prototype.encode = function (number) {
        if (bn_js_1.default.isBN(number)) {
            return '0x' + number.toString(16);
        }
        else if (typeof number === 'string') {
            assert_1.default.equal(number.slice(0, 2), '0x', 'expected a 0x prefixed string');
            return number;
        }
    };
    DepositManager.prototype._send = function (method, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _options, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _options = options || this._defaultOptions;
                        // since we use the delegated proxy patterns, the following should be a good way to provide enough gas
                        // apparently even when provided with a buffer of 20k, the call reverts. This shouldn't be happening because the actual gas used is less than what the estimation returns
                        // providing higher buffer for now
                        _a = _options;
                        return [4 /*yield*/, method.estimateGas()];
                    case 1:
                        // since we use the delegated proxy patterns, the following should be a good way to provide enough gas
                        // apparently even when provided with a buffer of 20k, the call reverts. This shouldn't be happening because the actual gas used is less than what the estimation returns
                        // providing higher buffer for now
                        _a.gas = (_b.sent()) + 200000;
                        return [2 /*return*/, method.send(_options)];
                }
            });
        });
    };
    return DepositManager;
}());
exports.default = DepositManager;
