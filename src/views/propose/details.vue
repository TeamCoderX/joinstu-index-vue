<template>
    <div v-if="cardData == undefined">
        <div class="spinner-border text-primary" style="height: 2em;margin-left:calc(50vw - 2em);" role="status"></div>
    </div>
    <div v-else>
        <div style="padding: 1em;" v-if="status.updating == false">
            <h3>{{ cardData.title }}</h3>
            <h6 style="color: var(--bs-gray-700);">作者：<span>{{ cardData.proposer }}</span></h6>
            <div class="text-end" style="border-width: 44px;">
                <div v-if="cardData.num < 50">
                    <span>已附議</span>
                    <span style="color: var(--bs-blue);font-size: 24px;">{{ cardData.num }}</span>
                    <span>(尚須</span>
                    <span style="color: var(--bs-blue);font-size: 24px;">{{ 50 - cardData.num }}</span>
                    <span>份)</span>
                </div>
                <div v-else>
                    <div>
                        <span>已附議</span>
                        <span style="color: var(--bs-blue);font-size: 24px;">{{ cardData.num }}</span>
                        <span>人</span>
                    </div>
                    <div>
                        <span style="color: var(--bs-blue);font-size: 24px;">已達到目標50份</span>
                    </div>
                </div>
                <div v-if="new Date().getDate() - new Date(cardData.date).getDate() <= 30">
                    <span style="color: var(--bs-blue);font-size: 24px;">附議已截止</span>
                </div>
                <div v-else>
                    <span>剩餘</span>
                    <span style="color: var(--bs-blue);font-size: 24px;">
                        {{ 30 - (new Date().getDate() - new Date(cardData.date).getDate()) }}</span>
                    <span>天</span>
                </div>
            </div>
            <div style="max-width: calc(100vw); word-break: break-all;">
                <h4>目的</h4>
                <span style="white-space: pre-wrap;">{{ cardData.purpose }}</span>
                <h4>簡介</h4>
                <span style="white-space: pre-wrap;">{{ cardData.details }}</span>
                <div class="text-center">
                    <button v-if="new Date().getDate() - new Date(cardData.date).getDate() <= 30"
                        class="btn btn-primary center" disabled>附議已截止</button>
                    <button v-else-if="isSupported == 'adm'" class="btn btn-secondary center" type="button"
                        disabled>管理員不可參與</button>
                    <button v-else-if="isSupported == undefined" class="btn btn-primary center" type="button" disabled>
                        <div class="spinner-border text-white" role="status"></div>
                    </button>
                    <div v-else>
                        <button v-if="isSupported == false" class="btn btn-primary center" type="button"
                            @click="support">我要附議</button>
                        <button v-else-if="isSupported == true" class="btn btn-secondary center" type="button"
                            disabled>已附議</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
        <commentSec urlPrefix="propose" />
</template>

<script>
import { ajax } from '@/lib/util'
import commentSec from '@/components/comments.vue'

export default {
    components: {
        commentSec,
    },
    name: 'proposeDetails',
    data() {
        return {
            cardData: undefined,
            isSupported: undefined,
            status: {
                updating: false,
            }
        }
    },
    methods: {
        support() {
            ajax.post(`propose/support/${this.$route.params.id}`, {},
                (res) => {
                    if (res.data.status == true) {
                        this.isSupported = true;
                        this.getDetails();
                    } else {
                        this.isSupported = true;
                    }
                },
                (err) => {
                    if (err.response.status == 403) {
                        this.emitter.emit('callLoginShow')
                    } else if (err.response.status == 401) {
                        alert('管理員不可參與！');
                    } else {
                        console.error(err)
                    }
                })
        },
        getDetails() {
            ajax.get(`propose/details/${this.$route.params.id}`, {},
                ((res) => {
                    if (res.data != null) {
                        let data = res.data
                        ajax.post(`data/getUser`, { id: data.proposer },
                            ((resUser) => {
                                data.proposer = resUser.data.name
                                this.cardData = data
                                this.$route.meta.title = data.title
                                document.title = this.$route.meta.title
                                this.status.updating = true;
                                this.status.updating = false;
                            }),
                            ((err) => {
                                console.error(err)
                            }))
                    } else {
                        this.$router.push({ name: 'Error404', params: { status: 404 } });
                    }
                }),
                ((err) => {
                    console.error(err)
                }))
        }
    },
    created() {
        this.getDetails()
        ajax.get(`propose/supportStatus/${this.$route.params.id}`, {},
            ((res) => {
                if (res.data.status == true) {
                    this.isSupported = true
                } else if (res.data.status == false) {
                    this.isSupported = false
                }
            }),
            ((err) => {
                if (err.response.status == 403) {
                    this.isSupported = false
                } else if (err.response.status == 401) {
                    this.isSupported = 'adm'
                } else {
                    console.error(err)
                }
            }))
    }
}
</script>