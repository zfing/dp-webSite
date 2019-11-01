### 多语言模块

```
import I18n, { I18nProvider, Trans, defaultLocale } from 'helpers/I18n'

// 1. connect

<I18nProvider local="zh" />
  <App />
</I18nProvider>

// 2. use

// simple
<I18n zh="名字" en="name" />

// template
<I18n value={name: 'xx'} zh="名字: {name}" en="name: {name}" />

// bind id
<I18n id="ID" value={name: 'xx'} />

// with format
<I18n id="ID" format={(text, locale) => 'format'} />

// with wrapper
<I18n id="ID" wrapper={text => <div>{text}</div>} />

// variable
Trans({ id: 'ID' })
Trans({ zh: '名字', en: 'name' })

// get locale
const locale = defaultLocale.value
```

### 路由匹配 ( match )

**每添加一个页面，需要配置服务端路由**

#### 示例

```
match({
  app,
  server,
  languages: ['en', 'zh'], // 支持的多语言
  defaultLanguage: 'zh', // 默认语言
  routes: [
    { route: '/', useCache: true }, // 开启次路由页面缓存
    { route: '/rating' },
    { route: '/rating/report/:id' },
    ...
  ],
  renderFromCache: renderFromCache(app), //  缓存机制
})
```

### 根文件服务

如果对外需要访问根文件，例如：`robots.txt` 文件，直接放入 `static/server/` 下即可。

