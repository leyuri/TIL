


# 의사결정나무 분석 Decision tree 

### 데이터 준비

이 데이터는 독일의 한 은행이 고객들의 채무불이행을 추적 조사한 내용으로 1000명의 데이터가 있으며, 21개의 변수로 구성되어있다.  20개의 feature들을 predictor삼아 credit이 좋은지 나쁜지를 학습하여 향후 새로운 고객에 대해 그 고객의 채무불이행 가능성을 판단해 볼 것이다. 

<img width="691" alt="Screen Shot 2020-05-16 at 10 49 19 AM" src="https://user-images.githubusercontent.com/33794732/82107488-16e6c380-9763-11ea-8319-a77531a1882c.png">

해당 주소를 통해 german.data를 다운 받아 theURL변수에 저장한다.  이후 해당 변수에 대한 이름들을 지정해준다. 이후 credit를 summary함수를 통해 살펴 보았다. 

<img width="978" alt="Screen Shot 2020-05-16 at 10 50 03 AM" src="https://user-images.githubusercontent.com/33794732/82107489-19e1b400-9763-11ea-9935-5c53ca9e0d4f.png">

많은 변수들이 있음을 확인할 수 있다. 

<img width="489" alt="Screen Shot 2020-05-16 at 10 56 42 AM" src="https://user-images.githubusercontent.com/33794732/82107609-21558d00-9764-11ea-9bd1-ddc6b35a39f5.png">

다음과 같은 변수들을 명목형 변수로 바꾸어 dataset을 다시 구성한다.



<img width="1072" alt="Screen Shot 2020-05-16 at 10 57 56 AM" src="https://user-images.githubusercontent.com/33794732/82107612-26b2d780-9764-11ea-8064-2e84e3491e95.png">

변화된 모습을 확인할 수 있다. 



<img width="576" alt="Screen Shot 2020-05-16 at 11 00 20 AM" src="https://user-images.githubusercontent.com/33794732/82107664-7396ae00-9764-11ea-9593-eb8b727cd71f.png">

변수가 많지만 CreditHistory, CreditAmout, Employment, Age, Credit의 5개의 변수만 이용하려고 한다. 따라서 해당 변수를 제외하고 나머지 변수들을 제거해주었다.  즉 CreditHistory, CreditAmout, Employment, Age 의 변수에 따른 Credit (Good | Bad) 를 확인하고자 한다. 



<img width="482" alt="Screen Shot 2020-05-16 at 11 06 47 AM" src="https://user-images.githubusercontent.com/33794732/82107841-a68d7180-9765-11ea-80b3-cd698fbec7fa.png">

 plot을 통해 변수들을 확인해 보았다. 

<img width="739" alt="Screen Shot 2020-05-16 at 11 07 05 AM" src="https://user-images.githubusercontent.com/33794732/82107848-ab522580-9765-11ea-806c-1df2c0cf6c40.png">

<img width="600" alt="Screen Shot 2020-05-16 at 11 06 55 AM" src="https://user-images.githubusercontent.com/33794732/82107846-aa20f880-9765-11ea-900d-5bd064ef5d02.png">

plot을 통해 credit 내의 변수 분포들을 확인할 수 있다. 

<img width="500" alt="Screen Shot 2020-05-16 at 11 08 12 AM" src="https://user-images.githubusercontent.com/33794732/82107849-abeabc00-9765-11ea-8c7e-7dd599f2cb80.png">



본격적으로 모델을 만들어 학습시켜보는 과정을 진행하기 전에 데이터가 Character일 경우 tree함수를 진행할 때 오류가 생긴다. 따라서 as.factor함수를 통해  factor로 바꿔주었다. 



<img width="678" alt="Screen Shot 2020-05-16 at 11 14 48 AM" src="https://user-images.githubusercontent.com/33794732/82107965-798d8e80-9766-11ea-99de-4837bd53a706.png">

또한 데이터를 train set과 test set으로 구분했다. 따로 데이터 set 을 구분하는 이유는 decision tree 모델의 성능을 평가하기 위해서이다. 

<div style="page-break-after: always; break-after: page;"></div> 



### tree() 패키지 사용

##### a. 종속변수: Credit, 독립변수: CreditHistory+CreditAmout

##### 1단계: tree 생성

<img width="611" alt="Screen Shot 2020-05-16 at 1 14 56 PM" src="https://user-images.githubusercontent.com/33794732/82110239-85358100-9777-11ea-86c8-9cfbc75c073a.png">

