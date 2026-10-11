# hudsonwang.com

桌面上那个写作 App（**HudsonOffice Writing**）的公开阅读端：网站本身就是文稿。

- 首页就是文稿树（钉子在最上面，下面按文件夹铺开），和 App 侧栏同一套结构
- 单篇用自己的链接：`https://hudsonwang.com/#/<文稿id>`
- 公式用**和 App 同一份** `vendor/mathlive` 渲染，所以网页和编辑器里长得一样
- **只同步文字**：图片、音乐、AI 对话都不上传；图片位置留一个「图未同步」占位块
- 内容来自 Cloudflare Worker：`https://hudsonwang-writing-sync.hudsonwang.workers.dev`
  （清单 `/v1/tree`、单篇 `/v1/doc/:id`；写入要令牌，只有 App 有）

## 文件

| 文件 | 说明 |
|---|---|
| `index.html` | 整个站点：侧栏树 + 阅读视图 + 路由（`#/<id>`） |
| `vendor/mathlive/` | MathLive 构建，与桌面 App 共用同一份 |
| `CNAME` / `.nojekyll` | 域名与"别走 Jekyll"的开关，**不能删** |
| `favicon.svg` / `apple-touch-icon.png` | 站点图标 |

## 调试

带 `?api=` 可以临时把站点指到本地 Worker（会记住）：

```
https://hudsonwang.com/?api=http://127.0.0.1:8787
```

清除：

```js
localStorage.removeItem("ho.writing.api")
```

## 历史

课程笔记那一版（首页 + 44 门课 + CPA/4MA 工具 + 课表）完整保存在两个地方：

1. GitHub 分支 **`archive-notes-20261011`**（推送于动手之前的那一刻）
2. 仓库根目录的 **`old-notes.html`**（同一个文件的快照，方便直接打开看）

想恢复整站：`git checkout archive-notes-20261011 -- .` 之后重新提交即可。
