 https://jtoday.tistory.com/91  

https://nicewoong.github.io/development/2017/10/09/basic-usage-for-docker/ 참고하였음

### DockerFile

Docker Image를 만들기 위한 설정 파일



### 파일을 이미지에 추가

호스트 파일을 이미지 생성시 추가(복사)

dockerfile

- ADD ~/sample.txt/sample.txt
  -  호스트의 파일을 컨테이너에 추가
  - 압축파일을 지정할 경우 자동으로 압축을 풀어서 추가한다
  -  url을 지정할 경우 압축해제 없이 추가된다



### 명령 수행할 사용자 / 폴더 지정

RUN/CMD/ENTRYPOINT 수행하기 전 사용자 계정 지정

- USER sample
  - Sample 사용자로 변경



RUN/CMD/ENTRYPOINT 수행하기 전 폴더 지정

-  WORKDIR ~/sample  로 지정
  - ~/sample 폴더로 변경해 아래 명령을 수행



### 볼륨 연결

컨테이너의 폴더와 호스트의 물리 폴더 간의 연결! 연결하지 않고 이미지를 삭제할 경우 데이터가 사라짐

- 물리 폴더 ~[홈디렉토리]/Downloads를 컨테이너의 /download 폴더로 연결

  ```
  docker run --name=ubuntu ubuntu -v ~/Downloads(물리):/download(컨테이너)
  ```

- Dockerfile
  - VOLUME /download
  - VOLUME ["/data","/sample"] (여러 폴더)
  - 해당 디렉토리는 컨테이너 폴더가 아닌 호스트의 물리폴더로 저장하고 수행
  - -v옵션과 같이 수행



### 도커 컨테이너 간 연결

컨테이너 간 상호연결

```
docker pull mysql //mysql 다운로드
```

```
docker run -d -e MYSQL_ROOT_PASSWORD=kitri --name=mysql mysql //mysql 컨테이너 실행(서버모드) 백그라운드 모드
```

```
docker run -it --link mysql:mysql --name=ubuntu ubuntu //우분투 컨테이너 실행(연결)
```







| **옵션** | **설명**                                               |
| :------- | :----------------------------------------------------- |
| -d       | detached mode 흔히 말하는 백그라운드 모드              |
| -p       | 호스트와 컨테이너의 포트를 연결 (포워딩)               |
| -v       | 호스트와 컨테이너의 디렉토리를 연결 (마운트)           |
| -e       | 컨테이너 내에서 사용할 환경변수 설정                   |
| –name    | 컨테이너 이름 설정                                     |
| –rm      | 프로세스 종료시 컨테이너 자동 제거                     |
| -it      | -i와 -t를 동시에 사용한 것으로 터미널 입력을 위한 옵션 |
| –link    | 컨테이너 연결 [컨테이너명:별칭]                        |



