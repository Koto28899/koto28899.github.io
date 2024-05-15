---
title: 3. 第一个程序，体验 R 语言
---

## 0. 前言

- 如果有 RStudio，可以使用 RStudio，直接使用交互式的 R 语言。

- 请先打开 cmd 或者 powershell，进入交互式的 R 语言。

:::tip
`Win` + `R`, 输入 `cmd` 或 `powershell` 并打开。
```ps
# 如果你是 cmd，输入 R 或 r 或 R.exe 或 r.exe 可以运行
# 如果你是 powershell，输入 R.exe 或 r.exe 才可以运行，R 或 r 无法运行。
# 输入后按下回车键
R.exe

# 应该出现下面这些内容
R version 4.4.0 (2024-04-24 ucrt) -- "Puppy Cup"
Copyright (C) 2024 The R Foundation for Statistical Computing
Platform: x86_64-w64-mingw32/x64

R is free software and comes with ABSOLUTELY NO WARRANTY.
You are welcome to redistribute it under certain conditions.
Type 'license()' or 'licence()' for distribution details.

  Natural language support but running in an English locale

R is a collaborative project with many contributors.
Type 'contributors()' for more information and
'citation()' on how to cite R or R packages in publications.

Type 'demo()' for some demos, 'help()' for on-line help, or
'help.start()' for an HTML browser interface to help.
Type 'q()' to quit R.

>
```
:::

其他的语言，第一个程序都是往控制台输出 Hello World 这五个字，R 语言也可以做到

## 1. Hello World

```r
print('Hello World')
[1] "Hello World" # 输出
>
```

## 2. 体验 R 语言

