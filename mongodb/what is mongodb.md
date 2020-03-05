## DataBase

한 조직의 여러 응용 시스템들이 공용하기 위해  integrated, stored operational data  ㄴㄷㅅ



## DBMS

db관리를 위한 전용 시스템

• Open Source RDBMS: MySQL, PostgreSQL, Firebird, Cubrid

• Main-Memory(Real-time) DB : Altibase, TimesTen

• Embedded DB: SQLite, BerkeleyDB

• NoSQL: MongoDB, CouchDB, HBase, Cassandra, Redis...



## Mongodb

##### RDBMS와 차이

Database - Database

table - collectinos

rows - documents

columns - fields



## Mongoose

NodeJS용 MongoDB ODM 



| http   | path               | view  | description                   |
| ------ | ------------------ | ----- | ----------------------------- |
| GET    | /api/video         | index | list of video                 |
| GET    | /api/video/new     | new   | new form                      |
| POST   | /api/video         |       | create a new video            |
| GET    | /api/video/:id     | show  | show a spcific video          |
| GET    | /api/video/id/edit | edit  | edit from for a spcific video |
| PUT    | /api/video/Lid     |       | Update a spcific video        |
| DELETE | /api/video/:id     |       | Delete a sspcific video       |

