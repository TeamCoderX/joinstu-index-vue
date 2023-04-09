<template>
    <div class="card mb-0">
        <div class="card-body p-sm-5">
            <h2 class="text-center mb-4">建立討論</h2>
            <form id="form_forumAdd" action="">
                <div class="mb-3">
                    <input class="form-control" type="text" id="inp_title" name="title" placeholder="標題" required
                        v-model="title">
                </div>
                <textarea class="form-control" id="inp_details" name="contents" placeholder="內容" required
                    v-model="contents"></textarea>
                <br>
                <div>
                    <div v-if="status.personAccess == true">
                        <button v-if="status.sendAddData == false" class="btn btn-primary d-block w-100" type="button"
                            @click="sendAddData()">建立討論</button>
                        <button v-else class="btn btn-primary d-block w-100" type="button" disabled>建立討論</button>
                    </div>
                    <button v-else-if="status.personAccess == false" class="btn btn-secondary d-block w-100" type="button"
                        disabled>管理員不可參與</button>
                    <button v-else class="btn btn-secondary d-block w-100" type="button" disabled>
                        <div class="spinner-grow" role="status"></div>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { ajax } from '@/lib/util'
export default {
    name: 'forumAdd',
    data() {
        return {
            status: {
                sendAddData: false,
                personAccess: undefined,
            },
            title: "",
            contents: "",
        }
    },
    methods: {
        sendAddData() {
            this.status.sendAddData = true;
            ajax.post('forum/new', {
                title: this.title,
                contents: this.contents,
            },
                ((res) => {
                    if (res.data.status == true) {
                        setTimeout(() => {
                            this.$router.push({ name: 'forumList' });
                        }, 100);
                    } else {
                        if (res.data.reason == 'data-empty') {
                            alert('欄位不得空白')
                        } else {
                            console.error(res.data);
                        }
                    }
                }),
                ((err) => {
                    if (err.response.status == 403) {
                        this.emitter.emit('callLoginShow')
                    } else if (err.response.status == 401) {
                        alert('管理員不可參與！')
                    } else {
                        console.error(err)
                    }
                }))
            this.status.sendAddData = false;
        }
    },
    created() {
        ajax.post('accounts/status', {},
            (res) => {
                if (res.data.status == false) {
                    this.emitter.emit('preLoginWindow', 'forumList');
                } else {
                    if (res.data.isAdmin == true) {
                        this.status.personAccess = false;
                    } else {
                        this.status.personAccess = true;
                    }
                }
            },
            (err) => {
                console.error(err)
            })
        // setInterval(()=>{
        //     if(this.status.sendAddData == false) {
        //         console.log(1)
        //         localStorage.setItem('joinstu_AddForum_title', this.title)
        //         localStorage.setItem('joinstu_AddForum_contents', this.contents)
        //     }
        // },1000)
    },
}
</script>