export default function (ctx, inject) {
  const user = {
    authenticate() {
      if (!ctx.$auth.loggedIn) {
        return ctx.app.router.push('/login')
      }
    },
    isAdmin() {
      return ctx.$auth?.loggedIn && ctx.$auth.user?.role === 'admin'
    },
    isOwn(uid) {
      return ctx.$auth?.user.id === uid
    },
    isOwnOrAdmin(uid) {
      return ctx.$auth?.user.id === uid || ctx.$auth.user.role === 'admin'
    },
  }

  inject('user', user)
}
