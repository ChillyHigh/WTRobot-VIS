# 南工问天 VIS 协作与维护指南

本仓库用于维护南工问天视觉形象识别系统（VIS）文档、品牌规范和可下载素材。站点地址为 <https://vis.wtrobot.moe>。

请根据自己的职责阅读对应章节：

- 非网站维护人员：阅读“普通成员操作指南”，按既有结构更新文字或上传素材。
- 网站维护人员：继续阅读“网站架构与维护指南”，负责页面、组件、样式、依赖和部署。

任何成员都不要直接修改 `dist/`、`.astro/` 或 `node_modules/`。这些目录是构建产物或本地依赖，不是站点源文件。

---

## 普通成员操作指南

这一部分面向负责整理赛事照片、奖状、品牌文件和文字说明，但不负责网站开发的成员。一般情况下，只需要操作 Git、`public/assets/` 和已有的 `.mdx` 内容页。

### 1. 可以修改的范围

可以直接修改：

- `public/assets/`：上传图片、PDF、SVG 和其他供下载的源文件。
- `src/content/docs/`：修改已有页面的文字，或为已有页面增加素材卡片。

不要自行修改：

- `src/components/`：网站组件和交互逻辑。
- `src/styles/`：全站主题和视觉样式。
- `astro.config.mjs`、`src/content.config.ts`：路由和内容结构配置。
- `package.json`、`package-lock.json`：依赖配置。
- `.github/workflows/`：自动部署流程。

如果更新需要新增栏目、改变页面布局、调整品牌色或修改导航，请交给网站维护人员。

### 2. 第一次获取仓库

普通成员通常没有官方仓库的直接写入权限，请先在 GitHub 网页打开 `ChillyHigh/WTRobot-VIS`，点击 **Fork**，创建属于自己的副本。之后克隆自己的 Fork：

```powershell
git clone https://github.com/<你的GitHub用户名>/WTRobot-VIS.git
cd WTRobot-VIS
git remote add upstream https://github.com/ChillyHigh/WTRobot-VIS.git
```

这里约定：

- `origin`：你自己的 Fork，用来推送分支。
- `upstream`：官方仓库，用来同步最新代码和提交 Pull Request。

如果本地已经克隆的是官方仓库，不需要重新克隆。先将远程地址调整为 Fork：

```powershell
git remote rename origin upstream
git remote add origin https://github.com/<你的GitHub用户名>/WTRobot-VIS.git
```

开始工作前先同步官方主分支：

```powershell
git fetch upstream
git switch main
git pull --ff-only upstream main
```

不要在已有未提交修改时执行 `git pull`。先用下面的命令确认工作区状态：

```powershell
git status
```

### 3. 为一次更新创建分支

每次更新先创建一个独立分支。为了避免命令出错，分支名只使用英文、数字、短横线和斜杠，不要包含空格。

```powershell
git switch -c update-assets
```

如果希望区分内容，可以使用下面这种格式：

- `assets-2027-recruitment`：新增 2027 招新素材。
- `assets-2026-awards`：补充 2026 奖状。
- `docs-logo-usage`：修改标志使用说明。

分支名必须作为一个完整参数输入。下面的写法会被 Git 解析成多个参数，不能使用：

```powershell
git switch -c merch/apparel-id and gifts
```

不要直接向 `main` 分支提交，也不要使用 `git push --force`。

### 4. 素材应该放在哪里

| 素材类型 | 目录 |
| --- | --- |
| 队标、标准字、标准色、规范手册 | `public/assets/brand/` |
| 历年奖状 | `public/assets/assets/awards/` |
| 赛事照片 | `public/assets/assets/contests/<年份>/` |
| 赛事、赞助商和其他素材 | 在 `public/assets/assets/` 下按现有目录继续分类 |

上传前遵守以下规则：

- 优先放入最接近的已有目录，不要在仓库根目录散放文件。
- 文件名应包含年份、活动、内容和序号，例如 `2027-招新-宣讲会-01.jpg`。
- 同一批文件使用一致的命名格式，不使用“新建文件”“最终版2”一类名称。
- 保留可下载的高清原文件；大图用于网页预览时，另行提供尺寸较小的预览图。
- 更新旧素材时优先使用带版本或日期的新文件名，并同步修改页面链接，避免浏览器继续缓存旧文件。
- 不确定能否公开的文件不要上传，尤其要检查个人信息、内部文件和第三方版权。

