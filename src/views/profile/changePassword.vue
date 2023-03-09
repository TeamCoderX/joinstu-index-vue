<template>
    <div>
        <div class="card mb-0">
            <div class="card-body p-sm-5">
                <h2 class="text-center mb-4">修改密碼</h2>
                <form id="form_proposeAdd" action="">
                    <div class="mb-3">
                        <input class="form-control" type="password" placeholder="原始密碼" required v-model="originPassword">
                    </div>
                    <div class="mb-3">
                        <input class="form-control" type="password" placeholder="新密碼" required v-model="newPassword">
                    </div>
                    <div class="mb-3">
                        <input class="form-control" type="password" placeholder="確認新密碼" required v-model="confirmPassword">
                    </div>
                    <div>
                        <div v-if="status.access==true">
                            <button v-if="status.sendingData == false" class="btn btn-primary d-block w-100" type="button" @click="sendData()">送出修改</button>  
                            <button v-else class="btn btn-secondary d-block w-100" type="button" disabled>送出修改</button>
                        </div>
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
    name:'proposeAdd',
    data(){
        return {
            status:{
                sendingData:false,
                access: undefined,
            },
            originPassword:"",
            newPassword:"",
            confirmPassword:"",
        }
    },
    methods:{
        sendData(){
            if(this.newPassword != this.confirmPassword){
                alert('新密碼與確認新密碼不相符');
            }else{
                this.sendingata = true;
                ajax.post('profile/changepassword',{
                    originPassword: this.originPassword,
                    newPassword:this.newPassword,
                },
                ((res)=>{
                    if(res.data.status==true){
                        alert('密碼已更改，請重新登入');
                        window.location.href = '/api/accounts/logout';
                    }else{
                        alert('密碼更改失敗');
                    }
                }),
                ((err)=>{
                    if (err.response.status == 403) {
                        this.emitter.emit('callLoginShow');
                    }else {
                        console.error(err);
                    }
                }))
                this.sendingData = false;
            }
        },
    },
    created(){
        ajax.post('accounts/status', {},
        (res) => {
            if(res.data.status == false){
                this.emitter.emit('preLoginWindow','profileChangePassword');
            }else{
                this.status.access = true;
            }
        },
        (err) => {
            console.error(err)
        })
    },
}
</script>