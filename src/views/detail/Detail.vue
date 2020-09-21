<template>
	<div id="detail">
		<detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
		<scroll class="content" 
						ref="scroll" 
						@scroll="contentScroll" 
						:probe-type="3">
			<detail-swiper :top-images="topImages"/>
			<detail-base-info :goods="goods"/>
			<detail-shop-info :shop="shop"/>
			<detail-goods-info :images-info="detailInfo" @imgLoad="imgLoad"/>
			<detail-param-info ref="params" :param-info="paramInfo"/>
			<detail-comment-info ref="comment":comment-info="commentInfo"/>
			<goods-list ref="recommoned" :goods="recommends"/>
		</scroll>
		<detail-bottom-bar @addCart="addToCart"/>
		<back-top @click.native="backClick" v-show="isShowBackTop"/>
	</div>
</template>

<script>
	import DetailNavBar from './childComps/DetailNavBar.vue'
	import DetailSwiper from './childComps/DetailSwiper.vue'
	import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
	import DetailShopInfo from './childComps/DetailShopInfo.vue'
	import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
	import DetailParamInfo from './childComps/DetailParamInfo.vue'
	import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
	import DetailBottomBar from './childComps/DetailBottomBar.vue'
	
	
	import Scroll from 'components/common/scroll/Scroll'
	import GoodsList from 'components/content/goods/GoodsList'
	
	import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail.js'
	import {debounce} from 'common/utils'
	import {itemListenerMixin, backTopMixin} from 'common/mixin'
	
	export default {
		name: "Detail",
		components: {
			DetailNavBar,
			DetailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			DetailGoodsInfo,
			DetailParamInfo,
			DetailCommentInfo,
			Scroll,
			GoodsList,
			DetailBottomBar
		},
		mixins: [itemListenerMixin, backTopMixin],
		data() {
			return {
				iid: null,  // 商品id
				topImages: [],  // 顶部的图片轮播数据
				goods: {},  // 商品信息
				shop: {},  // 店铺信息
				detailInfo: {},  // 商品详情数据
				paramInfo: {},  // 参数信息
				commentInfo: {},  // 评论信息
				recommends: [],  // 推荐数据
				themeTopYs: [],  // 顶部各导航的Y轴位置
				currentIndex: 0,  // 选中的顶部导航
				isShowBackTop: false  // BackTop是否显示
			}
		},
		created() {
			// 1.保存传入的iid
			this.iid = this.$route.params.iid
			
			// 2.请求详情数据
			getDetail(this.iid).then(res => {
				// console.log(res)
				const data = res.result
				// 1.获取顶部的图片轮播数据
				this.topImages = res.result.itemInfo.topImages
				
				// 2.获取商品信息
				this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
				
				// 3.创建店铺信息的对象
				this.shop = new Shop(data.shopInfo)
				
				// 4.保存商品详情数据
				this.detailInfo = data.detailInfo
				
				// 5.获取参数信息
				this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
				
				// 6.取出评论信息
				if (data.rate.cRate !== 0) {
					this.commentInfo = data.rate.list[0]
				}
				
			})
			
			// 3.请求推荐数据
			getRecommend().then(res => {
				// console.log(res)
				this.recommends = res.data.list
			})
		},
		destroyed() {
			this.$bus.$off('itemImgLoad', this.itemImgListener)
		},
		methods: {
			imgLoad() {
				this.$refs.scroll.refresh()
				
				this.themeTopYs = []
				this.themeTopYs.push(0)
				this.themeTopYs.push(this.$refs.params.$el.offsetTop-44)
				this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44)
				this.themeTopYs.push(this.$refs.recommoned.$el.offsetTop-44)
				this.themeTopYs.push(Number.MAX_VALUE)
				
				// console.log(this.themeTopYs)
			},
			titleClick(index) {
				// console.log(index)
				this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300)
			},
			contentScroll(position) {
				const positionY = -position.y
				let length = this.themeTopYs.length - 1
				for (let i = 0; i < length; i++) {
					if((this.currentIndex !== i) && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
						this.currentIndex = i
						this.$refs.nav.currentIndex = this.currentIndex
					}
				}
				this.listenShowBackTop(position)
			},
			addToCart() {
				// 1.获取购物车需要展示的信息
				const product = {}
				product.image = this.topImages[0]
				product.title = this.goods.title
				product.desc = this.goods.desc
				product.price = this.goods.realPrice
				product.iid = this.iid
				
				// 2.将商品添加到购物车
				this.$store.dispatch('addCart', product).then(res => {
					this.$toast.show(res, 1500)
				})
			}
		},
		mounted() {
			
		},
		updated() {
			
		}
	}
</script>

<style scoped>
	#detail {
		position: relative;
		z-index: 9;
		background-color: #fff;
		height: 100vh;
	}
	.detail-nav {
		position: relative;
		z-index: 9;
		background-color: #fff;
	}
	.content {
		height: calc(100% - 44px - 49px);
	}
</style>
