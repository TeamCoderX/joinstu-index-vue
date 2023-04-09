<template>
    <div>
        <div class="card mb-0">
            <div class="card-body p-sm-5">
                <h2 class="text-center mb-4">發起議案</h2>
                <form id="form_proposeAdd" action="">
                    <div class="mb-3">
                        <input class="form-control" type="text" id="inp_title" name="title" placeholder="標題" required
                            v-model="title">
                    </div>
                    <textarea class="form-control" id="inp_details" name="details" placeholder="簡介" required
                        v-model="details"></textarea>
                    <div class="mb-3"></div>
                    <div class="mb-3"><textarea class="form-control" id="inp_purpose" name="purpose" rows="6"
                            placeholder="目的" required v-model="purpose"></textarea></div>
                    <p>發起的議案需與您校內事務有關，並透過此平臺讓更多同學看見，促成進一步的討論與共識，並透過「附議」來讓校方更能聽到學生們的立場。<br><span
                            style="color: rgb(220, 53, 69);">警語：發起後將可以被所有本校的學生看到。請勿在議案中進行人身攻擊、散佈謠言或明暗示歧視、色情等令人感到不適之題材，也不可違反相關法律，違者下架議案，情節嚴重者以封鎖帳號處分。</span>
                    </p>
                    <div>
                        <div v-if="status.personAccess == true">
                            <button v-if="status.sendingFourmData == false" class="btn btn-primary d-block w-100"
                                type="button" @click="sendAddData()">發起議案</button>
                            <button v-else class="btn btn-secondary d-block w-100" type="button" disabled>發起議案</button>
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
    </div>
</template>

<script>
import { ajax } from '@/lib/util'
export default {
    name: 'proposeAdd',
    data() {
        return {
            status: {
                sendingFourmData: false,
                personAccess: undefined,
            },
            title: "",
            details: "",
            purpose: "",
        }
    },
    methods: {
        sendAddData() {
            this.sendAddData = true;
            ajax.post('propose/new', {
                title: this.title,
                details: this.details,
                purpose: this.purpose
            },
                ((res) => {
                    if (res.data.status == true) {
                        setTimeout(() => {
                            this.$router.push({ name: 'proposeList' });
                        }, 100)
                    } else {
                        if(res.data.reason == 'data-empty'){
                            alert('欄位不得空白')
                        }else{
                            console.error(res.data);
                        }
                    }
                }),
                ((err) => {
                    if (err.response.status == 403) {
                        this.emitter.emit('callLoginShow');
                    } else if (err.response.status == 401) {
                        alert('管理員不可參與！')
                    } else {
                        console.error(err);
                    }
                }))
            this.sendAddData = false;
        },
    },
    created() {
        ajax.post('accounts/status', {},
            (res) => {
                if (res.data.status == false) {
                    this.emitter.emit('preLoginWindow', 'proposeList');
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
        setInterval(() => {
            if (!this.sendAddData) {
                // console.log('a',this.sendAddData);
                // localStorage.setItem('joinstu_AddPropose_title', this.title);
                // localStorage.setItem('joinstu_AddPropose_details', this.details);
                // localStorage.setItem('joinstu_AddPropose_purpose', this.purpose);  
            }
        }, 1000)
    },
}
</script>