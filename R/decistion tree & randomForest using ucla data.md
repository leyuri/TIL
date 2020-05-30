

## UCLA 데이터에 대하여 결정트리와 랜덤포레스트 모델을 적용하되 분류와 회귀 결과 두 가지 모두를 분석 후 결과 비교

### 데이터 설명

ucla

이 데이터는 400행, 4열의 dataframe형식이며, admit은 입학여부, gre, gpa는 시험점수, rank는 지원자의 학교 등급을 나타낸다. 입학여부는 입학하였으면1, 입학하지 못했다면 0을 가지고, rank는 1~4의 값을 가진다. 

```
admit: 입학여부 (입학 시 1, 입학하지 못한 경우 0)
gre: 시험점수
gpa: 시험점수
rank: 지원자의 학교 등급 (1~4)
```

### 데이터 준비(반응변수가 범주형일 경우)

우선 분류를 위해 결정트리와 랜덤포레스트 모델을 적용해 보도록 하겠다. 즉 admit이라는 반응변수가 범주형일 경우를 말한다. 

##### Load data

<img width="566" alt="Screen Shot 2020-05-23 at 11 59 28 PM" src="https://user-images.githubusercontent.com/33794732/82733895-185f4f80-9d52-11ea-8168-b200f9f9c9dc.png">

해당 주소를 통해 binary.csv를 다운받아  ucla 변수에 저장한다. 그리고 str함수를 이용하여 ucla를 살펴보았다. admit, gre, gpa, rank 총 4개의 변수를 확인할 수 있다. admit(입학여부)를 반응변수로 하고, 그 외 변수들을 설명변수로 설정하여, 이 설명변수들로 입학여부를 예측하는 모델을 만들어 보려고 한다. 

<img width="563" alt="Screen Shot 2020-05-23 at 11 59 52 PM" src="https://user-images.githubusercontent.com/33794732/82733901-1dbc9a00-9d52-11ea-93a0-687f4ecc118f.png">

<img width="849" alt="Screen Shot 2020-05-23 at 11 59 46 PM" src="https://user-images.githubusercontent.com/33794732/82733898-1b5a4000-9d52-11ea-833a-7594a88fbe93.png">

변수들의 값을 plot을 통해 확인해 보았다. 

<img width="640" alt="Screen Shot 2020-05-24 at 12 00 07 AM" src="https://user-images.githubusercontent.com/33794732/82733916-3af16880-9d52-11ea-916d-6d5845c11318.png">

입학여부를 나타내는 admit변수를 factor처리해준다. 또한 지원자의 학교 등급을 나타내는 rank변수는 범주형이므로 factor처리 해준다.



##### Split Train Set and Test Set

<img width="567" alt="Screen Shot 2020-05-24 at 12 00 36 AM" src="https://user-images.githubusercontent.com/33794732/82733921-3dec5900-9d52-11ea-97d7-4dbd5d7f6ea8.png">

이후  Train Set and Test Set으로 데이터를 나눠주었다. 이는 모델의 성능을 평가하기 위해서이다. 



### 모델 만들기(1) randomForest

<img width="578" alt="Screen Shot 2020-05-24 at 12 00 59 AM" src="https://user-images.githubusercontent.com/33794732/82733942-683e1680-9d52-11ea-918a-5f8174241605.png">

randomForest library를 이용하여 admit 모델을 만들어주었다. R에서는 Default로 500개의 trees를 만들어준다. 훈련집합에 대한 confusion matrix를 보면 총 83개 샘플을 잘못 분류함을 볼 수 있다. 

<img width="854" alt="Screen Shot 2020-05-24 at 12 01 05 AM" src="https://user-images.githubusercontent.com/33794732/82733944-6aa07080-9d52-11ea-931f-a47e100b4fc7.png">

랜덤 포레스트를 시각화한 결과이다. 가로축은 트리의 개수, 세로축은 랜덤 포레스트의 오류율이다. 빨간색은 admit=0일때의 오류율, 녹색은 admit=1일때의 오류율, 그리고 검정색은 평균 오류율을 나타낸다. 

<img width="601" alt="Screen Shot 2020-05-24 at 12 01 16 AM" src="https://user-images.githubusercontent.com/33794732/82733950-78ee8c80-9d52-11ea-992c-14ee48170120.png">

