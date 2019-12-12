https://bcho.tistory.com/1307 [조대협의 블로그] 

https://kubernetes.io/ko/를 참고!



## Ubuntu 위에서 Kubernetes 돌려보기

여태까지는 웹브라우저 위의 터미널로 미니큐브를 실습해봤다.

이제 실제 내 로컬 호스트 위에서 돌려보도록 하겠다!




## Virtual box setting

우선 virtualbox를 설정해야 한다

Ubuntu3 이름의 버츄얼 박스를 만들어 준다(test하다가 ubuntu가 먹통이 되어버림...ㅠ)

다운받은 ubuntu이미지를 설정

CPU는 2 이상으로 변경해야 함! 중요중요

최소 2개 이상의 노드가 있어야 스케줄링을 하든 말든 ...pass

<img width="1259" alt="Screen Shot 2019-12-13 at 12 37 03 AM" src="https://user-images.githubusercontent.com/33794732/70730791-f85e4580-1d48-11ea-9361-617f1a851473.png">



## Minkube install

우선 vm머신에서는 copy&paste가 불가하다. 

맥 os는 terminal 에서 바로 ssh 접속이 가능하기 때문에 포트포워딩을 하여 연결해서 사용할 수 있다.

윈도우는 putty 라는 프로그램을 별도로 설치해야 한다.  나는 맥 os 유저이므로 별도의 프로그램을 설치하지 않았다



우선 ubuntu3의 ip주소 확인 결과이다

<img width="792" alt="Screen Shot 2019-12-13 at 12 38 53 AM" src="https://user-images.githubusercontent.com/33794732/70730827-03b17100-1d49-11ea-8278-c085fa573ab5.png">

**10.02.15** 임을 볼 수 있다



그리고 로컬 ip주소를 확인해보자

<img width="900" alt="Screen Shot 2019-12-13 at 12 39 49 AM" src="https://user-images.githubusercontent.com/33794732/70730828-03b17100-1d49-11ea-9136-008d6682a145.png">

192.168.219.103임을 확인할 수 있다. 로컬  ip주소도 똑같이  **ifconfig**명령어를 통해 확인할 수 있는데...왜인지 모르겠지만 안보여서(?) 그냥 네트워크 설정에서 확인했다. 보통은 로컬호스트로 자동으로 붙는다고 합니다...그러면 접속 방식이 (ssh [ubuntu@localhost](mailto:ubuntu@192.168.253.97) -pXXXX)이런 식으로 되겠지?



포트포워딩을 설정을 해줘야 한다!

<img width="945" alt="Screen Shot 2019-12-13 at 12 37 12 AM" src="https://user-images.githubusercontent.com/33794732/70730792-f85e4580-1d48-11ea-89e4-d5cd2faadb91.png">

밑에 보이는 Port Forwarding 버튼을 꾸욱 눌러준다

그럼 밑과 같은 창이 뜬다

<img width="945" alt="Screen Shot 2019-12-13 at 12 37 31 AM" src="https://user-images.githubusercontent.com/33794732/70730793-f85e4580-1d48-11ea-9e54-a5dbb79dac13.png">

여기서 Host IP에 방금 확인한 192.168.219.103을 입력한다. Host Port 는 사용중인 포트와 겹치지 않게만 설정하면 된다. 나는 여러 개의 버츄얼 머신이 있었기 때문에 겹치지 않는 2024로 설정했다. 그리고 Guest IP 는 우분투 내에서 확인한 **10.02.15** 을 넣어준다! Guest Port 는 20으로. 대게 가상머신의 ip 주소라고 한다,,





ssh [ubuntu@192.168.219.103](mailto:ubuntu@192.168.253.97) -p2024

192.168.219.103

포트포워딩 설정을 완료했으니 terminal 내에서 접속을 해보자! 

```
yuriui-MacBook-Pro% ssh ubuntu3@192.168.219.103 -p2024
ssh_exchange_identification: read: Connection reset by peer
```

?????뭐야





`sudo apt update`

`sudo apt install docker.io`

`sudo apt install openssh-server`

아 알고보니 우분투에 openssh-server를 설치를 안해줬었다..ㅋㅋ한번에 다 설치하고 시작하자



```
yuriui-MacBook-Pro% sudo ssh ubuntu@192.168.219.103 -p2024
ubuntu@192.168.219.103's password: 
Welcome to Ubuntu 18.04.3 LTS (GNU/Linux 4.15.0-72-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  System information as of Thu Dec 12 15:55:59 UTC 2019

  System load:  0.02               Processes:             103
  Usage of /:   21.1% of 19.56GB   Users logged in:       1
  Memory usage: 9%                 IP address for enp0s3: 10.0.2.15
  Swap usage:   0%


87 packages can be updated.
50 updates are security updates.


Last login: Thu Dec 12 15:55:29 2019 from 10.0.2.2
ubuntu@ubuntu:~$ 
```

성공! 이제 이미지 파일을 올릴 수 있는 링크를 복사할 수 있다





```
ubuntu@ubuntu:~$ curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 43.4M  100 43.4M    0     0  5393k      0  0:00:08  0:00:08 --:--:-- 6439k
```

curl 명령어를 통해 미니큐브 이미지를 다운받는다. 용량은 약 40메가



```
ubuntu@ubuntu:~$ chmod +x minikube
ubuntu@ubuntu:~$ sudo mkdir -p /usr/local/bin/
[sudo] password for ubuntu: 
ubuntu@ubuntu:~$ sudo install minikube /usr/local/bin/
ubuntu@ubuntu:~$ sudo snap install kubectl --classic
kubectl 1.16.3 from Canonical✓ installed
```



$ chmod +x minikube`

[참고]**chmod**. **chmod** (change mode의 축약어)명령어는 유닉스와 유닉스 계통 환경 안에서 쓰이는 셸 명령어이다. 이 명령어는 파일들이나 디렉터리의 파일 시스템 모드들을 바꾼다. 그 모드들은 허가나 특별한 모드들을 포함한다.(https://ko.wikipedia.org/wiki/Chmod)

**U+x**‎: ‎소유자에게 실행 권한을 추가

`$ sudo mkdir -p /usr/local/bin/`

[참고] The -**p** will create the directory(along with the directories that lead to the directory you want to create) and would ignore any errors if the directory already exists. It is a argument/tag used in operating systems that are like unix or based on it. You can read more about it here **mkdir**(1) - Linux man page.(https://teamtreehouse.com/community/mkdir-p-directory-to-create-what-does-p-stand-for)



## Kubectl 설치

`$ sudo snap install kubectl --classic`

인터페이스 CLI 설치!



## Minikube exec

`$ sudo minkube start --vm-dirver=none`

쿠버네티스를 우분트에서 실행할 때, 별도의 vm 없이 시행 가능함, 이때 옵션은 --vm-dirver=none

`$ sudo kubectl cluster-info`

`$ sudo kubectl get nodes`



쿠버네티스에서 우분투를 실행할 때 별도의 버추얼 머신 없이 실행이 가능하다고 한다. 

VM 없이 실행하려면 --vm-driver=none 옵션을 줘야 함!

```
ubuntu@ubuntu:~$ sudo minikube start -vm-dirver=none
Error: invalid argument "m-dirver=none" for "-v, --v" flag: strconv.Atoi: parsing "m-dirver=none": invalid syntax
```

 갑자기 에러가?...구글링 ㄱㄱ



```
ubuntu@ubuntu:~$ sudo cp /etc/kubernetes/admin.conf $HOME/
cp: cannot stat '/etc/kubernetes/admin.conf': No such file or directory
ubuntu@ubuntu:~$ sudo chown $(id -u):$(id -g) $HOME/admin.conf
chown: cannot access '/home/ubuntu/admin.conf': No such file or directory
ubuntu@ubuntu:~$ export KUBECONFIG=$HOME/admin.conf
ubuntu@ubuntu:~$ sudo cp /etc/kubernetes/admin.conf $HOME/
```

? 이것때문인지는 몰겠는데....



```
ubuntu@ubuntu:~$ sudo minikube start --vm-driver=none
😄  minikube v1.6.1 on Ubuntu 18.04 (vbox/amd64)
✨  Selecting 'none' driver from user configuration (alternates: [])
🤹  Running on localhost (CPUs=2, Memory=1993MB, Disk=20027MB) ...
ℹ️   OS release is Ubuntu 18.04.3 LTS
🐳  Preparing Kubernetes v1.17.0 on Docker '18.09.7' ...
    ▪ kubelet.resolv-conf=/run/systemd/resolve/resolv.conf
💾  Downloading kubeadm v1.17.0
💾  Downloading kubelet v1.17.0
🚜  Pulling images ...
🚀  Launching Kubernetes ... 
🤹  Configuring local host environment ...

⚠️  The 'none' driver provides limited isolation and may reduce system security and reliability.
⚠️  For more information, see:
👉  https://minikube.sigs.k8s.io/docs/reference/drivers/none/

