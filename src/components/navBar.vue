<template>
    <nav class="navbar navbar-dark navbar-expand-md bg-dark py-0"
        style="box-shadow: 0px 3px 5px 0px;margin-bottom: 5px;background: linear-gradient(black, white 250%);">
        <div class="container-fluid">
            <router-link class="navbar-brand d-flex align-items-center text-left" :to="{ name: 'proposeList', query: { page: 1 } }">
                <img src="@/assets/images/logo/white.svg" style="height: 3em;">
            </router-link>
            <button data-bs-toggle="collapse" class="navbar-toggler" data-bs-target="#navcol-1">
                <span class="visually-hidden">Toggle navigation</span><span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse obodyverflow" id="navcol-1">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'proposeAddConfirm' }"
                            style="color: var(--bs-white);">發起議案</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'forumList', query: { page: 1 } }"
                            style="color: var(--bs-white);">論壇</router-link>
                    </li>
                    <li v-if="isLogin == true" class="nav-item d-md-flex align-items-md-center">
                        <div class="nav-item dropdown d-xl-flex align-items-center">
                            <a class="dropdown-toggle active text-center d-md-flex align-items-md-center"
                                id="dropdownMenuButton" aria-expanded="false" data-bs-toggle="dropdown" href="#"
                                style="text-align: center;color: var(--bs-gray-400);">
                                <i class="bi bi-person-circle" style="font-size: 2em;"></i>
                            </a>
                            <div class="dropdown-menu text-start"
                                style="transform: translate(0px) translateX(-109px) translateY(14px) scale(1);">
                                <span class="px-3 py-3"><strong v-if="status.usernameUpdate == false">{{ username
                                }}</strong></span>
                                <div class="dropdown-divider"></div>
                                <router-link class="dropdown-item" :to="{ name: 'profileIndex' }">個人資料</router-link>
                                <router-link class="dropdown-item"
                                    :to="{ name: 'profileChangePassword' }">修改密碼</router-link>
                                <a class="dropdown-item" @click="logout">
                                    <span><i class="fas fa-sign-out-alt"></i>登出</span>
                                </a>
                            </div>
                        </div>
                    </li>
                    
                    <li v-else-if="isLogin == undefined" class="nav-item d-md-flex align-items-md-center text-secondary">
                        <button class="btn btn-primary" disabled type="button" style="background: var(--bs-blue );">
                            <div class="spinner-grow" role="status"></div>
                        </button>
                    </li>
                    <li v-else-if="isLogin == false" class="nav-item d-md-flex align-items-md-center text-secondary">
                        <button class="btn btn-primary" type="button" style="background: var(--bs-blue );"
                            @click="status.showLoginModal = true">登入</button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <div v-if="status.showLoginModal" id="modal-1" class="modal show" role="dialog" tabindex="-1" style="display: block;">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">登入</h4>
                    <button type="button" @click="closeLogin" class="btn-close"></button>
                </div>
                <div class="modal-body">
                    <form id="form_login">
                        <div v-if="alert != ''" class="alert alert-danger" role="alert">
                            <i class="bi bi-exclamation-triangle" style="margin-right: 1em;"></i>
                            <strong>{{ alert }}</strong>
                        </div>
                        <a href="/api/auth/google/login" class="btn btn-secondary" style="width: 100%;margin-bottom: 5px;">
                            <i class="bi bi-google" style="margin-right: 1em;"></i>
                            <strong>Google 登入</strong>
                        </a>
                        <div style="margin-bottom: 5px;">
                            <p>帳號</p>
                            <input v-if="status.loginSending" class="form-control" type="text" style="width: 100%;"
                                name="name" id="name" v-model="login_name" required disabled>
                            <input v-else class="form-control" type="text" style="width: 100%;" name="name" id="name"
                                v-model="login_name" required>
                        </div>
                        <div style="margin-top: 5px;">
                            <p>密碼</p>
                            <input v-if="status.loginSending" class="form-control" type="password" style="width: 100%;"
                                name="password" id="password" v-model="login_password" required disabled>
                            <input v-else class="form-control" type="password" style="width: 100%;" name="password"
                                id="password" v-model="login_password" required>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-light" type="button" @click="closeLogin">關閉</button>
                    <div v-if="status.loginSending == true" type="button" id="btn_login" disabled>
                        <div class="spinner-border" role="status"></div>
                    </div>
                    <button v-else class="btn btn-primary" type="button" id="btn_login" @:click="login()">
                        登入
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div v-if="status.showLoginModal" class="modal-backdrop show"></div>
</template>

<script>
import { ajax } from '@/lib/util'
import { parse } from 'cookie'
<<<<<<< HEAD