<img width="854" alt="Screen Shot 2020-05-24 at 12 01 22 AM" src="https://user-images.githubusercontent.com/33794732/82733951-7a1fb980-9d52-11ea-8141-f0435945fa64.png">

varUsed()를 통해 설명 변수가 질문에 사용된 횟수를 확인하고, 설명 변수의 중요도를 그려보았다. rank 보다 gre, gpa변수의 중요도가 높은 것을 확인할 수 있다. 

<img width="772" alt="Screen Shot 2020-05-24 at 12 01 35 AM" src="https://user-images.githubusercontent.com/33794732/82733953-7be97d00-9d52-11ea-9c3a-7704c9f7832b.png">

추가적으로 결정 트리 각각의 리프노드 개수를 확인해보았다. 1번과 2번 결정트리는 각각 47개와 44개의 리프 노드를 갖고 있다. 



### 모델 만들기(2) rpart()

<img width="665" alt="Screen Shot 2020-05-24 at 12 08 21 AM" src="https://user-images.githubusercontent.com/33794732/82734033-12b63980-9d53-11ea-8184-e81d8fbcb0bc.png">

<img width="796" alt="Screen Shot 2020-05-24 at 12 08 27 AM" src="https://user-images.githubusercontent.com/33794732/82734034-147ffd00-9d53-11ea-9756-9897bbc44883.png">

같은 방식으로  rpart함수를 이용하여 모델을 만들어 보았다. 그리고 plot을 통해 확인한 결과이다. 



<img width="671" alt="Screen Shot 2020-05-24 at 12 08 41 AM" src="https://user-images.githubusercontent.com/33794732/82734050-2c578100-9d53-11ea-94f8-3f55bd65baa1.png">

과적합화 문제를 해결하기 위해 가지치기를 해줘야 한다. 따라서 cross-validation을 계산해주는 printcp 함수를 이용하여 값을 확인해보았다. 

<img width="845" alt="Screen Shot 2020-05-24 at 12 08 54 AM" src="https://user-images.githubusercontent.com/33794732/82734056-2f527180-9d53-11ea-8408-2a851e6f7151.png">

xerror가 가장 낮은 split개수를 선택하면 되는데, 9개의 split에서 가장 작은 error를 보이고 있다. 

<img width="660" alt="Screen Shot 2020-05-24 at 12 09 10 AM" src="https://user-images.githubusercontent.com/33794732/82734057-30839e80-9d53-11ea-878e-8929646b0aa3.png">

<img width="788" alt="Screen Shot 2020-05-24 at 12 09 15 AM" src="https://user-images.githubusercontent.com/33794732/82734058-311c3500-9d53-11ea-9b8b-9154d4de0547.png">

에러율이 가장 낮을 때의 cp(Complexity Parameter)값을 지정하여 가지치기한 후 최적의 트리를 만들었다. 변경된 트리 모델을 확인할 수 있다. 

<div style="page-break-after: always; break-after: page;"></div> 

### 모델 예측 및 테스트

<img width="322" alt="Screen Shot 2020-05-24 at 12 03 20 AM" src="https://user-images.githubusercontent.com/33794732/82733958-83a92180-9d52-11ea-8dbc-4f1a6417449e.png">

<img width="376" alt="Screen Shot 2020-05-24 at 12 10 14 AM" src="https://user-images.githubusercontent.com/33794732/82734084-57da6b80-9d53-11ea-9038-e8a65263c162.png">

반응변수가 범주형일 경우 만든 두가지 모델에 대해 test set을 바탕으로 정확도를 평가해보았다. rpart로 만든 모델의 정확도가 0.71로  randomforest로 만든 모델보다 약간 더 높음을 확인할 수 있다. 

<div style="page-break-after: always; break-after: page;"></div> 

### 데이터 준비(반응변수가 범주형이 아닐 경우)

이번에는 회귀분석을 위해 결정트리와 랜덤포레스트 모델을 적용해 보도록 하겠다. 즉 admit이라는 반응변수가 연속형(이산형)일 경우를 말한다. 

##### Load data

<img width="618" alt="Screen Shot 2020-05-24 at 12 21 09 PM" src="https://user-images.githubusercontent.com/33794732/82744876-2bf1d100-9db9-11ea-87b1-9164f98d1fc0.png">

