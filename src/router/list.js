export const main = [
    {
        "path": "/",
        "name": "redirectToPropose",
        "redirect": '/propose?page=1',
    },
    {
        "path": "/:pathMatch(.*)*",
        "name": "Error404",
        "meta": {
            "title": "錯誤",
        },
        "component": () => import('@/views/error.vue'),
    },
]
export const profile = [
    {
        "path": "/profile/:pathMatch(.*)*",
        "name": "profileError404",
        "meta": {
            "title": "錯誤",
        },
        "component": () => import('@/views/error.vue'),
    },
    {
        "path": "/profile/",
        "name": "profileIndex",
        "meta": {
            "title": "個人資料",
        },
        "component": () => import('@/views/profile/index.vue'),
    },
    {
        "path": "/profile/changePassword",
        "name": "profileChangePassword",
        "meta": {
            "title": "修改密碼",
        },
        "component": () => import('@/views/profile/changePassword.vue'),
    }
]
export const propose = [
    {
        "path": "/propose/:pathMatch(.*)*",
        "name": "proposeError404",
        "meta": {
            "title": "錯誤",
        },
        "component": () => import('@/views/error.vue'),
    },
    {
        "path": "/propose",
        "meta": {
            "title": "議案",
            "bg": "var(--bs-gray-200)"
        },
        "name": 'proposeList',
        "component": () => import('@/views/propose/list.vue')
    },
    {
        "path": "/propose/details/:id",
        "meta": {
            "title": "議案詳細內容",
        },
        "name": 'proposeDetails',
        "component": () => import('@/views/propose/details.vue')
    },
    {
        "path": "/propose/add",
        "meta": {
            "title": "新增議案",
        },
        "name": 'proposeAdd',
        "component": () => import('@/views/propose/add.vue')
    },
    {
        "path": "/propose/confirm",
        "meta": {
            "title": "議案新增確認",
        },
        "name": 'proposeAddConfirm',
        "component": () => import('@/views/propose/confirm.vue')
    },
]

export const forum = [
    {
        "path": "/forum/:pathMatch(.*)*",
        "name": "forumError404",
        "meta": {
            "title": "錯誤",
        },
        "component": () => import('@/views/error.vue'),
    },
    {
        "path": "/forum",
        "meta": {
            "title": "論壇",
            "bg": "var(--bs-gray-200)"
        },
        "name": 'forumList',
        "component": () => import('@/views/forum/list.vue')
    },
    {
        "path": "/forum/details/:id",
        "meta": {
            "title": "貼文",
        },
        "name": 'forumDetails',
        "component": () => import('@/views/forum/details.vue')
    },
    {
        "path": "/forum/add",
        "meta": {
            "title": "發文",
        },
        "name": 'forumAdd',
        "component": () => import('@/views/forum/add.vue')
    },
]