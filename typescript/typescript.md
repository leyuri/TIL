노마드코더의 Typescript로 블록체인 만들기를 참고하였음

https://academy.nomadcoders.co/



## Typescript 란?

프로그래밍언어, 자바스크립트처럼 생겼고, 컴파일 할 경우 자바스크립트로 !

javascript 위에 있고, typescript에 작성하는 것은 모두 자바스크립트로 변환됨 



자바스크립트의 장점은?

엄격한 규칙이 없고 사용하기가 쉽다 , 원하는 방향으로 수정하기도 편하다

그러나 큰 프로젝트를 한다거나, 버그를 최소화 하고 싶을 때 좋지 않다. 그래서 typescript가 탄생하였음

##### superset of JavaScript !!! 



Typescript의 마법은 Typed 언어 = 어떤 종류의 변수와 데이터인지 설정을 해줘야 한다

즉 나의 멍청한 실수들로부터  typescript 는 보호해준다 ! 



```tsx
const name = "yuri",
    age = 24,
    gender = "male";

const sayHi = (name, age, gender?) => {
    console.log(`hello ${name}, you are ${age}, you are a ${gender}`);
};

sayHi(name, age);

export {};
```



#### "?" 을 쓰면 optional !

#### tslint extension 설치 시 오류화면 띄어줌!

void 빈공간, sayHi의 function 어떤 유형의 값을 돌려주는 지 정해줘야 함



## Types , Interfaces in Typescript



TSC watch 패키지 설치!

yarn add tsc-watch --dev

yarn add typescript



```typescript
interface Human {
    name:string,
    age:number,
    gender:string;
}

const person = {
    name: "yuri",
    gender: "female",
    age:22
};


const sayHi = (person: Human): string => {
    return (`hello ${person.name}, you are ${person.age}, you are a ${person.gender}`);
};


console.log(sayHi(person));

export {};
```



인터페이스는 자바스크립트에서 작동하지 않는다!

블록체인을 할때, 한 블럭을 interface로 정의한다. 그 블록이 가저야 되는 모든 세부 설명들을 정의 가능!



## Classes on Typescript

인터페이스는 자바스크립트에 보여줄 수 없기에 클래스를 이용할 수 있다.

js에서는 클래스의 속성들을 묘사할 필요 없다.

ts 는 클래스가 어떤 속성들을 가져야 하는지 선언해야 한다.



몇가지 속성을 보호할 수 있게 해준다.

변경을 원하는지의 여부에 따라서!





#### yarn add crypto-js

##### yarn add typescript 하고나서 yarn start!

maybe tsc-watch에 버그 있음!



```
yarn add typescript
yarn start
```

