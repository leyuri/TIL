 https://jtoday.tistory.com/91  참고하였음

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
  - VOLUME /sample
  - VOLUME ["/data","/sample"] (여러 폴더)
  - 해당 디렉토리는 컨테이너 폴더가 아닌 호스트의 물리폴더로 저장하고 수행
  - -v옵션과 같이 수행



### 도커 컨테이너 간 연결

컨테이너 간 상호연결

```
docker pull mysql //mysql 다운로드
```

```
docker run -d -e MYSQL_ROOT_PASSWORD=kitri --name=mysql mysql //mysql 컨테이너 실행(서버모드)
```

```
docker run -it --link mysql:mysql --name=ubuntu ubuntu //우분투 컨테이너 실행(연결)
```

