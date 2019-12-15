본 내용은 모두 Mastering Bitcoin 2nd에 기반하였음



## Introduction

- multisignature scripts
- pay to script hash
- timelocks



## Multisignature

- set a condition where N public keys are recorded in the script and at least M of those must provide signatures to unlock the funds.
- M-of-N scheme
  - N is the total number of keys 
  - M is the threshold of signatures required for vaildation
  - 

## Multisignature - Locing script

2-of-3 multisignature looks like this:

2 <public key A><public key B><public key C> 3 CHECKMULTISIG

이것 자체가 locking script !



## Multisignature - Locing script

<Signature B> <Signature C>



## Multisignature - Validation

- If the unlocking script matches the conditions set by the locking script, this combined script will evaluate to TRUE



## Multisignature – A bug in CHECKMULTISIG(1)

일종의 opcode 오류로 그냥 앞에 0을 추가해주는 것임...



## Pay-to-Script-Hash (P2SH) – Introduction

사이즈가 매우 커서..송신자의 부담이 너무 커진다..그냥 redeem script를 위한 짧은 소개인 듯ㅋㅋ

## Pay-to-Script-Hash (P2SH) – Redeem Script 

- This shifts the burden in fees and complexity from the sender to the recipient (spender) of the transaction



## P2SH Addresses – Introduction(1)

- P2SH addresses are Base58Check encodings of the 20byte hash of a script, just like bitcoin addresses are Base58Check encodings of the 20byte hash of a public key.
- P2SH addresses use the version prefix “5,” which results in Base58Check-encoded addresses that start with a “3.”



## P2SH Addresses - Benefits

- 빗코인 어드레스 만드는 것과 똑같이 만들 수 있음
- 받는 사람한테 부담을 부과할 수 있음
- data storage 측면에서도 우수
- 엘리스가 밥한테 줄 때라고 가정, 밥이 받을 때 해당하는 수수료를 내는 게 아니라, 그 유티엑스오를 사용할 때 해당되는 수수료를 내게 하는 것, 즉 UTXO를 쓰는 쪽에서 사용할 수 있도록?.......음? 나중에 다시 읽어보도록....

## P2SH Addresses - Loss

엉터리 해쉬 만들 가능성 충분히 있음. 진짜 나쁘네ㅠ



## Data Recording Output (RETURN)

- a fake payment
- Bloat



## Timelocks

- Timelocks are restrictions on transactions or outputs that only allow spending after a point in time

- Two new timelock features were introduced(UTXO-level timelocks)

  - CHECKLOCKTIMEVERIFY

  - CHECKSEQUENCEVERIFY



## Transaction Locktime(nLocktime)

- 0(zero)
- 1 ~ 500 million
- above 500 million



## Transaction Locktime Limitation

nLocktime has the limitation that while it makes it possible to spend some outputs in the future..

But...there is no guarantee that Bob will get the funds

n은 트랜잭션 넘버임.



## Check Lock Time Verify(CLTV)

- CLTV is a per-output timelock, rather than a per-transaction timelock as is the case with nLocktime 

  유티엑스오 자체에 락을 걸어놓음

- < exprity time>CHECKLOCVKTIMEVERIFY DROP 



## Relative Timelocks

- nLocktime, CLTV -> absolute timelock
- relative time locks, elaspsed time from the  confirmation of the output in the blockchain  상대적으로 지정할 수 있음. 조건에 맞는 트랜잭션이 올라오면, 그것의 300프레임의 뒤 이런 형식으로 지정할 수 있다! 근데 이 트랜잭션이 언제 올라올지는 모름. 그래서 상대적으로 하는 것이다
- UTXO 가 마이닝 된 순간 부터, 마이닝 된 순간부터를 릴레이티브 타임록이라고 한다. 
- transation-leavel feature & a script-level feature



## Relative Timelocks with nSequence original meaning of nSequence

- nSequence is transaction-level reative timelock and can be set in every transaction input
- 맨풀 안에 올라간 트랜잭션의 시퀀스 값을 고칠 수 있게 만들어놨음-> 유효, 유효하지 않음을 검증



## nSequence as a consensus-enforced relative timelock

- since BIP-68  
- Transaction containing an input whose nSequence value is less than 2^31
- A transaction can include both imelocked inputs(nSequence<2^31) and inputs without a relative timelock(nSequence >= 2^31)
- Type-flag is set -> a multiple of 512 seconds
- Type-flag is not set -> a number of blocks



## Relative Timelock with CSV

- a script opcode for relative timelocks that leverages the nSequence value in scripts
- CHECKSQUENCEVERITY(CSV)
- it is useful when several transactions are created and signed, but not propagated, when they're kept "off-chain"

## Median-Time-Past

- The timestamps set in block headers are set by the miners.

  마이너가 타임으로 거짓말을 해 수수료를 챙길 수도 있다

- 따라서 지난 11개 블록을 통해 중간값을 구한다

- The consensus time calculated by Median-Time-Past is always approximately one behind wall clock time. if you create timelock transactions, you should account for it when estimating the desired value to encode in nLocktime, nSequence, CLTB, and CSV.

  오차가 생길 수 있으므로 이 값을 생각해서 타임락을 걸어 놓는다



## Timelock Defense Against Fee Sniping

- Bitcoin Core sets the nLocktime on all new transactions to <current block # +1> 

  원천적으로 막을 수 있게 이렇게 세팅해놓는다



## Script with Flow Control:Conditional Clausues

- Bitcoin Script is a stack language
- Verify suffix acts as a guard clause
- If clause