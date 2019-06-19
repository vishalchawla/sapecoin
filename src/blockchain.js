import Transaction from "./transaction";
import Block from "./block";

class Blockchain {
  constructor() {
    this.chain = [this.getGenesisBlock()];
    this.transactionsQueue = [];
    this.miningReward = 10;
    this.difficulty = 4;
  }

  getGenesisBlock() {
    // Adding a transaction to provide 1000 test coins to John
    const initialTransaction = {
      from: "SapeCoin",
      to: "John",
      amount: 1000
    };
    return new Block(Date.parse("2019-06-20"), [initialTransaction], "0");
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  mineQueuedTransactions(miningRewardAddress) {
    const rewardTx = new Transaction(
      "SapeCoin",
      miningRewardAddress,
      this.miningReward
    );
    this.transactionsQueue.push(rewardTx);

    let block = new Block(
      Date.now(),
      this.transactionsQueue,
      this.getLastBlock().hash
    );
    block.mine(this.difficulty);

    console.log("Block successfully mined!");
    this.chain.push(block);
    this.transactionsQueue = [];
  }

  addTransaction(transaction) {
    if (!transaction.from || !transaction.to) {
      throw new Error("Transaction must include both from and to addresses.");
    }

    if (transaction.amount <= 0) {
      throw new Error("Transaction amount should be greater than 0");
    }

    this.transactionsQueue.push(transaction);
  }

  getWalletReport(address) {
    const balances = {};

    for (const block of this.chain) {
      for (const trans of block.transactions) {
        balances[trans.from] = (balances[trans.from] || 0) - trans.amount;
        balances[trans.to] = (balances[trans.to] || 0) + trans.amount;
      }
    }

    return balances;
  }

  isChainValid() {
    const realGenesis = JSON.stringify(this.getGenesisBlock());

    if (realGenesis !== JSON.stringify(this.chain[0])) {
      console.log(realGenesis, JSON.stringify(this.chain[0]));
      return false;
    }

    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previosBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.getHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previosBlock.hash) {
        return false;
      }
    }

    return true;
  }
}

export default Blockchain;
