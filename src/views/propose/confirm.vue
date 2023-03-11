<template>
    <div class="container w-75">
        <div class="row">
            <div class="col">
                <img class="img-fluid" src="@/assets/images/src/propose_check.svg">
            </div>
        </div>
        <div class="row">
            <span
                style="font-size: 150%;margin-bottom: 1em;">發起議案能讓學生們彙集每個人的意見，<br>並讓議題透過大家的附議形成共識並讓校方看到哦，<br>歡迎學生們踴躍發起議案！</span>
        </div>

        <div class="row">
            <span class="w-75" 
                style="font-size: 150%;">發起議案之前請先查查是否已有類似的提案哦</span>
        </div>
        <button :onclick="redirectAdd" class="btn btn-primary d-block w-75 mb-3">發起議案</button>
    </div>
</template>

<script>
import { ajax } from '@/lib/util'
export default {
    name: 'proposeConfirm',
    methods: {
        redirectAdd() {
            ajax.post('accounts/status', {},
                () => {
                    this.$router.push({ name: 'proposeAdd' })
                },
                (err) => {
                    if (err.response.status == 403) {
                        this.emitter.emit('logoutStatus')
                        this.emitter.emit('callLoginShow')
                    } else {
                        console.error(err)
                    }
                })

        }
    },
    data() {
        return {
            cardData: {
                title: '',
            },
            isLogin: false,
        }
    }
}
</script>