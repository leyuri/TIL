노마드코더의 React Native 참고하였음

## Expo

리엑트 네이티브를 위한 설정 파일 같은 것들이 셋업되어 있음!

반면 react native cli 방식은 native files들을 더 많이 컨트롤 하고 싶을 때를 위한 것

live reload : 내가 저장하면 자동으로 리프레쉬가 된다

debug remote js ->  더 느리게 만들 수 있음 앱을 좀 느리게 만듦, (네트워크 요청, 크롬으로 작업하고 싶을 때)



expo client  다운로드!

-g는 *global*의 약자로 전역 설치



## How does React Native Work?



#### 1. 네이티브 방식

1. native: Swift or objective-c -> ios
2. java or 코틀린 -> 안드로이드

#### 2. 앱 기반 웹뷰를 만드는 것

 cordova or phoneGap , 그 안에 html, css 를 넣는 것

앱 안에서 작동하는 웹사이트 , 하이브리드 웹뷰

껍데기는 코르도바로 이루어져 있음. 



react native  는 android, ios 둘다 자바스크립트를 실행할 수 있다. (자바스크립트 엔진을 갖고 있기 때문에)



브릿지가 존재한다! 항상 필요하다. 하지만 이는 느린 성능을 유발할 수도 있다.

컨텐츠만 다루는 것들. 인스타그램과 같은! 데이팅 앱같은 것에 유용! 3D 비디오 게임 App은  bad



웹 사이트에서 모든 flex box 의 디폴트는 row

<View>는 recact natvie에서 <div>와 같은것!

##### expo install expo-location 

앱에 포함시키고 싶어하는 것을 선택할 수 있게 해준다



https://openweathermap.org/api 사용!

https://ipapi.co/





### yarn add prop-types