⚠️  kubectl and minikube configuration will be stored in /home/ubuntu
⚠️  To use kubectl or minikube commands as your own user, you may need to relocate them. For example, to overwrite your own settings, run:

    ▪ sudo mv /home/ubuntu/.kube /home/ubuntu/.minikube $HOME
    ▪ sudo chown -R $USER $HOME/.kube $HOME/.minikube

💡  This can also be done automatically by setting the env var CHANGE_MINIKUBE_NONE_USER=true
⌛  Waiting for cluster to come online ...
🏄  Done! kubectl is now configured to use "minikube"
```

성공했다.





앞은 셋팅이였고 본격적인 실습시작

```
ubuntu@ubuntu:~$  sudo kubectl cluster-info
Kubernetes master is running at https://10.0.2.15:8443
KubeDNS is running at https://10.0.2.15:8443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
```

희열!!!!!드디어 클러스터 정보를 불러왔다



```
ubuntu@ubuntu:~$ sudo kubectl get nodes
NAME       STATUS   ROLES    AGE   VERSION
minikube   Ready    master   89s   v1.17.0
ubuntu@ubuntu:~$ sudo kubectl create deployment kubernetes-bootcamp --image=gcr.io/google-samples/kubernetes-bootcamp:v1
deployment.apps/kubernetes-bootcamp created
ubuntu@ubuntu:~$ sudo kubectl get deployments
NAME                  READY   UP-TO-DATE   AVAILABLE   AGE
kubernetes-bootcamp   0/1     1            0           9s
ubuntu@ubuntu:~$ sudo kubectl get replicasets
NAME                             DESIRED   CURRENT   READY   AGE
kubernetes-bootcamp-69fbc6f4cf   1         1         0       18s
ubuntu@ubuntu:~$ sudo kubectl get pods
NAME                                   READY   STATUS    RESTARTS   AGE
kubernetes-bootcamp-69fbc6f4cf-lzndm   1/1     Running   0          26s
```

Nodes 자원을 나열해보니 minikube 가 있다. kubernetes-bootcamp 이미지를 풀해서 deployment를 생성하고, 다시 정보확인,,,



밑은 실제 실행화면이다

<img width="846" alt="Screen Shot 2019-12-13 at 1 14 22 AM" src="https://user-images.githubusercontent.com/33794732/70730756-ea102980-1d48-11ea-8ba4-cd438f0f11c5.png">





## Service Create!

```
ubuntu@ubuntu:~$ sudo kubectl expose deployment/kubernetes-bootcamp --type="NodePort" --port 8080
service/kubernetes-bootcamp exposed
```

kubernetes-bootcamp service를 외부로 노출시킨다



```
ubuntu@ubuntu:~$ sudo kubectl get services
NAME                  TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)          AGE
kubernetes            ClusterIP   10.96.0.1      <none>        443/TCP          3m28s
kubernetes-bootcamp   NodePort    10.96.55.174   <none>        8080:31561/TCP   9s
```

Services 자원을 나열해보자. kubernetes-bootcamp가 새로 생기게 되었다. 여기서 주목!

NodePort로 할당된 서비스의 IP를 확인해보자. 이 부분은 각각 다르게 생성될 것! 나는 **10.96.55.174**



그리고 새로운 창을 띄어서 프록시 서버를 실행해보자

다시  terminal 띄어서 ssh접속하기 귀찮아서 뒤에 떠있는 버츄얼머신 우분투를 통해 입력해주었다

<img width="943" alt="Screen Shot 2019-12-13 at 1 16 19 AM" src="https://user-images.githubusercontent.com/33794732/70730757-ea102980-1d48-11ea-85ff-2b32ae46f62a.png">

`$ sudo kubectl proxy`

서버가 시작되었다는 문구가 뜬다. 즉 접속되었다는 의미!



그럼 다시 원래 있던 창 혹은 터미널로 돌아가자

```
ubuntu@ubuntu:~$ curl http://10.96.55.174:8080
Hello Kubernetes bootcamp! | Running on: kubernetes-bootcamp-69fbc6f4cf-lzndm | v=1
```

CURL명령어를 통해 이 App이 외부로 노출되었는지 확인해보자!

잘 접속이 되었군!



## 이번엔 pod에 직접 접속을 해보자!

```
ubuntu@ubuntu:~$ sudo kubectl get pods
NAME                                   READY   STATUS    RESTARTS   AGE
kubernetes-bootcamp-69fbc6f4cf-lzndm   1/1     Running   0          9m25s
```

kubernetes-bootcamp-69fbc6f4cf-lzndm의 이름을 가진 pod 이 있음을 볼 수 있다

[참고]파드는 하나 또는 그 이상의 애플리케이션 컨테이너 (도커 또는 rkt와 같은)들의 그룹을 나타내는 쿠버네티스의 추상적 개념으로 일부는 컨테이너에 대한 자원을 공유한다. 그 자원은 다음을 포함!

파드는 언제나 **노드** 상에서 동작한다. 노드는 쿠버네티스에서 워커 머신을 말하며 클러스터에 따라 가상 또는 물리 머신일 수 있다. 각 노드는 마스터에 의해 관리된다. 하나의 노드는 여러 개의 파드를 가질 수 있고, 쿠버네티스 마스터는 클러스터 내 노드를 통해서 파드에 대한 스케쥴링을 자동으로 처리한다.



```
ubuntu@ubuntu:~$ sudo kubectl exec -it kubernetes-bootcamp-69fbc6f4cf-lzndm bash
```

이름을 확인했으니, 해당  pod에 직접 접속해보자

```
root@kubernetes-bootcamp-69fbc6f4cf-lzndm:/# cat server.js
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

