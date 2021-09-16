<template>
    <div>
        <Header title="我的喵喵"/>
        <Login />
        <TabBar/>
    </div>
</template>

<script>
import Header from "../../components/Header/Header";
import TabBar from "../../components/TabBar/TabBar";
import Login from "../../components/Login/Login";

export default {
    name: "Mine",
    components: {
        Header,
        TabBar,
        Login
    }
}
</script>

<style scoped>

</style>
