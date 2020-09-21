<template>
	<div class="goods-item" @click="itemClick">
		<img v-lazy="showImage" alt="" @load="imageLoad">
		<div class="goods-info">
			<p>{{goodsItem.title}}</p>
			<span class="price">{{goodsItem.price}}</span>
			<span class="collect">{{goodsItem.cfav}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: "GoodsListItem",
		props: {
			goodsItem: {
				type: Object,
				default() {
					return []
				}
			}
		},
		computed: {
			showImage() {
				return this.goodsItem.image || this.goodsItem.show.img
			}
		},
		methods: {
			imageLoad() {
				// 方法一
				// if (this.$route.path.indexOf('/home')) {
				// 	this.$bus.$emit('itemImageLoad')
				// } else if(this.$route.path.indexOf('/detail')) {
				// 	this.$bus.$emit('detailItemImgLoad')
				// }
				// 方法二
				this.$bus.$emit('itemImgLoad')
			},
			itemClick() {
				this.$router.push('/detail/' + this.goodsItem.iid)
			}
		}
	}
</script>

<style scoped>
	.goods-item {
		padding-bottom: 40px;
		position: relative;
		width: 48%;
	}
	.goods-item img {
		width: 100%;
		border-radius: 5px;
	}
	.goods-info {
		font-size: 12px;
		bottom: 5px;
		text-align: center;
		position: absolute;
		left: 0;
		right: 0;
		overflow: hidden;
	}
	.goods-info p {
		margin-bottom: 3px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.goods-info .price {
		color: var(--color-high-text);
		margin-right: 20px;
	}
	.goods-info .collect {
		position: relative;
	}
	.goods-info .collect::before {
		context: '';
		position: absolute;
		left: -15px;
		top: -1px;
		width: 14px;
		height: 14px;
		background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
	}
</style>