### 5. 修改已有页面

站点内容位于 `src/content/docs/`，对应关系如下：

| 页面分区 | 内容目录 |
| --- | --- |
| 品牌规范 | `src/content/docs/brand/` |
| 素材归档 | `src/content/docs/assets/` |
| 应用规范 | `src/content/docs/guidelines/` |
| 周边设计 | `src/content/docs/merch/` |

`.mdx` 文件中的开头配置称为 frontmatter，例如：

```mdx
---
title: 2027 赛季
description: 2027 赛季活动与参赛素材。
sidebar:
  order: 3
---
```

普通文字可以像 Markdown 一样直接编辑。不要随意修改 `title`、文件名或目录名，因为它们会影响导航和访问地址。

需要在已有页面增加素材时，先确认该页面已经导入 `AssetCard`，再复制一条相邻卡片并修改参数：

```mdx
<AssetCard
  title="2027 招新宣讲会合照"
  fileType="JPG"
  preview="/assets/assets/contests/2027/招新/2027-招新-宣讲会-01.jpg"
  downloads={[
    {
      label: '下载 JPG',
      file: '/assets/assets/contests/2027/招新/2027-招新-宣讲会-01.jpg',
    },
  ]}
/>
```

注意：

- `preview` 和 `file` 都从 `/assets/` 开始，对应 `public/assets/` 下的真实文件。
- 路径、文件名、扩展名和大小写必须完全一致。
- SVG、PDF 等不便直接预览的文件，可以准备 PNG 或 WebP 预览图；下载地址仍指向原文件。
- 一个素材有多种格式时，可以在 `downloads` 中增加多项。
- 不要把本地绝对路径（如 `D:\照片\文件.jpg`）写入页面。

如果页面没有导入 `AssetCard`、需要创建新页面或需要加入新的导航入口，请让网站维护人员处理。

### 6. 本地检查网站是否修改成功

上传素材或修改页面后，建议先在本地打开网站确认效果，再提交 Git。首次检查需要在仓库根目录安装依赖：

```powershell
npm ci
```

Astro 安装在项目本地，不需要全局安装。Windows 下请通过 `npx` 调用项目内版本，启动后台开发服务器：

```powershell
npx astro dev --background
npx astro dev status
```

看到服务正在运行后，在浏览器打开：

```text
http://localhost:4321/
```

按本次修改内容逐项检查：

- 修改首页内容：打开首页，确认标题、分区入口和首页图片正常显示。
- 修改品牌规范：打开对应的 `/brand/` 页面，确认文字、图片和规范手册入口正常。
- 新增或修改赛季素材：打开 `/assets/` 下对应的赛季页面，确认素材卡片出现。
- 上传图片或 SVG：确认预览图没有破损、变形或方向错误。
- 上传 PDF 或源文件：点击下载按钮，确认浏览器下载的是正确文件。
- 修改页面文字：刷新页面，确认没有 Markdown 原文、乱码或布局溢出。

如果页面没有更新，可以依次执行以下检查：

```powershell
git status
npx astro dev logs
```

确认文件确实保存在正确目录，且 `preview`、`file` 路径与文件名完全一致。修改文件后，浏览器可以使用 `Ctrl+F5` 强制刷新。若 4321 端口已被占用，以终端输出的实际地址为准。

检查完成后停止后台服务：

```powershell
npx astro dev stop
```

本地页面显示正常后，再继续执行下面的 Git 检查、提交和上传步骤。

### 7. 检查、提交和上传

修改完成后先查看本次改动：

```powershell
git status
git diff
```

只暂存本次修改的文件，不要无检查地提交整个工作区：

```powershell
git add public/assets/assets/contests/2027/招新/2027-招新-宣讲会-01.jpg
git add src/content/docs/assets/赛季/2027.mdx
git status
```

确认文件正确后提交：

```powershell
git commit -m "assets: add 2027 recruitment photos"
git push -u origin update-assets
```

推送前可以确认 `origin` 确实是自己的 Fork：

```powershell
git remote -v
```

然后在 GitHub 上打开自己 Fork 中的 `update-assets` 分支，点击 **Contribute** 或 **Open pull request**，创建 Pull Request。目标仓库选择 `ChillyHigh/WTRobot-VIS`，目标分支选择 `main`，请网站维护人员检查并合并。合并到官方 `main` 后，站点会自动构建和发布。

