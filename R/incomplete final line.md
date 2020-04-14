

# incomplete final line found

##### rstudio를 이용하여 csv파일을 불러오던 도중 발생한 에러이다.

![Screen Shot 2020-04-14 at 7.17.14 PM](/Users/yuri/Library/Application Support/typora-user-images/Screen Shot 2020-04-14 at 7.17.14 PM.png)

- R폴더 안에 data 폴더를 생성하였고, 

  

<img width="785" alt="Screen Shot 2020-04-14 at 7 26 32 PM" src="https://user-images.githubusercontent.com/33794732/79214786-f1297e80-7e85-11ea-98bd-225f1c900a19.png">

- 그 안에 sample.csv파일을 볼 수 있다. 



```
> getwd()
[1] "/Users/yuri/Desktop/R"
```

- 우선 sample.csv를 불러오기 위해 현재 경로를 확인한다. 



```
> x <- read.csv("/Users/yuri/Desktop/R/data/sample.csv")
Warning message:
In read.table(file = file, header = header, sep = sep, quote = quote,  :
  incomplete final line found by readTableHeader on '/Users/yuri/Desktop/R/data/sample.csv'
```

- 파일을 읽어오기 위해 read.csv를 사용했다. 근데 incomplete final line found 라는 에러가...? 구글링을 해보니 R이 텍스트 파일의 끝을 인식할 수 없기 때문이라고 한다. 해결 방법은 csv파일의 마지막 한줄을 Enter로 띄어주면 된다고 한다.



<img width="792" alt="Screen Shot 2020-04-14 at 7 26 40 PM" src="https://user-images.githubusercontent.com/33794732/79214799-f2f34200-7e85-11ea-8af7-90f02ecc4643.png">

- 여기 보이는 것과 같이! 4행의 80이 다음에 Enter을 꼭 눌러줘야 한다!



<img width="765" alt="Screen Shot 2020-04-14 at 7 26 51 PM" src="https://user-images.githubusercontent.com/33794732/79214783-f090e800-7e85-11ea-8e14-33e013230adf.png">

- 에러 없이 잘 읽혀진 모습을 볼 수 있다. 🤩🤩🤩🤩

