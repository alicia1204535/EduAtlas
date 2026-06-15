# EduAtlas 运营手册

> 创建日期：2026 年 6 月 17 日  
> 网站：https://edu-atlas-ten.vercel.app  
> 阶段：上线完成，等待 Google 收录中

---

## 一、项目当前状态

| 指标 | 数量 |
|------|------|
| 学校详情页 | 40 所国际学校 |
| 指南文章 | 13 篇（35,000+ words） |
| 程序化页面 | 23 个（课程 + 区域 + 费用范围） |
| 静态总页面 | 88 页 |
| 交互工具 | 推荐问卷 + 学校对比 + 智能搜索 |

### 13 篇指南覆盖的关键词

| # | 标题 | 目标搜索量/月 |
|---|------|-------------|
| 1 | Why Choose International School in Singapore | 800-1,200 |
| 2 | IB vs AP vs IGCSE vs A-Levels | 200-400 |
| 3 | Singapore School Fees Complete Breakdown | 2,000-3,000 |
| 4 | International School Admission Guide | 200-400 |
| 5 | Chinese Students Singapore School Guide | 500-1,000 |
| 6 | Singapore Education System Explained | 200-400 |
| 7 | Expat Guide to Singapore Schools | 400-700 |
| 8 | Can Foreigners Attend Singapore Public Schools? | 200-400 |
| 9 | Singapore Student Pass Application Guide | 300-500 |
| 10 | International School Waiting List Guide | 50-150 |
| 11 | What Is the IB PYP Curriculum? | 300-500 |
| 12 | MOE vs International School Comparison | 100-300 |
| 13 | Campus Visit Evaluation Checklist | 100-200 |

---

## 二、Google Search Console 监控指南

### 在哪里看

打开 https://search.google.com/search-console → 选择你的资源

### 每周检查三个指标

#### 1. 收录页面数

**路径**：Index → Pages

看两个数字：
- **Indexed pages**（已收录）— 目标：最终达到 88 页
- **Not indexed**（未收录）— 点进去看原因

| 常见状态 | 含义 | 处理方式 |
|---------|------|---------|
| Crawled - currently not indexed | Google 看了但觉得不值得收录 | 等 2-3 周，正常 |
| Discovered - currently not indexed | Google 发现了但还没抓取 | 等 1-2 周，正常 |
| Page with redirect | 页面有重定向 | 需要修 |
| Not found (404) | 页面不存在 | 需要修 |
| Duplicate without user-selected canonical | 重复内容 | 需要检查 |

**前 4 周正常现象**：只有 30-60% 页面被收录是正常的。新站需要时间。

#### 2. 搜索表现

**路径**：Performance → Search results

四个关键指标：
- **Total clicks**：从 Google 点击到你网站的次数
- **Total impressions**：你的网站在搜索结果中出现的次数（不一定要被点击）
- **Average CTR**：点击率 — 展示中被点击的比例
- **Average position**：平均排名位置

**前 4 周正常现象**：数据很少甚至为零。Google 需要时间把你排上去。

#### 3. 抓取错误

**路径**：Index → 找红色感叹号标记的页面

有错误就截图发出来。大多数我能远程修。

### 第一次看 GSC 时截图给我看

- **Overview 页面** — 看整体趋势
- **Performance 页面** — 设置日期为最近 28 天
- **Pages 页面** — 看收录状态

---

## 三、每周任务清单

### 每周一（15 分钟）

- [ ] 打开 GSC → Index → Pages，记录收录数
- [ ] GSC → Performance，记录展示数和点击数
- [ ] GSC → Index，检查抓取错误
- [ ] 把数据或截图发出来，我会分析并建议方向
- [ ] 如有需要，我写新指南或优化旧内容

### 每两周（30 分钟）

- [ ] **Reddit**：搜索以下关键词，找相关帖子
  - `international school Singapore`
  - `expat Singapore school`
  - `moving to Singapore with kids`
- [ ] 我帮你写回复草稿（真诚回答 + 自然引用你的文章），你复制粘贴发布
- [ ] **Medium**：我帮你把一篇指南缩写成 800 字 Medium 版，你注册账号发布
- [ ] 文末加一句 "Read the full guide on EduAtlas: [链接]" 作为外链

### 每月（1 小时）

- [ ] 导出 GSC Performance 数据，分析：
  - 哪些页面排名最高？
  - 哪些搜索词带来最多展示？
