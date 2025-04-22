---
name: Web3 Data Fetching
slug: web3-data-fetching
description: Smart contracts contain relevant information to applications built on top of blockchains that can run the Ethereum Virtual Machine. Some of the information in these contracts can be exposed in the form of View functions that do not need gas or fees to be executed. Now we will explore how to get that information in Next.js.
framework: Next.js
useCase: Documentation
css: Tailwind
deployUrl: https://vercel.com/new/clone?repository-url=https://github.com/vercel/examples/tree/main/solutions/web3-data-fetching&project-name=web3-data-fetching&repository-name=web3-data-fetching
demoUrl: https://web3-data-fetching.vercel.app/
---

# Web3 数据获取示例

这是一个简单的Next.js应用程序，展示如何从以太坊区块链获取智能合约数据。

## 功能

- 从智能合约获取数据（名称、符号、总供应量等）
- 测试多个不同的合约（BAYC、Azuki、USDT等）
- 使用ethers.js与以太坊区块链交互

## 技术栈

- Next.js
- TypeScript
- ethers.js
- React

## 如何使用

1. 克隆仓库
2. 安装依赖：`npm install`
3. 运行开发服务器：`npm run dev`
4. 访问 http://localhost:3000

## 页面

- 主页：基本概念和示例
- 测试合约页面：测试多个以太坊合约

## Demo

https://web3-data-fetching.vercel.app/

This demo will show how to do the following:

- Instanciate a connection to a smart contract
- Retreive smart contract information serverside
- Retreive smart contract information with SWR for revalidation

## How to Use

You can choose from one of the following two methods to use this repository:

### One-Click Deploy

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=vercel-examples):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/examples/tree/main/solutions/web3-data-fetching&project-name=web3-data-fetching&repository-name=web3-data-fetching)

### Clone and Deploy

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [pnpm](https://pnpm.io/installation) to bootstrap the example:

```bash
pnpm create next-app --example https://github.com/vercel/examples/tree/main/solutions/web3-data-fetching
```

Next, run Next.js in development mode:

```bash
pnpm dev
```

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=edge-middleware-eap) ([Documentation](https://nextjs.org/docs/deployment)).
