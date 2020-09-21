<template>
	<div class="bottom-bar">
		<div class="check-content">
			<check-button :is-checked="isSelectAll" 
										class="check-area" 
										@click.native="checkClick"/>
			<span>全选</span>
		</div>
		<div class="price">
			合计：{{totalPrice}}
		</div>
		<div class="calculate" @click="calcClick">
			<div>去计算({{chckLength}})</div>
		</div>
	</div>
</template>

<script>
	import CheckButton from './CheckButton.vue'
	
	import {mapGetters} from 'vuex'
	
	export default {
		name: "CartBottomBar",
		components: {
			CheckButton
		},
		computed: {
			...mapGetters(['cartList']),
			totalPrice() {
				return '￥' + this.cartList.filter(item => {
					return item.checked
				}).reduce((preValue, item) => {
					return preValue + item.price * item.count
				}, 0).toFixed(2)
			},
			chckLength() {
				return this.cartList.filter(item => item.checked).length
			},
			isSelectAll() {
				if (this.cartList.length === 0) return false
				return !this.cartList.find(item => !item.checked)
			}
		},
		methods: {
			checkClick() {
				if (this.isSelectAll) {
					this.cartList.forEach(item => item.checked = false)
				} else {
					this.cartList.forEach(item => item.checked = true)
				}
			},
			calcClick() {
				let checkedLength = 0
				this.cartList.forEach(item => {
					if (item.checked == false) {
						checkedLength ++
					}
					if (checkedLength === this.cartList.length){
						this.$toast.show('请选择购买的商品', 2000)
					}
				})
			}
		}
	}
</script>

<style scoped>
	.bottom-bar {
		height: 40px;
		background-color: #eee;
		position: relative;
		display: flex;
		align-items: center;
		font-size: 14px;
	}
	.check-content {
		display: flex;
		height: 40px;
		width: 90px;
		align-items: center;
	}
	.check-area {
		width: 20px;
		height: 20px;
		line-height: 20px;
		margin-left: 10px;
		margin-right: 5px;
	}
	.price{
		margin-left: 20px;
		flex: 1;
	}
	.calculate {
		display: flex;
		height: 40px;
		width: 90px;
		align-items: center;
		background-color: red;
		color: #fff;
	}
	.calculate div {
		width: 100%;
		text-align: center;
	}
</style>
