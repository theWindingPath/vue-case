<template>
    <div class="goods">
      <!-- vue里用v-el获取DOM节点，用-不能用驼峰，大小写敏感的 -->
      <!-- 在下面就可以用this.$els.menuWrapper获取（这里用驼峰） -->
      <div class="menu-wrapper" v-el:menu-wrapper>
        <ul>
          <!-- v-for遍历，goods是数组，有多少个元素，则添加多少个li标签，和goods.length(数组长度)对应 -->
          <li v-for="item in goods" class="menu-item">
            <span class="text border-1px">
              <!-- item.name前面有图标（type大于0才有）,小于0图标不显示 -->
              <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" v-el:foods-wrapper>
        <ul>
          <!-- 和上面menu-wrapper里的li一样，先取得goods下的name -->
          <!-- food-list-hook方便我们拿到DOM节点,hook表面它被js选择的样式（编程小技巧） -->
          <li v-for="item in goods" class="food-list food-list-hook">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <!-- 每个分类下都有商品，这个li遍历goods里的foods -->
              <li v-for="food in item.foods" class="food-item border-1px">
                <!-- food里的li左右两侧布局，左边是图片 -->
                <div class="icon">
                  <img width="57px" height="57px" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <!-- 通过v-show判断，如果为空""不显示" -->
                    <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'; // 引入第三方插件better-scroll,重命名为BScroll

  const ERR_OK = 0;

  export default { // 需要导出
    props: { // 接收传进来的数据（seller或goods,商家、商品数据）
      seller: {
        type: Object
      }
    },
    data() { // 添加data() 绑定goods，为goods添加get、set方法，操作DOM时用到
      return {
        goods: [], // 一开始为空
        listHeight: [], // 数组，存放每个区间的高度(累加过程)
        scrollY: 0 // 跟踪滚动的纵轴变化(高度)，利用better-scroll接口
      };
    },
    computed: { // vue的计算属性
      currentIndex() { // 对应左侧的元素
      // 遍历listHeight（高度区间数组），用scrollY（实时滚动高度）判断，当前滚动高度落到那个区间里，返回当前区间在数组里的下标，然后高亮（设置样式）
        for (let i = 0; i < this.listHeight.length; i++) { // 遍历listHeight
          let height1 = this.listHeight[i]; // 当前下标高度
          let height2 = this.listHeight[i + 1]; // 当前下标的，下一个元素的高度，两个高度形成高度区间
          // 判断，当前滚动高度落到那个区间里,!height2，遍历到数组最后一个元素，最后一个元素下一个元素没有，为undefined，!undefined为true，直接返回i,不判断
          if (!height2 || this.scrollY >= height1 && this.scrollY < height2) {
            return i; // 返回当前区间下标,和左边滚动栏映射（高亮显示）
          }
        }
        return 0; // 什么都没有返回0
      }
    },
    created() { // 在created钩子函数里获取数据
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

      this.$http.get('/api/goods').then((response) => { // vue-resource里的$http下的get方法里的then()方法里获取数据
        response = response.body; // 返回一个数组
        if (response.errno === ERR_OK) { // 判断获取成功
          this.goods = response.data; // 把数据保存到goods里
          // console.log(this.goods);
          // this._initScroll(); // 调用初始化函数
          this.$nextTick(() => { // 放到vue的$nextTick()接口下，才能正确计算出BScroll滚动需要的高度
            this._initScroll();
            this._calculateHeight(); // 计算高度的方法
          });
        }
      });
    },
    methods: { // methods是一个object，不是方法
      _initScroll() { // 初始化BScroll
        // BScroll( , ) 接收两个参数，第一个是DOM节点，第二个是options对象
        // options可以先不传（传空对象{}）
        this.menuScroll = new BScroll(this.$els.menuWrapper, {}); // 创建new要滚动的对象

        this.foodsScroll = new BScroll(this.$els.foodsWrapper, {
          probeType: 3 // 传这个属性给better-scroll，告诉bscroll实时给我们返回滚动的高度,probe(探针效果)
        });
        // 通过foodsScroll对象，实时监听事件（scroll）,回调函数参数pos,通过pos实时获得滚动的位置
        this.foodsScroll.on('sroll', (pos) => {
          // 用data里定义的scrollY，来接收pos.y（滚动高度）,pos.y是小数，需要转换
          // Math.roud(pos.y) 将pos.y（负值小数）转换为整数,Math.abs()取绝对值，希望它是正值整数
          this.scrollY = Math.abs(Math.round(pos.y)); // 然后，用实时获得的scrollY，和右边的列表高度区间对应的，左边的标题栏映射
        });
      },
      _calculateHeight() {
        // 先获得父元素，在通过原生getElementsByClassName获取dom节点
        let foodList = this.$els.foodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0; // 每单个列表li高度
        this.listHeight.push(height); // 先放进第一个数组元素为0,[0,]
        // 变量ul下的li(foodList)，获取高度数组
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]; // 保存foodList数组里每个元素(li)
          height += item.clientHeight; // clientHeight接口获得每个li的高度s 累加每次for循环获得的高度，渐进增加的高度height:100,200,300,400等，形成区间，放到数组里
          this.listHeight.push(height); // 将每次变量累加得到的height，放到listHeight数组里，最终遍历完成后listHeight=[0, 0+1037, 1037+154, 1037+154+122,..,]
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin";

  .goods
    display flex // flex布局，左侧固定80px,右侧自适应布局
    position absolute
    top 174px // header 134px 加 tab 40px来的
    bottom 46px // 底部footer高度46px
    width 100%
    overflow hidden //超出隐藏
    .menu-wrapper // 左侧固定80px
      flex: 0 0 80px // flex三个属性：第一个：等分，第二个：内容不足缩放情况，第三个：占位，这里占80px，
      width 80px // Android浏览器兼容性问题，需要设置width
      background #f3f5f7
      .menu-item // 能有class则用class，避免用标签，class性能好，标签（p/li等标签）效率低
        display table // table做垂直居中效果最好，无论一行还是两行都能做到垂直居中
        width 56px // 160-2*24=112,112/2=56
        height 54px
        padding 0 12px
        line-height 14px
        .icon
          display inline-block
          vertical-align top 
          width 12px
          height 12px
          margin-right 2px
          background-size 12px 12px
          background-repeat no-repeat
          &.decrease
              bg-image('decrease_3')
          &.discount
              bg-image('discount_3')
          &.guarantee
              bg-image('guarantee_3')
          &.invoice
              bg-image('invoice_3')
          &.special
              bg-image('special_3')
        .text
          display table-cell
          width 56px
          vertical-align middle // table里垂直居中布局
          font-size 12px
          border-1px(rgba(7,17,27,0.1)) // 移动端一像素下边框

    .foods-wrapper
      flex 1 // 右侧自适应布局
      .title
        padding-left 14px
        height 26px
        line-height 26px
        border-left 2px solid #d9dde1
        font-size 12px
        color rgb(147,153,159)
        background #f3f5f7
      .food-item
        display flex
        margin 18px
        padding-bottom 18px
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          border-none()
          margin-bottom 0
        .icon
          flex 0 0 57px
          margin-right 10px
        .content
          flex 1
          .name
            margin 2px 0 8px 0
            height 14px
            line-height 14px
            font-size 14px
            color rgb(7, 17, 27)
          .desc, .extra
            line-height 10px
            font-size 10px
            color rgb(147,153,159)
          .desc
            margin-bottom 8px
            line-height 12px
          .extra
            .count
              margin-right 12px
          .price
            font-weight 700
            line-height 24px
            .now
              margin-right 8px
              font-size 14px
              color rgb(240, 20, 20)
            .old
              text-decoration line-through
              font-size 10px
              color rgb(147, 153, 159)
              
</style>
