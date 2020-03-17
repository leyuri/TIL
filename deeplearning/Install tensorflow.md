<a href = https://www.tensorflow.org/install>TensorFlow공식문서<a/>를 참고하여 설치 환경 구축



## 설치환경

- python 3.7.6
- pip 20.0.2
- virtualenv 20.0.10

```
yuri@apples-MacBook-Pro ~ % python -V
Python 3.7.6
```

```
yuri@apples-MacBook-Pro ~ % pip -V
pip 20.0.2 from /usr/local/lib/python3.7/site-packages/pip (python 3.7)
```

```
yuri@apples-MacBook-Pro ~ % pip install --upgrade pip
Requirement already up-to-date: pip in /usr/local/lib/python3.7/site-packages (20.0.2)
```

```
yuri@apples-MacBook-Pro ~ % virtualenv --version
virtualenv 20.0.10 from /usr/local/lib/python3.7/site-packages/virtualenv/__init__.py
```



## HW사양

![Screen Shot 2020-03-18 at 1.58.27 AM](/Users/yuri/Library/Application Support/typora-user-images/Screen Shot 2020-03-18 at 1.58.27 AM.png)



## 설치방법

- 딥러닝 실습 환경 구축에는 여러 방법이 있으나 가상환경을 이용하여 설치

- venv 이름의 가상환경을 만듦

```
yuri@apples-MacBook-Pro ~ % virtualenv --system-site-packages -p python3 ./venv
```

- 가상환경을 사용하기 위해 source 명령어를 통해 접속

```
yuri@apples-MacBook-Pro ~ % source ./venv/bin/activate 
(venv) yuri@apples-MacBook-Pro ~ % pip list
```

-  가상환경 위에 TensorFlow pip package를 설치

```
(venv) yuri@apples-MacBook-Pro ~ % pip install --upgrade tensorflow
```

- Printout1. jupyter notebook를 통하여 실행 결과 확인

```
(venv) yuri@apples-MacBook-Pro ~ % jupyter notebook
```

![Screen Shot 2020-03-13 at 12.24.03 AM](/Users/yuri/Desktop/Screen Shot 2020-03-13 at 12.24.03 AM.png)

- Printout2. python shell을 통하여 실행 결과 확인

![Screen Shot 2020-03-13 at 12.13.54 AM](/Users/yuri/Desktop/Screen Shot 2020-03-13 at 12.13.54 AM.png)





이 과정에서 에러가 발생해 구글링을 해봤다..ㅜ

https://stackoverflow.com/questions/47068709/your-cpu-supports-instructions-that-this-tensorflow-binary-was-not-compiled-to-u

```
# Just disables the warning, doesn't enable AVX/FMA
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
```

그렇구나...🤔



### 간단 명령어 정리

```
virtualenv --system-site-packages -p python3 ./venv
```

```
source ./venv/bin/activate  # sh, bash, ksh, or zsh
```

```
deactivate  # don't exit until you're done using TensorFlow
```

```
rm -rf venv
```

