<div style="text-align: right">데이터테크놀로지학과 60161621 이유리<div/>

## NeuralNetwork using mnist data

##### mnist01.py

layers = [784, 20, 10, 10]

##### mnist02.py

```python
import numpy as np
from mnist_data import load_mnist
import numpy as np
from mnist_data import load_mnist
from functions import sigmoid, softmax

# 입력층: 784, Hidden Laye: 30, 20, 10, Output Layer: 10
layers = [784, 30, 20, 10, 10]


def init_network():
    network = {}
    # 783*30 (784, 30)
    # 다 0으로 넣으면 입력이 사라지는 것과 다름없기 때문에 random으로
    # randn함수는 표준정규분포에 따라 값을 리턴, 이 값이 너무 크면 학습불가 따라서 0.01을 곱해줌, 0근처에 와야 		학습이 잘 되기 때문!
    network['W1'] = 0.01 * np.random.randn(layers[0], layers[1]) 
    # 30*20 (30, 20)
    network['W2'] = 0.01 * np.random.randn(layers[1], layers[2])
    # 20*10 (20, 10)
    network['W3'] = 0.01 * np.random.randn(layers[2], layers[3])
    # 10*10 (10, 10)
    network['W4'] = 0.01 * np.random.randn(layers[3], layers[4])
    
    network['b1'] = np.zeros(layers[1])
    network['b2'] = np.zeros(layers[2])
    network['b3'] = np.zeros(layers[3])
    network['b4'] = np.zeros(layers[4])

    # 사용된 파라미터: 24490
    print(784*30 + 30*20 + 20*10 + 10*10 + 30 + 20 + 10 + 10)
    return network

# 안에 있는 파라미터를 갖고 값을 만들고 예측한 값이 무엇인지 찾는 것이기 때문에 predict하다고 함
def predict(network, x):
    W1, W2, W3, W4 = network['W1'], network['W2'], network['W3'], network['W4']
    b1, b2, b3, b4 = network['b1'], network['b2'], network['b3'], network['b4']
    x1 = sigmoid(np.dot(x, W1) + b1)
    x2 = sigmoid(np.dot(x1, W2) + b2)
    x3 = sigmoid(np.dot(x2, W3) + b3)
    x4 = np.dot(x3, W4) + b4
    y = softmax(x4)
    return y

# 몇 점이 나왔는지 확인
def accuracy(network, x, t):
  	# 확률이 나옴
    y = predict(network, x) 
    # print(y, t)
    y = np.argmax(y, axis=1)
    t = np.argmax(t, axis=1)
    accuracy = np.sum(y == t) / float(x.shape[0])

    return accuracy

(x_train, y_train), (x_test, y_test) = load_mnist()
network = init_network()
# y_train을 정답지로 해서 점수를 찾음
# 매번 랜덤으로 실행하기 때문에 값이 달라짐
print(accuracy(network, x_train, y_train))
```



#####  result

<img width="365" alt="Screen Shot 2020-04-18 at 1 39 23 PM" src="https://user-images.githubusercontent.com/33794732/79628223-077f5500-817a-11ea-8c6c-f016824825b1.png">



앞서 뉴럴렛의 구조에서 layers = [784, 20, 10, 10]로 두었다. 당시 파라미터 값은 16020개 였다. 하지만 Hidden Layer를 1개 추가하여 layers = [784, 30, 20, 10, 10]로 구조를 변경하자 파라미터 값은 24490개로 늘어났다. 앞서 설정한 뉴럴렛 네트워크보다 훨씬 더 많은 파라미터를 조절할 수 있게 되었다. 입력과 출력 사이의 중간에  Hidden Layer를 몇층을 구성할지는 시스템을 구축하는 사람이 정한다. 따라서 레이어가 더 높아지고 복잡해질 수록 할 수 있는 것들은 많아진다. 그만큼 많아진 파라미터로 튜닝해가면서 가장 좋은 결과를 찾는게 목표!!