해당 주소를 통해 binary.csv를 다운받아  ucla2변수에 저장한다. 그리고 str함수를 이용하여 ucla2를 살펴보았다. admit, gre, gpa, rank 총 4개의 변수를 확인할 수 있다. admit(입학여부)를 반응변수로 하고, 그 외 변수들을 설명변수로 설정하여, 이 설명변수들로 입학여부를 예측하는 모델을 만들어 보려고 한다. 

<img width="565" alt="Screen Shot 2020-05-24 at 12 21 23 PM" src="https://user-images.githubusercontent.com/33794732/82744878-2e542b00-9db9-11ea-9d0a-08b7c96fb558.png">

이번에는 rank변수만을 factor로 바꿔주었다. 



##### Split Train Set and Test Set

<img width="580" alt="Screen Shot 2020-05-24 at 12 21 36 PM" src="https://user-images.githubusercontent.com/33794732/82744879-2f855800-9db9-11ea-9672-31f1033df721.png">

이후  Train Set and Test Set으로 데이터를 나눠주었다. 이는 모델의 성능을 평가하기 위해서이다. 



### 모델 만들기(1) randomForest

<img width="642" alt="Screen Shot 2020-05-24 at 12 30 20 PM" src="https://user-images.githubusercontent.com/33794732/82745003-79bb0900-9dba-11ea-8b0b-6379b0b99995.png">

randomforest model을 만들어봤다.  type of random forest에서 regression을 확인할 수 있다.  즉 반응변수가 범주형이 아닐 경우 자동으로 회귀로 분석되고 있음을 확인할 수 있다. 마찬가지로 R에서는 Default로 500개의 trees를 만들어준다. 

<div style="page-break-after: always; break-after: page;"></div> 

### 모델 만들기(2) rpart()

<img width="621" alt="Screen Shot 2020-05-24 at 12 30 29 PM" src="https://user-images.githubusercontent.com/33794732/82745005-7cb5f980-9dba-11ea-97af-e3d11b7e3a53.png">

rpart()함수를 이용하여 model을 만들었다. 

<img width="489" alt="Screen Shot 2020-05-24 at 12 47 57 PM" src="https://user-images.githubusercontent.com/33794732/82745227-d4edfb00-9dbc-11ea-8e66-20986d65fe51.png">

그리고 해당 결과를 plot을 그려 확인했다. 

<img width="1060" alt="Screen Shot 2020-05-24 at 12 48 03 PM" src="https://user-images.githubusercontent.com/33794732/82745228-d61f2800-9dbc-11ea-9847-d1538807ccff.png">

따로 가지치기를 진행하지 않았다. root node로부터 리프노드까지의 모습을 살펴볼 수 있다. 



### 모델 예측 및 테스트

<img width="582" alt="Screen Shot 2020-05-24 at 12 30 50 PM" src="https://user-images.githubusercontent.com/33794732/82745006-7d4e9000-9dba-11ea-890c-3296757b0158.png">

이번에는 confusionMatrix함수를 사용하지 않고, 각각의 정확도를 확인하는 calcAUC를 만들었다. 이후 f, r 모델을 train set으로 예측한 결과의 정확도를 확인해 보았다. f모델의 정확도는 0.968, 그리고 r모델의 정확도는 0.734이다.  f모델의 정확도가 매우 높은 것을 확인할 수 있다. 하지만 이 정확도가 test set에서도 똑같이 작용할까? 확인해 보았다. 

<img width="580" alt="Screen Shot 2020-05-24 at 12 30 57 PM" src="https://user-images.githubusercontent.com/33794732/82745007-7de72680-9dba-11ea-976f-906893cdd17a.png">

test set을 적용한 결과 f모델과, r 모델의 정확도는 train set에 비해  떨어졌다. 하지만 오히려 정확도는 r모델이 높았다. 최종적으로 앞선 4개의 모델을 비교해봤을 때,  반응변수를 범주형으로 변경하고 rpart()를 통해 가지치기를 진행한 모델이 가장 정확도가 높았다. 

## 2. rpart 라이브러리에 제공되는 kyphosis 데이터에 대하여 결정트리, 렌덤포레스트, SVM, kNN 모델을 적용하여 분석하고, 예측한 결과를 비교하시오.

### 데이터 설명

