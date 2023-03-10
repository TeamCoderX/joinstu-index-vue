<template>
    <div class="card" style="border-radius: 0px; border-width: 0px;border-top-width: 2px;">
        <div class="card-body" style="min-height: 30vh; max-height: 55vh">
            <div v-if="isLogin == undefined">
                <div class="spinner-border text-primary" style="height: 2em;margin-left:calc(50vw - 2em);" role="status"></div>
            </div>
            <div v-else-if="isLogin == true">
                <div style="margin-top: 1em;margin-bottom: 1em;">
                    <i class="bi bi-chat-left" style="margin-right: 0.5em;"></i>
                    <input type="text" placeholder="留言..." style="height: 2em;width: 25em;" required v-model="comment">
                    <div v-if="status.sendingComment == false" class="btn-group" role="group" style="height: 2em;">
                        <button @click="supportComment" class="btn btn-primary" type="button"
                            style="margin-right: 1em;margin-bottom: 0px;margin-left: 1em;padding-top: 3px;padding-bottom: 3px;border-radius: 6px;">留言支持意見</button>
                        <button @click="elseComment" class="btn btn-primary" type="button"
                            style="margin-top: 0px;margin-right: 0px;margin-bottom: 0px;margin-left: 0px;padding-top: 3px;padding-bottom: 3px;border-radius: 6px;">留言其他意見</button>
                    </div>
                    <div v-else class="btn-group" role="group" style="height: 2em;">
                        <button class="btn btn-secondary" type="button" disabled
                            style="margin-right: 1em;margin-bottom: 0px;margin-left: 1em;padding-top: 3px;padding-bottom: 3px;border-radius: 6px;">留言支持意見</button>
                        <button class="btn btn-secondary" type="button" disabled
                            style="margin-top: 0px;margin-right: 0px;margin-bottom: 0px;margin-left: 0px;padding-top: 3px;padding-bottom: 3px;border-radius: 6px;">留言其他意見</button>
                    </div>
                </div>
            </div>
            <div v-else-if="isLogin == false">
                <div class="alert alert-primary" role="alert">
                    <i class="bi bi-exclamation-triangle" style="margin-right: 1em;"></i>
                    <strong>請先登入再留言</strong>
                </div>
            </div>
            <div v-if="commentData == undefined">
                <div class="spinner-border text-white" role="status"></div>
            </div>
            <div class="container pb-2" v-else>
                <div class="row">
                    <div class="col-md-6">
                        <h4>支持意見</h4>
                        <ul class="list-group overflow-auto" style="max-height: 40vh">
<<<<<<< HEAD
                            <li class="list-group-item" style="margin-bottom:6px;" v-if="status.updating == false" v-for="comment of commentData.support" :key="comment.contents">
=======
                            <li class="list-group-item" style="margin-bottom:6px;" v-for="comment of commentData.support" :key="comment.author">
>>>>>>> 81b59802d59b70e7b11a6ba631a6ada02ce011e9
                                <div class="d-flex media">
                                    <div class="media-body">
                                        <div class="d-flex media" style="overflow:visible;">
                                            <div style="overflow:visible;" class="media-body">
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <p>
                                                            <strong>{{ comment.author }}</strong> 
                                                            {{ comment.contents }}
                                                            <br>
                                                            <small class="text-muted">{{ new Date(comment.date).toLocaleString() }}</small>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="col-md-6">
                        <h4>其他意見</h4>
                        <ul class="list-group overflow-auto" style="max-height:40vh">
<<<<<<< HEAD
                            <li class="list-group-item" style="margin-bottom:6px;" v-if="status.updating == false" v-for="comment of commentData.else" :key="comment.contents">
=======
                            <li class="list-group-item" style="margin-bottom:6px;" v-for="comment of commentData.else" :key="comment.author">
>>>>>>> 81b59802d59b70e7b11a6ba631a6ada02ce011e9
                                <div class="d-flex media">
                                    <div class="media-body">
                                        <div class="d-flex media" style="overflow:visible;">
                                            <div style="overflow:visible;" class="media-body">
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <p>
                                                            <strong>{{ comment.author }}</strong> 
                                                            {{ comment.contents }}
                                                            <br>
                                                            <small class="text-muted">{{ new Date(comment.date).toLocaleString() }}</small>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ajax } from '@/lib/util'
export default {
<<<<<<< HEAD
    name: 'comments',
=======
    name: 'commentsSec',
>>>>>>> 81b59802d59b70e7b11a6ba631a6ada02ce011e9
    props: ['urlPrefix'],
    data() {
        return{
            commentData: undefined,
            comment: '',
            isLogin: undefined,
            status:{
                commentUpdate: false,
                sendingComment: false,
            }
        }
    },
    methods:{
        getComments() {
            let originalData = null;
            ajax.get(`${this.urlPrefix}/comments/${this.$route.params.id}`, {},
                (res) => {
                    originalData = res.data;
                    for(let i in originalData.support){
                        ajax.post(`data/getUser`, { id: originalData.support[i].author },
                            ((resUser) => {
                                originalData.support[i].author = resUser.data.name;
                                this.commentData = originalData;
                                this.status.updating = true;
                                this.status.updating = false;
                            }),
                            ((err) => {
                                console.error(err);
                            }))
                    }
                    for(let i in originalData.else){
                        ajax.post(`data/getUser`, { id: originalData.else[i].author },
                            ((resUser) => {
                                originalData.else[i].author = resUser.data.name;
                                this.commentData = originalData;
                                this.status.updating = true;
                                this.status.updating = false;
                            }),
                            ((err) => {
                                console.error(err);
                            }))
                    }
                    this.status.commentUpdate = true;
                    this.status.commentUpdate = false;
                },
                (err) => {
                    console.error(err);
                })
        },
        supportComment() {
            this.status.sendingComment = true;
            ajax.post(`${this.urlPrefix}/commentSupport/${this.$route.params.id}`, {contents: this.comment},
                () => {
                    this.getComments();
                },
                (err) => {
                    if (err.response.status == 403) {
                        this.emitter.emit('callLoginShow');
                    } else if(err.response.status == 401) {
                        alert('管理員不可參與！')
                    } else {
                        console.error(err)
                    }
                })
            this.comment = '';
            this.status.sendingComment = false;
        },
        elseComment() {
            this.status.sendingComment = true;
            ajax.post(`${this.urlPrefix}/commentElse/${this.$route.params.id}`, {contents: this.comment},
                () => {
                    this.getComments();
                },
                (err) => {
                    if(err.response.status == 401) {
                        alert('管理員不可參與！')
                    } else {
                        console.error(err)
                    }
                })
            this.comment = '';
            this.status.sendingComment = false;
        },
    },
    created() {
        this.getComments();
        ajax.post('accounts/status', {},
        (res) => {
            if(res.data.status == false){
                this.isLogin = false;
            }else{
                this.isLogin = true;
            }
        },
        (err) => {
            console.error(err)
        })
    }
}
</script>