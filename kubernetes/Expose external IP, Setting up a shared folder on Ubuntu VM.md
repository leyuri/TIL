https://kubernetes.io/ko/를 참고(쿠버네티스 기초 공식문서입니다)



## 외부 IP 주소를 노출하여 클러스터의 App에 접속하기



test를 위해 설치해 놓았던 ubuntu를 켜보자! **Kubernetes/ubuntu.md** 에서 상세한 내용을 담았으니 참고바람!

```
yuriui-MacBook-Pro% ssh ubuntu@192.168.219.103 -p2024 
ubuntu@192.168.219.103's password: 
Welcome to Ubuntu 18.04.3 LTS (GNU/Linux 4.15.0-72-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  System information as of Fri Dec 13 12:52:18 UTC 2019

  System load:  1.1                Processes:             120
  Usage of /:   34.2% of 19.56GB   Users logged in:       1
  Memory usage: 15%                IP address for enp0s3: 10.0.2.15
  Swap usage:   0%

 * Overheard at KubeCon: "microk8s.status just blew my mind".

     https://microk8s.io/docs/commands#microk8s.status

61 packages can be updated.
21 updates are security updates.


*** System restart required ***
Last login: Fri Dec 13 12:49:05 2019
ubuntu@ubuntu:~$ 

```

이제 수월하게 접속할 수 있쥬?



## 5개의 pods에서 실행되는 App에 대한 서비스를 만들어보자



cluster에서 helloworld app을 실행한다

```yaml
service/load-balancer-example.yaml 

apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app.kubernetes.io/name: load-balancer-example
  name: hello-world
spec:
  replicas: 5
  selector:
    matchLabels:
      app.kubernetes.io/name: load-balancer-example
  template:
    metadata:
      labels:
        app.kubernetes.io/name: load-balancer-example
    spec:
      containers:
      - image: gcr.io/google-samples/node-hello:1.0
        name: hello-world
        ports:
        - containerPort: 8080

```

이 yaml 파일에 주목하자!  yaml은 구성파일을 이용하여 바로 설정하는 방식

파일 내용을 자세히 살펴보자. 일단 app 은 버전1이다.

종류는 Deployment, 이름은 hello0world. 레플리카 셋은 5개의 pods가 존재한다. 



```
ubuntu@ubuntu:~$ sudo kubectl apply -f https://k8s.io/examples/service/load-balancer-example.yaml
error: unable to recognize "https://k8s.io/examples/service/load-balancer-example.yaml": Get https://10.0.2.15:8443/api?timeout=32s: dial tcp 10.0.2.15:8443: connect: connection refused
```

;;;;;모야,,,? 구글링 해도 답을 모르겠네..근데 하고는 싶고 그래서 다른 방법을 이용했다

virtualBox의 ubintu에 공유파일을 설정하는 것!

___



현재 내 상황은

**host OS: macOS , guest(Virtual box): ubuntu **



1. 이 각각의 호스트에 새로운 폴더를 생성한다

```
yuriui-MacBook-Pro% ls
-			Library			VirtualBox VMs
Applications		Movies			datamining
Creative Cloud Files	Music			eclipse
Desktop			Pictures		eclipse-workspace
Documents		Projects		node_modules
Downloads		Public			react
yuriui-MacBook-Pro% cd Documents 
yuriui-MacBook-Pro% ls
Activities		Android_Practice	yurilee
Adobe			ClassResources
AndroidStudio		shared

```

host OS: macOS -> mkdir shared

guest(Virtual box): ubuntu -> mkdir share 명령어를 통해 만들어 주었다.



2. 이후 가상머신 설정에 들어가서 공유폴더로 설정한다 **Settings -> shared Folders**

<img width="1263" alt="Screen Shot 2019-12-13 at 10 12 43 PM" src="https://user-images.githubusercontent.com/33794732/70804760-9cec9000-1dfa-11ea-9276-96a4c31a6714.png">

공유폴더 섹션에서 Machine Folders 아래에 공유폴더를 새로 추가한다



3. sudo mount -t vboxsf shared(vm에서 설정한 공유폴더 이름) share(게스트 폴더 이름)

```
ubuntu@ubuntu:~$ sudo mount -t vboxsf shared share
[sudo] password for ubuntu: 
mount: /home/ubuntu/share: wrong fs type, bad option, bad superblock on shared, missing codepage or helper program, or other error.
```

크흡..또 다시 구글링 ㄱㄱ



```
ubuntu@ubuntu:~$ sudo apt-get install virtualbox-guest-utils
```

여러 방법이 있었지만 나는 virtualbox-guest-utils를 설치해줌으로써 해결할 수 있었다

<img width="984" alt="Screen Shot 2019-12-13 at 10 59 42 PM" src="https://user-images.githubusercontent.com/33794732/70805490-60219880-1dfc-11ea-8893-174a5b362a28.png">



4. host OS의 shared에 다운받은 yaml파일을 넣어보자

```
yuriui-MacBook-Pro% cd shared 
yuriui-MacBook-Pro% ls
load-balancer-example.yaml
```



5. ubuntu에 접속하여 파일이 잘 공유되고 있는지 확인

```
ubuntu@ubuntu:~$ ls
minikube  share  snap
ubuntu@ubuntu:~$ cd share
ubuntu@ubuntu:~/share$ ls
load-balancer-example.yaml
```

잘 공유되고 있다

<img width="908" alt="Screen Shot 2019-12-13 at 11 00 24 PM" src="https://user-images.githubusercontent.com/33794732/70805491-60219880-1dfc-11ea-88e5-61bd54b9dd0d.png">



