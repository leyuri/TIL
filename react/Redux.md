https://opentutorials.org/module/4078/24935 참고

## Redux

리덕스는 어떻게 동작하는가?



store : 정보가 저장되어 있는 곳

state에 실제 정보가 저장되어있다. 항상 누군가를 통해 접속해야 한다 (state에 들어가 있는 값을 없앨 수도 있기 때문에) 따라서 reducer라는 함수를 만들어야 한다

reducer를 통해서 state값을 변경한다

앞단에 3가지의 중요한 함수들이 있다



#### - dispatch

1. 리듀서를 호출해서 ( 2개의 값을 전달. 현재의 스테이트 값과 액션 값) 스테이트 값을 바꿈
2. 서브스크라입을 이용해서 랜더함수를 호출

#### - subscribe

```store.subscribe(render);```

 render 함수 등록시 state값이 바뀔 때마다 랜더함수가 호출되면서 ui가 새롭게 갱신된다

#### - getState

render는 ui를 만들어주는 역할, 내가 짜야할 부분!