server.js소스 파일을 확인할 수 있다!



밑은 실제 실행 화면이다

<img width="1076" alt="Screen Shot 2019-12-13 at 1 27 13 AM" src="https://user-images.githubusercontent.com/33794732/70730765-ed0b1a00-1d48-11ea-8784-6b7a8e7a93da.png">





## pod의 수를 늘리면?

```
ubuntu@ubuntu:~$ sudo kubectl scale deployment kubernetes-bootcamp --replicas=15
deployment.apps/kubernetes-bootcamp scaled
```

replicas의 수를 무려 15개로 늘려보았다...



```
ubuntu@ubuntu:~$ sudo kubectl get pods
NAME                                   READY   STATUS    RESTARTS   AGE
kubernetes-bootcamp-69fbc6f4cf-2jvjn   1/1     Running   0          35s
kubernetes-bootcamp-69fbc6f4cf-77mfk   1/1     Running   0          35s
kubernetes-bootcamp-69fbc6f4cf-956qk   1/1     Running   0          35s
kubernetes-bootcamp-69fbc6f4cf-dhx9t   1/1     Running   0          35s
kubernetes-bootcamp-69fbc6f4cf-ghsbg   1/1     Running   0          35s
kubernetes-bootcamp-69fbc6f4cf-gm9qc   1/1     Running   0          35s
kubernetes-bootcamp-69fbc6f4cf-jm6wl   1/1     Running   0          35s
kubernetes-bootcamp-69fbc6f4cf-l77mc   1/1     Running   0          35s
kubernetes-bootcamp-69fbc6f4cf-lzndm   1/1     Running   0          16m
kubernetes-bootcamp-69fbc6f4cf-px5bh   1/1     Running   0          35s
kubernetes-bootcamp-69fbc6f4cf-q9n52   1/1     Running   0          35s
kubernetes-bootcamp-69fbc6f4cf-rfk9b   1/1     Running   0          35s
kubernetes-bootcamp-69fbc6f4cf-s85tn   1/1     Running   0          35s
kubernetes-bootcamp-69fbc6f4cf-vd5vl   1/1     Running   0          35s
kubernetes-bootcamp-69fbc6f4cf-zxkkw   1/1     Running   0          35s
```

15개의 pods 자원들을 볼 수 있다..(너무 많이 했나 테스트인데..)



## 롤링 업데이트

```
ubuntu@ubuntu:~$ sudo kubectl set image deployments/kubernetes-bootcamp kubernetes-bootcamp=jocatalin/kubernetes-bootcamp:v2
deployment.apps/kubernetes-bootcamp image updated
```

kubernetes-bootcamp의 버전을  v2로 업데이트 하면 어떻게 될까?



