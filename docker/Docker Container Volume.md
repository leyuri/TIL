https://swiftymind.tistory.com/82 참고하였음



##  Container

간단히 생각하면 애플리케이션을 포함한 그릇이라고 생각하면 된다

컨테이너는 각자의 독립된 공간을 갖고 있다!



**기본 명령어**

- 모두 이미지를 통해 컨테이너를 생성

- Run 명령어는 생성과 동시에 컨테이너 내부로 접근이 가능

- Create 명령어는 생성에만 관여



## Docker Volume

도커에서의 볼륨에 대해서 알아보자.우선 볼륨이라는 단어가 무엇인지 생각해보자!

Linux에 익숙한 사용자라면 Volume 은 하나의 저장공간, 즉 디스크임을 알 수 있을 것이다. 

하지만 windows에서는 이 volume을 드라이브라고 부른다 (E:/ E드라이브,  C:/ C드라이브...)



도커 이미지로 컨테이너를 생성하면 이미지는 읽기 전용이 된다.

컨테이너의 변경사항만 별도로 각 컨테이너의 정보로 보존한다.

만약 도커 컨테이너를 삭제하면 컨테이너 계층의 데이터도 모두 삭제되기 때문에 때문에 볼륨을 사용해야 한다!



그 방법으로는 

1. 호스트와 볼륨공유
2. 볼륨 컨테이너 활용
3. 도커가 관리하는 볼륨 생성

**[참고]보조기억장치(HDD, FDD, CD-ROM 등)나 파일 시스템이 다른 디스크를** /의 하위 디렉터리로 연결하여 사용 가능하게 해주는 명령어: **mount**https://jhnyang.tistory.com/12



### 호스트와 볼륨 공유

물리폴더 - 컨테이너 폴더

(Container forder :arrow_right: mount :arrow_right: physical disk)



*docker run  -v [호스트 공유 디렉토리] : [컨테이너 공유디렉토리] 컨테이너*

```
yuriui-MacBook-Pro% docker run -d --name mysqldb -e MYSQL_ROOT_PASSWORD=yuri -p 3306:3306 -v /Users/yuri/Documents/Docker/volume:/var/lib/mysql mysql:5.7
39076423ad3c5fb0c36eb47fabc0f5a80905be18b04287a2f0b70cfa9f2ac364
```

컨테이너 생성과 동시에 실행시켜준다. 이름은 mysqldb, 

로컬 호스트에 /Users/yuri/Documents/Docker/volume 폴더를 만들어 주었다

/Users/yuri/Documents/Docker/volume

/var/lib/mysql



*docker inspect* 명령어를 사용하여 컨테이너, 이미지의 상세 정보를 확인

```
yuriui-MacBook-Pro% docker inspect mysqldb
[
    {
        "Id": "39076423ad3c5fb0c36eb47fabc0f5a80905be18b04287a2f0b70cfa9f2ac364",
        "Created": "2019-12-13T17:04:23.484923344Z",
        "Path": "docker-entrypoint.sh",
        "Args": [
            "mysqld"
        ],
        "State": {
            "Status": "running",
            "Running": true,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 4476,
            "ExitCode": 0,
            "Error": "",
            "StartedAt": "2019-12-13T17:04:24.202252929Z",
            "FinishedAt": "0001-01-01T00:00:00Z"
        },
.
.
.
	,
        "Name": "/mysqldb",
        "RestartCount": 0,
        "Driver": "overlay2",
        "Platform": "linux",
        "MountLabel": "",
        "ProcessLabel": "",
        "AppArmorProfile": "",
        "ExecIDs": null,
        "HostConfig": {
            "Binds": [
                "/Users/yuri/Documents/Docker/volume:/var/lib/mysql"
.
.
.
```

"Binds":  "/Users/yuri/Documents/Docker/volume:/var/lib/mysql"

연결된 모습을 확인할 수 있음!



