# desktop-webapp
> 模仿腾讯的一款桌面软件 "Q+" ,运用了js,css3,html5的相关技术完成的一款webapp桌面应用 

功能介绍
---

- **会员登录**：运用了html5的本地存储，进行了会员注册，登录和验证的操作，根据不同的账号和密码进行存储。能够记住用户密码和自动登录，修改密码。显示相应的会员界面和会员专属功能，在谷歌和火狐下可使用

- **壁纸记录**：会员登录后可以使用壁纸使用和收藏，更具不同的用户存储对应的收藏和使用，登录后自动获取会员壁纸的使用和收藏记录，可进行添加,删除

- **读取壁纸地址**：导航栏的《壁纸》下拉框，点击"换一批"，会自动从josn里随机读取不同种类的图片，图片由小到大显示

- **壁纸库**：桌面壁纸<<壁纸库>>运用了ajax瀑布流原理，拖到滚动条或鼠标滚轮到相应位置，会从json里读取图片地址信息

- **发表说说**：会员登录后可以打开《我的说说》，"Q+说说"栏目的的文字信息和图片，点击分页时会从json里读取信息，可进行表情，文字回复，发表说说等操作。

- **存储我的说说**： 可在《我的说说》里发表说说，会根据用户的不同，存储对应的信息。可进行留言，删除操作，下次登录可见

- **创建格子**：点击鼠标右边出现鼠标菜单,点击新建"桌面格子",可以创建多个格子，格子间里的文件可以互相交换，桌面和格子里的文件也可进行交换操作。可进行 "展示","收起","移除"格子等操作。移除后文件全部移动到桌面。单个格子文件个数大于6个，会出现滚动条，可以拖拽，鼠标滚轮操作

- **新建文件夹**：点击鼠标右边可以新建"文件夹",可以进行文件夹命名

- **Desktop APP**： 
  - （1）APP自动竖排布局：根据可视区的高度，计算出每一个APP的top和left值，然后设置； 
  - （2）APP互换位置（缓冲运动效果）：判断距离最近APP，然后让两者的top和left值互相更换； 
  - （3）窗口改变大小的时APP重新排列位置：当window.onresize事件触发时，立即重新排列APP

- **APP的弹出层**： 
  - （1）具有最小化，最大化，还原窗口功能：最小化使用多个运动让效果达到逼真的最小化动画效果； 
  - （2）根据点击不同的APP，改变弹出层内容:设置对应的链接内容，达到最好的体验效果

- **恢复默认布局**： 将桌面布局恢复到初始位置

- **右键菜单【刷新】**：模拟windows刷新功能

- **右键菜单【图标设置】**： 可以切换图标，改变桌面图标的大小，以运动的形式移动位置

- **设置弹出框**： 
  - （1）自由拖拽（限制在可视区范围）：将自由拖拽封装成函数，在这里调用； 
  - （2）移入移出的运动效果：使用已经封装好的运动框架，让其在打开、关闭时做缓冲运动； 
  - （3）弹出框的四周均使用了CSS3中的“border-radius”，这样来设置圆角。 
  - （4）新窗口设有最小化、最大化、缩小以及关闭功能，双击标题栏也可缩放，窗口最小化后将在任务栏中出现

- **点击焦点切换3D桌面** 点击焦点数字的时候，运用css3的3D变换效果，并改变透明度切换桌面图标

- **右上角菜单**: 点击桌面【个人信息】菜单，打开页面，分为5个版块，高版本浏览器运用3D动画效果进行桌面切换，低版本浏览器呢采用运动缓冲效果。

- **文件夹**: 鼠标右键点击桌面名字为"文件夹"的图标，可以将文件夹展开，可以将桌面和文件夹存放的文件相互交换存放，存放文件少于一定数量，滚动条消失，移除此格子，格子内存放的文件，全部移动到桌面显示。

- **界面切换**: 导航上方三个版块"桌面","推荐","网址"，点击可以进行页面之间运动的切换。

- **推荐版块**: 版块内分为6个栏目，可以进行点击和左右按钮之间来回的切换，互相不会有影响

- **网址版块**: 版块内有一个多功能的搜索框,可以用不同的4种浏览引擎在"网页","新闻", ”视频","图片","音乐","地图","问答" 8个频道之间进行搜索

- **网址版块**: 下方有各种网站的搜索快速窗口，可以点击直接进入当前的网站，每次点击不同的栏目，图片都会产生运动效果，删除某个图片，会自动进行运动排序

- **公有的方法库和jq插件** 手动编写了一些常用的js方法库和jquery插件。整个网站运动了jquery配合面向对象的写法，实现了模块化，功能块的划分