```
ubuntu@ubuntu:~$ sudo kubectl get pods -o wide
NAME                                   READY   STATUS        RESTARTS   AGE     IP            NODE       NOMINATED NODE   READINESS GATES
kubernetes-bootcamp-69fbc6f4cf-dhx9t   0/1     Terminating   0          2m32s   172.17.0.6    minikube   <none>           <none>
kubernetes-bootcamp-b4d9f565-2dk6m     1/1     Running       0          59s     172.17.0.25   minikube   <none>           <none>
kubernetes-bootcamp-b4d9f565-2m9vq     1/1     Running       0          51s     172.17.0.26   minikube   <none>           <none>
kubernetes-bootcamp-b4d9f565-82hbj     1/1     Running       0          39s     172.17.0.32   minikube   <none>           <none>
kubernetes-bootcamp-b4d9f565-dcl88     1/1     Running       0          45s     172.17.0.31   minikube   <none>           <none>
kubernetes-bootcamp-b4d9f565-ggptc     1/1     Running       0          60s     172.17.0.21   minikube   <none>           <none>
kubernetes-bootcamp-b4d9f565-h8vq8     1/1     Running       0          48s     172.17.0.27   minikube   <none>           <none>
kubernetes-bootcamp-b4d9f565-jvngx     1/1     Running       0          45s     172.17.0.29   minikube   <none>           <none>
kubernetes-bootcamp-b4d9f565-pn5n5     1/1     Running       0          45s     172.17.0.30   minikube   <none>           <none>
kubernetes-bootcamp-b4d9f565-tvsv6     1/1     Running       0          39s     172.17.0.33   minikube   <none>           <none>
kubernetes-bootcamp-b4d9f565-v8c5k     1/1     Running       0          59s     172.17.0.24   minikube   <none>           <none>
kubernetes-bootcamp-b4d9f565-xb248     1/1     Running       0          48s     172.17.0.28   minikube   <none>           <none>
kubernetes-bootcamp-b4d9f565-xg4ms     1/1     Running       0          59s     172.17.0.23   minikube   <none>           <none>
kubernetes-bootcamp-b4d9f565-xgwwp     1/1     Running       0          60s     172.17.0.19   minikube   <none>           <none>
kubernetes-bootcamp-b4d9f565-z56rw     1/1     Running       0          60s     172.17.0.22   minikube   <none>           <none>
kubernetes-bootcamp-b4d9f565-zzq52     1/1     Running       0          60s     172.17.0.20   minikube   <none>           <none>
ubuntu@ubuntu:~$ sudo kubectl get pods -o wide
NAME                                 READY   STATUS    RESTARTS   AGE   IP            NODE       NOMINATED NODE   READINESS GATES
kubernetes-bootcamp-b4d9f565-2dk6m   1/1     Running   0          97s   172.17.0.25   minikube   <none>           <none>
kubernetes-bootcamp-b4d9f565-2m9vq   1/1     Running   0          89s   172.17.0.26   minikube   <none>           <none>
kubernetes-bootcamp-b4d9f565-82hbj   1/1     Running   0          77s   172.17.0.32   minikube   <none>           <none>
kubernetes-bootcamp-b4d9f565-dcl88   1/1     Running   0          83s   172.17.0.31   minikube   <none>           <none>
kubernetes-bootcamp-b4d9f565-ggptc   1/1     Running   0          98s   172.17.0.21   minikube   <none>           <none>
kubernetes-bootcamp-b4d9f565-h8vq8   1/1     Running   0          86s   172.17.0.27   minikube   <none>           <none>
kubernetes-bootcamp-b4d9f565-jvngx   1/1     Running   0          83s   172.17.0.29   minikube   <none>           <none>
kubernetes-bootcamp-b4d9f565-pn5n5   1/1     Running   0          83s   172.17.0.30   minikube   <none>           <none>
kubernetes-bootcamp-b4d9f565-tvsv6   1/1     Running   0          77s   172.17.0.33   minikube   <none>           <none>
kubernetes-bootcamp-b4d9f565-v8c5k   1/1     Running   0          97s   172.17.0.24   minikube   <none>           <none>
kubernetes-bootcamp-b4d9f565-xb248   1/1     Running   0          86s   172.17.0.28   minikube   <none>           <none>
kubernetes-bootcamp-b4d9f565-xg4ms   1/1     Running   0          97s   172.17.0.23   minikube   <none>           <none>
kubernetes-bootcamp-b4d9f565-xgwwp   1/1     Running   0          98s   172.17.0.19   minikube   <none>           <none>
kubernetes-bootcamp-b4d9f565-z56rw   1/1     Running   0          98s   172.17.0.22   minikube   <none>           <none>
kubernetes-bootcamp-b4d9f565-zzq52   1/1     Running   0          98s   172.17.0.20   minikube   <none>           <none>
```

신기하구만,,! **롤링 업데이트**는 파드 인스턴스를 점진적으로 새로운 것으로 업데이트하여 디플로이먼트 업데이트가 서비스 중단 없이 이루어질 수 있도록 해준다더니 ,,,



