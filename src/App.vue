<template>
    <div id="app">
		<el-row>
			<el-col :span="4">
				<leftMenu />
			</el-col>
			<el-col :span="20">
				<router-view />
			</el-col>
		</el-row>

    </div>
</template>

<script>
import leftMenu from './components/leftMenu.vue'

export default {
	name: 'App',
	components: {
		leftMenu
	}
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
