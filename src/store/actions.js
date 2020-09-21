import {
	ADD_COUNTER,
	ADD_TO_CART
} from './mutations-types.js'

export default {
		addCart(context, payload) {
			// // payload新添加商品
			// // 查找之前数组中是否有该商品
			// let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
			
			// if (oldProduct) {
			// 	// oldProduct.count += 1
			// 	context.commit(ADD_COUNTER, oldProduct)
			// } else {
			// 	payload.count = 1
			// 	context.commit(ADD_TO_CART, payload)
			// }
			return new Promise((resolve, reject) => {
				// payload新添加商品
				// 查找之前数组中是否有该商品
				let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
				
				if (oldProduct) {
					// oldProduct.count += 1
					context.commit(ADD_COUNTER, oldProduct)
					resolve('当前的商品数量加一')
				} else {
					payload.count = 1
					context.commit(ADD_TO_CART, payload)
					resolve('添加了新的商品')
				}
			})
		}
	}