```
yuriui-MacBook-Pro% docker run --help

Usage:	docker run [OPTIONS] IMAGE [COMMAND] [ARG...]

Run a command in a new container

Options:
      --add-host list                  Add a custom host-to-IP mapping
                                       (host:ip)
  -a, --attach list                    Attach to STDIN, STDOUT or STDERR
      --blkio-weight uint16            Block IO (relative weight),
                                       between 10 and 1000, or 0 to
                                       disable (default 0)
      --blkio-weight-device list       Block IO weight (relative device
                                       weight) (default [])
      --cap-add list                   Add Linux capabilities
      --cap-drop list                  Drop Linux capabilities
      --cgroup-parent string           Optional parent cgroup for the
                                       container
      --cidfile string                 Write the container ID to the file
      --cpu-count int                  CPU count (Windows only)
      --cpu-percent int                CPU percent (Windows only)
      --cpu-period int                 Limit CPU CFS (Completely Fair
                                       Scheduler) period
      --cpu-quota int                  Limit CPU CFS (Completely Fair
                                       Scheduler) quota
      --cpu-rt-period int              Limit CPU real-time period in
                                       microseconds
      --cpu-rt-runtime int             Limit CPU real-time runtime in
                                       microseconds
  -c, --cpu-shares int                 CPU shares (relative weight)
      --cpus decimal                   Number of CPUs
      --cpuset-cpus string             CPUs in which to allow execution
                                       (0-3, 0,1)
      --cpuset-mems string             MEMs in which to allow execution
                                       (0-3, 0,1)
  -d, --detach                         Run container in background and
                                       print container ID
      --detach-keys string             Override the key sequence for
                                       detaching a container
      --device list                    Add a host device to the container
      --device-cgroup-rule list        Add a rule to the cgroup allowed
                                       devices list
      --device-read-bps list           Limit read rate (bytes per second)
                                       from a device (default [])
      --device-read-iops list          Limit read rate (IO per second)
                                       from a device (default [])
      --device-write-bps list          Limit write rate (bytes per
                                       second) to a device (default [])
      --device-write-iops list         Limit write rate (IO per second)
                                       to a device (default [])
      --disable-content-trust          Skip image verification (default true)
      --dns list                       Set custom DNS servers
      --dns-option list                Set DNS options
      --dns-search list                Set custom DNS search domains
      --domainname string              Container NIS domain name
      --entrypoint string              Overwrite the default ENTRYPOINT
                                       of the image
  -e, --env list                       Set environment variables
      --env-file list                  Read in a file of environment variables
      --expose list                    Expose a port or a range of ports
      --gpus gpu-request               GPU devices to add to the
                                       container ('all' to pass all GPUs)
      --group-add list                 Add additional groups to join
      --health-cmd string              Command to run to check health
      --health-interval duration       Time between running the check
                                       (ms|s|m|h) (default 0s)
      --health-retries int             Consecutive failures needed to
                                       report unhealthy
      --health-start-period duration   Start period for the container to
                                       initialize before starting
                                       health-retries countdown
                                       (ms|s|m|h) (default 0s)
      --health-timeout duration        Maximum time to allow one check to
                                       run (ms|s|m|h) (default 0s)
      --help                           Print usage
  -h, --hostname string                Container host name
      --init                           Run an init inside the container
                                       that forwards signals and reaps
                                       processes
  -i, --interactive                    Keep STDIN open even if not attached
      --io-maxbandwidth bytes          Maximum IO bandwidth limit for the
                                       system drive (Windows only)
      --io-maxiops uint                Maximum IOps limit for the system
                                       drive (Windows only)
      --ip string                      IPv4 address (e.g., 172.30.100.104)
      --ip6 string                     IPv6 address (e.g., 2001:db8::33)
      --ipc string                     IPC mode to use
      --isolation string               Container isolation technology
      --kernel-memory bytes            Kernel memory limit
  -l, --label list                     Set meta data on a container
      --label-file list                Read in a line delimited file of labels
      --link list                      Add link to another container
      --link-local-ip list             Container IPv4/IPv6 link-local
                                       addresses
      --log-driver string              Logging driver for the container
      --log-opt list                   Log driver options
      --mac-address string             Container MAC address (e.g.,
                                       92:d0:c6:0a:29:33)
  -m, --memory bytes                   Memory limit
      --memory-reservation bytes       Memory soft limit
      --memory-swap bytes              Swap limit equal to memory plus
                                       swap: '-1' to enable unlimited swap
      --memory-swappiness int          Tune container memory swappiness
                                       (0 to 100) (default -1)
      --mount mount                    Attach a filesystem mount to the
                                       container
      --name string                    Assign a name to the container
      --network network                Connect a container to a network
      --network-alias list             Add network-scoped alias for the
                                       container
      --no-healthcheck                 Disable any container-specified
                                       HEALTHCHECK
      --oom-kill-disable               Disable OOM Killer
      --oom-score-adj int              Tune host's OOM preferences (-1000
                                       to 1000)
      --pid string                     PID namespace to use
      --pids-limit int                 Tune container pids limit (set -1
                                       for unlimited)
      --platform string                Set platform if server is
                                       multi-platform capable
      --privileged                     Give extended privileges to this
                                       container
  -p, --publish list                   Publish a container's port(s) to
                                       the host
  -P, --publish-all                    Publish all exposed ports to
                                       random ports
      --read-only                      Mount the container's root
                                       filesystem as read only
      --restart string                 Restart policy to apply when a
                                       container exits (default "no")
      --rm                             Automatically remove the container
                                       when it exits
      --runtime string                 Runtime to use for this container
      --security-opt list              Security Options
      --shm-size bytes                 Size of /dev/shm
      --sig-proxy                      Proxy received signals to the
                                       process (default true)
      --stop-signal string             Signal to stop a container
                                       (default "SIGTERM")
      --stop-timeout int               Timeout (in seconds) to stop a
                                       container
      --storage-opt list               Storage driver options for the
                                       container
      --sysctl map                     Sysctl options (default map[])
      --tmpfs list                     Mount a tmpfs directory
  -t, --tty                            Allocate a pseudo-TTY
      --ulimit ulimit                  Ulimit options (default [])
  -u, --user string                    Username or UID (format:
                                       <name|uid>[:<group|gid>])
      --userns string                  User namespace to use
      --uts string                     UTS namespace to use
  -v, --volume list                    Bind mount a volume
      --volume-driver string           Optional volume driver for the
                                       container
      --volumes-from list              Mount volumes from the specified
                                       container(s)
  -w, --workdir string                 Working directory inside the container

```

