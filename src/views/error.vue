<template>
    <div class="text-center">
        <img src="@/assets/images/Error/404.svg" style="max-height:calc(100vh - var(--navHeight) - var(--footerHeight));">
        <br>
        <button class="btn btn-primary center" type="button" @click="NotFoundBack">回首頁</button>
    </div>
</template>

<script>
export default {
<<<<<<< HEAD
    name: 'error',
=======
    name: 'errorPage',
>>>>>>> 81b59802d59b70e7b11a6ba631a6ada02ce011e9
    methods: {
        NotFoundBack() {
            this.$router.push({ name: 'proposeList', query: { page: 1 } })
        },
    },
}
</script>