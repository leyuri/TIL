https://www.scipy.org/install.html 공식문서를 참고하였음!



## Installing via pip

딥러닝 실습 환경 구축에는 여러 방법이 있으나 가상환경을 이용하여 설치하였다.

```
$ source ./venv/bin/activate 
```

따라서 만들어놓은 가상환경에 들어가기 위해 source 명령어를 사용한다.

```
(venv) yuri@apples-MacBook-Pro ~ % python -m pip install --user numpy scipy matplotlib ipython jupyter pandas sympy nose
```

이후 pip를 사용하여 numpy관련 패키지를 다운받자!

```
(venv) yuri@apples-MacBook-Pro ~ % pip list
```

잘 설치되었는지 확인해보자.

```
numpy                1.18.1  
```

🤗 완료!