只有已经获得官方仓库写入权限的成员，才可以将 `origin` 指向官方仓库并直接推送；普通成员不应尝试直接推送官方仓库。

如果 `git pull`、`git push` 或合并时出现冲突，不要强行覆盖文件，也不要使用 `git reset --hard`。保留终端错误信息并联系网站维护人员。

### 8. 提交前自查

- [ ] 文件放在正确的 `public/assets/` 分类目录中。
- [ ] 文件名清晰，无临时命名和敏感信息。
- [ ] 页面中的预览和下载路径与真实文件完全一致。
- [ ] `git status` 中没有无关文件。
- [ ] 没有修改组件、配置、依赖或部署文件。
- [ ] 已通过独立分支推送并发起合并请求。

---

## 网站架构与维护指南

这一部分面向负责页面结构、组件、视觉样式、构建与部署的网站维护人员。

### 1. 技术架构

站点采用 Astro + Starlight，以 MDX 维护内容，以 `public/` 托管原始下载资源，构建结果为纯静态站点。

```text
src/content/docs/*.mdx          public/assets/*
          |                           |
          +----- Starlight loader ----+
                         |
             src/content.config.ts
                         |
        Astro components + VIS styles
                         |
                  astro build
                         |
                      dist/
                         |
       GitHub Actions -> GitHub Pages
                         |
                 vis.wtrobot.moe
```

主要技术边界：

- Astro 负责构建、资源处理和 Astro 组件。
- Starlight 负责文档路由、侧边栏、目录、搜索、主题切换和页面布局。
- MDX 同时承载规范文字和 Astro 组件调用。
- 站点设置为 `output: 'static'`，线上没有应用服务器或数据库。
- 客户端 JavaScript 主要用于首页效果和交互反馈，其余内容在构建时生成。

### 2. 目录与职责

```text
.
├─ .github/workflows/deploy.yml   # GitHub Pages 构建与部署
├─ public/
│  ├─ CNAME                       # 自定义域名
│  └─ assets/                     # 原始下载文件和静态预览
├─ src/
│  ├─ components/                 # 可复用 Astro 展示组件
│  ├─ content/docs/               # Starlight MDX 内容和路由
│  ├─ content/i18n/               # Starlight 中文界面文案
│  ├─ content.config.ts           # 内容集合及扩展 Schema
│  └─ styles/vis.css              # 品牌 Token 与全局样式
├─ astro.config.mjs               # Astro、Starlight、导航和站点配置
├─ package.json                   # 命令与运行依赖
└─ tsconfig.json                  # TypeScript 配置
```

`dist/`、`.astro/` 和 `node_modules/` 均为生成目录，不应手工维护或提交。

### 3. 路由与内容系统

主要内容目录为 `src/content/docs/`：

- `brand/`：队标、标准字、标准色、组合方式、辅助图形和品牌手册。
- `assets/`：奖状、赛季、赛事、赞助商和其他素材归档。
- `guidelines/`：办公、宣传、数字媒体、活动、环境和实体物料规范。
- `merch/`：文具、服装、礼品、包装、活动物料和数字周边。

Starlight 根据目录和文件名生成路由。例如：

```text
src/content/docs/brand/03-standard-color.mdx
-> /brand/03-standard-color/
```

四个分区的侧边栏在 `astro.config.mjs` 中使用 `autogenerate` 生成，页面顺序由 frontmatter 的 `sidebar.order` 控制。重命名文件会改变 URL，必须同步检查首页、分区索引、Header 和所有文档内链；已公开的旧地址应配置重定向或保留兼容入口。

`src/content.config.ts` 在 Starlight 默认 Schema 上扩展了以下字段：

| 字段 | 类型 | 用途 |
| --- | --- | --- |
| `section` | `brand \| assets \| guidelines \| merch` | 内容所属分区 |
| `category` | 字符串 | 细分类别 |
| `year` | 数字 | 赛季或素材年份 |
| `tags` | 字符串数组 | 检索和筛选标签 |
| `usage` | 字符串 | 使用场景说明 |
| `preview` | 字符串 | 预览资源路径 |
| `downloads` | 对象数组 | 下载名称、文件路径和备注 |

