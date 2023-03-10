
<template>
  <div>
    <navBar/>
    <div id="mainContainer">
      <router-view></router-view>
    </div>
    <footerBar/>
  </div>
</template>

<script>
import navBar from '@/components/navBar.vue'
import footerBar from '@/components/footerBar.vue'
export default {
  name: 'App',
  components: {
    navBar,
    footerBar,
  },
  watch: {
    $route (to) {
      document.body.style.backgroundColor = (to.meta.bg == undefined) ? 'var(--bs-body-bg)' : to.meta.bg;
      if(to.query.login_alert != undefined){
        let alert_text = '';
        switch (to.query.login_alert){
          case 'banned':
            alert_text = '您的帳號已被停權'
            break;
          case 'notfound':
            alert_text = '您的帳號發生登入錯誤，請聯絡管理員'
            break;
          case 'domain-wrong':
            alert_text = '請使用學校信箱登入'
            break;
          default:
            alert_text = '您的帳號發生登入錯誤，請聯絡管理員'
            break;
        }
        this.emitter.emit('login_alert', alert_text);
      }
    }
  },
}
</script>

<style>
@import '@/lib/bootstrapIcons/bootstrap-icons.css';
@import '@/lib/bootstrap/css/bootstrap.min.css';
:root {
    --navHeight: 3.4em;
    --footerHeight: 8em;
    --appHeight: calc(100vh - var(--footerHeight));
}
#mainContainer {
    z-index: 2;
    min-height: var(--appHeight);
    padding-top: calc(var(--navHeight));
    padding-bottom: 2em;
}

nav {
    position: fixed !important;
    z-index: 1;
    height: var(--navHeight);
    width: 100%;
}

footer {
    z-index: 1;
    position: relative !important;
    height: var(--footerHeight);
    top: calc(100vh - var(--footerHeight) - var(--appHeight));
    width: 100%;
}

.card-hover:hover {
    background-color: var(--bs-gray-100) !important;
    border-top-width: 0px;
    border-top-color: var(--bs-dark);
}
</style>