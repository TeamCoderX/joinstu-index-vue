<template>
    <div style="margin: 5px;">
        <titleCard title="議案" icon="bi-phone-landscape" :buttonContents="false"></titleCard>
        <div v-if="cardData == undefined">
            <div class="spinner-border text-primary" style="height: 2em;margin-left:calc(50vw - 2em);" role="status"></div>
        </div>
        <div v-else>
            <router-link v-for="cData in cardData" :key="cData.id" :to="{ name: 'proposeDetails', params: { id: cData.id } }"
                style="text-decoration: none; color: black;">
                <div class="card-hover card card-item"
                    style="border-radius: 10px;border-width: 0px;border-color: rgb(0,0,0);margin-bottom: 5px;box-shadow: 0px 0px 1px 0px;">
                    <div class="card-body" style="border-top-width: 2px;border-top-color: var(--bs-gray);">
                        <h4 class="card-title"><span v-text="cData.title"></span></h4>
                        <h6 class="text-muted card-subtitle mb-2">附議數:<span v-text="cData.num"></span></h6>
                        <p class="card-text"><span v-text="cData.details"></span></p>
                        <p style="text-align: right;font-family: ABeeZee, sans-serif;"><span
                                v-text="new Date(cData.date).toLocaleDateString('zh-tw')"></span></p>
                    </div>
                </div>
            </router-link>
        </div>
        <div>
            <ul class="pagination">
                <li class="page-item">
                    <a v-if="page != 1" class="page-link" aria-label="Previous" @click="gotoPage(page - 1)"><span
                            aria-hidden="true">«</span></a>
                    <a v-else class="page-link disabled" aria-label="Previous"><span aria-hidden="true">«</span></a>
                </li>
                <div v-for="index in pages" :key="index">
                    <li class="page-item">
                        <a v-if="index == page" class="page-link active">{{ index }}</a>
                        <a v-else class="page-link" @click="gotoPage(index)">{{ index }}</a>
                    </li>
                </div>
                <li class="page-item">
                    <a v-if="page != pages" class="page-link" aria-label="Next" @click="gotoPage(page + 1)"><span
                            aria-hidden="true">»</span></a>
                    <a v-else class="page-link disabled" aria-label="Next"><span aria-hidden="true">»</span></a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { ajax } from '@/lib/util'
import titleCard from '@/components/titleCard.vue'
export default {
    components: {
        titleCard,
    },
    name: 'proposeList',
    data() {
        return {
            cardData: undefined,
            page: (this.$route.query.page == undefined) ? 1 : this.$route.query.page,
            pages: 0,
        }
    },
    watch: {
        $route(to) {
            this.page = (to.query.page == undefined) ? 1 : to.query.page;
            this.getList();
        }
    },
    methods: {
        gotoPage(page) {
            this.cardData = undefined;
            this.page = page;
            this.$router.push({ name: 'proposeList', query: { page: page } })
            this.getList();
        },
        gotoConfirmPropose() {
            this.$router.push({ name: 'proposeAddConfirm' })
        },
        getList() {
            ajax.post('propose/list', { page: this.page },
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
        if (this.$route.query.page == undefined) {
            this.$router.push({ name: 'proposeList', query: { page: 1 } })
        }
        this.getList();
    },
}
</script>
