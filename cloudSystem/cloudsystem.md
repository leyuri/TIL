# 클라우드

#####  클라우드컴퓨팅이란?

- 더 이상 프로그램이나 application들을 PC에 있는 disk 공간에 저장하는 게 아니라, Internet 상에 가상화 기술을 이용하여 가상공간을 형성해놓고, 그 가상곤간에 프로그램을 설치하는 것

- 클라우드는 public 과 private로 나뉜다. 

- 클라우드 자체 구축 (On-premise) vs 클라우드 서비스 사용



##### SPI 모델

- IasS

  - openStatck Foundation
  - AWS ec2

- Pass

  - vmware's CloudFoundry, Redhat's OpenShift
  - Scalability, High Availability, Metering, Monitoring

- SaaS

  - gmail..

  

##### 클라우드 구현 기술

- 가상화

  - Hypervisor
  - VMWare, Hyper-V, Xen, OpenStack, VirtualBox

- 컨테이너 기반 가상화

  - Docker, Kubernetes

  

# 가상화의 기초

가상화는 서버의 리소스 가상화를 통해서 하나의 서버에 여러대의 OS를 동작시킬 수 있는 기술

- 하이퍼바이저: Host OS에서 다수의 guest OS를 돌리기 위한 플랫폼
- HostOS: 물리 시스템(컴퓨터)에 설치된 OS
- GuestOS: 가상머신/컨테이너 위에 설치된 OS



##### 가상화의 레벨

- Application Programming Interface
- Application Binary Interface
- Instruction Set Architecture : 하드웨어와 소프트웨어 사이의 인터페이스 정의 



##### 하이퍼바이저 기반의 가상화 특징

- 다양한 guest OS를 실행할 수 있음

- 하지만 물리 시스템과 guest OS 간의 가상화 기능으로 인한 성능 저하 발생 

  

##### 전가상화/반가상화

- 전가상화: 하드웨어를 완전히 가상화, guestOS가 자신이 가상머신 위에서 동작하고 있다는 것을 인식불가, 반드시 하이퍼바이저를 통해 접근해야 함 -> 성능저하
- 반가상화: guestOS가 자신이 가상머신 위에서 동작하고 있다는 것을 인식, guestOS에서 물리자원 직접 접근 가능 -> 성능개선



##### 하이퍼바이저 종류

- VMWare
- MS Hyper-V
- Ctrix Xen
- KVM
- Paralles
- Oracle VirtualBox



VirtualBox 위에 오픈 자바, 파이썬3, 아파치/톰캣 설치해보기



# 도커

##### 컨테이너 기반 가상화?

- 기존의 가상화 다름, 하드웨어 가상화가 아닌 실행환경의 분리한다. Hypervisor는 OS 및 커널이 통째로 가상화 되는 반면 container은 filesystem의 가상화만 이루고 있는 개념. 
- 구축 및 실행이 단순화 (Build-Ship-Run)



##### 가상화의 단점?

- 불필요한 기능의 중복
- Host OS 와 GuestOS 간의 기능 중복
- 오버헤드 (15~20)



##### 도커의 특징과 성능

- 가상화에 비해 오버헤드가 적음(3~5 이내 )
- 가볍고 똑똑
- 많은 사람들이 구축한 이미지를 공유(Dockerhub)
- Ecosystem
- 모든 컨테이너들이 동일 OS커널을 공유



```
# 도커 이미지 검색
$ docker search ubuntu
# 우분투 이미지 다운로드
$ docker puul ubuntu
# 이미지 리스트 출력
$ docker images
# 컨테이너 생성
$ docker run -it --name=sample ububtu
# 컨테이너 접속
$ docker attch sample
```

하나의 우분투 이미지를 통해 여러 컨테이너를 만들 수 있음! ubuntu1, ubuntu2,,



##### dockerfile

- 도커 이미지를 생성할 때 사용할 이미지를 지정해줌



볼륨연결

- 컨테이너의 폴더와 Host의 물리 폴더 간의 연결!

```
$ docker run --name=ubuntu ubuntu -v ~/Downloads:/download
```



# 오케스트레이션 

여러대의 서버/서비스를 편리하게 관리해주는 작업으로 일종의 분산 WAS, 미들웨어의 역할을 함

- Logging, Monitoring
- Service Discovery
- Scheduling(!!): 어떤 서버에 컨테이너를 할당할 것인지
- Load Balancer: 여러 개의 서버/ 컨테이너에 작업을 고르게 분배
- High Availability: 클러스터 내 서버가 다운되었을 때 조절할 수 있는지
- Scalability: 성능 지속 향상



##### 오케스트레이션 툴

- Kuvernets
  - 강력한 기능과 복잡한 설정
  - 500대의 서버에 50,000 컨테이너를 서비스 가능
- 스웜
  - 비교적 간단한 설정
  - 50대 미만의 경우 스웜 사용하는 것이 유리



##### Docker Swarm

스웜과 도커는 별도로 개발되었지만, 도커 1.12버전부터 스웜모드라는 이름으로 합쳐졌음!

- 여러대의 도커 서버를 하나의 클러스터로 구성

- 분산코디네이터

- 매니저

- 에이전트

- 스웜 에이전트/분산코디네이터가 내장 -> 스웜모드

- 스웜 에이전트/분산코디네이터가 별도구성-> 도커 스웜

  

##### Swarm mode

- 매니저 노드와 워커노드로 구성

- 서비스 단위로 제어 ( 도커는 컨테이너 단위로 제어한다)

  

## 쿠버네티스

디플로이 자동화, 스케일링, 스케줄링, 컨테이너화된 애플리케이 관리



##### 쿠보네티스 구조

- 마스터와 노드로 나뉨
  - 마스터: 쿠버네티스의 설정 환경을 저장하고 전체 클러스터를 관리하는 역할
  - 노드:  pod나 컨테이너처럼 쿠버네티스 위에서 동작하는 워크로드를 호스팅하는 역할
- pod 단위로 생성관리, 1개 이상의 컨테이너 생성!
- pod별로 IP주소 할당
- 노드끼리 동일한 네트워크, 데이터 볼륨 공유
- Replica Set : pod  생성 관리, 장애대응, 롤링업데이트 수행



롤링 업데이트는 가장 많이 사용되는 배포 방식 중의 하나이다. 새 버전을 배포하면서, 새 버전 인스턴스를 하나씩 늘려나가고, 기존 버전을 하나씩 줄여나가는 방식이다. 이 경우 기존 버전과 새버전이 동시에 존재할 수 있는 단점은 있지만, 시스템을 무 장애로 업데이트할 수 있다는 장점이 있다.



-  Deployment
  - Replica Set과 pod를 선언적으로 정의, pod를 생성할 때 사용
- Service: pod 를 외부에 노출하는 역할 담당, 기본적으로 로드밸런싱(여러개의 서버에 작업 고르게 분배) 서비스 제공



쿠버네티스는 이 4개의 오브젝트로 구성됨. 사용자는 pod 을 지정해주고 deployment를 하면 사용할 수 있다. 즉 사용자가 pod 정의 후, deployment를 띄어주고, service가 띄어져야 최종적으로..!



##### Minikube

가상머신 1개를 생성해 쿠버네티스를 사용할 수 있는 환경을 제공해줌, 대화형 튜툐리얼이 웹 브라우저 자체에서 바로 동작하기 때문에 아무 설정 필요 없음

