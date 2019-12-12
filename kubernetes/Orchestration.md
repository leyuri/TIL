본 내용은 https://subicura.com/2017/02/25/container-orchestration-with-docker-swarm.html을 기반하였음.



## Orchestration

여러대의 server & service 를 편리하게 관리해주는 작업

- Logging, Monitoring (한 곳에서 관리)
- Service Discovery(서버나 컨테이너 추가 시 자동 발견)
- Scheduling
- Load Balancer(서버/컨테이너에 작업을 고르게 분배)
- High Availability(서버가 다운되었을 때)
- Scalability(성능 지속 향상)



## Orchestration Tool

1. Swarm

2. Kubernetes




### Docker and Swarm

이들은 별도로 개발되었음, 하지만 docker version 1.12 부터 swarm mode라는 이름으로 합쳐짐



### Docker Swarm

- 여러대의 도커 서버를 하나의 클러스터
- 분산 코디네이터: 정보 저장 및 동기화
  - 클러스터에서 새로운 서버의 발견
  - 클러스터의 각종 설정 저장
  - 데이터 저장
- 매니저:클러스터 내의 서버를 관리하고 제어
- 에이전트: 각 서버 제어



### Docker Swarm and Swarm mode

- Docker Swarm : 스웜 에이전트와 분산 코디네이터가 별도 구성
- Swarm mode : 스웜 에이전트와 분산 코디네이터가 내장(version 1.12 이후)



### Swarm mode

Manger node , worker node로 구성되어있다

- Swarm-manager
- Swarm-worker1
- Swarm-worker2



