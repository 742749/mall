<template>
  <div id="cart">
		<!-- 导航 start -->
		<nav-bar class="cart-nav">
			<div slot="center">购物车({{length}})</div>
		</nav-bar>
		<!-- 导航 end -->
		
		<!-- 商品列表 start -->
		<cart-list/>
		<!-- 商品列表 end -->
		
		<!-- 底部汇总 start -->
		<cart-bottom-bar/>
		<!-- 底部汇总 end -->
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar'
	
	import CartList from './childComps/CartList.vue'
	import CartBottomBar from './childComps/CartBottomBar.vue'
	
	import {mapGetters} from 'vuex'
	
  export default {
    name: "Cart",
		components: {
			NavBar,
			CartList,
			CartBottomBar
		},
		computed: {
			// 两种方法
			// ...mapGetters(['cartLength', 'cartList'])
			...mapGetters({
				length: 'cartLength'
			})
		}
  }
</script>

<style scoped>
	.cart-nav {
		background-color: var(--color-tint);
		color: #fff;
		z-index: 9;
	}
</style>
