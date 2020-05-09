## Scatterplot3d 공식 문서의 CRAN Examples



Scatterplot3d는 변수 3개 이상의 다변량 데이터(multivariate data set)를 2차원 평면에 효과적으로 시각화 할 수 있는 방법이다. 이에 공식문서에 나와있는 다양한 예제 코드를 실행해 보았다. 



### example1

<img width="724" alt="Screen Shot 2020-05-07 at 11 34 12 AM" src="https://user-images.githubusercontent.com/33794732/81248160-b8c92a80-9056-11ea-8a02-07330d2a0f21.png">

<img width="617" alt="Screen Shot 2020-05-07 at 11 34 17 AM" src="https://user-images.githubusercontent.com/33794732/81248165-bb2b8480-9056-11ea-93f3-776ccfa67c0d.png">

highlight.3d = TRUE 옵션은 y축의 좌표를 기준으로 색깔이 달라지게 하라는 의미이다. 아래 그래프의 경우 y축 좌표 값이 작을 수록 빨간색, y축 좌표값이 클수록 검정색으로 자동으로 바뀐 것을 볼 수 있다. 



### example2



<img width="732" alt="Screen Shot 2020-05-07 at 11 41 01 AM" src="https://user-images.githubusercontent.com/33794732/81248591-a8657f80-9057-11ea-97b0-d70b94915c47.png">

<img width="616" alt="Screen Shot 2020-05-07 at 11 41 06 AM" src="https://user-images.githubusercontent.com/33794732/81248596-ab607000-9057-11ea-9975-a2fb940f0448.png">

예제1과 다른 모양을 띄고 있다. 점들로 각각의 값을 표현하고 있다. 



### example3

<img width="730" alt="Screen Shot 2020-05-07 at 11 42 04 AM" src="https://user-images.githubusercontent.com/33794732/81248669-d8ad1e00-9057-11ea-91ab-645a303d66c7.png">

<img width="616" alt="Screen Shot 2020-05-07 at 11 42 20 AM" src="https://user-images.githubusercontent.com/33794732/81248676-dc40a500-9057-11ea-9391-95bf7a0ebece.png">

예제 1과 예제2를 합친듯한 3d 모양을 볼 수 있다. 

### example4



<img width="723" alt="Screen Shot 2020-05-07 at 11 48 48 AM" src="https://user-images.githubusercontent.com/33794732/81249076-bec00b00-9058-11ea-996d-4c7cfb22071f.png">



<img width="616" alt="Screen Shot 2020-05-07 at 11 48 53 AM" src="https://user-images.githubusercontent.com/33794732/81249104-d1d2db00-9058-11ea-8d71-7f8c20c875bf.png">

runif를 이용하여 랜덤으로 데이터를 만든 후, 이를 scatterploat3d에 넣어  표현할 수도 있다. 다음과 같은 모양이 되었다. 

