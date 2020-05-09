# 다중 선형 회귀 모델 



다중회귀분석이란 설명 변수가 두개 이상인 회귀분석을 의미한다.  다중 선형 회귀 모델을 분석하기 위해 다음과 같은 절차를 거쳤다. 



**1단계.** lm함수를 사용하여 회귀분석 모델을 생성한다.

**2단계.** 모델이 통계적으로 유의한지 여부를 확인한다

**3단계.** 그 결과로 삭제할 변수는 없는지 확인한다.

**4단계.** predict함수를 사용하여 새로운 데이터 셋에 대한 예측값을 구한다.



### airquality 데이터

R의 내장데이터인 airquality를 이용하려고 한다. airquality 는 1973년 5월부터 9월까지의 뉴욕 대기 오염 정도에 대한 기록에 관한 데이터이다. 다음과 같이 총 6개의 변수를 갖고 있다. 

```
Ozone: Mean ozone in parts per billion from 1300 to 1500 hours at Roosevelt Island
Solar.R: Solar radiation in Langleys in the frequency band 4000--7700 Angstroms from 0800 to 1200 hours at Central Park
Wind: Average wind speed in miles per hour at 0700 and 1000 hours at LaGuardia Airport
Temp: Maximum daily temperature in degrees Fahrenheit at La Guardia Airport.
Month: (1--12)
Day: day of month
```

우선 아래 코드들을 실행하여 airquality 데이터의 구조 및 변수들을 확인해보았다. 

<img width="694" alt="Screen Shot 2020-05-07 at 2 59 40 AM" src="https://user-images.githubusercontent.com/33794732/81211779-d7a3ce80-900e-11ea-8785-d0244d9587d1.png">

airquality 는 Ozone, Solar.R, Wind, Temp, Month, Day 총 6개의 변수가 있는 데이터이다. 여기서 Ozone을 y인 종속변수로 하고, 그 외 변수들을 x 즉 독립변수로 설정하여, 이 변수들로 오존을 예측하는 다중선형회귀모델을 만들어 보려고 한다. airquality의 Ozone을 대상으로 분석할 것이므로 플롯을 그려 정규분포를 따르고 있는지 먼저 확인해 보았다. 



<img width="696" alt="Screen Shot 2020-05-07 at 2 59 49 AM" src="https://user-images.githubusercontent.com/33794732/81211781-d8d4fb80-900e-11ea-958f-c99188f7a502.png">

<img width="495" alt="Screen Shot 2020-05-07 at 2 55 24 AM" src="https://user-images.githubusercontent.com/33794732/81211656-a5926c80-900e-11ea-9669-e681b4057532.png">

직선에서 각각의 점들이 크게 벗어나 있지 않으므로 Ozone은 정규 분포를 따른다고 볼 수 있다. 



### 모델 만들기

<img width="711" alt="Screen Shot 2020-05-07 at 3 14 07 AM" src="https://user-images.githubusercontent.com/33794732/81213109-dd9aaf00-9010-11ea-8fa7-6bd6f795d295.png">



우선 데이터 정제 없이 모든 변수를 적용하여 모델을 만들어봤다. Ozone을 대상변수, 그리고 나머지 5개의 변수들을 설명변수로 하여 모델을 만들었다. 그리고 summary 함수를 적용하여 다음과 같은 결과를 얻었다. p-valuse의 값을 보면 0.05보다 작으므로 이 모델은 유의함을 알 수 있다. 두번째로 살펴볼 것은 coefficients이다. 여러 변수들의 각각의 p-value값을 볼 수 있다. * 마크가 붙고, 갯수가 늘어날 수록 유의할 확률이 높아지는데 여기서 Wind, 그리고 Temp 2개의 변수가 다른 변수들에 비해 유의함을 볼 수 있다. 추가적으로 실제 각 변수의 연관성을 대해 그래프를 그려보았는데 다음과 같은 결과가 나왔다.



![Screen Shot 2020-05-06 at 5.34.08 PM](/Users/yuri/Library/Application Support/typora-user-images/Screen Shot 2020-05-06 at 5.34.08 PM.png)



위 그래프를 토대로 Solar.R, Wind, Temp  변수들에 비해 상관관계가 없는 Month와 Day를 제거해주기로 결정했다. 오존량을 결정할 수 있는 요인이 아니라고 생각했기 때문이다. 



<img width="660" alt="Screen Shot 2020-05-07 at 9 44 18 AM" src="https://user-images.githubusercontent.com/33794732/81242148-5ae11680-9047-11ea-9a00-af28813a30bf.png">



다음과 같이 열을 잘라 Month와 Day를 제거시켜주었다. 



<img width="660" alt="Screen Shot 2020-05-07 at 9 45 31 AM" src="https://user-images.githubusercontent.com/33794732/81242215-806e2000-9047-11ea-970f-2ea370c24af8.png">



추가적으로 데이터에 NA값이 있는지 확인해 보았다. 



<img width="660" alt="Screen Shot 2020-05-07 at 9 46 23 AM" src="https://user-images.githubusercontent.com/33794732/81242266-9e3b8500-9047-11ea-9a79-5614901ae598.png">



NA값이 데이터 내에 존재하는 것을 확인할 수 있다. 



<img width="726" alt="Screen Shot 2020-05-07 at 11 20 21 AM" src="https://user-images.githubusercontent.com/33794732/81247361-caa9ce00-9054-11ea-85cf-a16b74c4c82d.png">



