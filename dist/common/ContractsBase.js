"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bn_js_1 = __importDefault(require("bn.js"));
var assert_1 = __importDefault(require("assert"));
var ContractsBase = /** @class */ (function () {
    function ContractsBase(web3Client) {
        this.web3Client = web3Client;
    }
    ContractsBase.prototype.encode = function (number) {
        if (bn_js_1.default.isBN(number)) {
            return '0x' + number.toString(16);
        }
        else if (typeof number === 'string') {
            assert_1.default.equal(number.slice(0, 2), '0x', 'expected a 0x prefixed string');
            return number;
        }
    };
    return ContractsBase;
}());
exports.default = ContractsBase;
