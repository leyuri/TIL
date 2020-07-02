아래 코드에서 `obj `객체의 `print `메소드를 `화살표 함수`로 선언

 **객체의 메소드를 화살표 함수로 선언할 경우** this는 전역 객체를 가리키므로 주의해야 한다. 

```javascript
var obj = {
    names: ["lee"],
    text: "님 안녕하세요",
    print: () => { console.log(this.text) } // undefined
}
obj.print()
```

