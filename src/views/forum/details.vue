<template>
    <div v-if="cardData == undefined">
        <div class="spinner-border text-primary" style="height: 2em;margin-left:calc(50vw - 2em);" role="status"></div>
    </div>
    <div v-else>
        <div style="padding: 1em;">
            <h3>{{ cardData.title }}</h3>
            <h6 style="color: var(--bs-gray-700);">作者：<span>{{ cardData.author }}</span></h6>
            <h6 style="color: var(--bs-gray-700);"><span>{{ new Date(cardData.date).toLocaleString()}}</span></h6>
            <span>{{ cardData.contents }}</span>
        </div>
    </div>
    <commentSec urlPrefix="forum" />
</template>

<script>
import { ajax } from '@/lib/util'
import titleCard from '@/components/titleCard.vue'
import commentSec from '@/components/comments.vue'

export default {
    components: {
        titleCard,
        commentSec
    },
    name: 'proposeDetails',
    data() {
        return {
            cardData: undefined,
            status:{
                updating: false,
            }
        }
    },
    methods: {
        getDetails() {
            ajax.get(`forum/details/${this.$route.params.id}`, {},
                ((res) => {
                    if (res.data != null) {
                        let data = res.data
                        ajax.post(`data/getUser`, { id: data.author },
                            ((resUser) => {
                                data.author = resUser.data.name
                                this.cardData = data
                                this.$route.meta.title = data.title
                                document.title = this.$route.meta.title
                            }),
                            ((err) => {
                                console.error(err);
                            }))
                    } else {
                        this.$router.push({ name: 'Error404' })
                    }
                }),
                ((err) => {
                    console.error(err)
                }))
        },
    },
    created() {
        this.getDetails();
    }
}
</script>