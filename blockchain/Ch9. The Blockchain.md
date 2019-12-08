본 내용은 모두 Mastering Bitcoin 2nd.pdf 에 기반하였음



## Introduction

- Blocks are linked "back", each referring to the previous block in the chain.

  - vertical stack
  - height
  - Top or tip

- Each block within the blockchain is identified by a hash

- a block has just one parent, it can temporarily have multiple children

  

## Structure of Block

- A block is a container data structure that aggregates transactions for inclusion in the publick ledger, the blockchain.
- average transaction is at least 250 bytes
- average block contains more than 500 transactions



## Block Header

- previous block hash
- matadata
  - difficulty, timestamp,nonce
- merkle tree root



## Block Identifiers

- The primary identifier of a block is its cryptographic hash, a digital finger print, made by hasing the block header twice through the SHA256 algorithm
- The block hash is not included inside the block's data structure.
- way to identify a block is block height.



## The Genesis Block

- the first block in the blockchain 
- if you start at any block and follow the chain backward in time, you will eventually arrive at the genesis block
- every node always knows the genesis block's hash and structure



## Linking Blocks in the Blockchain

- As a node receives incoming blocks from the network, it will valid ate these blockes and then link them to the existing blockchain

  

## Merkel Tree

- Each block in the bitcoin blockchain contains a summary of all the transactions in the block using a merkle tree

- aslo known as a binary hash tree

- They are used in bitcoin to summarize all the transactions in a block, producing an overall digital fingerprint of the entire set of transactions, providing a very efficient process to verify whether a transaction is included in a block

- Merkle trees is SHA256 applied twice, also known as double-SHA256

- The merkel tree is a binary tree, it needs an even number of leaf nodes

  ![image-20191209001015906](/Users/yuri/Library/Application Support/typora-user-images/image-20191209001015906.png)



- To prove that a specific transaction is included in a block, a node only needs to produce log2(N) 32-byte hashes, constituting an authentication path or merkle path connecting the specific transaction to the root of the tree
- In Figure 9-5, a node can prove that a transaction K is included in the block by producing a merkle path is only four 32-byte hhashes long (128 bytes total)

![image-20191209001343080](/Users/yuri/Library/Application Support/typora-user-images/image-20191209001343080.png)



## Simplified Payment Verification(SPV) Nodes

- SPV node or Lightweight clients
  - Operate without the full blockchain
  - Download only the block headers



## Bitcoin's Test Blockchains

- Testnet
- Regtest



##### 	비트코인 테스트 모드

- Testnet: 인터넷상에서 동작하는 테스트 네트워크. 테스트용 BTC를 사용하지만 처음 시작할 때 Testnet에 있는 모든 블럭을 동기화해야 한다.

- Regtest: 로컬PC 내에서 동작하는 테스트 네트워크. 개인PC 내에서만 계정을 만들거나 채굴할 수 있고 블럭체인 초기화도 쉽게 때문에 테스트로 사용하기에 적합하다.

  (https://steemit.com/bitcoin/@yellowpen/bitcoin-bitcoin-core)