<img width="726" alt="Screen Shot 2020-05-16 at 1 15 04 PM" src="https://user-images.githubusercontent.com/33794732/82110240-8797db00-9777-11ea-89c5-f7468a3e5da6.png">

tree함수를 이용하여 종속변수는 Credit, 독립변수는 CreditHistory,CreditAmout 2개로  구성된 decision tree를 만들었다. 위 decision tree를 plot을 통해 확인해 본 결과이다. 





##### 2단계: 가지치기

<img width="627" alt="Screen Shot 2020-05-16 at 1 15 32 PM" src="https://user-images.githubusercontent.com/33794732/82110249-99797e00-9777-11ea-8340-3bd7f9853870.png">

과적합화의 문제를 해결하기 위해 Pruning단계가 필요하다. 따라서 위 트리의 복잡도 계수 값을 확인하여 가지치기 할 노드를 선택한다. 복잡도 수는 작은 것을 택해야 한다. k 중 0 의 값이 가장 작다. 따라서  즉 노드 3에 해당하는 값을 선택하도록 한다. 

<img width="630" alt="Screen Shot 2020-05-16 at 1 15 37 PM" src="https://user-images.githubusercontent.com/33794732/82110251-9c746e80-9777-11ea-866d-dc575f0f56d3.png">
<img width="773" alt="Screen Shot 2020-05-16 at 1 15 53 PM" src="https://user-images.githubusercontent.com/33794732/82110252-9d0d0500-9777-11ea-8ca1-b93103a0980f.png">

추가로 plot을 그려 확인해 보았다. 노드 3에서 복잡도가 떨어지는 모습을 볼 수 있다. 



##### 3단계: 최적의 tree 모형

<img width="601" alt="Screen Shot 2020-05-16 at 1 16 11 PM" src="https://user-images.githubusercontent.com/33794732/82110260-b57d1f80-9777-11ea-8a21-be6e123047cc.png">

prune.misclass()를 통해 노드 3을 가지치기 해준 후 최적의 tree를 만들었다. 

<img width="720" alt="Screen Shot 2020-05-16 at 1 16 19 PM" src="https://user-images.githubusercontent.com/33794732/82110261-b7df7980-9777-11ea-9d30-68c88b015f6a.png">

변경된 Tree model의  모습을 확인할 수 있다. 



##### 4단계: 의사 결정 나무의 정확도

<img width="524" alt="Screen Shot 2020-05-16 at 1 16 30 PM" src="https://user-images.githubusercontent.com/33794732/82110262-b910a680-9777-11ea-9f49-1342d5edf2cd.png">



predict 함수를 사용해서 test 셋의 Credit를 예측한 후, confusionMatrix함수를 사용해서 모델의 정확성을 평가해 보았다. 현재 334개의 test set 이 들어있다. Accuracy는  약 71%로 비교적 정확하게 credit의 여부를 구분하고 있다.  

<div style="page-break-after: always; break-after: page;"></div> 



##### b. 종속변수: Credit, 독립변수: CreditAmount+Employment+Age

##### 1단계: tree 생성



<img width="561" alt="Screen Shot 2020-05-16 at 1 32 39 PM" src="https://user-images.githubusercontent.com/33794732/82110463-bca52d00-9779-11ea-87f0-7cd268548062.png">

<img width="709" alt="Screen Shot 2020-05-16 at 1 29 12 PM" src="https://user-images.githubusercontent.com/33794732/82110444-967f8d00-9779-11ea-8f05-fb44fff05e9e.png">

tree함수를 이용하여 종속변수는 Credit, 독립변수는 CreditAmount+Employment+Age 3개로  구성된 decision tree를 만들었다. 위 decision tree를 plot을 통해 확인해 본 결과이다. 



##### 2단계: 가지치기

<img width="616" alt="Screen Shot 2020-05-16 at 1 30 09 PM" src="https://user-images.githubusercontent.com/33794732/82110474-d21a5700-9779-11ea-96aa-831ee9df8bfd.png">

과적합화의 문제를 해결하기 위해 Pruning단계가 필요하다. 따라서 위 트리의 복잡도 계수 값을 확인하여 가지치기 할 노드를 선택한다. 복잡도 수는 작은 것을 택해야 한다. k 중 0 의 값이 가장 작다. 따라서  즉 노드 4에 해당하는 값을 선택하도록 한다. 

<img width="630" alt="Screen Shot 2020-05-16 at 1 30 15 PM" src="https://user-images.githubusercontent.com/33794732/82110478-d5154780-9779-11ea-88dc-d57f8a861325.png">

