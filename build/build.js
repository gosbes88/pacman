require('babel-register');

const ora = require('ora');
const chalk = require('chalk');
const webpack = require('webpack');
const config = require('./webpack.config').default;

const spinner = ora('building...');
spinner.start();

webpack(config, function(error, stats){
	spinner.stop();
	if (error) {
		throw error;
	}
	process.stdout.write(stats.toString({
		colors: true,
		modules: false,
		chunks: false,
		chunkModules: false
	}));
	console.log('\n');
	console.log(chalk.green('>>>'), chalk.blue('build completed'));
});