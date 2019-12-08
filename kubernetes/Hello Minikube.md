## Hello Minikube

- 로컬 머신에 VM을 만들고 하나의 노드로 구성된 간단한 클러스터를 배포하는 가벼운 쿠버네티스 구현체

- 리눅스, 맥, 그리고 윈도우 시스템에서 구동이 가능



## Minikube Cluster 만들기

```shell
minikube start
```



## Deployment  만들기

Kubernetes pod는 관리와 네트워킹 목적으로 함께 묶여있는 하나 이상의 컨테이너 그룹.



1. `kubectl create` 명령어를 실행하여 파드를 관리할 디플로이먼트를 만든다. 이 파드는 제공된 Docker 이미지를 기반으로 한 컨테이너를 실행한다.

```shell
kubectl create deployment hello-node --image=gcr.io/hello-minikube-zero-install/hello-node
```



2. 디플로이먼트 보기

```shell
kubectl get deployments
```

​	Output:

```shell
NAME         READY   UP-TO-DATE   AVAILABLE   AGE
hello-node   1/1     1            1           1m
```



3. 파드 보기

```shell
kubectl get pods
```

​	Output:

```shell
NAME                          READY     STATUS    RESTARTS   AGE
hello-node-5f76cf6ccf-br9b5   1/1       Running   0          1
```



4. 클러스터 이벤트 보기

```shell
kubectl get events
```



5. kubectl` 환경설정 보기

```shell
kubectl config view
```



## Service 만들기

기본적으로 파드는 쿠버네티스 클러스터 내부의 IP 주소로만 접근할 수 있음



1. `hello-node` 컨테이너를 쿠버네티스 가상 네트워크 외부에서 접근하려면 파드를 쿠버네티스 [*서비스*](https://kubernetes.io/docs/concepts/services-networking/service/)로 노출해야 함

`kubectl expose` 명령어로 퍼블릭 인터넷에 파드 노출하기

```shell
kubectl expose deployment hello-node --type=LoadBalancer --port=8080
```

`--type=LoadBalancer`플래그는 클러스터 밖의 서비스로 노출하기 원한다는 뜻



2. 방금 생성한 서비스 살펴보기

```shell
kubectl get services
```

​	Output:

```shell
NAME         TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
hello-node   LoadBalancer   10.108.144.78   <pending>     8080:30369/TCP   21s
kubernetes   ClusterIP      10.96.0.1       <none>        443/TCP          23
```

로드 밸런서를 지원하는 클라우드 공급자의 경우에는 서비스에 접근할 수 있도록 외부 IP 주소가 프로비저닝 한다. Minikube에서 `LoadBalancer`타입은 `minikube service` 명령어를 통해서 해당 서비스를 접근할 수 있게 한다.

프로비저닝? 무엇인가 여럿 중에 최적인 것을 찾기 위해 필요한 지식을 미리 준비해놓고 요청에 맞게 공급하는 절차와 행위.  즉, 미리 정의된 정책이나 서비스를 사용자에게 지원해주는 것



3. 다음 명령어를 실행한다

```shell
minikube service hello-node
```



4. Katacoda 환경에서만: 플러스를 클릭한 후에 **Select port to view on Host 1** 를 클릭.



5. Katacoda 환경에서만: 서비스 출력에서 `8080`의 반대편에 표시되는 5자리 포트 번호를 기록 한다. 이 포트 번호는 무작위로 생성되며, 사용자마다 다를 수 있다. 포트 번호 텍스트 상자에 `30369` 를 입력한 다음, 포트 표시를 클릭한다. 이렇게 하면 당신의 앱을 서비스하는 브라우저 윈도우를 띄우고 “Hello World” 메시지를 보여준다.