#电商网站项目总结
    1.页面
        首页  
            header 搜索 轮播图 swiper 分类 渲染 列表 用mockjs模拟数据，然后渲染到列表  图片运用懒加载lazyload 加载列表需要判断滚动条与浏览器的距离增加数据 点击列表项跳转到detail页 点击购物车  判断是否登录，如果没有跳到登录或者注册页 如果登录了跳转到cart页 注意  e.stopPropagation();阻止事件冒泡
        分类列表项 
        搜索页 
            运用了fonticon图标 点击input进入search页面 有清空搜索记录、搜索跳转页面、搜索过得记录点击跳转、获取localstorage里边的搜素记录功能
        详情页 
            点击列表项跳转到detail页，将goods_id传过去 然后根据goods_id渲染该数据
        分类页 
            运用了tab切换功能
        购物车 
            用到前面的列表数据在确定是否添加到了购物车之后才能进行购物车的开发在goods中有购物车的逻辑运维,同时购物车的"编辑"加上了onclick通过点击来判断是否删除选中的商品信息通过(id)的遍历判断选中的事哪一个,添加购物车的思想取决于首页的商品信息,通过首页里面的购物车标识点击之后弹出封装好的提示框(封装好的组件)直接添加到购物车中,购物车中的计算通过"price"and"count"来计算,所有的添加、删除都是封装的组件通过调用实现效果的实现
            数量的加减 全选 不选  删除 操作store中的数据,将store封装起来，把所有获取数据写在action中 ，变量写在actionType中 组件中要连接connect 用mapStateToProps,mapDispatchToProps改变数据，然后再更新视图
        我的
            登录  
                通过接口把username.value、password.value传给后台，与user.json中数据进行对比，如果==跳转到首页 如果！=跳转到注册页
            注册  
                通过接口把username.value、password.value传给后台，存在user.json中
            邮寄地址管理 
                用到三级联动,首先去网上下载一些数据以便后期使用,然后一次便利里面的属性,通过自己的选择添加地址,然后可以删除添加好的地址
        
        订单管理页
        路由
            封装一个组件，当有子路由时调用封装的组件即可，还有权限说明 如果有权限并且没有登录就跳转到登录页，如果没有权限跳转到首页
    2.common组件封装
        轮播图模块    商品模块   筛选模块   购物车商品模块   邮寄地址模块
    3.技术选型
        React、
        redux:多交互多数据
        react-router：react-router-dom、react-router-native 提供路由组件与函数
        react-redux：提供方便的容器组件，connect(mapStateToProps,mapDispatchToProps,mergeProps,options)
        redux-sage:解决异步的sage 用来分发action进行处理，使体系流程更加清晰
        mobile端、自适应
        fetch 封装 提供接口
        用node搭建一个简单的静态服务器，准备一定的模拟接
        脚手架：webpack，自行搭建可以切换不同环境的脚手架
