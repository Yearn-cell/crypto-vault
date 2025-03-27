# 贡献指南

感谢你考虑为文件加密工具做出贡献！这里是一些帮助你开始的指南。

## 问题报告

如果你发现了bug或者有功能建议，请先查看是否已经有相关的issue。如果没有，请提交新的issue，并包含以下信息：

- 对问题或建议的清晰描述
- 如果是bug，请提供复现步骤
- 预期行为与实际行为的差异
- 相关的截图（如果适用）
- 你的操作系统和浏览器信息

## 提交代码

1. Fork这个仓库
2. 创建你的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交你的改动 (`git commit -m '添加了某个很棒的功能'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启一个Pull Request

## 开发环境设置

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 运行测试
npm run test
```

## 代码风格指南

- 使用TypeScript类型
- 遵循ESLint配置的规则
- 使用功能性组件和Composition API
- 使用有意义的变量和函数名称
- 添加适当的注释

## 分支策略

- `main`: 稳定的生产版本
- `develop`: 开发中的下一个版本
- `feature/*`: 新功能开发
- `bugfix/*`: 问题修复

## Pull Request流程

1. 确保你的代码符合代码风格指南
2. 更新README.md，如果你的更改涉及新功能或需要文档更新
3. 确保所有测试通过
4. 提交Pull Request到`develop`分支

## 发布流程

项目管理员将从`develop`分支提交到`main`分支，并创建新的版本标签。

感谢你的贡献！ 