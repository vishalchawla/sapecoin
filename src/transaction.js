const SHA256 = require("crypto-js/sha256");

class Transaction {
  constructor(from, to, amount) {
    this.from = from;
    this.to = to;
    this.amount = amount;
    this.timestamp = Date.now();
  }
}

export default Transaction;
