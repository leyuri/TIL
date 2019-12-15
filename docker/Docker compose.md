http://blog.naver.com/PostView.nhn?blogId=agboy&logNo=221578602304

https://m.blog.naver.com/PostView.nhn?blogId=alice_k106&logNo=220633836094&proxyReferer=https%3A%2F%2Fwww.google.com%2F 참고하였음





## docker compose란?

Compose를 한국어로 번역하면, 구성한다는 뜻!

Docker-compose는 여러 설정들을 파일 하나로 구성해서 컨테이너를 실행하는 방법이다.

Docker-compose는 docker-compose.yml 파일을 기반



도커의 복잡한 옵션을 yaml파일을 기반으로 실행하게 만드는 기술

 - XML -> JSON -> YAML



예를 들어, apache2와 mysql 설정을 docker-compose.yml 파일에 작성한 후, 두 컨테이너를 실행해서 연결시킬 수 있다. 여러 개의 컨테이너를 연동해서 자주 사용한다면, docker-compose.yml 파일을 작성해 놓는 것이 편리하다.



**docker-compose.yml**

```y
web://이건 웹, 아파치를 웹이라는 컨테이너로 띄운 것이다
  image: alicek106/composetest:web
  ports:
   - "80"//포트는 80번째로 
  links://이건 링크옵션이다
   - mysql:db
  command: apachectl -DFOREGROUND
mysql:mysql 컨테이너를 띄운 것이다
  image: alicek106/composetest:mysql
  command: mysqld
```

두개의 서비스를 정의하고 있음 *web*, *mysql*

web서비스는 mysql 서비스에 접속해 데이터베이스를 사용할 것이다

web서비스는 외부에서 접속할 수 있도록 80포트를 열어 연결!



```
nano docker-compose.yaml
docker-compose up -d //이 명령어를 통해 전체 앱 실행할 수 있다
docker ps -a //상세정보 확인인인인


CONTAINER ID    IMAGE             COMMAND         CREATED       STATUS           PORTS         NAMES

4ee771fc0123    alicek106/composetest:web   "apachectl -DFOREGRO…"  9 seconds ago    Exited (0) 7 seconds ago             yuri_web_1

3305bc9a446f    alicek106/composetest:mysql  "mysqld"         10 seconds ago   Up 8 seconds                   yuri_mysql_1

docker logs yuri_web_1 

AH00558: apache2: Could not reliably determine the server's fully qualified domain name, using 172.17.0.5. Set the 'ServerName' directive globally to suppress this message httpd (pid 7) already running

docker-compose down
```

한꺼번에 실행하려면 **docker-compose up**

한꺼번에 내리기 위해서는 **docker-compose down**



별거 아닌 기술인데 굉장히 유용한 기술임!

이를 사용하지 않을 경우 정식으로 하면 명령어가 길어질 수 있다. 그렇다고 필수는 아님

