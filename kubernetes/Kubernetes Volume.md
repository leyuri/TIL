https://arisu1000.tistory.com/27849에 내용을 참고하였습니다

## Volume?



컨테이너는 기본적으로 상태가 없는(stateless) 앱을 사용

stateless는 컨테이너가 죽었을 때 현재까지의 데이터가 사라진다는 것을 의미한다

상태가 없으므로 컨테이너에 문제가 있거나 노드에 장애가 발생할 경우 컨테이너를 새로 띄우거나 옮기는 것이 자유롭다



하지만 app의 특성에 따라 데이터가 보존되어야 하는 경우가 있음!

예를 들어 젠킨스 (처음 들어봄..:anguished:), mysql과 같은?

젠킨스는 거의 모든 언어의 조합과 소스코드 리포지토리(Repository)에 대한 지속적인 통합과 지속적인 전달 환경을 구축하기 위한 간단한 방법을 제공 **[출처]** [젠킨스 (Jenkins)를 사용하는 이유](http://blog.naver.com/sundooedu/221347731517)|**작성자** [SD아카데미](http://blog.naver.com/sundooedu)



이런 경우에 데이터가 사라지면 안된다. 이럴 때 사용할 수 있는게**Volume**

Volume을사용하면 컨테이너가 재시작을 하더라도 데이터가 사라지지 않고 유지된다

Persistent Volume 을 사용하면 컨테이너가 재시작할 때 데이터를 쌓아뒀던 노드가 아니라 다른 노드에서 실행된다 하더라도 ***자동***으로 데이터가 있는 볼륨이 컨테이너가 새로 시작한 노드에 옮겨 붙어서 그 데이터를 그대로 활용할 수 있다!



위는 쿠버네티스에서 사용가능한 Volume

```
awsElasticBlockStore
azureDisk
azureFile
cephfs
configMap
csi
downwardAPI
emptyDir
fc (fibre channel)
flocker
gcePersistentDisk
gitRepo (deprecated)
glusterfs
hostPath
iscsi
local
nfs
persistentVolumeClaim
projected
portworxVolume
quobyte
rbd
scaleIO
secret
storageos
vsphereVolume
```



## **PersistentVolume, PV** & PersistentVolumeClaim, PVC

- PV
  - 볼륨 자체를 의미
  - 클러스터내에서 리소스로 다뤄짐
  - pod와 별개로 관리되고 별도의 생명주기를 가짐

- PVC
  - 사용자가 PV에 하는 request
  - 사용하고 싶은 용량은 얼마인지 읽기/쓰기는 어떤 모드로 설정하는지 등



**Kubernetes**는 볼륨을 pod에 직접 할당하는 방식이 아닌, 중간에 **PVC** 를 둠으로써 pod와 pod가 사용할 스토리지를 분리! 이런 구조는 각자 상황에 맞게 다양한 스토리지를 사용할 수 있게 해줌



ex) 클라우드 서비스를 사용하는 경우 

1. 본인이 사용하는 클라우드 서비스에서 제공하는 볼륨 서비스 이용
2. 사설로 직접 구축해서 사용중인 스토리지 사용



다양한 스토리지를 PV로 사용할 수 있다.  pod에 직접 연결하는 게 아니라 PVC를 통해서 사용하기 때문에 pod는 자신이 어떤  스토리지를 사용하고 있는지 신경쓰지 않아도 무방하다





