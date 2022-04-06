### 目录说明

* client : React前端文件

* contracts : 合约文件

* migrations : 部署脚本文件



### 编译环境

操作系统：Windows10

truffle: v5.3.14

node: v16.4.0

npm: 7.18.1

solc: 0.8.2

web3: 1.4.0



### 搭建并运行可升级智能合约框架

1. 在lottery根目录下

> npm install : 安装依赖包



2. 部署合约

（1）直接运行当前项目：跳到运行React App

（2）重新部署新项目：

删除client/src/contracts文件夹

> npx truffle migrate --network rinkeby : 编译并部署到rinkeby网络



3. 验证合约

> npx truffle run verify Migrations Lottery --network rinkeby



### 运行React App

1. 钱包配置

（1）将Google浏览器设置为默认浏览器

（2）安装MetaMask

（3）导入账户并切换到Rinkeby网络



2. 进入client目录

> cd client

> npm install : 安装依赖包

> npm run start

注：运行成功会提示连接MetaMask钱包，若未登录MetaMask，仍需按照“钱包配置”的第（3）点操作。



### 彩票规则说明

一、彩民：

1. 提交1个以太参与抽奖；

2. 可以参与多次；



二、开奖：仅管理员可开奖

1. 中奖人：从所有彩民中随机选中一个成为中奖人；

2. 瓜分奖池：

（1）管理员收取2%的奖池金额作为管理费费；

（2）中奖人瓜分98%的奖池金额。



三、退奖：仅管理员可退奖



四、期数：每次开奖后重置数据且期数加1。

