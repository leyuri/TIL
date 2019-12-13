[https://reoim.tistory.com/entry/Kubernetes-Helm-%EC%82%AC%EC%9A%A9%EB%B2%95](https://reoim.tistory.com/entry/Kubernetes-Helm-사용법)  를 참고하였습니다



## Helm



**Helm 이란**? **Helm** 은 쿠버네티스 package managing tool 

node.js 의 npm 과 비슷한 형태로 쿠버네티스 패키지 배포를 가능하게 함!

npm이라고 하니까 확 와닿는 개념이군:relieved:

**chart** 라고 부르는 package format을 사용하는데 chart는 쿠버네티스 리소스를 describe 하는 파일들의 집합

자세한 내용은 공식 문서 참조->https://helm.sh/docs/topics/charts/



**Helm**은 **client**와 **server(tiller)** 이렇게 두가지 파트

- **client**는 end user를 위한 command line client
  -  주로  local chart 개발이나 repository managing, server(tiler)에 chart 설치 요청등 주로 chart managing
- **Tiller**라고도 부르는 server는 in-cluster  server
  - chart의 배포, 릴리즈를 managing



___



### Helm 설치

실제 helm을 설치한후 쿠버네티스 패키지를 다운받아 릴리즈 해보자.

일단 helm을 설치하려면 쿠버네티스 cluster 가 미리 셋팅 되어야 한다.

나는 ubuntu vm위에 이미 kubernetes cluster가 셋팅되어있으므로 그대로 이용하였다.

쿠버네티스 cluster 가 준비 되었다면 다음의 명령어로 설치 script를 다운받고 실행한다.

```
ubuntu@ubuntu:~$ curl https://raw.githubusercontent.com/helm/helm/master/scripts/get > get_helm.sh
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  7164  100  7164    0     0  11264      0 --:--:-- --:--:-- --:--:-- 11246
```

```
ubuntu@ubuntu:~$ chmod 700 get_helm.sh
```

```
ubuntu@ubuntu:~$ ./get_helm.sh
Downloading https://get.helm.sh/helm-v2.16.1-linux-amd64.tar.gz
Preparing to install helm and tiller into /usr/local/bin
helm installed into /usr/local/bin/helm
tiller installed into /usr/local/bin/tiller
Run 'helm init' to configure helm.
```



설치가 완료되면 helm 을 초기화하고 tiller를 설치, 그전에 tiller 서비스 account를 생성하고 cluster-admin role을 부여

```
ubuntu@ubuntu:~/snap$ cd ..
ubuntu@ubuntu:~$ ls
get_helm.sh  minikube  share  snap
ubuntu@ubuntu:~$ sudo kubectl -n kube-system create sa tiller
The connection to the server 10.0.2.15:8443 was refused - did you specify the right host or port?
ubuntu@ubuntu:~$ sudo helm init
$HELM_HOME has been configured at /home/ubuntu/.helm.
Error: error installing: Post https://10.0.2.15:8443/apis/apps/v1/namespaces/kube-system/deployments: dial tcp 10.0.2.15:8443: connect: connection refused
```

 아 .......;;;;;;:triumph::triumph::triumph::triumph::triumph:

교수님께서 실제로 **helm**구축하는 게 조금 복잡하다고 그냥 잠깐 설명만하고 넘어갔는데

이건 뭐 처음부터 막히네



### Chart 설치



최신 리스트 업데이트

```
$ helm repo update
```



chart 목록 출력

```
$ helm search
NAME                                    CHART VERSION   APP VERSION                     DESCRIPTION
stable/acs-engine-autoscaler            2.2.2           2.1.1                           DEPRECATED Scales worker nodes within agent pools
stable/aerospike                        0.2.1           v3.14.1.2                       A Helm chart for Aerospike in Kubernetes
stable/airflow                          0.12.0          1.10.0                          Airflow is a platform to programmatically author, schedul...
stable/anchore-engine                   0.10.0          0.3.1                           Anchore container analysis and policy evaluation engine s...
stable/apm-server                       0.1.0           6.2.4                           The server receives data from the Elastic APM agents and ...
stable/ark                              1.2.5           0.9.1                           A Helm chart for ark
.
.
.
```



```
$ helm search mariadb
```

```
$ helm install stable/mariadb --name my-maria
```

따로  release 이름을 정하고 싶으면 설정할 수 있다



### Chart Customizing

helm 의 큰 장점 중 하나가 chart를 install 하기전에 chart value 값을 변경 가능함!