그럼 다시 시도해보자

```
ubuntu@ubuntu:~$ ls
minikube  share  snap
ubuntu@ubuntu:~$ sudo kubectl apply -f ./share/load-balancer-example.yaml
error: error parsing ./share/load-balancer-example.yaml: error converting YAML to JSON: yaml: line 3: mapping values are not allowed in this context
```

...구글링 해보고 다 해보라는 거 해봤는데...거의 1시간 넘게..기말고사 공부 언제하지 부들부들 ..

일단 그냥 포기하고 일단 튜툐리얼을 보기로 결정했다ㅋ..(추후보충)



___



위의  yaml 파일이 실행되었다는 전제하에 진행해보자!

```yaml
service/load-balancer-example.yaml 

apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app.kubernetes.io/name: load-balancer-example
  name: hello-world
spec:
  replicas: 5
  selector:
    matchLabels:
      app.kubernetes.io/name: load-balancer-example
  template:
    metadata:
      labels:
        app.kubernetes.io/name: load-balancer-example
    spec:
      containers:
      - image: gcr.io/google-samples/node-hello:1.0
        name: hello-world
        ports:
        - containerPort: 8080
```



1. 디플로이먼트에 대한 정보 확인

```
kubectl get deployments hello-world
kubectl describe deployments hello-world
```



2. 레플리카 셋 오브젝트에 대한 정보 확인

```
kubectl get replicasets
kubectl describe replicasets
```



3. 디플로이먼트를 외부로 노출시키는 서비스 오브젝트 생성

```
kubectl expose deployment hello-world --type=LoadBalancer --name=my-service
```

*[참고] LoadBalancer* - (지원 가능한 경우) 기존 클라우드에서 외부용 로드밸런서를 생성하고 서비스에 고정된 공인 IP를 할당해준다. NodePort의 상위 집합

my-service 라는 이름을 붙여주었다. 



4. 서비스에 대한 정보 확인

```
kubectl get services my-service

NAME         TYPE           CLUSTER-IP     EXTERNAL-IP      PORT(S)    AGE
my-service   LoadBalancer   10.3.245.137   104.198.205.71   8080/TCP   54s
```



5. 서비스에 대한 자세한 정보를 확인

```
kubectl describe services my-service
```

```
Name:           my-service
Namespace:      default
Labels:         app.kubernetes.io/name=load-balancer-example
Annotations:    <none>
Selector:       app.kubernetes.io/name=load-balancer-example
Type:           LoadBalancer
IP:             10.3.245.137
LoadBalancer Ingress:   104.198.205.71
Port:           <unset> 8080/TCP
NodePort:       <unset> 32377/TCP
Endpoints:      10.0.0.6:8080,10.0.1.6:8080,10.0.1.7:8080 + 2 more...
Session Affinity:   None
Events:         <none>
```

서비스에 의해 노출된 외부 IP 주소 (`LoadBalancer Ingress`) 유심히!

예시에서 외부 IP 주소는 104.198.205.71이다. 

그리고 `Port`와`NodePort`의 값을 기억해두자.  `Port`는 8080이고 `NodePort`는 32377이다.



6. 위의 출력 결과를 통해, 서비스에 여러 엔드포인트가 있음을 알 수 있다. 10.0.0.6:8080,10.0.1.6:8080,10.0.1.7:8080 + 2. 이 주소는 Hello World 애플리케이션을 실행 중인 파드의 내부 주소다. 해당 주소가 파드 주소인지 확인하려면, 아래 명령어를 입력하면 된다

```
kubectl get pods --output=wide
```

```
NAME                         ...  IP         NODE
hello-world-2895499144-1jaz9 ...  10.0.1.6   gke-cluster-1-default-pool-e0b8d269-1afc
hello-world-2895499144-2e5uh ...  10.0.1.8   gke-cluster-1-default-pool-e0b8d269-1afc
hello-world-2895499144-9m4h1 ...  10.0.0.6   gke-cluster-1-default-pool-e0b8d269-5v7a
hello-world-2895499144-o4z13 ...  10.0.1.7   gke-cluster-1-default-pool-e0b8d269-1afc
hello-world-2895499144-segjf ...  10.0.2.5   gke-cluster-1-default-pool-e0b8d269-cpuc
```



7. Hello World 애플리케이션에 접근하기 위해 외부 IP 주소 (`LoadBalancer Ingress`)를 사용한다.

```
curl http://<external-ip>:<port>
```

<external-ip>는 서비스의 외부 IP 주소 (`LoadBalancer Ingress`)를 의미하며, <port>는 서비스 정보에서 `Port` 값을 의미한다. 만약 minikube를 사용하고 있다면, `minikube service my-service` 명령어를 통해, 자동으로 브라우저 내에서 Hello World 애플리케이션에 접근할 수 있다.

성공적인 요청에 대한 응답으로 hello 메세지가 나타난다.

```
Hello Kubernetes!
```

실제로 해보고 싶은데 에러 어쩔꺼냐,,,;;휴,,:sob::sob::sob:



## Service 삭제 

```
kubectl delete services my-service
```



##Deployment 삭제

```
kubectl delete deployment hello-world
```



___



여태 우리는 2가지 방법을 사용하여 쿠버네티스를 실습해보았다. 

1. 명령 줄 인터페이스(**CLI**, **Command line** interface, 커맨드 라인 인터페이스)

2. Yams file



CLI를 활용할 때는 deployment -> replica set -> service

yaml에서는 순서 상관없이 한번에 !