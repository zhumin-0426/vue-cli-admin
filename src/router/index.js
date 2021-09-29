import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

const router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    // 登入
    {
      path: "/login",
      component: () => import(/* webpackChunkName: "login" */ '../views/login.vue'),
      meta: { title: '用户登入' }
    },
    // 系统首页
    {
      path: "/index",
      component: () => import("../views/index.vue"),
      meta: { title: '系统首页', isValide: true }
    },
    // 活动管理
    {
      path: "/activity/:manage",
      redirect: "/activity/manage/list",
      component: () => import("../views/activity/index.vue"),
      meta: { title: '活动管理', isValide: true },
      children: [
        {
          path: "list",
          component: () => import("../views/activity/list.vue"),
          meta: { title: '活动列表', isValide: true },
        },
        {
          path: "comment/:manage",
          component: () => import("../views/activity/comment.vue"),
          meta: { title: '评论管理', isValide: true },
        },
        {
          path: "appoint",
          component: () => import("../views/activity/appoint.vue"),
          meta: { title: '评论管理', isValide: true }
        },
        {
          path: "card",
          component: () => import("../views/activity/card.vue"),
          meta: { title: '卡劵列表', isValide: true }
        },
        {
          path: "handle-*",
          // TODO 跳转到404 
          component: () => import("../views/activity/handle/index.vue"),
          meta: { title: '活动处理', isValide: true },
          children: [
            {
              path: "changeComment",
              component: () => import("../views/activity/comment/change.vue"),
              meta: { title: '修改评论', isValide: true },
            },
            {
              path: "addCard",
              component: () => import("../views/activity/card/add.vue"),
              meta: { title: '添加卡劵', isValide: true }
            },
            {
              path: "editorCard",
              component: () => import("../views/activity/card/editor.vue"),
              meta: { title: '编辑卡劵', isValide: true }
            },
            {
              path: "createActivity",
              component: () => import("../views/activity/activitySubPage/create.vue"),
              meta: { title: '创建活动', isValide: true }
            },
            {
              path: "editorActivity",
              component: () => import("../views/activity/activitySubPage/editor.vue"),
              meta: { title: '编辑活动', isValide: true }
            }
          ]
        },
      ]
    },
    // 文件管理
    {
      path: "/file/:manage",
      redirect: "/file/manage/list",
      component: () => import("../views/file/index.vue"),
      meta: { title: "文件管理", isValide: true },
      children: [
        {
          path: "list",
          component: () => import("../views/file/list.vue"),
          meta: { title: "上传文件列表", isValide: true }
        }
      ]
    },
    // 系统管理
    {
      path:"/system/:manage",
      component:() => import("../views/system/index.vue"),
      meta: { title: "系统管理", isValide: true },
      children:[
        {
          path:"notice/:sub",
          redirect:"notice/sub/list",
          component:() => import("../views/system/notice.vue"),
          meta: { title: "系统公告", isValide: true },
          children:[
            {
              path:"list",
              component:() => import("../views/system/notice/list.vue"),
              meta:{ title: "公告列表", isValide: true }
            }
          ]
        },
        {
          path:"detailNotice",
          // TODO 跳转到404
          component:() => import("../views/system/notice/detail.vue"),
          meta: { title: "公告详情", isValide: true },
        },
        {
          path:"handle-*",
          component:() => import("../views/system/handle/index.vue"),
          meta: { title: "系统处理", isValide: true },
          children:[
            {
              path:"addNotice",
              component:() => import("../views/system/notice/add.vue"),
              meta: { title: "添加公告", isValide: true },
            }
          ]
        }
      ]
    },
    // 资金管理
    {
      path:"/money/:manage",
      component:() => import("../views/money/index.vue"),
      meta: { title: "资金管理", isValide: true },
      children:[
        {
          path:"top-up/:sub",
          redirect:"top-up/sub/history",
          component:() => import("../views/money/top-up.vue"),
          meta: { title: "充值管理", isValide: true },
          children:[
            {
              path:"history",
              component:() => import("../views/money/top-up/history.vue"),
              meta: {title:"充值记录", isValide: true}
            },
            {
              path:"detail",
              component:() => import("../views/money/top-up/detail.vue"),
              meta: {title:"充值详情", isValide: true}
            }
          ]
        },
        {
          path:"cash-out/:sub",
          component:() => import("../views/money/cash-out.vue"),
          meta: { title: "提现管理", isValide: true },
          children:[
            {
              path:"history",
              component:() => import("../views/money/cash-out/history.vue"),
              meta: { title: "提现记录", isValide: true },
            },
            {
              path:"note",
              component:() => import("../views/money/cash-out/note.vue"),
              meta: { title: "提现日志", isValide: true },
            }
          ]
        },
        {
          path:"handle-*",
          // TODO 跳转到404
          component:() => import("../views/money/handle/index.vue"),
          meta: {title:"资金处理", isValide: true},
          children:[
            {
              path:"up",
              component:() => import("../views/money/top-up/up.vue"),
              meta: {title:"充值", isValide: true}
            },
            {
              path:"apply",
              component:() => import("../views/money/cash-out/apply.vue"),
              meta: {title:"提现申请", isValide: true}
            }
          ]
        }
      ]
    },
    // 获客大师
    {
      path:"/teacher/:manage",
      redirect:"/teacher/manage/list",
      component:() => import("../views/teacher/index.vue"),
      meta: {title:"获客大师", isValide: true},
      children:[
        {
          path:"list",
          component:() => import("../views/teacher/list.vue"),
          meta: {title:"列表", isValide: true},
        }
      ]
    },
    // 用户管理
    {
      path:"/user/:manage",
      component:() => import("../views/user/index.vue"),
      meta: {title:"用户管理", isValide: true},
      children:[
        {
          path:"list",
          component:() => import("../views/user/list.vue"),
          meta: {title:"列表", isValide: true},
        },
        {
          path:"application/:sub",
          component:() => import("../views/user/application.vue"),
          meta: {title:"应用信息", isValide: true},
          children:[
            {
              path:"list",
              component:() => import("../views/user/application/list.vue"),
              meta: {title:"应用列表", isValide: true},
            }
          ]
        },
        {
          path:"handle-*",
          component:() => import("../views/user/handle/index.vue"),
          meta: {title:"用户管理", isValide: true},
          children:[
            {
              path:"add",
              component:() => import("../views/user/list/add.vue"),
              meta: {title:"添加用户", isValide: true},
            },
            {
              path:"update",
              component:() => import("../views/user/list/update.vue"),
              meta: {title:"添加用户", isValide: true},
            },
            {
              path:"add",
              component:() => import("../views/user/application/add.vue"),
              meta: {title:"添加应用", isValide: true},
            },
            {
              path:"change",
              component:() => import("../views/user/application/change.vue"),
              meta: {title:"修改应用", isValide: true},
            }
          ]
        }
      ]
    },
    // 权限管理
    {
      path:"/power/:manage",
      component:() => import("../views/power/index.vue"),
      meta: {title:"权限管理", isValide: true},
      children:[
        {
          path:"list",
          component:() => import("../views/power/list.vue"),
          meta: {title:"列表", isValide: true},
        },
        {
          // TODO 子页面设计
          path:"list/:sub",
          component:() => import("../views/power/sub.vue"),
          meta: {title:"详情管理", isValide: true},
          children:[
            {
              path:"detail",
              component:() => import("../views/power/list/detail.vue")
            }
          ]
        }
      ]
    },
    // 个人中心
    {
      path:"/person/:manage",
      component:() => import("../views/person/index.vue"),
      meta: {title:"个人中心", isValide: true},
      children:[
        {
          path:"information",
          component:() => import("../views/person/information.vue"),
          meta: {title:"个人信息", isValide: true},
        },
        {
          path:"password",
          component:() => import("../views/person/password.vue"),
          meta: {title:"修改密码", isValide: true},
        },
        {
          path:"wx-bind",
          component:() => import("../views/person/wx.vue"),
          meta: {title:"微信绑定", isValide: true},
        }
      ]
    },
    {
      path: "/demo",
      component: () => import('../views/demo.vue')
    }
  ]
})
// 导航守卫
// router.beforeEach((to, from, next) => {
//   var uid = localStorage.getItem("uid")
//   if (to.meta.isValide) {
//     if (uid) {
//       next()
//     } else {
//       next({
//         path: "/"
//       })
//     }
//   } else {
//     if (from.path !== "/" && to.path == "/") {
//       next({
//         path: "/index"
//       })
//     } else {
//       next()
//     }
//   }
// })
export default router
