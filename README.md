# 文件加密工具

一个安全、高效的文件加密解密工具，支持各种类型文件的加密保护。

## 特性

- 支持多种文件类型加密和解密
- 内置多种加密算法 (AES, DES, 3DES)
- 直接处理二进制数据，确保文件完整性
- 简洁易用的界面
- 跨平台兼容

## 技术栈

- Vue 3 + TypeScript
- CryptoJS 加密库
- Vite 构建工具

## 安装

```bash
# 克隆项目
git clone https://github.com/你的用户名/file-crypto-tool.git

# 进入项目目录
cd file-crypto-tool

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## 使用方法

1. 文件加密：
   - 选择需要加密的文件
   - 设置加密密钥
   - 选择加密算法
   - 点击"加密"按钮
   - 下载加密后的文件（带.enc后缀）

2. 文件解密：
   - 选择加密的文件（.enc文件）
   - 输入正确的密钥
   - 选择相同的加密算法
   - 点击"解密"按钮
   - 下载解密后的文件

## 支持的文件类型

几乎支持所有文件类型，包括但不限于：
- 图片 (JPG, PNG, GIF)
- 文档 (PDF, DOC, XLS)
- 音频视频 (MP3, MP4)
- 压缩文件 (ZIP, RAR)
- 文本文件 (TXT, HTML, JSON)


## 贡献

欢迎提交问题和改进建议，或直接提交Pull Request。

## 许可证

MIT
