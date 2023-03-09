<template>
    <div style="margin: 5px;">
        <titleCard title="論壇" icon="bi-chat-square-text" buttonContents="icon" buttonIcon="bi-pencil-square" @click="gotoForumAdd"></titleCard>
        <div v-if="cardData==undefined">
            <div class="spinner-border text-primary" style="height: 2em;margin-left:calc(50vw - 2em);" role="status"></div>
        </div>
        <router-link v-else v-for="Cdata in cardData" :to="{name:'forumDetails',params:{id:(Cdata.url)}}" style="text-decoration: none; color: black;">
            <div class="card-hover card card-item" style="border-radius: 10px;border-width: 0px;border-color: rgb(0,0,0);margin-bottom: 5px;box-shadow: 0px 0px 1px 0px;">
                <div class="card-body" style="border-top-width: 2px;border-top-color: var(--bs-gray);">
                    <h4 class="card-title"><span v-text="Cdata.title"></span></h4>
                    <h6 class="text-muted card-subtitle mb-2"></h6>
                    <p class="card-text"><span v-text="(Cdata.contents.length>300) ? `${Cdata.contents.substr(0,300)}...` : Cdata.contents "></span></p>
                    <p style="text-align: right;font-family: ABeeZee, sans-serif;"><span v-text="new Date(Cdata.date).toLocaleDateString('zh-tw')"></span></p>
                </div>
            </div>
        </router-link>
    </div>

    <div>
        <ul class="pagination">
            <li class="page-item">
                <a v-if="page != 1" class="page-link" aria-label="Previous" @click="gotoPage(page - 1)"><span aria-hidden="true">«</span></a>
                <a v-else class="page-link disabled" aria-label="Previous"><span aria-hidden="true">«</span></a>
            </li>
            <div v-for="index in pages">
                <li class="page-item">
                    <a v-if="index == page" class="page-link active">{{ index }}</a>
                    <a v-else class="page-link" @click="gotoPage(index)">{{ index }}</a>
                </li>
            </div>
            <li class="page-item">
                <a v-if="page != pages" class="page-link" aria-label="Next" @click="gotoPage(page + 1)"><span aria-hidden="true">»</span></a>
                <a v-else class="page-link disabled" aria-label="Next"><span aria-hidden="true">»</span></a>
            </li>
        </ul>
    </div>
</template>

<script>
import { ajax } from '@/lib/util'
import titleCard from '@/components/titleCard.vue'
export default {
    components: {
        titleCard,
    },
    name: 'forumList',
    data() {
        return {
            cardData: undefined,
            page: (this.$route.query.page == undefined) ? 1 : this.$route.query.page,
            pages: 0,
        }
    },
    watch: {
        $route(to, from) {
            this.page = (to.query.page == undefined) ? 1 : to.query.page;
            this.getList();
        }
    },
    methods: {
        gotoPage(page) {
            this.cardData = undefined;
            this.page = page;
            this.getList();
        },
        gotoForumAdd() {
            this.$router.push({ name: 'forumAdd' })
        },
        getList() {
            ajax.post('forum/list', { page: this.page },
                ((res) => {
                    this.cardData = res.data.data;
                    this.pages = res.data.pages;
                }),
                ((err) => {
                    console.error(err);
                }))
        }
    },
    created() {
        this.getList();
    },
}
</script>