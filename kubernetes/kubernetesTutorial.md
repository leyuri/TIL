본 내용은 (https://kubernetes.io/docs/tutorials/)에 기반하였음



## Kubernetes ?

구글의 컨테이너 오케스트레이션 부문의 축적된 경험으로 설계

커뮤니티로부터 도출된 최고의 아이디어가 결합된 운영 수준의 오픈 소스 플랫폼



## 1. Create a Cluster

서로 연결되어서 단일 유닛처럼 동작하는 **고가용성**의 컴퓨터 클러스터를 상호조정

애플리케이션 컨테이너를 클러스터에 분산시키고 스케줄링하는 일을 보다 효율적으로 자동화

쿠버네티스 클러스터는 두가지 형태의 자원으로 구성

**Master**

- 클러스터를 상호조정

**Node**

- 워커 머신으로써 동작하는 VM 또는 물리적인 컴퓨터
- 마스터가 제공하는 쿠버네티스 API를 통해서 마스터와 통신

Minikube는 로컬 머신에 VM을 만들고 하나의 노드로 구성된 간단한 클러스터를 배포하는 가벼운 쿠버네티스 구현체



​	[참고]고가용성**(高可用性, HA, **High Availability**)이란 서버와 네트워크, 프로그램 등의 정보 시스템이 상당히 오랜 기간 동안 지속적으로 정상 운영이 가능한 성질을 말한다. **고**(高)**가용성**이란 "**가용성**이 높다"는 뜻으로서, "절대 고장 나지 않음"을 의미 [고가용성 - 위키백과, 우리 모두의 백과사전](https://ko.wikipedia.org/wiki/고가용성)

---



1. 미니큐브 버전 확인 

`$ minikube version`



2. 미니큐브 시작

` minikube start`

```
* minikube v1.3.0 on Ubuntu 18.04
* Running on localhost (CPUs=2, Memory=2461MB, Disk=47990MB) ...
* OS release is Ubuntu 18.04.2 LTS
* Preparing Kubernetes v1.15.0 on Docker 18.09.5 ...
  - kubelet.resolv-conf=/run/systemd/resolve/resolv.conf
* Pulling images ...
* Launching Kubernetes ...
* Waiting for: apiserver proxy etcd scheduler controller dns
* Done! kubectl is now configured to use "minikube"
```

이미지를 pull해오고, 쿠버네티스 런칭을 시작함을 볼 수 있다



3. Kubectl 버전 확인

`$ kubectl version`

참고로 kubectl은 command line interface중 하나이다



4. `$ kubectl cluster-info`

```
Kubernetes master is running at https://172.17.0.64:8443
KubeDNS is running at https://172.17.0.64:8443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
```

Kubernetes master가 구동되고 있음을 확인할 수 있다



5. `$ kubectl get nodes`

```
NAME       STATUS   ROLES    AGE     VERSION
minikube   Ready    master   8m20s   v1.15.0
```

get은 자원을 나열해주는 명령어로 현재 nodes를 보여준다. minikube란 이름의 하나의 마스터 노드가 존재함을 볼 수 있다. 



## 2. Deploy an App

쿠버네티스 클러스터를 구동시키면, 그 위에 컨테이너화된 App을 배포할 수 있음

그러기 위해서는 **kubernetes deployment** 설정을 만들어야 함!

**deployment** 는 쿠버네티스가 App의 인스턴스를 어떻게 생성하고 업데이트해야 하는지를 지시

**Kubectl**이라는 쿠버네티스 CLI를 통해 **deployment**를 생성하고 관리할 수 있음



___



1. 첫번째 App을 이 명령을 통해 배포해보자

```
$ kubectl create deployment kubernetes-bootcamp --image=gcr.io/google-samples/kubernetes-bootcamp:v1
deployment.apps/kubernetes-bootcamp created
```

kubernetes-bootcamp이름의 image를 저장소로부터 가져와 deployment를 생성한다



2. deployments  자원 확인

`$ kubectl get deployments`

```
NAME                  READY   UP-TO-DATE   AVAILABLE   AGE
kubernetes-bootcamp   1/1     1            1           51s
```

kubernetes-bootcamp의 deployments가 하나 생겼다!



3. 새로운 터미널을 열어서 프록시가 실행될 수 있도록 입력

kubernetes 내에서 실행되는 pod는 격리된 네트워크에서 실행, 동일한 쿠버네티스 클러스터 내의 다른  pod 및 service에서 볼 수 있지만 해당 네트워크 외부에서는 볼 수 없다. 따라서 kubectl의 API endpoint 를 통해 상호작용하여 통신한다. **kubectl 명령**은 클러스터 전체 개인 네트워크로 통신을 전달하는 프록시를 작성할 수 있음! 

```
$ echo -e "\n\n\n\e[92mStarting Proxy. After starting it will not output a response. Please click the first Terminal Tab\n";
```

```
Starting Proxy. After starting it will not output a response. Please click the first Terminal Tab

$ kubectl proxy
Starting to serve on 127.0.0.1:8001
```

127.0.0.1:8001 위에서 proxy가 구동중임을 확인할 수 있다

[참고]사용자가 8001 포트로 접속시 확인. **127.0.0.1는 localhost** 자신의 컴퓨터 ip

[참고] **proxy**: 직접 통신할 수 없는 두 점 사이에서 통신할 경우 그 사이에 대리로 통신을 수행하는 기능.

프록시 서버는 클라이언트 입장과 서버의 입장에서 볼 때 서로 상반되는 역할을 하는 것처럼 인식. 클라이언트 호스트 입장에서 본다면 프록시 서버는 마치 서버, 서버 호스트의 입장에서 보면 프록시 서버가 마치 클라이언트처럼 동작한다

- **Forward 프록시**:클라이언트 호스틀과 접근하고자 하는 리소스 사이에 위치

- **Reverse 프록시**: 인터넷 리소스 앞에 위치하는 방식, 클라이언트들이 프록시 서버에 연결되었다는 것을 알지 못함 

(https://brownbears.tistory.com/191)



4. 프록시 엔드 포인트를 통해 호스팅 된 모든 API를 볼 수 있다! 예를 들어 curl 명령을 사용하여 API를 통해 버전을 직접 쿼리 가능

`$ curl http://localhost:8001/version`

```
{
  "major": "1",
  "minor": "15",
  "gitVersion": "v1.15.0",
  "gitCommit": "e8462b5b5dc2584fdcd18e6bcfe9f1e4d970a529",
  "gitTreeState": "clean",
  "buildDate": "2019-06-19T16:32:14Z",
  "goVersion": "go1.12.5",
  "compiler": "gc",
  "platform": "linux/amd64"
}
```

8001로 요청 결과를 볼 수 있음

[참고] CURL은 서버와 통신할 수 있는 커맨드 명령어 툴이다

[참고] 엔드포인트(**EndPoint**)란?? 쉽게말해서 End 끝 Point 점으로 IT적인 관점으로 봤을 때, 어떠한 소프트웨어나 제품에 최종목적지인 사용자를 가리키며 그 예로는 PC나 노트북, 핸드폰등 유저가 사용하는 devices등을 말함.(https://securitycream.tistory.com/7)

API 서버는 포드 이름을 기반으로 프록시를 통해 액세스 할 수있는 각 포드에 대한 엔드 포인트를 자동으로 생성함



5. 포드 이름을 얻어야 하고(get) 환경 변수 POD_NAME에 저장

```
$ export POD_NAME=$(kubectl get pods -o go-template --template '{{rang .items}}{{.metadata.name}}{{"\n"}}{{end}}')
$ echo Name of the Pod: $POD_NAME
Name of the Pod: kubernetes-bootcamp-75bccb7d87-cdkj7
```

 $POD_NAME을 echo 명령어를 통해 출력해본 결과 kubernetes-bootcamp-75bccb7d87-cdkj7이 나옴을 확인

프록시를 사용하지 않고 새 배포에 액세스 할 수 있으려면 **service**가 필요!



## 3. Explore your App

pod는 쿠버네티스의 추상적 개념으로 일부는 컨테이너에 대한 자원을 공유

최소단위

deployment를 생성할 때, 그 deployment는 컨테이너 내부에서 컨테이너와 함께 pod를 생성

각 pod는 스케쥴 되어진 노드에 할당



언제나 노드 상에서 동작한다

[참고]노드는 쿠버네티스의 워커머신



- **kubectl get** - 자원을 나열한다
- **kubectl describe** - 자원에 대해 상세한 정보를 보여준다.
- **kubectl logs** - 파드 내 컨테이너의 로그들을 출력한다
- **kubectl exec** - 파드 내 컨테이너에 대한 명령을 실행한다.



___

1. pods의 자원 나열

`$ kubectl get pods`

```
NAME                                   READY   STATUS    RESTARTS   AGE
kubernetes-bootcamp-5b48cfdcbd-67xrg   1/1     Running   0          81s
```



2. pod에 있는 컨테이너와, 컨테이너를 빌드하는 데 사용되는 이미지 확인

`$ kubectl describe pods`

```
Name:           kubernetes-bootcamp-5b48cfdcbd-67xrg
Namespace:      default
Priority:       0
Node:           minikube/172.17.0.77
Start Time:     Thu, 12 Dec 2019 12:44:32 +0000
Labels:         pod-template-hash=5b48cfdcbd
                run=kubernetes-bootcamp
Annotations:    <none>
Status:         Running
IP:             172.18.0.3
Controlled By:  ReplicaSet/kubernetes-bootcamp-5b48cfdcbd
Containers:
  kubernetes-bootcamp:
    Container ID:   docker://1211fd310d269beb35cd22d4d244f7ec3bc154931428e66635915ba588a2dde6
    Image:          gcr.io/google-samples/kubernetes-bootcamp:v1
    Image ID:       docker-pullable://jocatalin/kubernetes-bootcamp@sha256:0d6b8ee63bb57c5f5b6156f446b3bc3b3c143d233037f3a2f00e279c8fcc64af
    Port:           8080/TCP
    Host Port:      0/TCP
    State:          Running
      Started:      Thu, 12 Dec 2019 12:44:36 +0000
    Ready:          True
    Restart Count:  0
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from default-token-lrvj8 (ro)
Conditions:
  Type              Status
  Initialized       True
  Ready             True
  ContainersReady   True
  PodScheduled      True
Volumes:
  default-token-lrvj8:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  default-token-lrvj8
    Optional:    false
QoS Class:       BestEffort
Node-Selectors:  <none>
Tolerations:     node.kubernetes.io/not-ready:NoExecute for 300s
                 node.kubernetes.io/unreachable:NoExecute for 300s
Events:
  Type    Reason     Age   From               Message
  ----    ------     ----  ----               -------
  Normal  Scheduled  108s  default-scheduler  Successfully assigned default/kubernetes-bootcamp-5b48cfdcbd-67xrg to minikube
  Normal  Pulled     105s  kubelet, minikube  Container image "gcr.io/google-samples/kubernetes-bootcamp:v1" already present on machine
  Normal  Created    105s  kubelet, minikube  Created container kubernetes-bootcamp
  Normal  Started    104s  kubelet, minikube  Started container kubernetes-bootcamp
```

Port가 8080/TCP를 확인!



3. 새로운 터미널을  열어 프록시를 띄움

```
$ echo -e "\n\n\n\e[92mStarting Proxy. After starting it will not output a response. Please click the first Terminal Tab\n"; kubectl proxy



Starting Proxy. After starting it will not output a response. Please click the first Terminal Tab

Starting to serve on 127.0.0.1:8001
```



4. 포드 이름을  get,  환경 변수 POD_NAME에 저장

```
$ export POD_NAME=$(kubectl get pods -o go-template --template '{{range .items}}{{.metadata.name}}{{"\n"}}{{end}}')
$ echo Name of the Pod: $POD_NAME
Name of the Pod: kubernetes-bootcamp-5b48cfdcbd-67xrg
```



5. curl요청을 통해 해당 App을 볼 수 있음

```
$ curl http://localhost:8001/api/v1/namespaces/default/pods/$POD_NAME/proxy/
Hello Kubernetes bootcamp! | Running on: kubernetes-bootcamp-5b48cfdcbd-67xrg | v=1
```



6. 로그 검색

`$ kubectl logs $POD_NAME`

```
Kubernetes Bootcamp App Started At: 2019-12-12T12:44:36.498Z | RunningOn:  kubernetes-bootcamp-5b48cfdcbd-67xrg

Running On: kubernetes-bootcamp-5b48cfdcbd-67xrg | Total Requests: 1 |App Uptime: 244.109 seconds | Log Time: 2019-12-12T12:48:40.607Z
```

사실 컨테이너가 하나밖에 없으므로 이름을 지정할 필요는 없다



7. 컨테이너에서 직접 명령 실행

`$ kubectl exec $POD_NAME env`

```
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
HOSTNAME=kubernetes-bootcamp-5b48cfdcbd-67xrg
KUBERNETES_PORT=tcp://10.96.0.1:443
KUBERNETES_PORT_443_TCP=tcp://10.96.0.1:443
KUBERNETES_PORT_443_TCP_PROTO=tcp
KUBERNETES_PORT_443_TCP_PORT=443
KUBERNETES_PORT_443_TCP_ADDR=10.96.0.1
KUBERNETES_SERVICE_HOST=10.96.0.1
KUBERNETES_SERVICE_PORT=443
KUBERNETES_SERVICE_PORT_HTTPS=443
NPM_CONFIG_LOGLEVEL=info
NODE_VERSION=6.3.1
HOME=/root
```

pod가 실행되면 컨테이너에서 직접 명령을 실행할 수 있다



8. 컨테이너에서 bash 실행,  server.js 파일을 봐보자

```
$ kubectl exec -ti $POD_NAME bash
root@kubernetes-bootcamp-5b48cfdcbd-67xrg:/#cat server.js
```

```
var http = require('http');
var requests=0;
var podname= process.env.HOSTNAME;
var startTime;
var host;
var handleRequest = function(request, response) {
  response.setHeader('Content-Type', 'text/plain');
  response.writeHead(200);
  response.write("Hello Kubernetes bootcamp! | Running on: ");
  response.write(host);
  response.end(" | v=1\n");
  console.log("Running On:" ,host, "| Total Requests:", ++requests,"| App Uptime:", (new Date() - startTime)/1000 , "seconds", "| Log Time:",new Date());
}
var www = http.createServer(handleRequest);
www.listen(8080,function () {
    startTime = new Date();;
    host = process.env.HOSTNAME;
    console.log ("Kubernetes Bootcamp App Started At:",startTime, "| Running On: " ,host, "\n" );
});
```

App의 소스코드를 볼 수 있다, 8080 포트 유심히 살피기!



9. 또한 curl명령 실행하여 App의 작동 확인

```
root@kubernetes-bootcamp-5b48cfdcbd-67xrg:/# curl localhost:8080
Hello Kubernetes bootcamp! | Running on: kubernetes-bootcamp-5b48cfdcbd-67xrg | v=1
```

localhost:8080로 요청, 잘 작동되고 있다



## 4. Expose your App Publicly

pods는 생명주기를 갖기 때문에 언제가는 죽는다

워커노드가 죽으면 노드 상에서 동작하는 파드들도 죽는다

서비스는 하나의 논리적인 파드 셋과 그 파드들에 접근할 수 있는 정책을 정의하는 추상적 개념

서비스는 yaml or json을 이용하여 정의된다

각 pod 는 고유한 ip 를 갖고 있다

서비스들은 ServiceSpec 에서 type을 지정함으로써 다양한 방식으로 노출시킬 수 있음

- *ClusterIP* (기본값) - 클러스터 내에서 내부 IP 에 대해 서비스를 노출해준다. 이 방식은 오직 클러스터 내에서만 서비스가 접근될 수 있도록 해준다.

- *NodePort* - NAT가 이용되는 클러스터 내에서 각각 선택된 노드들의 동일한 포트에 서비스를 노출시켜준다. `:`를 이용하여 클러스터 외부로부터 서비스가 접근할 수 있도록 해준다. CluserIP의 상위 집합이다.

- *LoadBalancer* - (지원 가능한 경우) 기존 클라우드에서 외부용 로드밸런서를 생성하고 서비스에 고정된 공인 IP를 할당해준다. NodePort의 상위 집합이다.

  

___



1. pod 자원 나열

`$ kubectl get pods`

```
NAME                                   READY   STATUS    RESTARTS   AGE
kubernetes-bootcamp-5b48cfdcbd-8jb25   1/1     Running   0          95s
```

kubernetes-bootcamp-5b48cfdcbd-8jb25이 실행중임을 확인한다



2. services 자원 나열

`$ kubectl get services`

```
NAME         TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   2m24s
```

kubernetes이름의 서비스가 있다. 이는 default 만들어진 서비스이다



3. 외부로 노출시키기 위한 명령, 타입은 NodePort

```
$ kubectl expose deployment/kubernetes-bootcamp --type="NodePort" --port 8080
service/kubernetes-bootcamp exposed
```

[참고] *NodePort* - NAT가 이용되는 클러스터 내에서 각각 선택된 노드들의 동일한 포트에 서비스를 노출시켜준다. `:`를 이용하여 클러스터 외부로부터 서비스가 접근할 수 있도록 해준다. CluserIP의 상위 집합이다.

```
$ kubectl get services
NAME                  TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)          AGE
kubernetes            ClusterIP   10.96.0.1      <none>        443/TCP          3m11s
kubernetes-bootcamp   NodePort    10.108.67.75   <none>        8080:32514/TCP   25s
```

다시 서비스 자원을 확인한 결과 kubernetes-bootcamp 이름의 새로운 서비스가 생겼다!



4. 서비스의 상세한 정보 확인

`$ kubectl describe services/kubernetes-bootcamp`

```
Name:                     kubernetes-bootcamp
Namespace:                default
Labels:                   run=kubernetes-bootcamp
Annotations:              <none>
Selector:                 run=kubernetes-bootcamp
Type:                     NodePort
IP:                       10.108.67.75
Port:                     <unset>  8080/TCP
TargetPort:               8080/TCP
NodePort:                 <unset>  32514/TCP
Endpoints:                172.18.0.4:8080
Session Affinity:         None
External Traffic Policy:  Cluster
Events:                   <none>
```

이름, 네임스페이스, 라벨, 셀렉터, 타입, 아이피, 포트 등의 정보를 볼 수 있다

**NodePort: 32514/TCP** 유심히!



5. NODE_PORT라고 불리는 환경변수 만들기

```
$ export NODE_PORT=$(kubectl get services/kubernetes-bootcamp -o go-template='{{(index .spec.ports 0).nodePort}}')
$ echo NODE_PORT=$NODE_PORT
NODE_PORT=32514
```

출력결과  32514가 출력됨을 확인할 수 있다



6. CURL명령어를 통해 이 App이 외부로 노출되었는지 확인

`$ curl $(minikube ip):$NODE_PORT`

```
Hello Kubernetes bootcamp! | Running on: kubernetes-bootcamp-5b48cfdcbd-8jb25 | v=1
```

잘 구동되고 있다



7. deployment 상세정보 확인

`$ kubectl describe deployment`

```
Name:                   kubernetes-bootcamp
Namespace:              default
CreationTimestamp:      Thu, 12 Dec 2019 13:13:59 +0000
Labels:                 run=kubernetes-bootcamp
Annotations:            deployment.kubernetes.io/revision: 1
Selector:               run=kubernetes-bootcamp
Replicas:               1 desired | 1 updated | 1 total | 1 available | 0 unavailable
StrategyType:           RollingUpdate
MinReadySeconds:        0
RollingUpdateStrategy:  25% max unavailable, 25% max surge
Pod Template:
  Labels:  run=kubernetes-bootcamp
  Containers:
   kubernetes-bootcamp:
    Image:        gcr.io/google-samples/kubernetes-bootcamp:v1
    Port:         8080/TCP
    Host Port:    0/TCP
    Environment:  <none>
    Mounts:       <none>
  Volumes:        <none>
Conditions:
  Type           Status  Reason
  ----           ------  ------
  Available      True    MinimumReplicasAvailable
  Progressing    True    NewReplicaSetAvailable
OldReplicaSets:  <none>
NewReplicaSet:   kubernetes-bootcamp-5b48cfdcbd (1/1 replicas created)
Events:
  Type    Reason             Age    From                   Message
  ----    ------             ----   ----                   -------
  Normal  ScalingReplicaSet  8m41s  deployment-controller  Scaled up replica setkubernetes-bootcamp-5b48cfdcbd to 1
```

**Labels:  run=kubernetes-bootcamp**  유심히!



8. label -l 파라미터를 통해 run=kubernetes-bootcamp의 pods 자원 나열

```
$ kubectl get pods -l run=kubernetes-bootcamp
NAME                                   READY   STATUS    RESTARTS   AGE
kubernetes-bootcamp-5b48cfdcbd-8jb25   1/1     Running   0          9m46s
```

맞게 출력되었다



9. label -l 파라미터를 통해 run=kubernetes-bootcamp의 service 자원 나열

```
$ kubectl get services -l run=kubernetes-bootcamp
NAME                  TYPE       CLUSTER-IP     EXTERNAL-IP   PORT(S)          AGE
kubernetes-bootcamp   NodePort   10.108.67.75   <none>        8080:32514/TCP   8m48s
```

맞게 출력되었다



10. POD_NAME의 환경변수 지정

```
$ export POD_NAME=$(kubectl get pods -o go-template --template '{{range .items}}{{.metadata.name}}{{"\n"}}{{end}}')
$ echo Name of the Pod: $POD_NAME
Name of the Pod: kubernetes-bootcamp-5b48cfdcbd-8jb25
```

역시 맞게 출력되었다!



11. 새 레이블 적용

```
$ kubectl label pod $POD_NAME app=v1
pod/kubernetes-bootcamp-5b48cfdcbd-8jb25 labeled
```



12. 적용되었는지 상세정보 확인

`$ kubectl describe pods $POD_NAME`

```
Name:           kubernetes-bootcamp-5b48cfdcbd-8jb25
Namespace:      default
Priority:       0
Node:           minikube/172.17.0.9
Start Time:     Thu, 12 Dec 2019 13:14:09 +0000
Labels:         app=v1
                pod-template-hash=5b48cfdcbd
                run=kubernetes-bootcamp
Annotations:    <none>
Status:         Running
IP:             172.18.0.4
Controlled By:  ReplicaSet/kubernetes-bootcamp-5b48cfdcbd
Containers:
  kubernetes-bootcamp:
    Container ID:   docker://643867000ed086c3ffc918c3830fa097677536ed972946904114eaa6b625f91c
    Image:          gcr.io/google-samples/kubernetes-bootcamp:v1
    Image ID:       docker-pullable://jocatalin/kubernetes-bootcamp@sha256:0d6b8ee63bb57c5f5b6156f446b3bc3b3c143d233037f3a2f00e279c8fcc64af
    Port:           8080/TCP
    Host Port:      0/TCP
    State:          Running
      Started:      Thu, 12 Dec 2019 13:14:28 +0000
    Ready:          True
    Restart Count:  0
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from default-token-txtq4 (ro)
Conditions:
  Type              Status
  Initialized       True
  Ready             True
  ContainersReady   True
  PodScheduled      True
Volumes:
  default-token-txtq4:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  default-token-txtq4
    Optional:    false
QoS Class:       BestEffort
Node-Selectors:  <none>
Tolerations:     node.kubernetes.io/not-ready:NoExecute for 300s
                 node.kubernetes.io/unreachable:NoExecute for 300s
Events:
  Type    Reason     Age   From               Message
  ----    ------     ----  ----               -------
  Normal  Scheduled  13m   default-scheduler  Successfully assigned default/kubernetes-bootcamp-5b48cfdcbd-8jb25 to minikube
  Normal  Pulled     13m   kubelet, minikube  Container image "gcr.io/google-samples/kubernetes-bootcamp:v1" already present on machine
  Normal  Created    13m   kubelet, minikube  Created container kubernetes-bootcamp
  Normal  Started    13m   kubelet, minikube  Started container kubernetes-bootcamp
```

Labels:    app=v1
                pod-template-hash=5b48cfdcbd
                run=kubernetes-bootcamp

새로 만든 레이블의 정보가 잘 적용되었다



13. 라벨을 이용해서 pods 자원 나열

`$ kubectl get pods -l app=v1`

```
NAME                                   READY   STATUS    RESTARTS   AGE
kubernetes-bootcamp-5b48cfdcbd-8jb25   1/1     Running   0          15m
```

맞게 출력되었다



14. 서비스 삭제

`$ kubectl delete service -l run=kubernetes-bootcamp`



15. 서비스 자원 나열

```
$ kubectl get services
NAME         TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   17m
```

kubernetes-bootcamp 서비스가 사라짐을 볼 수 있다



16. 접근 가능 확인

```
$ curl $(minikube ip):$NODE_PORT
curl: (7) Failed to connect to 172.17.0.9 port 32514: Connection refused
```

kubernetes-bootcamp 서비스를 삭제했기 때문에 연결할 수 없다. 즉 더 이상 클러스터 외부에서 App에 접근할 수 없다



17. pod내에 App 실행 상태 확인

```
$ kubectl exec -ti $POD_NAME curl localhost:8080
Hello Kubernetes bootcamp! | Running on: kubernetes-bootcamp-5b48cfdcbd-8jb25 | v=1
```

 Deployment에서 App 을 괄리하기 때문에 여전히 가동 중이다. 



## 5. Scale your App

여태 사용한 Deployment는 App을 구동하기 위해 하나의 pod만 생성했다

트래픽이 증가하면 App의 규모를 조정할 필요가 있다



___



1. Deployments 자원나열

```
$ kubectl get deployments
NAME                  READY   UP-TO-DATE   AVAILABLE   AGE
kubernetes-bootcamp   0/1     1            0           9s
```



2. 4개의 복제본으로 확장

```
$ kubectl scale deployments/kubernetes-bootcamp --replicas=4
deployment.extensions/kubernetes-bootcamp scaled
```



3. deployments 자원 나열

```
$ kubectl get deployments
NAME                  READY   UP-TO-DATE   AVAILABLE   AGE
kubernetes-bootcamp   4/4     4            4           81s
```

4개로 늘어났다!



4. pods의 자원 나열

```
$ kubectl get pods -o wide
NAME                                   READY   STATUS    RESTARTS   AGE   IP      NODE       NOMINATED NODE   READINESS GATES
kubernetes-bootcamp-5b48cfdcbd-9hxnn   1/1     Running   0          73s   172.18.0.6   minikube   <none>           <none>
kubernetes-bootcamp-5b48cfdcbd-gzdbf   1/1     Running   0          90s   172.18.0.4   minikube   <none>           <none>
kubernetes-bootcamp-5b48cfdcbd-hqclg   1/1     Running   0          73s   172.18.0.8   minikube   <none>           <none>
kubernetes-bootcamp-5b48cfdcbd-p2s6t   1/1     Running   0          73s   172.18.0.7   minikube   <none>           <none>
```

각각 다른 ip주소를 보유하고 있다. 

[참고]pod마다 다른 ip주소를 갖는다



5. deployments/kubernetes-bootcamp상세정보 확인

```
$ kubectl describe deployments/kubernetes-bootcamp
Name:                   kubernetes-bootcamp
Namespace:              default
CreationTimestamp:      Thu, 12 Dec 2019 13:37:29 +0000
Labels:                 run=kubernetes-bootcamp
Annotations:            deployment.kubernetes.io/revision: 1
Selector:               run=kubernetes-bootcamp
Replicas:               4 desired | 4 updated | 4 total | 4 available | 0 unavailable
StrategyType:           RollingUpdate
MinReadySeconds:        0
RollingUpdateStrategy:  25% max unavailable, 25% max surge
Pod Template:
  Labels:  run=kubernetes-bootcamp
  Containers:
   kubernetes-bootcamp:
    Image:        gcr.io/google-samples/kubernetes-bootcamp:v1
    Port:         8080/TCP
    Host Port:    0/TCP
    Environment:  <none>
    Mounts:       <none>
  Volumes:        <none>
Conditions:
  Type           Status  Reason
  ----           ------  ------
  Progressing    True    NewReplicaSetAvailable
  Available      True    MinimumReplicasAvailable
OldReplicaSets:  <none>
NewReplicaSet:   kubernetes-bootcamp-5b48cfdcbd (4/4 replicas created)
Events:
  Type    Reason             Age    From                   Message
  ----    ------             ----   ----                   -------
  Normal  ScalingReplicaSet  3m15s  deployment-controller  Scaled up replica setkubernetes-bootcamp-5b48cfdcbd to 1
  Normal  ScalingReplicaSet  2m58s  deployment-controller  Scaled up replica setkubernetes-bootcamp-5b48cfdcbd to 4
```

Replicas:               4 desired | 4 updated | 4 total | 4 available | 0 unavailable

  Normal  ScalingReplicaSet  2m58s  deployment-controller  Scaled up replica setkubernetes-bootcamp-5b48cfdcbd to 4

4개로 늘어났음을 알 수 있다



6. services/kubernetes-bootcamp 서비스 자원 상세정보

```
$ kubectl describe services/kubernetes-bootcamp
Name:                     kubernetes-bootcamp
Namespace:                default
Labels:                   run=kubernetes-bootcamp
Annotations:              <none>
Selector:                 run=kubernetes-bootcamp
Type:                     NodePort
IP:                       10.103.63.176
Port:                     <unset>  8080/TCP
TargetPort:               8080/TCP
NodePort:                 <unset>  31950/TCP
Endpoints:                172.18.0.4:8080,172.18.0.6:8080,172.18.0.7:8080 + 1 more...
Session Affinity:         None
External Traffic Policy:  Cluster
Events:                   <none>
```

NodePort:  31950/TCP 유심히!



7. NODE_PORT 환경변수 설정

```
$ export NODE_PORT=$(kubectl get services/kubernetes-bootcamp -o go-template='{{(index .spec.ports 0).nodePort}}')
$ echo NODE_PORT=$NODE_PORT
NODE_PORT=31950
```



8. curl 명령어 요청을 통해 해당 App을 볼 수 있음

```
$ curl $(minikube ip):$NODE_PORT
Hello Kubernetes bootcamp! | Running on: kubernetes-bootcamp-5b48cfdcbd-hqclg | v=1
```

잘 작동되고 있다



9. replicas 수 줄이기

```
$ kubectl scale deployments/kubernetes-bootcamp --replicas=2
deployment.extensions/kubernetes-bootcamp scaled
```



10. deployments 자원 나열

```
$ kubectl get deployments
NAME                  READY   UP-TO-DATE   AVAILABLE   AGE
kubernetes-bootcamp   2/2     2            2           8m32s
```

실제 2개로 줄어든 모습을 볼 수 있다



11. pods의 자원 나열

```
$ kubectl get pods -o wide
NAME                                   READY   STATUS    RESTARTS   AGE     IP        NODE       NOMINATED NODE   READINESS GATES
kubernetes-bootcamp-5b48cfdcbd-gzdbf   1/1     Running   0          8m52s   172.18.0.4   minikube   <none>           <none>
kubernetes-bootcamp-5b48cfdcbd-hqclg   1/1     Running   0          8m35s   172.18.0.8   minikube   <none>           <none>
```





## 6. Update an App

Pod 인스턴스를 점진적으로 새로운 것으로 업데이트해준다

중단없이!



___



1. deployments 자원 나열

```
$ kubectl get deployments
NAME                  READY   UP-TO-DATE   AVAILABLE   AGE
kubernetes-bootcamp   4/4     4            4           29s
```

4개가 존재함!



2. pods 자원 나열

```
$ kubectl get pods
NAME                                   READY   STATUS    RESTARTS   AGE
kubernetes-bootcamp-5b48cfdcbd-4prjc   1/1     Running   0   68s
kubernetes-bootcamp-5b48cfdcbd-dtkcv   1/1     Running   0   68s
kubernetes-bootcamp-5b48cfdcbd-qnhpj   1/1     Running   0   68s
kubernetes-bootcamp-5b48cfdcbd-s7lxb   1/1     Running   0   68s
```



3. pods의 상세 정보 확인

```
$ kubectl describe pods
Name:           kubernetes-bootcamp-5b48cfdcbd-4prjc
Namespace:      default
Priority:       0
Node:           minikube/172.17.0.42
Start Time:     Thu, 12 Dec 2019 14:57:04 +0000
Labels:         pod-template-hash=5b48cfdcbd
                run=kubernetes-bootcamp
Annotations:    <none>
Status:         Running
IP:             172.18.0.2
Controlled By:  ReplicaSet/kubernetes-bootcamp-5b48cfdcbd
Containers:
  kubernetes-bootcamp:
    Container ID:   docker://ff5bd90186a8a52d1308e15eef0bf20e55b95a03adff9e57b3e66e774d22e458
    Image:          gcr.io/google-samples/kubernetes-bootcamp:v1
    Image ID:       docker-pullable://jocatalin/kubernetes-bootcamp@sha256:0d6b8ee63bb57c5f5b6156f446b3bc3b3c143d233037f3a2f00e279c8fcc64af
    Port:           8080/TCP
    Host Port:      0/TCP
    State:          Running
      Started:      Thu, 12 Dec 2019 14:57:10 +0000
    Ready:          True
    Restart Count:  0
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from default-token-mr7wn (ro)
Conditions:
  Type              Status
  Initialized       True
  Ready             True
  ContainersReady   True
  PodScheduled      True
Volumes:
  default-token-mr7wn:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  default-token-mr7wn
    Optional:    false
QoS Class:       BestEffort
Node-Selectors:  <none>
Tolerations:     node.kubernetes.io/not-ready:NoExecute for 300s
                 node.kubernetes.io/unreachable:NoExecute for 300s
Events:
  Type    Reason     Age   From               Message
  ----    ------     ----  ----               -------
  Normal  Scheduled  99s   default-scheduler  Successfully assigned default/kubernetes-bootcamp-5b48cfdcbd-4prjc to minikube
  Normal  Pulled     94s   kubelet, minikube  Container image "gcr.io/google-samples/kubernetes-bootcamp:v1" already present on machine
  Normal  Created    94s   kubelet, minikube  Created container kubernetes-bootcamp
  Normal  Started    93s   kubelet, minikube  Started container kubernetes-bootcamp


Name:           kubernetes-bootcamp-5b48cfdcbd-dtkcv
Namespace:      default
Priority:       0
Node:           minikube/172.17.0.42
Start Time:     Thu, 12 Dec 2019 14:57:04 +0000
Labels:         pod-template-hash=5b48cfdcbd
                run=kubernetes-bootcamp
Annotations:    <none>
Status:         Running
IP:             172.18.0.3
Controlled By:  ReplicaSet/kubernetes-bootcamp-5b48cfdcbd
Containers:
  kubernetes-bootcamp:
    Container ID:   docker://dd51999e5135ad5fa15e09f727aa5b01d6b95bc0f3efc4d7ac772a0010ccd9ae
    Image:          gcr.io/google-samples/kubernetes-bootcamp:v1
    Image ID:       docker-pullable://jocatalin/kubernetes-bootcamp@sha256:0d6b8ee63bb57c5f5b6156f446b3bc3b3c143d233037f3a2f00e279c8fcc64af
    Port:           8080/TCP
    Host Port:      0/TCP
    State:          Running
      Started:      Thu, 12 Dec 2019 14:57:10 +0000
    Ready:          True
    Restart Count:  0
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from default-token-mr7wn (ro)
Conditions:
  Type              Status
  Initialized       True
  Ready             True
  ContainersReady   True
  PodScheduled      True
Volumes:
  default-token-mr7wn:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  default-token-mr7wn
    Optional:    false
QoS Class:       BestEffort
Node-Selectors:  <none>
Tolerations:     node.kubernetes.io/not-ready:NoExecute for 300s
                 node.kubernetes.io/unreachable:NoExecute for 300s
Events:
  Type    Reason     Age   From               Message
  ----    ------     ----  ----               -------
  Normal  Scheduled  99s   default-scheduler  Successfully assigned default/kubernetes-bootcamp-5b48cfdcbd-dtkcv to minikube
  Normal  Pulled     93s   kubelet, minikube  Container image "gcr.io/google-samples/kubernetes-bootcamp:v1" already present on machine
  Normal  Created    93s   kubelet, minikube  Created container kubernetes-bootcamp
  Normal  Started    93s   kubelet, minikube  Started container kubernetes-bootcamp


Name:           kubernetes-bootcamp-5b48cfdcbd-qnhpj
Namespace:      default
Priority:       0
Node:           minikube/172.17.0.42
Start Time:     Thu, 12 Dec 2019 14:57:05 +0000
Labels:         pod-template-hash=5b48cfdcbd
                run=kubernetes-bootcamp
Annotations:    <none>
Status:         Running
IP:             172.18.0.4
Controlled By:  ReplicaSet/kubernetes-bootcamp-5b48cfdcbd
Containers:
  kubernetes-bootcamp:
    Container ID:   docker://8b02567f35f359c62645e5eba0166e5e2ffd785c63ea16a55abfeef3e6f0ad20
    Image:          gcr.io/google-samples/kubernetes-bootcamp:v1
    Image ID:       docker-pullable://jocatalin/kubernetes-bootcamp@sha256:0d6b8ee63bb57c5f5b6156f446b3bc3b3c143d233037f3a2f00e279c8fcc64af
    Port:           8080/TCP
    Host Port:      0/TCP
    State:          Running
      Started:      Thu, 12 Dec 2019 14:57:11 +0000
    Ready:          True
    Restart Count:  0
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from default-token-mr7wn (ro)
Conditions:
  Type              Status
  Initialized       True
  Ready             True
  ContainersReady   True
  PodScheduled      True
Volumes:
  default-token-mr7wn:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  default-token-mr7wn
    Optional:    false
QoS Class:       BestEffort
Node-Selectors:  <none>
Tolerations:     node.kubernetes.io/not-ready:NoExecute for 300s
                 node.kubernetes.io/unreachable:NoExecute for 300s
Events:
  Type    Reason     Age   From               Message
  ----    ------     ----  ----               -------
  Normal  Scheduled  98s   default-scheduler  Successfully assigned default/kubernetes-bootcamp-5b48cfdcbd-qnhpj to minikube
  Normal  Pulled     93s   kubelet, minikube  Container image "gcr.io/google-samples/kubernetes-bootcamp:v1" already present on machine
  Normal  Created    93s   kubelet, minikube  Created container kubernetes-bootcamp
  Normal  Started    92s   kubelet, minikube  Started container kubernetes-bootcamp


Name:           kubernetes-bootcamp-5b48cfdcbd-s7lxb
Namespace:      default
Priority:       0
Node:           minikube/172.17.0.42
Start Time:     Thu, 12 Dec 2019 14:57:05 +0000
Labels:         pod-template-hash=5b48cfdcbd
                run=kubernetes-bootcamp
Annotations:    <none>
Status:         Running
IP:             172.18.0.6
Controlled By:  ReplicaSet/kubernetes-bootcamp-5b48cfdcbd
Containers:
  kubernetes-bootcamp:
    Container ID:   docker://491bd5c966c5abec5c2e5f41f4018ae975752f32136479c9ae726451fda21118
    Image:          gcr.io/google-samples/kubernetes-bootcamp:v1
    Image ID:       docker-pullable://jocatalin/kubernetes-bootcamp@sha256:0d6b8ee63bb57c5f5b6156f446b3bc3b3c143d233037f3a2f00e279c8fcc64af
    Port:           8080/TCP
    Host Port:      0/TCP
    State:          Running
      Started:      Thu, 12 Dec 2019 14:57:11 +0000
    Ready:          True
    Restart Count:  0
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from default-token-mr7wn (ro)
Conditions:
  Type              Status
  Initialized       True
  Ready             True
  ContainersReady   True
  PodScheduled      True
Volumes:
  default-token-mr7wn:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  default-token-mr7wn
    Optional:    false
QoS Class:       BestEffort
Node-Selectors:  <none>
Tolerations:     node.kubernetes.io/not-ready:NoExecute for 300s
                 node.kubernetes.io/unreachable:NoExecute for 300s
Events:
  Type    Reason     Age   From               Message
  ----    ------     ----  ----               -------
  Normal  Scheduled  99s   default-scheduler  Successfully assigned default/kubernetes-bootcamp-5b48cfdcbd-s7lxb to minikube
  Normal  Pulled     93s   kubelet, minikube  Container image "gcr.io/google-samples/kubernetes-bootcamp:v1" already present on machine
  Normal  Created    93s   kubelet, minikube  Created container kubernetes-bootcamp
  Normal  Started    92s   kubelet, minikube  Started container kubernetes-bootcamp
```

4개라서 매우 많은 양이....



4. App 실행 상태 상세 확인

```
$ kubectl describe services/kubernetes-bootcamp
Name:                     kubernetes-bootcamp
Namespace:                default
Labels:                   run=kubernetes-bootcamp
Annotations:              <none>
Selector:                 run=kubernetes-bootcamp
Type:                     NodePort
IP:                       10.106.46.147
Port:                     <unset>  8080/TCP
TargetPort:               8080/TCP
NodePort:                 <unset>  32749/TCP
Endpoints:                172.18.0.2:8080,172.18.0.3:8080,172.18.0.4:8080 + 1 more...
Session Affinity:         None
External Traffic Policy:  Cluster
Events:                   <none>
```

노출된 ip & port 를 찾을 수 있다

IP: 10.106.46.147
Port: 8080/TCP, NodePort:  32749/TCP



5. NODE_PORT 환경변수 생성

```
$ export NODE_PORT=$(kubectl get services/kubernetes-bootcamp -ogo-template='{{(index .spec.ports 0).nodePort}}')
$ echo NODE_PORT=$NODE_PORT
NODE_PORT=32749
```



6. curl 통해 확인

```
$ curl $(minikube ip):$NODE_PORT
Hello Kubernetes bootcamp! | Running on: kubernetes-bootcamp-5b48cfdcbd-dtkcv | v=1
```

잘 구동중이다



7. 이미지 업데이트

```
$ kubectl set image deployments/kubernetes-bootcamp kubernetes-bootcamp=gcr.io/google-samples/kubernetes-bootcamp:v10
deployment.extensions/kubernetes-bootcamp image updated
```



```
$ kubectl get deployments
NAME                  READY   UP-TO-DATE   AVAILABLE   AGE
kubernetes-bootcamp   3/4     2            3           6m41s
```



```
$ kubectl get pods
NAME                                   READY   STATUS         RESTARTS   AGE
kubernetes-bootcamp-547469f5dd-8fxwj   0/1     ErrImagePull   0        42s
kubernetes-bootcamp-547469f5dd-ms2cp   0/1     ErrImagePull   0        42s
kubernetes-bootcamp-5b48cfdcbd-4prjc   1/1     Running        0        6m56s
kubernetes-bootcamp-5b48cfdcbd-qnhpj   1/1     Running        0        6m56s
kubernetes-bootcamp-5b48cfdcbd-s7lxb   1/1     Running        0        6m56s
```



```
$ kubectl describe pods
Name:           kubernetes-bootcamp-547469f5dd-8fxwj
Namespace:      default
Priority:       0
Node:           minikube/172.17.0.42
Start Time:     Thu, 12 Dec 2019 15:03:18 +0000
Labels:         pod-template-hash=547469f5dd
                run=kubernetes-bootcamp
Annotations:    <none>
Status:         Pending
IP:             172.18.0.9
Controlled By:  ReplicaSet/kubernetes-bootcamp-547469f5dd
Containers:
  kubernetes-bootcamp:
    Container ID:
    Image:          gcr.io/google-samples/kubernetes-bootcamp:v10
    Image ID:
    Port:           8080/TCP
    Host Port:      0/TCP
    State:          Waiting
      Reason:       ImagePullBackOff
    Ready:          False
    Restart Count:  0
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from default-token-mr7wn (ro)
Conditions:
  Type              Status
  Initialized       True
  Ready             False
  ContainersReady   False
  PodScheduled      True
Volumes:
  default-token-mr7wn:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  default-token-mr7wn
    Optional:    false
QoS Class:       BestEffort
Node-Selectors:  <none>
Tolerations:     node.kubernetes.io/not-ready:NoExecute for 300s
                 node.kubernetes.io/unreachable:NoExecute for 300s
Events:
  Type     Reason     Age                From               Message
  ----     ------     ----               ----               -------
  Normal   Scheduled  57s                default-scheduler  Successfully assigned default/kubernetes-bootcamp-547469f5dd-8fxwj tominikube
  Normal   BackOff    25s (x3 over 54s)  kubelet, minikube  Back-off pulling image "gcr.io/google-samples/kubernetes-bootcamp:v10"
  Warning  Failed     25s (x3 over 54s)  kubelet, minikube  Error: ImagePullBackOff
  Normal   Pulling    12s (x3 over 55s)  kubelet, minikube  Pulling image "gcr.io/google-samples/kubernetes-bootcamp:v10"
  Warning  Failed     11s (x3 over 55s)  kubelet, minikube  Failed to pull image "gcr.io/google-samples/kubernetes-bootcamp:v10":rpc error: code = Unknown desc = Error response from daemon: manifest for gcr.io/google-samples/kubernetes-bootcamp:v10 not found
  Warning  Failed     11s (x3 over 55s)  kubelet, minikube  Error: ErrImagePull


Name:           kubernetes-bootcamp-547469f5dd-ms2cp
Namespace:      default
Priority:       0
Node:           minikube/172.17.0.42
Start Time:     Thu, 12 Dec 2019 15:03:18 +0000
Labels:         pod-template-hash=547469f5dd
                run=kubernetes-bootcamp
Annotations:    <none>
Status:         Pending
IP:             172.18.0.10
Controlled By:  ReplicaSet/kubernetes-bootcamp-547469f5dd
Containers:
  kubernetes-bootcamp:
    Container ID:
    Image:          gcr.io/google-samples/kubernetes-bootcamp:v10
    Image ID:
    Port:           8080/TCP
    Host Port:      0/TCP
    State:          Waiting
      Reason:       ImagePullBackOff
    Ready:          False
    Restart Count:  0
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from default-token-mr7wn (ro)
Conditions:
  Type              Status
  Initialized       True
  Ready             False
  ContainersReady   False
  PodScheduled      True
Volumes:
  default-token-mr7wn:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  default-token-mr7wn
    Optional:    false
QoS Class:       BestEffort
Node-Selectors:  <none>
Tolerations:     node.kubernetes.io/not-ready:NoExecute for 300s
                 node.kubernetes.io/unreachable:NoExecute for 300s
Events:
  Type     Reason     Age                From               Message
  ----     ------     ----               ----               -------
  Normal   Scheduled  57s                default-scheduler  Successfully assigned default/kubernetes-bootcamp-547469f5dd-ms2cp tominikube
  Normal   BackOff    25s (x3 over 54s)  kubelet, minikube  Back-off pulling image "gcr.io/google-samples/kubernetes-bootcamp:v10"
  Warning  Failed     25s (x3 over 54s)  kubelet, minikube  Error: ImagePullBackOff
  Normal   Pulling    13s (x3 over 55s)  kubelet, minikube  Pulling image "gcr.io/google-samples/kubernetes-bootcamp:v10"
  Warning  Failed     12s (x3 over 54s)  kubelet, minikube  Failed to pull image "gcr.io/google-samples/kubernetes-bootcamp:v10":rpc error: code = Unknown desc = Error response from daemon: manifest for gcr.io/google-samples/kubernetes-bootcamp:v10 not found
  Warning  Failed     12s (x3 over 54s)  kubelet, minikube  Error: ErrImagePull


Name:           kubernetes-bootcamp-5b48cfdcbd-4prjc
Namespace:      default
Priority:       0
Node:           minikube/172.17.0.42
Start Time:     Thu, 12 Dec 2019 14:57:04 +0000
Labels:         pod-template-hash=5b48cfdcbd
                run=kubernetes-bootcamp
Annotations:    <none>
Status:         Running
IP:             172.18.0.2
Controlled By:  ReplicaSet/kubernetes-bootcamp-5b48cfdcbd
Containers:
  kubernetes-bootcamp:
    Container ID:   docker://ff5bd90186a8a52d1308e15eef0bf20e55b95a03adff9e57b3e66e774d22e458
    Image:          gcr.io/google-samples/kubernetes-bootcamp:v1
    Image ID:       docker-pullable://jocatalin/kubernetes-bootcamp@sha256:0d6b8ee63bb57c5f5b6156f446b3bc3b3c143d233037f3a2f00e279c8fcc64af
    Port:           8080/TCP
    Host Port:      0/TCP
    State:          Running
      Started:      Thu, 12 Dec 2019 14:57:10 +0000
    Ready:          True
    Restart Count:  0
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from default-token-mr7wn (ro)
Conditions:
  Type              Status
  Initialized       True
  Ready             True
  ContainersReady   True
  PodScheduled      True
Volumes:
  default-token-mr7wn:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  default-token-mr7wn
    Optional:    false
QoS Class:       BestEffort
Node-Selectors:  <none>
Tolerations:     node.kubernetes.io/not-ready:NoExecute for 300s
                 node.kubernetes.io/unreachable:NoExecute for 300s
Events:
  Type    Reason     Age    From               Message
  ----    ------     ----   ----               -------
  Normal  Scheduled  7m11s  default-scheduler  Successfully assigned default/kubernetes-bootcamp-5b48cfdcbd-4prjc to minikube
  Normal  Pulled     7m6s   kubelet, minikube  Container image "gcr.io/google-samples/kubernetes-bootcamp:v1" already present on machine
  Normal  Created    7m6s   kubelet, minikube  Created containerkubernetes-bootcamp
  Normal  Started    7m5s   kubelet, minikube  Started containerkubernetes-bootcamp


Name:           kubernetes-bootcamp-5b48cfdcbd-qnhpj
Namespace:      default
Priority:       0
Node:           minikube/172.17.0.42
Start Time:     Thu, 12 Dec 2019 14:57:05 +0000
Labels:         pod-template-hash=5b48cfdcbd
                run=kubernetes-bootcamp
Annotations:    <none>
Status:         Running
IP:             172.18.0.4
Controlled By:  ReplicaSet/kubernetes-bootcamp-5b48cfdcbd
Containers:
  kubernetes-bootcamp:
    Container ID:   docker://8b02567f35f359c62645e5eba0166e5e2ffd785c63ea16a55abfeef3e6f0ad20
    Image:          gcr.io/google-samples/kubernetes-bootcamp:v1
    Image ID:       docker-pullable://jocatalin/kubernetes-bootcamp@sha256:0d6b8ee63bb57c5f5b6156f446b3bc3b3c143d233037f3a2f00e279c8fcc64af
    Port:           8080/TCP
    Host Port:      0/TCP
    State:          Running
      Started:      Thu, 12 Dec 2019 14:57:11 +0000
    Ready:          True
    Restart Count:  0
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from default-token-mr7wn (ro)
Conditions:
  Type              Status
  Initialized       True
  Ready             True
  ContainersReady   True
  PodScheduled      True
Volumes:
  default-token-mr7wn:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  default-token-mr7wn
    Optional:    false
QoS Class:       BestEffort
Node-Selectors:  <none>
Tolerations:     node.kubernetes.io/not-ready:NoExecute for 300s
                 node.kubernetes.io/unreachable:NoExecute for 300s
Events:
  Type    Reason     Age    From               Message
  ----    ------     ----   ----               -------
  Normal  Scheduled  7m10s  default-scheduler  Successfully assigned default/kubernetes-bootcamp-5b48cfdcbd-qnhpj to minikube
  Normal  Pulled     7m5s   kubelet, minikube  Container image "gcr.io/google-samples/kubernetes-bootcamp:v1" already present on machine
  Normal  Created    7m5s   kubelet, minikube  Created containerkubernetes-bootcamp
  Normal  Started    7m4s   kubelet, minikube  Started containerkubernetes-bootcamp


Name:           kubernetes-bootcamp-5b48cfdcbd-s7lxb
Namespace:      default
Priority:       0
Node:           minikube/172.17.0.42
Start Time:     Thu, 12 Dec 2019 14:57:05 +0000
Labels:         pod-template-hash=5b48cfdcbd
                run=kubernetes-bootcamp
Annotations:    <none>
Status:         Running
IP:             172.18.0.6
Controlled By:  ReplicaSet/kubernetes-bootcamp-5b48cfdcbd
Containers:
  kubernetes-bootcamp:
    Container ID:   docker://491bd5c966c5abec5c2e5f41f4018ae975752f32136479c9ae726451fda21118
    Image:          gcr.io/google-samples/kubernetes-bootcamp:v1
    Image ID:       docker-pullable://jocatalin/kubernetes-bootcamp@sha256:0d6b8ee63bb57c5f5b6156f446b3bc3b3c143d233037f3a2f00e279c8fcc64af
    Port:           8080/TCP
    Host Port:      0/TCP
    State:          Running
      Started:      Thu, 12 Dec 2019 14:57:11 +0000
    Ready:          True
    Restart Count:  0
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from default-token-mr7wn (ro)
Conditions:
  Type              Status
  Initialized       True
  Ready             True
  ContainersReady   True
  PodScheduled      True
Volumes:
  default-token-mr7wn:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  default-token-mr7wn
    Optional:    false
QoS Class:       BestEffort
Node-Selectors:  <none>
Tolerations:     node.kubernetes.io/not-ready:NoExecute for 300s
                 node.kubernetes.io/unreachable:NoExecute for 300s
Events:
  Type    Reason     Age    From               Message
  ----    ------     ----   ----               -------
  Normal  Scheduled  7m11s  default-scheduler  Successfully assigned default/kubernetes-bootcamp-5b48cfdcbd-s7lxb to minikube
  Normal  Pulled     7m5s   kubelet, minikube  Container image "gcr.io/google-samples/kubernetes-bootcamp:v1" already present on machine
  Normal  Created    7m5s   kubelet, minikube  Created containerkubernetes-bootcamp
  Normal  Started    7m4s   kubelet, minikube  Started containerkubernetes-bootcamp
```



롤아웃 실행 취소

```
$ kubectl rollout undo deployments/kubernetes-bootcamp
deployment.extensions/kubernetes-bootcamp rolled back
```



```
$ kubectl get pods
NAME                                   READY   STATUS    RESTARTS   AGE
kubernetes-bootcamp-5b48cfdcbd-4prjc   1/1     Running   0   7m43s
kubernetes-bootcamp-5b48cfdcbd-dgk59   1/1     Running   0   13s
kubernetes-bootcamp-5b48cfdcbd-qnhpj   1/1     Running   0   7m43s
kubernetes-bootcamp-5b48cfdcbd-s7lxb   1/1     Running   0   7m43s
```



```
$ kubectl describe pods
Name:           kubernetes-bootcamp-5b48cfdcbd-4prjc
Namespace:      default
Priority:       0
Node:           minikube/172.17.0.42
Start Time:     Thu, 12 Dec 2019 14:57:04 +0000
Labels:         pod-template-hash=5b48cfdcbd
                run=kubernetes-bootcamp
Annotations:    <none>
Status:         Running
IP:             172.18.0.2
Controlled By:  ReplicaSet/kubernetes-bootcamp-5b48cfdcbd
Containers:
  kubernetes-bootcamp:
    Container ID:   docker://ff5bd90186a8a52d1308e15eef0bf20e55b95a03adff9e57b3e66e774d22e458
    Image:          gcr.io/google-samples/kubernetes-bootcamp:v1
    Image ID:       docker-pullable://jocatalin/kubernetes-bootcamp@sha256:0d6b8ee63bb57c5f5b6156f446b3bc3b3c143d233037f3a2f00e279c8fcc64af
    Port:           8080/TCP
    Host Port:      0/TCP
    State:          Running
      Started:      Thu, 12 Dec 2019 14:57:10 +0000
    Ready:          True
    Restart Count:  0
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from default-token-mr7wn (ro)
Conditions:
  Type              Status
  Initialized       True
  Ready             True
  ContainersReady   True
  PodScheduled      True
Volumes:
  default-token-mr7wn:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  default-token-mr7wn
    Optional:    false
QoS Class:       BestEffort
Node-Selectors:  <none>
Tolerations:     node.kubernetes.io/not-ready:NoExecute for 300s
                 node.kubernetes.io/unreachable:NoExecute for 300s
Events:
  Type    Reason     Age    From               Message
  ----    ------     ----   ----               -------
  Normal  Scheduled  7m53s  default-scheduler  Successfully assigned default/kubernetes-bootcamp-5b48cfdcbd-4prjc to minikube
  Normal  Pulled     7m48s  kubelet, minikube  Container image "gcr.io/google-samples/kubernetes-bootcamp:v1" already present on machine
  Normal  Created    7m48s  kubelet, minikube  Created containerkubernetes-bootcamp
  Normal  Started    7m47s  kubelet, minikube  Started containerkubernetes-bootcamp


Name:           kubernetes-bootcamp-5b48cfdcbd-dgk59
Namespace:      default
Priority:       0
Node:           minikube/172.17.0.42
Start Time:     Thu, 12 Dec 2019 15:04:34 +0000
Labels:         pod-template-hash=5b48cfdcbd
                run=kubernetes-bootcamp
Annotations:    <none>
Status:         Running
IP:             172.18.0.3
Controlled By:  ReplicaSet/kubernetes-bootcamp-5b48cfdcbd
Containers:
  kubernetes-bootcamp:
    Container ID:   docker://6c5e64bcd5edfc7d144c8f8acb39ddf2939a13f2a35b971f04b104c313af922f
    Image:          gcr.io/google-samples/kubernetes-bootcamp:v1
    Image ID:       docker-pullable://jocatalin/kubernetes-bootcamp@sha256:0d6b8ee63bb57c5f5b6156f446b3bc3b3c143d233037f3a2f00e279c8fcc64af
    Port:           8080/TCP
    Host Port:      0/TCP
    State:          Running
      Started:      Thu, 12 Dec 2019 15:04:36 +0000
    Ready:          True
    Restart Count:  0
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from default-token-mr7wn (ro)
Conditions:
  Type              Status
  Initialized       True
  Ready             True
  ContainersReady   True
  PodScheduled      True
Volumes:
  default-token-mr7wn:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  default-token-mr7wn
    Optional:    false
QoS Class:       BestEffort
Node-Selectors:  <none>
Tolerations:     node.kubernetes.io/not-ready:NoExecute for 300s
                 node.kubernetes.io/unreachable:NoExecute for 300s
Events:
  Type    Reason     Age   From               Message
  ----    ------     ----  ----               -------
  Normal  Scheduled  23s   default-scheduler  Successfully assigned default/kubernetes-bootcamp-5b48cfdcbd-dgk59 to minikube
  Normal  Pulled     21s   kubelet, minikube  Container image "gcr.io/google-samples/kubernetes-bootcamp:v1" already present on machine
  Normal  Created    21s   kubelet, minikube  Created container kubernetes-bootcamp
  Normal  Started    21s   kubelet, minikube  Started container kubernetes-bootcamp


Name:           kubernetes-bootcamp-5b48cfdcbd-qnhpj
Namespace:      default
Priority:       0
Node:           minikube/172.17.0.42
Start Time:     Thu, 12 Dec 2019 14:57:05 +0000
Labels:         pod-template-hash=5b48cfdcbd
                run=kubernetes-bootcamp
Annotations:    <none>
Status:         Running
IP:             172.18.0.4
Controlled By:  ReplicaSet/kubernetes-bootcamp-5b48cfdcbd
Containers:
  kubernetes-bootcamp:
    Container ID:   docker://8b02567f35f359c62645e5eba0166e5e2ffd785c63ea16a55abfeef3e6f0ad20
    Image:          gcr.io/google-samples/kubernetes-bootcamp:v1
    Image ID:       docker-pullable://jocatalin/kubernetes-bootcamp@sha256:0d6b8ee63bb57c5f5b6156f446b3bc3b3c143d233037f3a2f00e279c8fcc64af
    Port:           8080/TCP
    Host Port:      0/TCP
    State:          Running
      Started:      Thu, 12 Dec 2019 14:57:11 +0000
    Ready:          True
    Restart Count:  0
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from default-token-mr7wn (ro)
Conditions:
  Type              Status
  Initialized       True
  Ready             True
  ContainersReady   True
  PodScheduled      True
Volumes:
  default-token-mr7wn:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  default-token-mr7wn
    Optional:    false
QoS Class:       BestEffort
Node-Selectors:  <none>
Tolerations:     node.kubernetes.io/not-ready:NoExecute for 300s
                 node.kubernetes.io/unreachable:NoExecute for 300s
Events:
  Type    Reason     Age    From               Message
  ----    ------     ----   ----               -------
  Normal  Scheduled  7m52s  default-scheduler  Successfully assigned default/kubernetes-bootcamp-5b48cfdcbd-qnhpj to minikube
  Normal  Pulled     7m47s  kubelet, minikube  Container image "gcr.io/google-samples/kubernetes-bootcamp:v1" already present on machine
  Normal  Created    7m47s  kubelet, minikube  Created containerkubernetes-bootcamp
  Normal  Started    7m46s  kubelet, minikube  Started containerkubernetes-bootcamp


Name:           kubernetes-bootcamp-5b48cfdcbd-s7lxb
Namespace:      default
Priority:       0
Node:           minikube/172.17.0.42
Start Time:     Thu, 12 Dec 2019 14:57:05 +0000
Labels:         pod-template-hash=5b48cfdcbd
                run=kubernetes-bootcamp
Annotations:    <none>
Status:         Running
IP:             172.18.0.6
Controlled By:  ReplicaSet/kubernetes-bootcamp-5b48cfdcbd
Containers:
  kubernetes-bootcamp:
    Container ID:   docker://491bd5c966c5abec5c2e5f41f4018ae975752f32136479c9ae726451fda21118
    Image:          gcr.io/google-samples/kubernetes-bootcamp:v1
    Image ID:       docker-pullable://jocatalin/kubernetes-bootcamp@sha256:0d6b8ee63bb57c5f5b6156f446b3bc3b3c143d233037f3a2f00e279c8fcc64af
    Port:           8080/TCP
    Host Port:      0/TCP
    State:          Running
      Started:      Thu, 12 Dec 2019 14:57:11 +0000
    Ready:          True
    Restart Count:  0
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from default-token-mr7wn (ro)
Conditions:
  Type              Status
  Initialized       True
  Ready             True
  ContainersReady   True
  PodScheduled      True
Volumes:
  default-token-mr7wn:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  default-token-mr7wn
    Optional:    false
QoS Class:       BestEffort
Node-Selectors:  <none>
Tolerations:     node.kubernetes.io/not-ready:NoExecute for 300s
                 node.kubernetes.io/unreachable:NoExecute for 300s
Events:
  Type    Reason     Age    From               Message
  ----    ------     ----   ----               -------
  Normal  Scheduled  7m53s  default-scheduler  Successfully assigned default/kubernetes-bootcamp-5b48cfdcbd-s7lxb to minikube
  Normal  Pulled     7m47s  kubelet, minikube  Container image "gcr.io/google-samples/kubernetes-bootcamp:v1" already present on machine
  Normal  Created    7m47s  kubelet, minikube  Created containerkubernetes-bootcamp
  Normal  Started    7m46s  kubelet, minikube  Started containerkubernetes-bootcamp
```