```
yuriui-MacBook-Pro% cd Documents 
yuriui-MacBook-Pro% cd Docker 
yuriui-MacBook-Pro% cd volume 
yuriui-MacBook-Pro% ls
#innodb_temp		binlog.index		ib_buffer_pool		mysql			server-cert.pem
auto.cnf		ca-key.pem		ib_logfile0		mysql.ibd		server-key.pem
binlog.000001		ca.pem			ib_logfile1		performance_schema	sys
binlog.000002		client-cert.pem		ibdata1			private_key.pem		undo_001
binlog.000003		client-key.pem		ibtmp1			public_key.pem		undo_002
```

<img width="784" alt="Screen Shot 2019-12-14 at 2 11 38 AM" src="https://user-images.githubusercontent.com/33794732/70818477-2ca03780-1e17-11ea-9466-84a0ead5cad5.png">

해당 경로에 파일이 생성됨!



### 볼륨 컨테이너

일반 컨테이너 - 볼륨 컨테이너 - 물리 폴더

Container :arrow_right: Volume Container  :arrow_right: mount :arrow_right: physical disk

간접적으로 볼륨컨테이너와 연결해 데이터를 공유하는 방식

볼륨 컨테이너를 지정하여 공유한다

 -v, -volume 옵션을 통해 호스트 디렉토리와 공유하고 있으며, -volumes-from 옵션을 통해 컨테이너와 공유 할 수 있다.

`docker run --name mycontainer --volumes-from volumes_container ubuntu:latest`





### 도커 볼륨

별도의 볼륨 오브젝트를 생성

Container :arrow_right: Docker Volume  :arrow_right: mount :arrow_right: physical disk

`dockervolume create --name volume_container`

`docker volume ls`

`docker run -it --name volume_ex_server -v volume_container:/etc/ ubuntu:latest`



*명령어를 통해 hello이름의 볼륨 생성*

```
ubuntu@ubuntu:~$ sudo docker volume create --name hello
[sudo] password for ubuntu: 
hello
```



*inspect명령어를 통해 상세 정보 확인*

```
ubuntu@ubuntu:~$ ls
get_helm.sh  minikube  share  snap
ubuntu@ubuntu:~$ sudo docker volume inspect hello
[
    {
        "CreatedAt": "2019-12-13T16:42:10Z",
        "Driver": "local",
        "Labels": {},
        "Mountpoint": "/var/lib/docker/volumes/hello/_data",
        "Name": "hello",
        "Options": {},
        "Scope": "local"
    }
]
ubuntu@ubuntu:~$ sudo docker volume ls
DRIVER              VOLUME NAME
local               hello

```

"Mountpoint": "/var/lib/docker/volumes/hello/_data" 를 확인할 수 있음!



*docker run명령 실행*

```
ubuntu@ubuntu:~$ sudo docker run -it -v hello:/world ubuntu /bin/bash
Unable to find image 'ubuntu:latest' locally
latest: Pulling from library/ubuntu
7ddbc47eeb70: Pull complete 
c1bbdc448b72: Pull complete 
8c3b70e39044: Pull complete 
45d437916d57: Pull complete 
Digest: sha256:6e9f67fa63b0323e9a1e587fd71c561ba48a034504fb804fd26fd8800039835d
Status: Downloaded newer image for ubuntu:latest
root@b9a767ef38e9:/# ls
bin  boot  dev  etc  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var  world
root@b9a767ef38e9:/# cd world
root@b9a767ef38e9:/world# ls
root@b9a767ef38e9:/world# ls -al
total 8
drwxr-xr-x 2 root root 4096 Dec 13 16:42 .
drwxr-xr-x 1 root root 4096 Dec 13 17:43 ..
```





이처럼 컨테이너가 아닌 외부에 데이터를 저장하고 동작하도록 stateless 하도록 설계하는 것이 좋다



### <번외>

##### - Kubernetes Volume

##### - HDFS