当前多数页面仍直接在正文中写 `AssetCard`，这些扩展字段尚未成为统一数据源。若素材量继续增长，建议将素材元数据迁移到 frontmatter 或独立内容集合，再由组件批量渲染，避免在 MDX 中重复维护路径。

### 4. 组件功能

| 组件 | 功能 | 维护注意事项 |
| --- | --- | --- |
| `Header.astro` | 替换 Starlight 默认页头，显示品牌组合、四分区导航、搜索和主题选择 | `navItems` 与侧栏及首页入口存在重复配置；修改分区时需同步核对 |
| `HomeHero.astro` | 首页全屏视觉区、背景轮播、打字动画和粒子效果 | 使用 TypeIt 和 tsParticles；检查移动端性能及 `prefers-reduced-motion` |
| `AssetCard.astro` | 展示素材预览、类型、更新时间和下载入口 | 构建时读取本地文件 `mtime`；缺失文件目前不会使构建失败 |
| `DownloadButtons.astro` | 渲染一个或多个下载按钮，兼容站点 `base` 路径 | 确保本地路径和外部 URL 的解析逻辑保持一致 |
| `ColorSwatch.astro` | 展示品牌色名称、HEX、说明和文字对比色 | 标准色变化时同步检查 CSS Token 与品牌规范页 |
| `SectionLink.astro` | 首页四分区入口 | 当前 `href` 由 MDX 传入；非根路径部署时需使用 base-safe 地址 |

组件内 `<style>` 默认由 Astro 作用域隔离；跨页面、Starlight 覆盖和品牌 Token 统一放在 `src/styles/vis.css`。不要把全局规则分散复制到各组件。

### 5. 视觉与交互层

`src/styles/vis.css` 的职责包括：

- 定义问天蓝、凌天青、信号橙、碳黑、合金灰等 VIS Token。
- 将品牌 Token 映射到 Starlight 的主题变量。
- 维护深色和浅色主题。
- 覆盖侧栏、分页、正文、首页和色卡布局。
- 提供桌面端、平板和移动端响应式规则。
- 在 `prefers-reduced-motion: reduce` 下关闭或缩短动画。

修改标准色时，先更新根级 `--vis-*` Token，再检查以下状态：

- 深色与浅色主题的正文和边框对比度。
- 当前导航项、悬停、键盘焦点和下载按钮。
- 首页照片遮罩上的标题可读性。
- 小屏布局和低动效模式。

Header 使用 Material Ripple 提供点击反馈；HomeHero 使用 TypeIt 和 tsParticles。新增客户端依赖前应评估打包体积、初始化时机、无 JavaScript 降级和重复挂载问题。

### 6. 静态资源约定

所有对外下载且无需 Astro 处理的文件放在 `public/assets/`。构建时，`public/` 内文件会按原路径复制到 `dist/`。

路径关系示例：

```text
仓库文件：public/assets/brand/team-mark/问天蓝队标.svg
页面路径：/assets/brand/team-mark/问天蓝队标.svg
```

维护要求：

- 品牌源文件以 `public/assets/brand/` 为唯一权威来源，不在应用规范中复制一份。
- 赛事资源按年份和活动继续分层，避免单目录堆积。
- PDF、源文件和高清照片可作为下载文件，但页面预览应尽量使用经过压缩的独立图片。
- 大文件提交前检查体积。仓库继续增长时，评估 Git LFS 或对象存储，而不是把所有历史原片永久塞入站点构建产物。
- `AssetCard` 当前使用文件系统修改时间显示“更新于”。Git checkout 后的 `mtime` 不等于业务版本时间；正式版本管理应增加显式 `updated` 或 `version` 字段。
- 应在 CI 增加静态资源存在性检查，因为当前 `AssetCard` 捕获缺失预览异常后仍允许构建通过。

### 7. 本地开发

首次安装或锁文件变化后执行：

```powershell
npm ci
```

按照仓库约定，以后台模式启动开发服务器：

```powershell
npx astro dev --background
npx astro dev status
npx astro dev logs
```

开发完成后停止服务器：

```powershell
npx astro dev stop
```

提交前执行类型检查和生产构建：

```powershell
npm run astro -- check
npm run build
```

需要检查生产构建结果时执行：

```powershell
npm run preview
```

搜索功能只在生产构建或 preview 中完整可用，不能只依赖开发模式验证。

### 8. 常见维护流程

#### 8.1 新增素材

