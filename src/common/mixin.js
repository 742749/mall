import {debounce} from 'common/utils.js'

import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
	data() {
		return {
			itemImgListener: null
		}
	},
	mounted() {
		// console.log("混入的内容")
		// 图片加载完成的事件监听
		// this.$refs.scroll.refresh对这个函数进行防抖处理
		const refresh = debounce(this.$refs.scroll.refresh, 200)
		// 对监听的事件进行保存
		this.itemImgListener = () => {
			refresh()
		}
		this.$bus.$on('itemImgLoad', this.itemImgListener)
	}
}

export const backTopMixin = {
	components: {
		BackTop
	},
	data() {
		return {
			isShowBackTop: false
		}
	},
	methods: {
		backClick() {
			this.$refs.scroll.scrollTo(0, 0)
		},
		listenShowBackTop(position) {
			// 判断BackTop是否显示
			this.isShowBackTop = -position.y > 1000
		}
	}
}