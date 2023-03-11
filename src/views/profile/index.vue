<template>
    <div style="display: flex;margin: 5px;" v-if="status.updating == false">
        <div class="text-center border rounded-0 shadow-sm profile-box" style="width: 14em;height: 30em;background-color: #ffffff;margin-right: 5px;">
            <div v-if="profile != undefined && data.school != undefined && data.id != undefined">
                <div style="height: 50px;background: rgba(54,162,177,0);"></div>
                <div>
                    <i class="bi bi-person-circle" style="font-size: 3em;"></i>
                </div>
                <div style="height: 80px;">
                    <h3 style="margin-bottom: 0px;">{{ profile.name }}</h3>
                    <p style="font-size: 1em;margin-bottom: 16px;">{{ data.id }}</p>
                    <p style="font-size: 1em;">{{ data.school }}</p>
                </div>
                <div style="margin-top: 3em;">
                    <p>於<span>{{ new Date(profile.joindate).toLocaleDateString() }}</span>加入</p>
                    <p>附議了<span style="color: var(--bs-blue);font-size: 1.5em;">{{ profile.supportedProposes.length }}</span>次</p>
                    <p>發起了<span style="color: var(--bs-blue);font-size: 1.5em;">{{ profile.addedProposes.length }}</span>個提案</p>
                    <p>發了<span style="color: var(--bs-blue);font-size: 1.5em;">{{ profile.addedForums.length }}</span>篇文</p>
                </div>
            </div>
            <div v-else>
                <div class="spinner-border text-primary" style="height: 2em;margin-left:calc(50vw - 2em);" role="status"></div>
            </div>
        </div>
        <div style="padding: 5px;width: 100%;">
            <h2>動態</h2>
            <div style="margin-bottom: 1em;">
                <h3>最近附議</h3>
                <div v-if="recent.support.length == 0">
                    <div class="card" style="display: flex;margin: -4px;margin-bottom: 1em;">
                        <div class="card-body">
                            <h4 class="card-title">
                                無附議紀錄                            
                            </h4>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div v-for="card in recent.support" :key="card.url" class="card" style="display: flex;margin: -4px;margin-bottom: 1em;">
                        <router-link class="card-body" :to="{ name: 'proposeDetails', params: { id: card.url } }">
                            <h4 class="card-title">
                                <i class="bi bi-phone-landscape"></i>
                                附議：<span>{{ card.title }}</span>
                            </h4>
                        </router-link>
                    </div>
                    <!-- <a href="#">載入更多...</a> -->
                </div>
            </div>
            <div>
                <h3>最近發起議案</h3>
                <div v-if="recent.support.length == 0">
                    <div class="card" style="display: flex;margin: -4px;margin-bottom: 1em;">
                        <div class="card-body">
                            <h4 class="card-title">
                                無發起紀錄                            
                            </h4>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div v-for="card in recent.propose" :key="card.url" class="card" style="display: flex;margin-bottom: 1em;">
                        <router-link class="card-body" :to="{ name: 'proposeDetails', params: { id: card.url } }">
                            <h4 class="card-title">
                                <i class="bi bi-plus-square"></i>
                                提案：<span>{{ card.title }}</span>
                            </h4>
                        </router-link>
                    </div>
                    <!-- <a href="#">載入更多...</a> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ajax } from '@/lib/util'
export default {
    name: 'profileIndex',
    data() {
        return {
            recent:{
                support: [],
                propose:[],
            },
            profile: undefined,
            status:{
                access: undefined,
            },
            data:{
                id: undefined,
                school: undefined,
            }
        }
    },
    methods: {
        getProfile() {
            ajax.get('profile/index',{},
                (res) => {
                    this.profile = res.data;
                    this.getFirstTitles();
                    ajax.post('data/getSchool',{id: this.profile.school},
                        (res)=>{
                            this.data.school = res.data.name;
                            this.status.updating = true;
                            this.status.updating = false;
                        },
                        (err)=>{
                            console.log(err);
                        })
                },
                (err) => {
                    console.log(err);
                })
            ajax.post('accounts/status',{},
                (res) => {
                    if(res.data.isAdmin){
                        this.data.id = '管理員';
                        alert('管理員請至後臺!!');
                        window.location.href = '/'
                    }else{
                        this.data.id = '學生';
                    }
                    this.status.updating = true;
                    this.status.updating = false;
                },
                (err) => {
                    console.log(err);
                })
        },
        getFirstTitles() {
            if(this.profile.supportedProposes.length != 0){
                ajax.post('data/getTitle/propose',{id: this.profile.supportedProposes[0]},
                (res) => {
                    this.recent.support.push({title: res.data.title, url: this.profile.supportedProposes[0]});
                    this.status.updating = true;
                    this.status.updating = false;
                },
                (err) => {
                    console.log(err);
                })
            }
            if(this.profile.addedProposes.length != 0){
                ajax.post('data/getTitle/propose',{id: this.profile.addedProposes[0]},
                (res) => {
                    this.recent.propose.push({title: res.data.title, url: this.profile.supportedProposes[0]});
                    this.status.updating = true;
                    this.status.updating = false;
                },
                (err) => {
                    console.log(err);
                })
            }
        },
    },
    created() {
        ajax.post('accounts/status', {},
        (res) => {
            if(res.data.status == false){
                this.emitter.emit('preLoginWindow','profileIndex');
            }else{
                this.status.access = true;
                this.getProfile();
                this.status.updating = true;
                this.status.updating = false;
            }
        },
        (err) => {
            console.error(err)
        })
    },
    
}
</script>

<style>
.rounded-circle {
  /*position: absolute;*/
  margin-top: -30px;
  margin-left: auto;
  margin-right: auto;
  /*width: 50%;*/
}
</style>
