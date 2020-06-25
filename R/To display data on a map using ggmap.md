# ggmap을 이용하여 지도 위에 data 표시하기

R 지도화, 한번도 해본 적이 없어서 포기할까 하다가 해보자고 다짐 ㅠㅠㅋ



##### *코로나 데이터를 이용하여 지도에 확진자 수를 표시하기 목표*


우선 사용한 데이터는 이것이다. 

https://github.com/youngwoos/corona19 에서 route 를 getdata 하여 로컬에 저장함

- 지역별 위도 경도가 표시되어서 지도를 그릴 때 유용할 것으로 생각하여..

```R
# get a route
route <- getdata("route") 
str(route)

write.csv(route, "/Users/yuri/data/route.csv")

# route.csv 로드하기
route <- read.csv(file = "/Users/yuri/data/route.csv", header=T)
str(route)
```

<img width="742" alt="Screen Shot 2020-06-25 at 11 20 50 PM" src="https://user-images.githubusercontent.com/33794732/85739407-b8d2d600-b73b-11ea-9d92-292ddcf944f8.png">



##### 참고자료

https://kuduz.tistory.com/1042 

여기 보고 따라했는데..역시나 에러가 나구요. 2018년 10월 현재 구글 지도 정책이 변경되었다고 한다. 정책은 왜 자꾸자꾸 변할까 🤯🤯🤯🤯🤯

https://kuduz.tistory.com/1092

그래서 여기보고 다시 따라했다. 먼저 API에 접속하려면 인증키가 필요하다고 한다. 낮부터 구글클라우드플랫폼이랑 씨름을 해서 그른가 다시 들어가고 싶지도 않았는데 별 수 있겠나, 들어가야지😂ㅜ



1. 구글클라우드플랫폼 들어감
2. 새로운 프로젝트 추가 -> mymap
3. 제품 및 리소스 검색에 Maps Static API ! 이용가능하게 만들고
4. API 및 서비스 -> 사용자 인증 정보 -> 사용자 인증 정보 만들기 (그럼 key가 만들어짐)

<img width="1430" alt="Screen Shot 2020-06-25 at 11 17 00 PM" src="https://user-images.githubusercontent.com/33794732/85739382-b3758b80-b73b-11ea-8f00-d466c45fd6ac.png">



test 하려고 이거 입력했더니,,,

<img width="742" alt="Screen Shot 2020-06-25 at 11 19 21 PM" src="https://user-images.githubusercontent.com/33794732/85739405-b83a3f80-b73b-11ea-9d1e-97803ab47a49.png">

이런 경고가 뜨면서 불가라는데요,,,,😀

구글링 고고 .. https://stackoverflow.com/questions/32994634/this-api-project-is-not-authorized-to-use-this-api-please-ensure-that-this-api

여기 들어가서 하란대로  Geocoding API -> Enable API 이렇게 만들어주니까 오 된다링 ~아마 Maps Static API이것만 추가해서 안되었던 것 같음 ㅠㅠ

<img width="1426" alt="Screen Shot 2020-06-25 at 11 18 22 PM" src="https://user-images.githubusercontent.com/33794732/85739394-b7091280-b73b-11ea-88b2-b3a324ebe02e.png">

여기 밑에 보면 제대로 적용되고 있음을 볼 수 있군..두개가..

색깔, 밀도, 레벨에 따라 3가지 지도 그리기 완성 👏

| <img width="691" alt="Map_1" src="https://user-images.githubusercontent.com/33794732/85733992-9fc82600-b737-11ea-89d3-bb4afe2b8bb9.png"> | <img width="688" alt="Map_2" src="https://user-images.githubusercontent.com/33794732/85734001-a191e980-b737-11ea-837a-1f550deefa79.png"> | <img width="694" alt="Map_3" src="https://user-images.githubusercontent.com/33794732/85734003-a22a8000-b737-11ea-9100-004fcb31ab14.png"> |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |



