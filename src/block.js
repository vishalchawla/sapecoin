const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(ts, transactions, previousHash = "") {
    this.previousHash = previousHash;
    this.transactions = transactions;
    this.hash = this.getHash();
    this.nonce = 0;
    this.timestamp = ts;
  }

  getHash() {
    const hash = SHA256(
      this.previousHash +
        JSON.stringify(this.transactions) +
        this.timestamp +
        this.nonce
    ).toString();

    return hash;
  }

  mine(difficulty) {
    console.log("Initializing block mining");

    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      const newHash = this.getHash();
      this.hash = newHash;
      console.log(newHash);
    }

    console.log(`Block successfully mined: ${this.hash}`);
  }
}

export default Block;
