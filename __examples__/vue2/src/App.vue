<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png" />
        <HelloWorld msg="Welcome to Your Vue.js App" />
        <TestComp :list="links"></TestComp>
    </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import TestComp from './components/TestComp'

export default {
    name: 'app',
    components: {
        HelloWorld,
        TestComp
    },
    data() {
        return {
            links: [
                {
                    label: 'babel-plugin-vue-jsx-scoped-css',
                    link:
                        'https://github.com/Mrminfive/babel-plugin-vue-jsx-scoped-css'
                }
            ]
        }
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
