module.exports = {
	publicPath: './',
	outputDir: 'dist',
	assetsDir: 'static',
	pages: undefined,
	devServer: {
		host: '127.0.0.1',
		port: 8888
	},
	configureWebpack: {
		resolve: {
			alias: {
				'assets' : '@/assets',
				'common' : '@/common',
				'components' : '@/components',
				'network' : '@/network',
				'views' : '@/views'
			}
		}
	}
}