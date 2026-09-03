# dsh-chat-pdf-export

一个仅在本机运行的 DeepSeek Harness Web 插件：选择当前页面已经渲染的部分助手正文，然后用浏览器原生打印对话框保存为 PDF。

## 为什么不用纯文本导出

插件不会重新解析 Markdown、LaTeX 或消息 JSON。它只克隆页面中已经渲染的助手正文 DOM 行，并在打印介质下隐藏 Harness 外壳；你发送的消息、思考过程、工具调用、状态提示、操作按钮、时间信息和 token 用量会被排除。因此 KaTeX/MathJax、SVG、语法高亮、表格、图片和复杂布局仍可沿用当前 UI 的实际渲染结果。

最终文件由系统打印对话框创建：插件只负责准备打印预览，用户在对话框中选择 **Save as PDF / 存储为 PDF**。它没有上传接口，也不会向 GitHub 推送内容。

## 使用

1. 确保当前对话已经打开，并等待助手正文渲染完成。
2. 你发送的消息不参与导出；思考、工具或详情块无需展开，导出时会自动排除。
3. 点击会话头部的 **导出 PDF**。
4. 在列表中按轮次勾选要保留的助手正文；列表按 `data-chat-flow-key` 重新读取当前页面的可见正文行。
5. 思考过程、工具调用、状态提示、操作按钮、时间信息和 token 用量会自动排除。可选择 **跟随界面主题** 或 **白纸版**，点击 **打印 / Save as PDF**。
6. 系统打印对话框中选择 PDF 目标；需要保留颜色时勾选 **背景图形**。

### 导出边界

- 只显示当前已经加载且可见的助手正文。你发送的消息不会被复制；更早的历史必须先在会话里加载，插件不会自动滚动或点击私有 UI。
- 一个选中的轮次只包含该轮当前可见的助手正文；思考、工具、系统/状态行、token 用量与操作区不会被复制。助手正文中嵌入的思考块即使已展开也会被移除。
- 插件按当前 DOM 顺序打印，滚动位置不会改变选中结果。
- 图片、字体和原页面样式继续使用浏览器已经加载的资源；插件本身不发起网络请求。若资源尚未加载，浏览器会按原页面的资源策略处理。
- `window.print()` 是浏览器/桌面客户端的打印入口，不能静默指定任意文件路径；取消打印也不会删除或上传会话数据。

## 本地安装（不上传 GitHub）

从当前工作区直接安装本地包：

```bash
dsh plugin --profile web add "/Users/hudsonwang/Desktop/DeepSeek Harness/plugin-submit-work/dsh-chat-pdf-export"
```

如果系统没有把 `dsh` 放进 `PATH`，可使用桌面版内置入口：

```bash
node "/Applications/DSH Desktop.app/Contents/Resources/app/node_modules/@deepseek-ai/dsh/lib/bin.js" \
  plugin --profile web add "/Users/hudsonwang/Desktop/DeepSeek Harness/plugin-submit-work/dsh-chat-pdf-export"
```

安装完成后重启 DSH Desktop 或重新加载 Web UI。包的 `dsh.bundle` patch 会把它加入 `web` profile；不需要 GitHub URL、远程仓库或发布操作。

## 开发与验证

```bash
npm test      # manifest、关键打印契约和语法冒烟测试
npm run check # node --check
```

本地预览页位于 `harness/harness.html`，可用 `harness/server.mjs` 配合 DSH Desktop 的 Electron harness 做截图/交互验证。客户端只依赖 Harness 提供的 React，不捆绑第二份 React。

## License

MIT
