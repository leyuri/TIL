# Tic-Tac-Toe 프로그램 제작

##### <a href="https://reactjs.org/tutorial/tutorial.html">react tutorial</a> 을 따라 tic-tac-toe 프로그램을 제작하고 디자인을 수정해보았습니다.



### Ant-Design

```$ yarn add antd
$ yarn add antd
```

Ant Design을 이용하여 레이아웃을 구성하기 위해 패키지를 추가해주었습니다.



### Features

```
import { Button, PageHeader, Layout, Breadcrumb, Row, Col} from 'antd';
const { Content, Footer } = Layout;
```

 AntDesign에서 필요한 레이아웃을 가져오기 위해 import 했습니다.



```
<PageHeader 
className="site-page-header"
title=" Game : Tic-Tac-Toe 🎮"
/>

.ant-layout-header {
  height: 64px;
  padding: 0 50px;
  color: rgba(0, 0, 0, 0.65);
  line-height: 64px;
  background: #7DCEA0;
}
```

페이지 header "PageHeader"를 이용하여 게임 정보를 표시했고, className을 지정하여 색상을 변경주었습니다.



```
<div className="game-info">
<div> 
    {status}
</div>
</div>

.game-info {
  font-size: 20px;
  font-weight: bold;
}
```

결과값을 보다 잘 보여주기 위해 폰트 사이즈를 키우고 굵기를 추가했습니다. 



```
<Row>
<Col span={12}>
<div className="game-board">
<Board 
squares={squares} 
onClick={(i) => this.handleClick(i)}/>
</div>

</Col>

<Col span={12}>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
{
(this.state.step >= 1) && (<Button type="primary" onClick={() => {
    this.setState({
        step: this.state.step -1,
        history: this.state.history.slice(0, this.state.step)
    });
}}>Undo</Button>)
}
<br></br><br></br>
<ol>
{this.getMoves()}
</ol>
</Col>
</Row>
```

레이아웃 배치를 이용하여 한열(24)크기를 12씩 나눠주어 50:50 화면 비율을 만들어 주었습니다. 오른쪽에는 squares를 왼쪽에는 go to move 를 표시해주었습니다. 또한 undo 버튼 위치를 위로 옮겨보았습니다.



```
.ant-btn-primary:focus {
  color: #fff;
  background-color: #138D75;
  border-color: #138D75;
}

.ant-btn-primary {
  color: #fff;
  background-color: #138D75;
  border-color: #138D75;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  -webkit-box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
}
```

 버튼 색상을 바꿔 해당 사이트에 어우러지도록 만들었습니다.



### ScreenShots

![2020-03-30 23 30 23](https://user-images.githubusercontent.com/33794732/77926077-a6820100-72e0-11ea-9ddd-23edffdb6394.gif)
![2020-03-30 23 30 50](https://user-images.githubusercontent.com/33794732/77926091-aa158800-72e0-11ea-8f77-f0c09e6ead8e.gif)