<img width="779" alt="Screen Shot 2020-05-16 at 1 30 22 PM" src="https://user-images.githubusercontent.com/33794732/82110480-d5154780-9779-11ea-902d-c387750e0c8f.png">

추가로 plot을 그려 확인해 보았다. 노드 4에서 복잡도가 떨어지는 모습을 볼 수 있다. 



##### 3단계: 최적의 tree 모형



<img width="652" alt="Screen Shot 2020-05-16 at 1 30 57 PM" src="https://user-images.githubusercontent.com/33794732/82110538-11e13e80-977a-11ea-8dfa-94c51a91e0c6.png">

prune.misclass()를 통해 노드 4을 가지치기 해준 후 최적의 tree를 만들었다. 

<img width="695" alt="Screen Shot 2020-05-16 at 1 31 03 PM" src="https://user-images.githubusercontent.com/33794732/82110539-14dc2f00-977a-11ea-9257-46a096af2fdf.png">

변경된 Tree model의  모습을 확인할 수 있다. 



##### 4단계: 의사 결정 나무의 정확도

<img width="544" alt="Screen Shot 2020-05-16 at 1 31 12 PM" src="https://user-images.githubusercontent.com/33794732/82110540-1574c580-977a-11ea-9df7-e2ffbdbe1c0d.png">

predict 함수를 사용해서 test 셋의 Credit를 예측한 후, confusionMatrix함수를 사용해서 모델의 정확성을 평가해 보았다. 현재 334개의 test set 이 들어있다. Accuracy는  약 66%로 앞선 a모델보다 정확성이 떨어진다는 것을 볼 수 있다. 

<div style="page-break-after: always; break-after: page;"></div> 



### rpart() 패키지 사용

##### c. 종속변수: Credit, 독립변수: CreditHistory+CreditAmount+Emp

##### 1단계: tree 생성

<img width="700" alt="Screen Shot 2020-05-17 at 3 07 27 AM" src="https://user-images.githubusercontent.com/33794732/82127074-f57dea00-97eb-11ea-91e5-fea48cc79317.png">



<img width="687" alt="Screen Shot 2020-05-17 at 3 06 38 AM" src="https://user-images.githubusercontent.com/33794732/82127071-f282f980-97eb-11ea-8ebf-a51f700ac1a5.png">



rpart함수를 이용하여 종속변수는 Credit, 독립변수는 CreditHistory+CreditAmount+Employment 3개로  구성된 decision tree를 만들었다. 위 decision tree를 plot을 통해 확인해 본 결과이다. 



##### 2단계: 가지치기

<img width="645" alt="Screen Shot 2020-05-17 at 3 07 35 AM" src="https://user-images.githubusercontent.com/33794732/82127085-0c244100-97ec-11ea-9aa2-962f6ddb62ba.png">



어떤 예측 모델이 더 정확한지 평가하기 전에 rpart패키지도 과적합화 문제가 있기 때문에 가지치기(Pruning)를 해야 한다.  rpart패키지에서는 cv.tree와 유사하게 cross-validation을 계산해 주는 함수로 print.cp를 제공하고 있다. 따라서 이 함수를 이용하여 r의 값을 확인해 보았다. 

<img width="621" alt="Screen Shot 2020-05-17 at 3 07 42 AM" src="https://user-images.githubusercontent.com/33794732/82127087-0d556e00-97ec-11ea-9434-8d67b245ab53.png">

<img width="817" alt="Screen Shot 2020-05-17 at 3 06 46 AM" src="https://user-images.githubusercontent.com/33794732/82127082-09c1e700-97ec-11ea-9def-29c569a3147c.png">

plot 을 통해 그래프를 그려보았다.  xerror가 가장 낮은 split 개수를 선택하면 되는데,  위 그래프에서 보면 10개의 split에서 가장 낮은 error를 보이고 있다. 



##### 3단계: 최적의 tree 모형



<img width="624" alt="Screen Shot 2020-05-17 at 3 07 52 AM" src="https://user-images.githubusercontent.com/33794732/82127111-30801d80-97ec-11ea-8224-006074168e78.png">

 prune()를 통해 에러율이 가장 낮을 때의 cp(Complexity Parameter)값을 지정해 최적의 tree를 만들었다. 



<img width="704" alt="Screen Shot 2020-05-17 at 3 06 55 AM" src="https://user-images.githubusercontent.com/33794732/82127110-2e1dc380-97ec-11ea-9bcc-b0dd00b3ba6e.png">

변경된 Tree model의  모습을 확인할 수 있다. 



##### 4단계: 의사 결정 나무의 정확도