[原文](https://cran.r-project.org/doc/manuals/r-release/R-intro.html#A-sample-session)

### 2.0 前言

#### 问号 ?

如果有不明白的函数，可以使用 ?\<function name\>来查询

如：rnorm() 函数
```r
?rnorm
```

#### 井号 \#

井号 # 是注释的意思，注释中的内容不会被 R 语言的程序执行

如下面的两行代码，只有第二行会执行
```r
# print("Hello, I'm a comment!")
print("Hello, I'm not a comment!")
```

### 2.1 根据已知点绘图

```r
# 打开 R 语言的帮助，这是一个本地的网页，好像只能通过退出 R 语言程序来关闭。
# 
help.start()

# <- 是 R 语言中的赋值符号
# 如：
# x <- 1  # x 赋值为 1
# y <- x  # y 赋值为 x 的值 1
# x       # 1
# y       # 1
# x <- 2  # x 重新赋值为 2
# x       # 2
# y       # 1
#
# rnorm(n, mean = 0, sd = 1)
# 取 n 个符合正态分布，平均值为 mean，标准差为 sd 的随机数。
# 
# ！！！注意！！！
# R 语言里的数组，是从 1 开始数起，不像 C/C++、Python 等流行语言的 0 开始数起。
# 
x <- rnorm(50)    # 等同于 x <- rnorm(n = 50, mean = 0, sd = 1)
y <- rnorm(x)     # 根据 x 的个数（50个）来生成相应个数的随机数

# 把点都画在平面上，会出现一个窗口来显示图
plot(x, y)

# "x", "y"; 查看现在工作环境中有哪些变量
ls()

# 结束
# 删除 x, y 这两个变量，有点类似与其他编程语言的 delete
rm(x, y)
```

### 2.2 拟合线性模型并作图

```r

# 给 x 赋值为 [1, 2, 3, ..., 19, 20]
x <- 1:20

# 给 w 赋值，sqrt() 是求平方根，sqrt() 是对 x 的每个值求平方根
w <- 1 + sqrt(x)/2

# data.frame 是一种数据结构，类似于表、框
# 这句代码的意思是：
# 创建一个数据框，其中有两列，
# 第一列名叫 x 的列，值为 x
# 第二列名叫 y 的列，值为 x + rnorm(x)*w
# 
# 列的名字是可以自己填写的
dummy <- data.frame(x=x, y= x + rnorm(x)*w)

# 控制台输出 dummy
dummy

# lm()  : 拟合线性模型
# y ~ x : ~ 连接公式两侧，~ 的左侧是因变量，右侧是自变量。
# fm    : lm() 函数返回的线性模型
fm <- lm(y ~ x, data = dummy)

# 得到 fm 的相关数据，如截距等
summary(fm)

# 可以通过 w 得到 x 的标准差，做加权回归
fm1 <- lm(y ~ x, data=dummy, weight=1/w^2)
summary(fm1)

# 将 dummy 的两列拆分成名叫 "x" 和 "y" 的两个变量
# 之后就可以直接用 x 和 y 来访问变量，无需 dummy$x, dummy$y
attach(dummy)

# lowess() 函数
# 局部加权回归散点平滑法；局部线性回归；局部加权最小二乘法
lrf <- lowess(x, y)

plot(x, y)

# line() 函数
# 在绘图(plot)中添加线段(line)
lines(x, lrf$y)

# abline() 函数
# 此函数在当前绘图中添加一条或多条**直线**
# 截距为 0, 斜率为 1
# 参数 lty：线段的类型和形状、lty = 1 是实线（solid）、lty = 3 是虚线（dotted） 
abline(0, 1, lty = 3)

# coef() 函数
# 提取模型系数，截距和斜率
abline(coef(fm))
# col 颜色
abline(coef(fm1), col = "red")

# 解除上一次的 attach() 函数，此后不会再有 y 变量了
detach()

# fitted() 函数：提取模型的 拟合值
# resid() 函数：提取模型的 残差 
# plot() 函数中：
#   参数 xlab：横坐标的标签
#   参数 ylab：纵坐标的标签
#   参数 main：图像的题目，标题
plot(fitted(fm), resid(fm),
       xlab="Fitted values",
       ylab="Residuals",
       main="Residuals vs Fitted")

# qqnorm() 函数：分位数-分位数图（Q-Q 图）
qqnorm(resid(fm), main="Residuals Rankit Plot")

# 结束
rm(fm, fm1, lrf, x, dummy)
```

### 2.3 迈克尔逊测量光速的经典实验数据

> 迈克尔逊－莫雷实验(Michelson-Morley Experiment)，
> 是1887年迈克尔逊和莫雷在美国克利夫兰做的用迈克尔逊干涉仪测量两垂直光的光速差值的一项著名的物理实验。
> 但结果证明光速在不同惯性系和不同方向上都是相同的，
> 由此否认了以太（绝对静止参考系）的存在，从而动摇了经典物理学基础，
> 成为近代物理学的一个开端，在物理学发展史上占有十分重要的地位。

```r
# system.file() 函数
# 查找包等中文件的完整文件名。
filepath <- system.file("data", "morley.tab" , package="datasets")
filepath

# file.show() 函数
# 根据文件路径打开文件，可选。如果要打开，可以用记事本（notepad）打开
file.show(filepath)

# read.table() 函数
# 导入数据
mm = read.table(filepath)

# factor() 函数
# 将向量 vector（也可以认为是数组）转化为因子 factor
# R 语言中用 factor 代表数据中分类变量, 如性别、省份、职业。
# ordered factor 代表有序量度，如打分结果，疾病严重程度等。
mm$Expt <- factor(mm$Expt)
mm$Run <- factor(mm$Run)

attach(mm)

plot(Expt, Speed, main="Speed of Light Data", xlab="Experiment No.")

# aov() 函数
# 拟合方差分析模型
# 
# 方差分析 与 线性回归 的区别：
# 线性回归中，所涉及的自变量X一般来说是连续变量，比如温度就是一个连续变量，
# 连续是指取值连续无间断，例如温度可以取0至100中的任何值。
# 方差分析中，自变量是示性变量，示性变量往往表示有或没有，
# 例如施肥与否就能用1和0表示，1就是施肥，0就是未施肥，1和0就表示施肥这个因素的两个水平。
# 
fm <- aov(Speed ~ Run + Expt, data = mm)
summary(fm)

# update() 函数
# 拟合忽略 “Run” 的子模型
# anove() 函数
# 并计算拟合模型对象的方差(或偏差)分析表。
fm0 <- update(fm, . ~ . - Run)
anova(fm0, fm)

# 结束
detach()
rm(fm, fm0)
```

### 2.4 更多的图形特征：轮廓和图像图。

```r
# pi 常量 Π
# seq() 函数：生成一组数字，类似于 Python 的 range
# seq(-pi, pi, len = 50)：从 -pi 到 pi，等距生成五十个数
x <- seq(-pi, pi, len=50)
y <- x

# outer() 函数：张量积
f <- outer(x, y, function(x, y) cos(y)/(1 + x^2))

# par() 函数：
# 设置或查询图形参数。可以通过以tag = value形式将参数指定为par的参数来设置参数，或者通过将它们作为标记值列表传递来设置参数。
# 
# 保存旧的图形参数，并设置新的参数为可写(no.readonly = TRUE)
oldpar <- par(no.readonly = TRUE)

# 将绘图区域设置为“正方形（square）”。
par(pty="s")

# contour() 函数：
# 创建等高线绘图，或向现有绘图添加等高线。
contour(x, y, f)
contour(x, y, f, nlevels=15, add=TRUE)

# t() 函数: 矩阵转置
fa <- (f - t(f)) / 2

# 再次作图
contour(x, y, fa, nlevels=15)

# 恢复旧的图形参数
par(oldpar)

# 制作一些高密度的图像图(如果你愿意，你可以得到硬拷贝)，……
image(x, y, f)
image(x, y, fa)

# 结束
objects(); rm(x, y, f, fa)
```

### 2.5 复杂运算

TODO

```r

```
