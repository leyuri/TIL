https://jungwoon.github.io/docker/2019/01/13/Docker-6/

https://miiingo.tistory.com/91 참고하였음





### Container-based virtualization

하드웨어 가상화가 아닌 실행환경의 분리

Build - Ship - Run



### Container resource allocation

##### 설정된 자원 변경하기

보통 컨테이너를 생성하는 `run`, `create` 명령어에서 자원 할당을 조정할 수 있는데, 만들어진 컨테이너의 자원도 아래 명령어를 통해서 업데이트 가능

```
$ docker update [변경할 자원 제한] [컨테이너 이름]
$ docker update --cpuset-cpus=1 centos
```



##### 컨테이너 메모리 제한

`--memory`를 지정하여 컨테이너의 메모리를 제한 할 수 있습니다. 단위는 `m(MB)`, `g(GB)` 이며 최소 메모리는 `4MB`입니다.

설정한 메모리 이상으로 메모리를 사용하면 컨테이너는 자동적으로 종료

```
$ docker run -d \       # -d 데몬 형태로 생성 
> --memory="1g" \       # --memory: 컨테이너의 메모리를 제한, 여기서는 1GB로 제한
> --memory-swap="3g" \  # --memory-swap: 스왑메모리를 설정할 수 있습니다, 여기서는 3GB로 설정했습니다.
> --name memory_1g \    # --name: 컨테이너의 이름을 설정, 여기서는 "memory_1g"가 이름
> nginx                 # 이미지는 nginx를 사용
```



##### 컨테이너 CPU 제한

가상 머신은 특정 개수의 CPU를 할당하지만, 컨테이너는 CPU 스케쥴링에 의해서 동일한 비율로 처리
`--cpu-shares`를 설정하면 컨테이너가 CPU를 얼마나 차지할 것인지를 설정가능
기본적으로 설정되어 있는게 `1024`이기 때문에 `2048`을 설정하면 `2배` 만큼 더 할당받을 수 있음! :grin:

````
docker run -i -t --name cpu_share \   # --name: 컨테이너의 이름을 설정, 여기서는 cpu_share
> --cpu-shares 2048 \                 # --cpu-shares: CPU 할당량을 설정, 여기서는 2배 (기본값 1024)
> ubuntu:14.04                        # 이미지는 ubuntu:14.04
````



### Docker log

서비스의 로그를 확인

컨테이너 실행시 나오는 로그를 출력하는 명령어, 실행시 발생하는 에러를 확인할 수 있다

ex) docker logs ubuntu1



###Docker Registry

Docker 레지스트리는 Docker 이미지를 중앙에서 관리하기 위한 repository 서비스를 의미

```
# docker search 커맨드로 registry 확인
docker search registry
```

```
# registry 이미지 다운로드
docker pull registry:2.0
```

```
# 다운로드한 registry 이미지 확인
docker images registry
```
