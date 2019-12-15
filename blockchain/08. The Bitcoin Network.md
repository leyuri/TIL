본 내용은 모두 Mastering Bitcoin 2nd.pdf 에 기반하였음



## Introduction

- Bitcoin peer to peer network
- P2P networks are resilient, decentralized



## Node Types and Roles

- Routing, the blockchain databases, mining, wallet services
- Full node
- Lightweight node/SPv
- Mining node
- Wallets



## The Extended Bitcoin Network

- Reference Client(Bitcoin Core)
- Full BlockChain Node
- Solo Miner
- Lightweight wallet
- Poll Protocol Servers
- Mining Nodes
- Lightweight Startum wallet



## Bitcoin Relay Networks

- bitcoin P2P network : high network latency....

- attempts to minimize the latency in the transmission of blocks between miners

- Cut-through-routing

- Relay networks are not replacements for bitcoin’s P2P network



## Network DIscovery

- handshake
- DNS seeds, option swith -dnsseed
- a bootstrapping node knows at least one bitcoin 
- paths are not reliable
- getpeerinfo
- connect=<IPAddress>



## Full Nodes

Full nodes are nodes that maintain a full blockchain with all transactions



## Exchanging "Inventory"

peered nodes will exchange a getblocks message



## SPV Node

- Without storing the full blockchain

- only the block headers
- getheader message
- a merkle path
- six block, depth
- SPV node needs to connect randomly to several nodes, to increase the probability that it is in contact with at least one honest node
- Privacy risk



## Bloom Filters

- a probabilistic search filter

- The SPV node will then make a list of all the addresses, keys, and hashes that it is interested in.

  

## Encrypted and Authenticated Connections

- Tor Transport



## Transaction Pools

- unconfirmed transactions called the memory pool, mempool, or transaction pool
- the transaction and orphan pools only contain unconfirmed transactions, while the UTXO pool only contains confirmed outputs.