1. 将源文件和必要的预览文件放入 `public/assets/` 对应分类。
2. 在已有 MDX 页面增加 `AssetCard`，确认预览、下载路径和文件格式。
3. 如果增加新主题页，补充分区 `index.mdx` 的入口。
4. 运行检查和构建，实际点击每个下载按钮。

#### 8.2 新增赛季

1. 创建 `src/content/docs/assets/赛季/<年份>.mdx`。
2. 创建 `public/assets/assets/contests/<年份>/` 并按活动建立子目录。
3. 在 `src/content/docs/assets/index.mdx` 增加赛季入口。
4. 如需首页展示，更新 `src/content/docs/index.mdx` 中 `HomeHero` 的图片参数。
5. 检查侧栏顺序、移动端页面和全部资源链接。

#### 8.3 新增页面

1. 在正确分区创建 kebab-case 命名的 `.mdx` 文件。
2. 填写 `title`、`description` 和 `sidebar.order`。
3. 按需导入已有组件，避免在 MDX 中复制组件实现。
4. 更新相关索引页和跨页面链接。
5. 构建后确认最终 URL、目录和上一页/下一页导航。

#### 8.4 修改品牌规范

1. 确认新规范及源文件已经审核，明确版本和生效日期。
2. 更新 `public/assets/brand/` 中的权威源文件。
3. 更新 `src/content/docs/brand/` 中的说明、示例和禁用规则。
4. 如涉及全站颜色或视觉策略，统一修改 `src/styles/vis.css` 的 Token。
5. 同步检查首页、Header、色卡、明暗主题和规范手册 PDF。

#### 8.5 修改信息架构

分区信息目前分散在以下位置，修改时必须同时检查：

- `astro.config.mjs`：Starlight 侧边栏。
- `src/components/Header.astro`：顶部导航。
- `src/content/docs/index.mdx`：首页分区入口。
- 各分区的 `index.mdx`：分区内入口。

长期建议抽取单一分区配置，由 Header 和首页共同读取，减少重复维护。

### 9. 构建与部署

`.github/workflows/deploy.yml` 监听 `main` 分支：

1. GitHub Actions 检出仓库。
2. 使用锁定的 Node.js 版本执行 `npm ci`。
3. 执行 `npm run build`，生成 `dist/`。
4. 上传 Pages artifact。
5. 部署到 GitHub Pages，并通过 `public/CNAME` 使用 `vis.wtrobot.moe`。

不要手工编辑或提交 `dist/`。线上异常应通过修复提交或回退 Git 提交处理。升级 Astro、Starlight 或 Node.js 时，需要同时检查 `package.json`、锁文件、Actions Node 版本和官方升级说明。

### 10. 维护人员提交前检查

- [ ] `npm run astro -- check` 通过。
- [ ] `npm run build` 通过且没有异常警告。
- [ ] 新增页面在侧边栏中的标题和顺序正确。
- [ ] 首页、四个分区首页和最新赛季页没有死链。
- [ ] 所有预览正常显示，所有下载按钮指向正确文件。
- [ ] 桌面端和移动端没有溢出、遮挡或导航问题。
- [ ] 深色、浅色和低动效模式均可用。
- [ ] 没有提交 `dist/`、`.astro/`、`node_modules/` 或无关文件。
- [ ] 大文件、版权和公开范围已经确认。
- [ ] Pull Request 中说明了内容变化、受影响页面和验证结果。

### 11. 当前重点风险与改进方向

- 页面改名会改变 URL，旧内链容易遗留；应增加自动死链检查。
- 素材路径较深且由人工录入；应增加资源存在性检查。
- 分区导航在多处重复；应收敛为单一配置源。
- Schema 已预留结构化素材字段但尚未充分使用；素材增长后应转为数据驱动渲染。
- 首页客户端效果较多；修改时要监测移动端性能和低动效兼容。
- 大型 PDF 和高清照片会持续增加仓库与部署体积；需要建立预览压缩和大文件策略。

## 参考文档

- [Astro 文档](https://docs.astro.build)
- [Astro 内容集合](https://docs.astro.build/en/guides/content-collections/)
- [Astro 组件](https://docs.astro.build/en/basics/astro-components/)
- [Astro 样式与 CSS](https://docs.astro.build/en/guides/styling/)
- [Starlight 文档](https://starlight.astro.build)
