## UCI 머신러닝 레포지토리가 제공하는 adult 데이터에 결정트리, 렌덤포레스트,SVM, kNN 모델을 적용하여 분석하고, 예측한 결과를 비교

### 데이터 설명

adult

1994년 인구조사 데이터로 관측치: n = 32561, 변수개수: 15이고 결측치를 포함한 데이터다. 분류분석의 목적은 설명변수에 근거해서 연소득 $50k가 넘는지를 예측해내는 것이다. 

```
age: continuous. # 나이
workclass: Private, Self-emp-not-inc, Self-emp-inc, Federal-gov, Local-gov, State-gov, Without-pay, Never-worked.
fnlwgt: continuous.
education: Bachelors, Some-college, 11th, HS-grad, Prof-school, Assoc-acdm, Assoc-voc, 9th, 7th-8th, 12th, Masters, 1st-4th, 10th, Doctorate, 5th-6th, Preschool. # 교육
education-num: continuous. #교육기간
marital-status: Married-civ-spouse, Divorced, Never-married, Separated, Widowed, Married-spouse-absent, Married-AF-spouse. # 결혼 상태
occupation: Tech-support, Craft-repair, Other-service, Sales, Exec-managerial, Prof-specialty, Handlers-cleaners, Machine-op-inspct, Adm-clerical, Farming-fishing, Transport-moving, Priv-house-serv, Protective-serv, Armed-Forces. # 직업
relationship: Wife, Own-child, Husband, Not-in-family, Other-relative, Unmarried. #관계
race: White, Asian-Pac-Islander, Amer-Indian-Eskimo, Other, Black. #인종
sex: Female, Male. #성별
capital-gain: continuous. # 자본 지출
capital-loss: continuous. # 자본 손실
hours-per-week: continuous.# 주당 시간
native-country: United-States, Cambodia, England, Puerto-Rico, Canada, Germany, Outlying-US(Guam-USVI-etc), India, Japan, Greece, South, China, Cuba, Iran, Honduras, Philippines, Italy, Poland, Jamaica, Vietnam, Mexico, Portugal, Ireland, France, Dominican-Republic, Laos, Ecuador, Taiwan, Haiti, Columbia, Hungary, Guatemala, Nicaragua, Scotland, Thailand, Yugoslavia, El-Salvador, Trinadad&Tobago, Peru, Hong, Holand-Netherlands. # 국가
wage: >50K, <=50K. # 연소득
```



### 데이터 준비

##### Load data

<img width="804" alt="Screen Shot 2020-05-23 at 11 08 55 PM" src="https://user-images.githubusercontent.com/33794732/82732814-991a4d80-9d4a-11ea-908b-de560433f2c1.png">



해당 주소를 통해 adult.data를 다운받아 theURL변수에 저장한다. 이후 해당 변수의 이름들을 지정해주었다. 그리고 str함수를 이용하여 adult를 살펴보았다. 많은 변수들을 확인할 수 있다. 

##### Remove Variables

<img width="773" alt="Screen Shot 2020-05-23 at 11 09 11 PM" src="https://user-images.githubusercontent.com/33794732/82732816-9d466b00-9d4a-11ea-99c1-b92582fa387f.png">

변수가 많으므로, 사용할 변수를 선정하여 사용하기로 했다. age, race, sex 라는 독립변수와 wage 설명변수를 제외한 모든 변수들은 제거해주었다. 참고로  해당 변수들은 **하이퍼 파라미터**로 임의로 설정한 값이다. 

##### Pick 100 samples

<img width="598" alt="Screen Shot 2020-05-23 at 11 31 37 PM" src="https://user-images.githubusercontent.com/33794732/82733248-92410a00-9d4d-11ea-9c81-649d792412b2.png">

해당 데이터의 수가 많아 랜덤으로 500개를 뽑아주었다. 

##### Split Train Set and Test Set

<img width="656" alt="Screen Shot 2020-05-23 at 11 33 44 PM" src="https://user-images.githubusercontent.com/33794732/82733298-db915980-9d4d-11ea-92b4-07b4fa250339.png">

