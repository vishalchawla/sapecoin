import Blockchain from "./blockchain";
import Transaction from "./transaction";

const sapeCoin = new Blockchain();
console.log(
  "================================== INITIALIZING SAPEC@IN =================================="
);

// Print initial chain
console.log(JSON.stringify(sapeCoin, null, 4));

// Creating dummy transactions
const txn1 = new Transaction("John", "Jane", 1000);
const txn2 = new Transaction("Jane", "Robert", 500);
const txn3 = new Transaction("Robert", "Jack", 250);

sapeCoin.addTransaction(txn1);
sapeCoin.addTransaction(txn2);
sapeCoin.addTransaction(txn3);
console.log(JSON.stringify(sapeCoin, null, 4));

// Mining block
sapeCoin.mineQueuedTransactions("Vishal");
console.log(JSON.stringify(sapeCoin, null, 4));

// Print all balances
console.log(
  "**************************************************** Balance Report ****************************************************"
);
console.log(JSON.stringify(sapeCoin.getWalletReport(), null, 4));

// Check chain validity
console.log(
  `Is Chain Valid? - ${sapeCoin.isChainValid() ? "VALID" : "INVALID"}`
);

// Tamper chain data
sapeCoin.chain[1].transactions[1].amount = 5000;
console.log(JSON.stringify(sapeCoin, null, 4));

// Check chain validity
console.log(
  `Is Chain Valid? - ${sapeCoin.isChainValid() ? "VALID" : "INVALID"}`
);