- [ ] 根据数据决定下一个月的写作方向
- [ ] 学校费用更新（每年 10-12 月新学年费用发布时）
- [ ] 检查是否需要修 404 或重定向

---

## 四、竞品分析框架

### 要分析的维度

| 维度 | 关注什么 |
|------|---------|
| **内容量** | 他们有多少页面？多少指南？更新频率？ |
| **内容深度** | 文章长度？是否有数据/表格/FAQ？ |
| **SEO 表现** | 搜核心关键词，他们排第几？ |
| **变现方式** | 有没有广告？Affiliate？直接合作？ |
| **差异化** | 他们缺什么？哪里做得不好？ |
| **网站技术** | 加载速度？移动端体验？结构化数据？ |

### 新加坡竞品（建议分析）

| 竞品 | 网址 | 强项 | 弱项 |
|------|------|------|------|
| HoneyKids Asia | honeykidsasia.com | 内容多，品牌强 | 偏 lifestyle，数据弱 |
| Sassy Mama | sassymamasg.com | 社区活跃 | 不是专业教育站 |
| WhichSchoolAdvisor | whichschooladvisor.com/singapore | 学校数据全 | UI 旧 |
| International Schools Database | international-schools-database.com | 数据驱动 | 互动工具少 |
| 各学校官网 | 各学校 .edu.sg | 权威 | 各自为政，无法对比 |

### 扩张目标城市竞品（为后续准备）

对照新加坡的经验，搜以下城市的关键词，看竞品情况：

- **吉隆坡**：`international schools kuala lumpur`
- **曼谷**：`international schools bangkok`
- **东京**：`international schools tokyo`
- **迪拜**：`international schools dubai`
- **上海**：`international schools shanghai`

记录每个城市：有多少竞品？内容质量如何？有没有推荐/对比工具？

---

## 五、扩张计划时间线

### 判断节点

```
现在 ─── 观察收录量 ─── 7 月中 ─── 判断是否开始准备第二城

7 月中 ─── 观察排名和流量 ─── 8 月中 ─── 第二城上线
```

### 扩张条件（7 月中判断）

✅ 可以扩张的信号：
- GSC 收录 70 页以上
- 开始有搜索展示（哪怕还没点击）
- 一些 Tier 3 关键词（学校名 + 费用/课程）有排名

⏳ 继续等待的信号：
- 收录不到 30 页
- 完全零展示
- 有技术问题没解决

### 扩张方式

每座新城市复制同样的架构：
- 40 所学校 JSON 数据
- 5-8 篇本地化指南
- 推荐 + 对比工具
- 同一套代码，不同数据

第一座候选城市：**吉隆坡**（近、华人多、国际学校市场活跃）

---

## 六、变现路线图

| 时间节点 | 方式 | 要求 | 预期月收入 |
|---------|------|------|-----------|
| 3 个月后 | Google AdSense | 网站运营 3 个月+，内容充实 | $50-300 |
| 6 个月后 | Affiliate 链接 | 流量 1000+/月 | $200-1,000 |
| 12 个月后 | 学校直接合作 | 流量和品牌建立 | $500-2,000 |

---

## 七、常用链接

| 用途 | 链接 |
|------|------|
| Google Search Console | https://search.google.com/search-console |
| Google Analytics | https://analytics.google.com |
| Vercel Dashboard | https://vercel.com/dashboard |
| GitHub 仓库 | https://github.com/alicia1204535/EduAtlas |
| Reddit r/Singapore | https://reddit.com/r/singapore |
| Reddit r/InternationalTeachers | https://reddit.com/r/InternationalTeachers |
| Medium | https://medium.com |

---

## 八、SEO 排名时间规律

| 关键词类型 | 预计进入前 3 页 | 预计进入前 1 页 |
|-----------|---------------|---------------|
| Tier 4（长尾问题型） | 1-2 个月 | 3-6 个月 |
| Tier 3（学校名 + 具体词） | 1-3 个月 | 3-6 个月 |
| Tier 2（高价值长尾） | 3-6 个月 | 6-12 个月 |
| Tier 1（核心商业词） | 6-12 个月 | 12+ 个月 |

**前 3 个月完全零流量是正常的。不要焦虑。**

---

*本手册会持续更新。有任何问题随时发出来讨论。*
