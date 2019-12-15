https://subicura.com/2017/02/25/container-orchestration-with-docker-swarm.html 에 기반하였음

## Docker and Swarm

이들은 별도로 개발되었음, 하지만 docker version 1.12 부터 swarm mode라는 이름으로 합쳐짐



## Docker Swarm

- 여러대의 도커 서버를 하나의 클러스터

- 분산 코디네이터: 정보 저장 및 동기화
  - 클러스터에서 새로운 서버의 발견
  - 클러스터의 각종 설정 저장
  - 데이터 저장
  
- 매니저:클러스터 내의 서버를 관리하고 제어

- 에이전트: 각 서버 제어

  

## Docker Swarm and Swarm mode

- Docker Swarm : 스웜 에이전트와 분산 코디네이터가 별도 구성

- Swarm mode : 스웜 에이전트와 분산 코디네이터가 내장(version 1.12 이후)

  

## Swarm mode

Manger node , worker node로 구성되어있다

- Swarm-manager
- Swarm-worker1
- Swarm-worker2



실제로 만들어보자

docker quick start를 실행하면 기본적으로 default 라는 이름을 가진 vm 이 생성된다

```
yuriui-MacBook-Pro% docker-machine ls
NAME      ACTIVE   DRIVER       STATE     URL                         SWARM   DOCKER     ERRORS
default   *        virtualbox   Running   tcp://192.168.99.109:2376           v19.03.5   
```



그럼 worker1, worker2 이름의 노드를 만들어보자

```
yuriui-MacBook-Pro% docker-machine create worker1
yuriui-MacBook-Pro% docker-machine create worker2
```



생성된 것을 확인해보자!

```
yuriui-MacBook-Pro% docker-machine ls
NAME      ACTIVE   DRIVER       STATE     URL                         SWARM   DOCKER     ERRORS
default   *        virtualbox   Running   tcp://192.168.99.109:2376           v19.03.5   
worker1   -        virtualbox   Running   tcp://192.168.99.110:2376           v19.03.5   
worker2   -        virtualbox   Running   tcp://192.168.99.111:2376           v19.03.5 
```

여기서 이 세개 노드의 ip주소에 주목해보자!



다시 vm에 가보면 새로 worker1, worker2라는 vm이 생성됨을 볼 수 있다!

<img width="1057" alt="Screen Shot 2019-12-15 at 3 33 37 PM" src="https://user-images.githubusercontent.com/33794732/70859036-4b561980-1f50-11ea-8f03-ce81f713b972.png">



그럼 default를 매니저 노드로 지정해보자

**docker swarm init --advertise-addr** 명령어를 사용한다

```
yuriui-MacBook-Pro% docker-machine ssh default   
   ( '>')
  /) TC (\   Core is distributed with ABSOLUTELY NO WARRANTY.
 (/-_--_-\)           www.tinycorelinux.net

docker@default:~$ docker swarm init --advertise-addr 192.168.99.109
Swarm initialized: current node (3nn9aivcl33qbbt5scnohvjx6) is now a manager.

To add a worker to this swarm, run the following command:

    docker swarm join --token SWMTKN-1-1jwyd3wl115fre8hnpmyczkwlxzhztf9nf2w5d7nx1u3cjo8cf-7lx48norl6c12m60wxlfeutdp 192.168.99.109:2377

To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.
```

앞서 봤듯이 default 는  tcp://192.168.99.109:2376 주소를 가지고 있었다. 

따라서 이 주소로 초기화를 시켜 매니저 노드로 지정해주자!

그러자 해당 토큰 값이 발행되었다! 

이 토큰 값을 토대로 worker1, worker2 를 연결시켜서 워커노드로 만들어보자



```
yuriui-MacBook-Pro% docker-machine ssh worker2 
   ( '>')
  /) TC (\   Core is distributed with ABSOLUTELY NO WARRANTY.
 (/-_--_-\)           www.tinycorelinux.net

docker@worker2:~$ docker swarm join --token SWMTKN-1-1jwyd3wl115fre8hnpmyczkwlxzhztf9nf2w5d7nx1u3cjo8cf-7lx48norl6c12m60wxlfeutdp 192.168.99.109:2377                     
This node joined a swarm as a worker.
```