=======
>>>>>>> 81b59802d59b70e7b11a6ba631a6ada02ce011e9
export default {
    name: 'navBar',
    data() {
        return {
            alert: '',
            isLogin: undefined,
            username: (parse(document.cookie).joinstu_username == undefined) ? '' : parse(document.cookie).joinstu_username,
            login_name: '',
            login_password: '',
            status: {
                loginSending: false,
                showLoginModal: false,
                usernameUpdate: false
            }
        }
    },
    methods: {
        logout() {
            ajax.get('accounts/logout', {},
<<<<<<< HEAD
                (res) => {
=======
                () => {
>>>>>>> 81b59802d59b70e7b11a6ba631a6ada02ce011e9
                    this.isLogin = false
                    this.$router.push('/')
                    this.$forceUpdate()
                },
<<<<<<< HEAD
                (err) => {
                    alert('發生錯誤！')
                })
        },
        onGSignin(){
            googleTokenLogin({
                clientId: `963371699123-9es2ofihc2lod0lhnim7sno4efsnipmq.apps.googleusercontent.com`
            }).then((response) => {
                console.log(response);
            })
        },
=======
                () => {
                    alert('發生錯誤！')
                })
        },
>>>>>>> 81b59802d59b70e7b11a6ba631a6ada02ce011e9
        closeLogin() {
            this.status.showLoginModal = false;
            this.$router.push({ name: 'proposeList' })
        },
        login() {
            this.status.loginSending = true
            if (this.login_name == '' || this.login_password == '') {
                this.alert = '請輸入帳號密碼'
            } else {
                ajax.post('accounts/login', {
                    account: this.login_name,
                    password: this.login_password,
                },
                    (res) => {
                        if (res.data.status == false) {
                            this.isLogin = false
                            switch (res.data.reason) {
                                case 'data-incorrect':
                                    this.alert = '帳號或密碼錯誤';
                                    break;
                                case 'banned':
                                    this.alert = '您的帳號已被停權';
                                    break;
                                default:
                                    this.alert = '您的帳號發生登入錯誤，請聯絡管理員';
                                    break;
                            }
                        } else {
                            this.alert = '';
                            this.status.showLoginModal = false;
                            this.isLogin = true;
                            window.location.reload();
                        }
                    },
                    (err) => {
                        console.error(err);
                        alert('發生錯誤！');
                    }
                )
            }
            this.status.loginSending = false
        }
    },
    created() {
        ajax.post('accounts/status', {},
            (res) => {
                if (res.data.status == true) {
                    if (parse(document.cookie).joinstu_username == undefined) {
                        this.status.usernameUpdate = true;
                        ajax.get('profile/re-idcookie', {},
                            (res) => {
                                this.username = res.data.name;
                                this.status.usernameUpdate == false;
                            },
                            (err) => {
                                console.error(err);
                            }
                        )
                    }
                    this.isLogin = true
                } else {
                    this.isLogin = false
                }
            },
            (err) => {
                console.error(err)
            })
        this.emitter.on('logoutStatus', () => {
            this.isLogin = false
        })
        this.emitter.on('callLoginShow', () => {
            this.status.showLoginModal = true
        })
        this.emitter.on('preLoginWindow', (url) => {
            console.log(url)
            this.$router.push({ name: url })
            this.status.showLoginModal = true
        })
        this.emitter.on('login_alert', (alert_text) => {
            this.alert = alert_text;
            this.emitter.emit('callLoginShow');
        })
        document.addEventListener('keypress', (e) => {
            if (e.keyCode == 13) {
                this.login();
            }
        })
    }
}
</script>

<style>
.bs-icon {
    --bs-icon-size: .75rem;
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    font-size: var(--bs-icon-size);
    width: calc(var(--bs-icon-size) * 2);
    height: calc(var(--bs-icon-size) * 2);
    color: var(--bs-primary);
}

.bs-icon-xs {
    --bs-icon-size: 1rem;
    width: calc(var(--bs-icon-size) * 1.5);
    height: calc(var(--bs-icon-size) * 1.5);
}

.bs-icon-sm {
    --bs-icon-size: 1rem;
}

.bs-icon-md {
    --bs-icon-size: 1.5rem;
}

.bs-icon-lg {
    --bs-icon-size: 2rem;
}

.bs-icon-xl {
    --bs-icon-size: 2.5rem;
}

.bs-icon.bs-icon-primary {
    color: var(--bs-white);
    background: var(--bs-primary);
}

.bs-icon.bs-icon-primary-light {
    color: var(--bs-primary);
    background: rgba(var(--bs-primary-rgb), .2);
}

.bs-icon.bs-icon-semi-white {
    color: var(--bs-primary);
    background: rgba(255, 255, 255, .5);
}

.bs-icon.bs-icon-rounded {
    border-radius: .5rem;
}

.bs-icon.bs-icon-circle {
    border-radius: 50%;
}</style>