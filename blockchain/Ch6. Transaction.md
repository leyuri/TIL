본 내용은 모두 Mastering Bitcoin 2nd.pdf 에 기반하였음





## Transaciton

A transaction from Alice’s address to Bob’s address 



## Transaction Outputs and Inputs

- The fundamental building block of bitcoin transaction is a transaction output

  무조건 아웃풋이 먼저

- Bitcoin full nodes track UTXO(UTXO : unspent transaction output)

- Every transaction represents a change in the UTXO set

- A user's bitcoin balance is the sum of all UTXO that user's wallet can spend

- Outputs are discrete and indivisible units of value

- The bitcoin application can user several stategie to satisfy the purchase amount

- This choice is done by the user's wallet automatically and is invisible to user

- A transaction consumes previously recorded UXTO and creates new transaction output



- coinbase transaction

  - special type of transaction

  - the first transaction in each block

  - placed there by the winning miner

  - a reward for miming

  - not consume UTXO

    

## Transaction Outputs

- New transactions consume one or more of outputs from the UTXO set
- Transaction output consists of two parts
  - amount of bitcoin
  - cryptographic puzzle
    - Determine the conitions required to spend the output
    - locking script or witness script or scriptPubkey

- Outputs are in an array named vout
- Each output is defined by a value and a cryptographic puzzle
- value is recorded as an integer denominated in sathshis



## Transaction serialization - outputs

- When transactions are transmitted over the network, they are serialized
- deserialization



## Transaction Inputs

- Transaction inputs identify which UTXO will be consumed and provide proof of ownership through an unlocking script
- contains four elemnets
  - transactionID
  - output index(vout)
  - scriptSig
  - sequence number
- we don't know anything about that UTXO
  - except transaction'sid
  - So, we must also use the referenced UTXO in order to get the information and calculate the fee that will be paid in this transaction
- Anytime you decode a transaction, your code first have to retrieve the referenced UXTO from the blockchain 

## Transaction serialization - Inputs



## Transaction Fees

- Most transactions include fees, which compensate the bitcoin miners for securing the network

- Most wallet caculate and include transaction fee automatically

- Transaction fees are calculated based on the size of the transaction in kilobytes

- Transaction fees are not mandatory

  - however, including transaction fees encourages priority processing...

    

## Adding Fees to Transaction

- Fees = Sum(Inputs) - Sum(Outputs)



## Transaction Scripts and Script Language

- Bitcoin transaction script and script language
  - locking script(placed on UTXO)
  - Unlocking script(in each input)
- Trnasaction scripts
  - Turing Incompleteness
  - Stateless Verification
- Script Construction(Lock + Unlock)
- Locking Script(scriptPubkey/cryptographic puzzle)
- Unlocking Script(scriptSig)
- The script execution stack
  - Bitcoin's scripting language is called a stack-based language

 

Unlocking Script(scriptSig)

<sig><PubK>

Locking Script(scriptPubKey)

DUP HASH160 <PubkHasg>......



## Pay-to-Public-key-Hash

- The vast majority of transactions processed on the bitcoin network spend outputs locked with a pay-to-public-hash or "P2PKH" script

- These outputs contain a locking script that locks the output to a public key hash, more commonly known as a bitcoin address

- An output locked by a P2PKH script can be unlocked(spent) by presenting a public key and a digital signature created by presenting private key

  여기..이해가 안된다...P2PKH 스크립트로 락된 아웃풋은 풀릴 수 있음..

  퍼블릭키와 디지털 시그니처로...?아 알겠다 ㅋㅋ ㅜ



## Digital Signatures(ECDSA)

- How digital signatures work and how they can present proof of ownership of a private key without revealing that private key

  오호라..

- A digital signature servers three purposes in bitcoin

  - proves that the owner of the private key

  - the proof of authorization is undeniable(nonrepudiation)

    부인방지..이메일 같은 곳에서 많이 쓴다고 하네

  - the signature proves that the transaction have not and cannot be modified by anyone after it has been signed

    메세지가 위조되지 않았음을 증명한다. 

    트랜잭션의 메시지를 넣어 만드는데...이 트랜잭션이 언제 어느 시점의 트랜잭션인가?

    이게 중요한 키포인트 중 하나였음....

- Each transaction input and any signature it may contain is completely independent of any other input or signature 



## How Digital Signatures Work

- Creating a digital signature
  - the "message" being signed is the transaction, or more accurately a hash of a specific subset of the data in the transaction
  - The signing key is the users private key