<img width="566" alt="Screen Shot 2020-05-17 at 3 47 43 AM" src="https://user-images.githubusercontent.com/33794732/82127791-35939b80-97f1-11ea-8c58-24f889eb605d.png">

predict 함수를 사용해서 test 셋의 Credit를 예측한 후, confusionMatrix함수를 사용해서 모델의 정확성을 평가해 보았다. 현재 334개의 test set 이 들어있다. Accuracy는  약 71%로 비교적 정확하게 credit의 여부를 구분하고 있다.  



##### [트리 시각화]

<img width="651" alt="Screen Shot 2020-05-17 at 3 33 30 AM" src="https://user-images.githubusercontent.com/33794732/82127540-5824b500-97ef-11ea-90bf-44f061cfd7a5.png">

<img width="584" alt="Screen Shot 2020-05-17 at 3 33 21 AM" src="https://user-images.githubusercontent.com/33794732/82127539-53f89780-97ef-11ea-9104-87767ed3b771.png">

다음은 만들어진 트리를 시각화 해본 결과이다. 

<div style="page-break-after: always; break-after: page;"></div> 



##### d. 종속변수: Credit, 독립변수: CreditAmount+Employment+Age

##### 1단계: tree 생성

<img width="681" alt="Screen Shot 2020-05-17 at 3 44 05 AM" src="https://user-images.githubusercontent.com/33794732/82127834-80151800-97f1-11ea-9267-3e74717a7bb9.png">

<img width="683" alt="Screen Shot 2020-05-17 at 3 46 23 AM" src="https://user-images.githubusercontent.com/33794732/82127839-84413580-97f1-11ea-8ffa-023273bc3446.png">

rpart함수를 이용하여 종속변수는 Credit, 독립변수는 CreditAmount+Employment+Age 3개로  구성된 decision tree를 만들었다. 위 decision tree를 plot을 통해 확인해 본 결과이다. 

##### 2단계: 가지치기

<img width="667" alt="Screen Shot 2020-05-17 at 3 44 13 AM" src="https://user-images.githubusercontent.com/33794732/82127854-9a4ef600-97f1-11ea-92ca-a88169de0aae.png">



어떤 예측 모델이 더 정확한지 평가하기 전에 rpart패키지도 과적합화 문제가 있기 때문에 가지치기(Pruning)를 해야 한다.  rpart패키지에서는 cv.tree와 유사하게 cross-validation을 계산해 주는 함수로 print.cp를 제공하고 있다. 따라서 이 함수를 이용하여 r의 값을 확인해 보았다. 

<img width="637" alt="Screen Shot 2020-05-17 at 3 44 24 AM" src="https://user-images.githubusercontent.com/33794732/82127862-a2a73100-97f1-11ea-8302-e0211729a784.png">

<img width="814" alt="Screen Shot 2020-05-17 at 3 46 17 AM" src="https://user-images.githubusercontent.com/33794732/82127857-9e7b1380-97f1-11ea-8bcb-b14bc1496f6c.png">

plot 을 통해 그래프를 그려보았다.  xerror가 가장 낮은 split 개수를 선택하면 되는데,  위 그래프에서 보면 10개의 split에서 가장 낮은 error를 보이고 있다. 



##### 3단계: 최적의 tree 모형

<img width="629" alt="Screen Shot 2020-05-17 at 3 44 33 AM" src="https://user-images.githubusercontent.com/33794732/82127873-b3f03d80-97f1-11ea-84fc-a82e11b60f41.png">

 prune()를 통해 에러율이 가장 낮을 때의 cp(Complexity Parameter)값을 지정해 최적의 tree를 만들었다. 

<img width="711" alt="Screen Shot 2020-05-17 at 3 46 09 AM" src="https://user-images.githubusercontent.com/33794732/82127874-b6eb2e00-97f1-11ea-80fc-db3e1251f736.png">

변경된 Tree model의  모습을 확인할 수 있다. 



##### 4단계: 의사 결정 나무의 정확도

<img width="588" alt="Screen Shot 2020-05-17 at 3 46 04 AM" src="https://user-images.githubusercontent.com/33794732/82127892-c8ccd100-97f1-11ea-92a0-cf42fd1e17bd.png">

predict 함수를 사용해서 test 셋의 Credit를 예측한 후, confusionMatrix함수를 사용해서 모델의 정확성을 평가해 보았다. 현재 334개의 test set 이 들어있다. Accuracy는  약 67%로 앞선 c모델보다 정확성이 떨어진다는 것을 볼 수 있다. 



### 결론

변수마다, 적용하는 함수마다 결과가 조금씩 달라진다는 사실이 흥미로웠다. 



