# tobiiiiichi.github.io

个人主页，纯静态 HTML / CSS / JS，由 GitHub Pages 托管。

访问地址：<https://tobiiiiichi.github.io>

## 文件说明

| 文件 | 作用 |
| --- | --- |
| `index.html` | 页面内容：名称、介绍、技能、项目、联系方式 |
| `assets/css/style.css` | 全部样式，主题色和间距都在文件顶部的变量里 |
| `assets/js/main.js` | 主题切换、滚动动画、导航高亮 |
| `assets/img/` | 图标与分享图 |

## 常见修改

- **改名字 / 介绍 / 邮箱**：搜 `index.html` 里的对应文字直接替换。
- **换主题色**：改 `assets/css/style.css` 顶部的 `--accent-1`、`--accent-2`、`--accent-3`。
- **加项目卡片**：在 `index.html` 的「项目」区块里，按注释里的模板复制一份。
- **换头像**：目前直接引用 GitHub 头像，换 GitHub 头像即可生效。

## 本地预览

```bash
python3 -m http.server 8000
```

然后打开 <http://localhost:8000>。