This node joined a swarm as a worker. 라는 메시지가 보이는가? 워커노드로 조인이 잘 되었다. worker1도 마찬가지 방법으로!

<img width="1049" alt="Screen Shot 2019-12-15 at 3 38 32 PM" src="https://user-images.githubusercontent.com/33794732/70859173-7e99a800-1f52-11ea-8161-6e79cae01b70.png">



도커 노드 목록을 확인해보자

````
yuriui-MacBook-Pro% docker node ls
ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS      ENGINE VERSION
3nn9aivcl33qbbt5scnohvjx6 *   default             Ready               Active              Leader              19.03.5
owh3yyzlj6z9o54nwmecb4snq     worker1             Ready               Active                                  19.03.5
c5f0jkvzf584l0yye3amoxy7z     worker2             Ready               Active                                  19.03.5
````

모두 성공적으로 완료!



그러면 서비스를 한번 생성해볼까?

스웜모드에서는 서비스 단위를 통해 제어를 한다. 

서비스는 1개 이상의 컨테이너로 구성되어있으며, 이 컨테이너는 매니저와 워커노드에 할당된다

```
yuriui-MacBook-Pro% docker service create --name myweb --replicas 2 -p 80:80 nginx
qugmne9rolv6ejxxs2p91ybc8
overall progress: 2 out of 2 tasks 
1/2: running   [==================================================>] 
2/2: running   [==================================================>] 
verify: Service converged 
yuriui-MacBook-Pro% docker service ls                                             
ID                  NAME                MODE                REPLICAS            IMAGE               PORTS
qugmne9rolv6        myweb               replicated          2/2                 nginx:latest        *:80->80/tcp
```



```
yuriui-MacBook-Pro% docker service ps myweb
ID                  NAME                IMAGE               NODE                DESIRED STATE       CURRENT STATE            ERROR               PORTS
ohlg7my13kbs        myweb.1             nginx:latest        worker1             Running             Running 25 seconds ago                       
pva89vghk3sw        myweb.2             nginx:latest        default             Running             Running 29 seconds ago    
```



<img width="982" alt="Screen Shot 2019-12-15 at 3 46 53 PM" src="https://user-images.githubusercontent.com/33794732/70859174-7e99a800-1f52-11ea-9434-cf4daca38b71.png">

<img width="979" alt="Screen Shot 2019-12-15 at 3 46 59 PM" src="https://user-images.githubusercontent.com/33794732/70859175-7e99a800-1f52-11ea-8358-8b49fec4a637.png">
<img width="984" alt="Screen Shot 2019-12-15 at 3 47 07 PM" src="https://user-images.githubusercontent.com/33794732/70859176-7f323e80-1f52-11ea-811e-9b27d43fc34a.png">



엔진은 109에 떴는데, 110, 111에 접속해도 모두 접속이 되는 상태이다. 이게 어떻게 가능한 것인가?

 가능할까 바로 ingress overlay network가 있기 때문이다

쿠버네티스는 option이지만 스웜은 필수로 작동한다!





### Ingress network

도커 스웜은 서비스를 외부에 쉽게 노출하기 위해 모든 노드가 [ingress](https://docs.docker.com/engine/swarm/ingress/)라는 가상 네트워크에 속해있다.ingress는 routing mesh라는 재미있는 개념을 가지고 있는데 이 개념은 서비스가 포트를 오픈할 경우 모든 노드에 포트가 오픈되고 어떤 노드에 요청을 보내도 실행 중인 컨테이너에 자동으로 전달해줍니다.



위의 예제에서는 80포트를 오픈했기 때문에 3개의 노드 전체에 80 포트가 오픈되었고 어디에서 테스트를 하든 간에 default노드(매니저) 에 실행된 컨테이너로 요청이 전달됩니다. 컨테이너가 여러 개라면 내부 로드밸런서를 이용하여 여러 개의 컨테이너로 분산처리됩니다.