kyphosis: 척추교정 수술을 받은 아동에 대한 데이터로,  81개의 행과 4개의 열을 가지고 있다.

```
Kyphosis: 수술 후 척추후만증(변형의 일종)이 있는지 여부를 나타내는 'absent' '현재' 수준의 인자
Age: in months
Number: the number of vertebrae involved 관련된 척추의 수
Start: the number of the first (topmost) vertebra operated on 수술한 첫 번째(가장 위) 척추의 수
```

### 데이터 준비

##### Load data

<img width="665" alt="Screen Shot 2020-05-23 at 9 27 44 PM" src="https://user-images.githubusercontent.com/33794732/82730666-53ef1f00-9d3c-11ea-9753-556a21671454.png">

rpart 라이브러리에 제공되는 kyphosis의 데이터를 가져오고, 구조를 확인해 보았다. 

##### Split Train Set and Test Set

<img width="676" alt="Screen Shot 2020-05-23 at 9 30 32 PM" src="https://user-images.githubusercontent.com/33794732/82730692-aaf4f400-9d3c-11ea-984d-27e9c1285de1.png">

train data 와 test data set으로 나눠주었다. 60 / 21로 나눠진 모습을 볼 수 있다. 



### 모델 만들기

- rpart model

<img width="627" alt="Screen Shot 2020-05-23 at 9 35 03 PM" src="https://user-images.githubusercontent.com/33794732/82730797-687fe700-9d3d-11ea-8c81-36a729308423.png">

- randomforest model

<img width="621" alt="Screen Shot 2020-05-23 at 9 35 13 PM" src="https://user-images.githubusercontent.com/33794732/82730804-6b7ad780-9d3d-11ea-8b46-b3f9564db48a.png">

- svm model

<img width="607" alt="Screen Shot 2020-05-23 at 9 35 23 PM" src="https://user-images.githubusercontent.com/33794732/82730805-6cac0480-9d3d-11ea-86db-eaa6e12506d9.png">

<div style="page-break-after: always; break-after: page;"></div> 

- Knn model

<img width="400" alt="Screen Shot 2020-05-23 at 9 35 31 PM" src="https://user-images.githubusercontent.com/33794732/82730807-6d449b00-9d3d-11ea-999d-c10fd909c4cf.png">



train함수를 이용하여 rpart model, randomforest model, svm model, Knn model 을 일관성 있게 만들어봤다. 1번의 rpart model의 정확도가 가장 높은 것을 볼 수 있다. 



### 모델 예측 및 테스트

- rpart model

<img width="400" alt="Screen Shot 2020-05-23 at 9 43 09 PM" src="https://user-images.githubusercontent.com/33794732/82730935-7c781880-9d3e-11ea-9189-4fb1528f5c3b.png">

- randomforest model

<img width="400" alt="Screen Shot 2020-05-23 at 9 43 21 PM" src="https://user-images.githubusercontent.com/33794732/82730938-800b9f80-9d3e-11ea-8531-ffe14e22c692.png">

<div style="page-break-after: always; break-after: page;"></div> 

- svm model

<img width="400" alt="Screen Shot 2020-05-23 at 9 43 29 PM" src="https://user-images.githubusercontent.com/33794732/82730939-826df980-9d3e-11ea-82c3-5c1c3d37fa7c.png">

- Knn model

<img width="400" alt="Screen Shot 2020-05-23 at 9 43 36 PM" src="https://user-images.githubusercontent.com/33794732/82730942-839f2680-9d3e-11ea-8674-2bfa3de32222.png">

confusionMatrix함수를 이용하여 test set 에 대한 모델 예측 및 테스트를 진행하였다. 그 결과 다른 모델보다도 Knn model의 정확도가 0.8095로 가장 높았다. 앞서 train set을 통해 모델을 만들었을 때는 rpart model의 정확도가 가장 높았지만 test set을 이용하였을 때는 Knn model의 정확도가 높았다.  모델의 종류마다 정확도가 달라지고, 데이터 set마다 정확도가 달라지는 사실이 흥미로웠다. 



## 3. UCI 머신러닝 레포지토리가 제공하는 adult 데이터에 결정트리, 렌덤포레스트,SVM, kNN 모델을 적용하여 분석하고, 예측한 결과를 비교하시오.

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