상관계수 분석을 할 때 결측값이 있으면 NA 값이 나오게 되므로 사전에 결측값 처리하는 것이 필요하다. na.omit함수를 통해 NA을 제거하고 air2라는 새로운 데이터값을 만들어주었다. air2의 구조에서 NA값이 사라졌음을 볼 수 있다. 



<img width="716" alt="Screen Shot 2020-05-07 at 11 20 34 AM" src="https://user-images.githubusercontent.com/33794732/81247366-cd0c2800-9054-11ea-8b1c-a9ba135ef48a.png">

결측값이 있는 행 전체를 삭제한 후에 cor 함수를 통해 상관계수를 구해본 결과이다. 



<img width="658" alt="Screen Shot 2020-05-07 at 9 49 35 AM" src="https://user-images.githubusercontent.com/33794732/81242451-1904a000-9048-11ea-9404-db7816f8351d.png">

이후 air2 에 대한 plott을 그려보았다.

<img width="611" alt="Screen Shot 2020-05-07 at 9 49 23 AM" src="https://user-images.githubusercontent.com/33794732/81242447-15711900-9048-11ea-917a-fae0626ce411.png">

그래프의 모양을 통해 오존은 태양광과 온도에 대해 양의 상관을, 바람에 대해 음의 상관을 갖는다는 사실을 알 수 있다. 




<div style="page-break-after: always; break-after: page;"></div> 

### 가장 좋은 모델은?

정제된 데이터로 다중선형회귀 모델을 만들어보도록 하겠다. 3가지 독립변수를 조합하여 7개의 모델을 만들어봤다. 



#### # fit1 (Ozone~Solar.R)

#### # fit2 (Ozone~Solar.R+Wind)



<img width="625" alt="Screen Shot 2020-05-07 at 10 11 46 AM" src="https://user-images.githubusercontent.com/33794732/81243613-4b63cc80-904b-11ea-8ec7-751093c5e241.png">



R-squared의 값을 보면 0.1213 / 0.4495이다. R-squared이 1에 가까워질 수록 선형에 가까운 것을 의미하는데 이 두변수는 선형에 가까운 모습을 띠고 있진 않는다. p-value는 0.05보다 작을 경우 유의하다고 본다. 두 모델 모두 유의하지만, fit1 보다 fit2 모델이 더 좋다는 것을 알 수 있다. 



#### # fit3 (Ozone~Solar.R+Temp)

#### # fit4 (Ozone~Wind)



<img width="633" alt="Screen Shot 2020-05-07 at 10 12 01 AM" src="https://user-images.githubusercontent.com/33794732/81243623-50288080-904b-11ea-837e-208dcffdb09f.png">



앞선 fit1, fit2 모델에 비해 fit3는 선형적인 모습을 띄고 있지만, fit4는 그렇진 않다. 





#### # fit5 (Ozone~Wind+Temp)

#### # fit6 (Ozone~Temp)



<img width="627" alt="Screen Shot 2020-05-07 at 10 12 13 AM" src="https://user-images.githubusercontent.com/33794732/81243624-50c11700-904b-11ea-850b-2574712e1298.png">



fit5는 앞서 나왔던 모델들 중 가장 선형적이다. **편차(deviance)**라 불리는 통계량은 적합된 모델의 예측 값과 원시 데이터에서 실제 값과 얼마나 근접하게 일치하는지 측정되는 값을 비교한다. 만약 제안된 모델이 참에 좋게 접근한다면, 그러면 편차는 상대적으로 작게 될 것이다. 즉 편차가 작을수록 모델 적합도가 높은 것을 의미한다. deviance역시 다른 모델들에 비해 낮은 값을 보여주고 있다. 



#### # fit7 (Ozone~Temp+Solor.R+Wind)



<img width="623" alt="Screen Shot 2020-05-07 at 10 12 22 AM" src="https://user-images.githubusercontent.com/33794732/81243625-5159ad80-904b-11ea-9b64-1553b5482ac7.png">



이번에는 3가지 독립변수(Temp, Solar.R, Wind)를 모두 포함한 fit7를 만들었다. R-squared 값이 가장 1과 가깝고, deviance 또한 가장 적었다. 따라서 변수 3개를 포함하는 fit7 모델이 가장 좋다는 것을 볼 수 있다. 따라서 이 3개의 변수를 한꺼번에 사용한 모델을 활용하여 예측을 해보려고 한다. 



### 샘플을 사용하여 예측을 수행



<img width="622" alt="Screen Shot 2020-05-07 at 10 22 18 AM" src="https://user-images.githubusercontent.com/33794732/81244182-a5b15d00-904c-11ea-9961-3e26b37339fd.png">



Ozone은 Solar.R 과 Temp 대해 양의 상관을, Wind에  대해 음의 상관을 갖는다는 사실을 알아냈다. 따라서 Solar.R과  Temp의 데이터를 점점 커지게 설정하였고,  Wind 의 데이터에 대해서는 점점 작아지도록 설정했다. 이후 이 모델에 해당 데이터를 적용해보았다. 예측결과 Temp와  Solar.R의 값이 많고, Wind가 적을 수록 Ozone의 값이 커진다는 것을 볼 수 있다.  

## 참고 문헌

https://rfriend.tistory.com/169

http://www.dodomira.com/2016/01/31/multiple-regression-r/

https://freshrimpsushi.tistory.com/670

http://rstudio-pubs-static.s3.amazonaws.com/14197_79619e2b222041f28b6857e45c9cba5d.html

