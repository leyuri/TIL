#  Mac 환경에서 R 사용시 필요한 Java 환경변수 설정하기

xlsx 라이브러리를 사용하려고 했는데, 이게 왠걸? 이런 에러가 떴다...

<img width="792" alt="Screen Shot 2020-04-14 at 8 28 59 PM" src="https://user-images.githubusercontent.com/33794732/79220415-e6271c00-7e8e-11ea-9f29-712f19f5f921.png">

왜 R을 사용하는데 java 가 필요해..?라고 생각했다. 하지만 구글링을 통해 R에서 Java에 dependency가 있는 패키지를 사용하기 위해서는 R의 시스템 환경변수를 정확히 설정줘야 함을 알아냈다.



우선 java 부터 설치해볼까? <a href="https://www.oracle.com/java/technologies/javase-jdk8-downloads.html">다운받는 곳</a> 으로 들어가자.

<img width="792" alt="Screen Shot 2020-04-14 at 8 31 30 PM" src="https://user-images.githubusercontent.com/33794732/79220438-f0e1b100-7e8e-11ea-9abd-e523f5816abe.png">

<img width="1059" alt="Screen Shot 2020-04-14 at 8 26 18 PM" src="https://user-images.githubusercontent.com/33794732/79220403-e1626800-7e8e-11ea-97da-a4170a8766ab.png">

본인에게 맞는 파일을 다운받자. 다운 후 설치를 완료한다.



```
$ sudo R CMD javareconf
```

자바를 설치한 후, 위 명령어를 통해 맥에 설치된 정보를 확인해보자.



<img width="792" alt="Screen Shot 2020-04-14 at 8 26 44 PM" src="https://user-images.githubusercontent.com/33794732/79220409-e3c4c200-7e8e-11ea-921f-e1cb6e3513e2.png">



```
Java home path   : /Library/Java/JavaVirtualMachines/jdk1.8.0_241.jdk/Contents/Home/jre
```

내 컴퓨터에 설치된 경로를 볼 수 있다. 참고로 jdk1.8.0_241.jdk는 설치된 버전마다 다르므로 확인해서 넣어준다.



<img width="792" alt="Screen Shot 2020-04-14 at 8 29 45 PM" src="https://user-images.githubusercontent.com/33794732/79220416-e6bfb280-7e8e-11ea-9554-146c9ed0035a.png">

경로를 확인했으니 rstudio로 와서 이에 맞는 path 를 설정해주자. 

해당 라이브러리가 에러 없이 실행됬다. 해결 완료 😊😊😊😊





