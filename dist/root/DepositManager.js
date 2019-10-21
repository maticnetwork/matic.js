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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DepositManager_json_1 = __importDefault(require("matic-protocol/contracts-core/artifacts/DepositManager.json"));
var ContractsBase_1 = __importDefault(require("../common/ContractsBase"));
var DepositManager = /** @class */ (function (_super) {
    __extends(DepositManager, _super);
    function DepositManager(depositManager, web3Client) {
        var _this = _super.call(this, web3Client) || this;
        _this.depositManagerContract = new _this.web3Client.parentWeb3.eth.Contract(DepositManager_json_1.default.abi, depositManager);
        return _this;
    }
    DepositManager.prototype.depositERC20 = function (token, amount, options) {
        return this.web3Client.send(this.depositManagerContract.methods.depositERC20(token, this.encode(amount)), options);
    };
    DepositManager.prototype.depositERC721 = function (token, tokenId, options) {
        return this.web3Client.send(this.depositManagerContract.methods.depositERC721(token, tokenId), options);
    };
    DepositManager.prototype.depositBulk = function (tokens, amountOrTokenIds, user, options) {
        return this.web3Client.send(this.depositManagerContract.methods.depositBulk(tokens, amountOrTokenIds, user), options);
    };
    DepositManager.prototype.depositERC20ForUser = function (token, amount, user, options) {
        return this.web3Client.send(this.depositManagerContract.methods.depositERC20ForUser(token, user, this.encode(amount)), options);
    };
    DepositManager.prototype.depositERC721ForUser = function (token, tokenId, user, options) {
        return this.web3Client.send(this.depositManagerContract.methods.depositERC721ForUser(token, user, tokenId), options);
    };
    DepositManager.prototype.depositEther = function (amount, options) {
        if (options === void 0) { options = {}; }
        return this.web3Client.send(this.depositManagerContract.methods.depositEther(), Object.assign(options, { value: amount }));
    };
    DepositManager.prototype.getAddress = function () {
        return this.depositManagerContract.options.address;
    };
    return DepositManager;
}(ContractsBase_1.default));
exports.default = DepositManager;