이후  Train Set and Test Set으로 데이터를 나눠주었다. 이는 모델의 성능을 평가하기 위해서이다. 



### 모델 만들기

- rpart model

<img width="521" alt="Screen Shot 2020-05-23 at 11 34 57 PM" src="https://user-images.githubusercontent.com/33794732/82733361-43e03b00-9d4e-11ea-8957-0df2c6cb5789.png">

- randomforest model

<img width="521" alt="Screen Shot 2020-05-23 at 11 35 05 PM" src="https://user-images.githubusercontent.com/33794732/82733364-4773c200-9d4e-11ea-8f8b-636605352fc7.png">

<div style="page-break-after: always; break-after: page;"></div> 

- svm model

<img width="519" alt="Screen Shot 2020-05-23 at 11 35 14 PM" src="https://user-images.githubusercontent.com/33794732/82733367-493d8580-9d4e-11ea-9f95-50fa9bf1111f.png">

- Knn model

<img width="519" alt="Screen Shot 2020-05-23 at 11 35 24 PM" src="https://user-images.githubusercontent.com/33794732/82733368-49d61c00-9d4e-11ea-8c35-1296411e9a2f.png">

train함수를 이용하여 rpart model, randomforest model, svm model, Knn model 을 일관성 있게 만들어봤다. svm model의 정확도가 가장 높은 것을 볼 수 있다. 



### 모델 예측 및 테스트

- rpart model

<img width="400" alt="Screen Shot 2020-05-23 at 11 35 55 PM" src="https://user-images.githubusercontent.com/33794732/82733382-5f4b4600-9d4e-11ea-9a7a-20273ab84b1f.png">

<div style="page-break-after: always; break-after: page;"></div> 



- randomforest model

<img width="400" alt="Screen Shot 2020-05-23 at 11 36 03 PM" src="https://user-images.githubusercontent.com/33794732/82733385-62463680-9d4e-11ea-869c-7955481c92bf.png">

- svm model

<img width="400" alt="Screen Shot 2020-05-23 at 11 36 14 PM" src="https://user-images.githubusercontent.com/33794732/82733387-63776380-9d4e-11ea-8d8a-e5de7c9cbe66.png">

- Knn model

<img width="400" alt="Screen Shot 2020-05-23 at 11 36 24 PM" src="https://user-images.githubusercontent.com/33794732/82733389-640ffa00-9d4e-11ea-8490-10c0b3552e10.png">

confusionMatrix함수를 이용하여 test set 에 대한 모델 예측 및 테스트를 진행하였다. 그 결과 다른 모델보다도 Knn model의 정확도가 0.7665로 가장 높았다. 앞서 train set을 통해 모델을 만들었을 때는svm model의 정확도가 가장 높았지만 test set을 이용하였을 때는 Knn model의 정확도가 높았다.  모델의 종류마다 정확도가 달라지고, 데이터 set마다 정확도가 달라지는 사실이 흥미로웠다. 

<div style="page-break-after: always; break-after: page;"></div> 

## 결론

사용한 데이터 에서는 KNN Model이 성능이 좋다는 사실을 알 수 있었다.



## 참고 문헌

https://www.rdocumentation.org/packages/rpart/versions/4.1-15/topics/kyphosis

[https://syleeie.tistory.com/entry/%EA%B8%B0%EB%B3%B8-%ED%8C%A8%ED%82%A4%EC%A7%80%EB%A1%9C-%ED%95%A0-%EC%88%98-%EC%9E%88%EB%8A%94-R%EC%97%90%EC%84%9C%EC%9D%98-%EB%B3%91%EB%A0%AC%EC%B2%98%EB%A6%AC-%EB%B0%A9%EB%B2%95](https://syleeie.tistory.com/entry/기본-패키지로-할-수-있는-R에서의-병렬처리-방법)

https://thebook.io/006723/ch03/03/03/

https://kuklife.tistory.com/51

https://archive.ics.uci.edu/ml/datasets/Adult



## 오류정리

https://stackoverflow.com/questions/51295402/r-on-macos-error-vector-memory-exhausted-limit-reached