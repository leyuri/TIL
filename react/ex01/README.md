# Create-React-App으로 앱 만들기

### Create-React-App

```
$ npx create-react-app ex01
```

위 명령어를 통해 앱을 생성하였습니다.



### Ant-Design

```$ yarn add antd
$ yarn add antd
```

Ant Design을 이용하여 레이아웃을 구성하기 위해 패키지를 추가해주었습니다.



### Features

```
import { Layout, Menu, Breadcrumb, Card, Descriptions, Col, Row, Avatar  } from 'antd';
```

우선 기본적으로 있던 UI 소스코드를 모두 삭제하고 AntDesign에서 필요한 레이아웃을 가져오기 위해 import를 하였습니다.



```
<Menu.Item key="1"> 
  <Avatar src={require('./one.jpeg')} /> &nbsp; 
  YURI LEE 
</Menu.Item>
```

프로필 사진과 이름을 넣어 메뉴바를 만들었습니다.



```
<Descriptions title="Hello 🧸">
  <Descriptions.Item label="UserName">yuri lee</Descriptions.Item>
  <Descriptions.Item label="Telephone">+82010 57200339</Descriptions.Item>
  <Descriptions.Item label="Live">Republic of Korea, Seoul</Descriptions.Item>
  <Descriptions.Item label="Remark">empty</Descriptions.Item>
  <Descriptions.Item label="Address">
  Sangbongjungang-ro 8-gil, Jungnang-gu, Seoul, Republic of Korea
  </Descriptions.Item>
</Descriptions>
```

기본 정보를 넣어주었습니다.



```
<Row gutter={16}>
  <Col span={8}>
    <Card title="Q1. What is your favorite food?" bordered={false}>
    떡볶이
    </Card>
  </Col>
  <Col span={8}>
    <Card title="Q2. What is your favorite color?" bordered={false}>
    Brown
    </Card>
  </Col>
  <Col span={8}>
    <Card title="Q3. What is your best travel country?" bordered={false}>
      Turkey 
    </Card>
  </Col>
</Row>
```

자문자답을 넣어주었습니다.



### ScreenShots

<img width="1368" alt="Screen Shot 2020-03-25 at 10 47 15 PM" src="https://user-images.githubusercontent.com/33794732/77545224-77891b00-6eed-11ea-8fde-f9945385af54.png">
<img width="306" alt="Screen Shot 2020-03-25 at 11 02 25 PM" src="https://user-images.githubusercontent.com/33794732/77545234-7b1ca200-6eed-11ea-8abc-3232ab6051df.png">