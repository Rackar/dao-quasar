# DAO-Quasar

DAOchat front-end with Quasar Framework.

## 说明

本项目为基于区块链的社区项目前端部分，基于 Vue.js 和 Quasar 框架。

[项目演示地址](https://rackar.github.io/dao-quasar)

第一步希望统一工具，统一代码风格，然后合作开发使用 Git flow 工作流。所有代码都要通过 git PR 和 code review 后才可以并入开发分支。开发工具推荐使用 vscode,使用统一的代码风格检查工具 ESLint，并启用自动格式化。

使用的框架为 Vue.js 2.6.x 版本，UI 框架使用 Quasar 1.9.x，配合 quasar cli 脚手架。自带 axios。不能随意引入未经讨论的新 js 库，避免性能问题。

组件样式使用 scoped 隔离，以免出现全局样式污染。

## Git Flow 工作流

1. 克隆本项目的 dev 分支:

   `git clone -b dev https://github.com/Rackar/dao-quasar`

2. fork 一份，添加自己 fork 库的远程地址，更改 Your_ID 为自己的 Github ID:

   `git remote add myrepo https://github.com/Your_ID/dao-quasar`

3. 从主 dev 分支拉取最新代码并新建自己的本地工作分支:

   ```bash
   # 确定在dev分支上操作
   git checkout dev
   git pull
   git checkout -b myjob
   ```

4. 在 myjob 分支下进行代码编写，结束本日工作时，拉取最近主分支更改，进行冲突处理，然后推送 fork 库:

   ```bash
   git add -A
   git commit -m "修改了xxx，添加了xxx"
   git pull origin dev:dev
   git merge dev
   # 处理冲突，然后再进行commit
   git push myrepo myjob:myjob
   ```

5. 然后到[项目页面](https://github.com/Rackar/dao-quasar)提交 PR 请求，从你 fork 的库的 myjob 分支到主库的 dev 分支。  
   然后可以在 myjob 分支下继续开发。  
   等待 Code review 完成并合并后，重复第 3 步-第 5 步，保持 myjob 和 dev 分支同步，尤其是**提交 PR 前**必须同步。

## VS Code 插件使用

Vetur  
Prettier  
language-stylus  
Git history  
quasar-v1-snippets  
REST Client

## Quasar 及项目命令

使用 Quasar UI 框架进行开发。[Quasar 中文文档地址](http://www.quasarchs.com/quasar-cli/installation)

### 安装依赖库 Install the dependencies

```bash
npm install
```

### 如没有按照 quasar 脚手架则进行全局安装

```bash
npm i -g @quasar/cli
```

### 开发命令 Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### 规则检查 Lint the files

```bash
npm run lint
```

### 打包命令 Build the app for production

```bash
quasar build
```

### 配置说明 Customize the configuration

See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).

## 其他说明

[已开启 Github Pages](https://rackar.github.io/dao-quasar)

已开启 Action，项目 push 后会自动部署。

test 目录下为临时测试。

layout 分为 3 种页面结构，内容切换通过路由嵌套的方式填充组件。

尽量复用 Quasar 已封装组件，最好在官网中反复熟悉各个组件
