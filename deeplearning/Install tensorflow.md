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
<img width="577" alt="Screen Shot 2020-03-18 at 2 32 11 AM" src="https://user-images.githubusercontent.com/33794732/76884212-acc7b480-68c0-11ea-9bab-2de8d58f22fa.png">




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


<img width="583" alt="Screen Shot 2020-03-13 at 12 24 03 AM" src="https://user-images.githubusercontent.com/33794732/76884520-295a9300-68c1-11ea-8b83-749fc36fd1ae.png">


- Printout2. python shell을 통하여 실행 결과 확인

<img width="444" alt="Screen Shot 2020-03-13 at 12 13 54 AM" src="https://user-images.githubusercontent.com/33794732/76884313-dda7e980-68c0-11ea-849c-db13b72597e6.png">


이 과정에서 에러가 발생해 구글링을 해봤다..ㅜ

https://stackoverflow.com/questions/47068709/your-cpu-supports-instructions-that-this-tensorflow-binary-was-not-compiled-to-u

```
# Just disables the warning, doesn't enable AVX/FMA
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
```

그렇구나...🤔 응급처치 빠르게 해줌...
<img width="1086" alt="Screen Shot 2020-03-13 at 12 15 50 AM" src="https://user-images.githubusercontent.com/33794732/76884323-e0a2da00-68c0-11ea-9f3c-3e6d1e6aeee3.png">


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

