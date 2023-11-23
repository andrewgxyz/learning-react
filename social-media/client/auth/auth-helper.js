const { signout } = require("./api-auth")

export default {
  authentication(jwt, cb) {
    if (typeof window !== "undefined") {
      sessionStorage.setItem('jwt', JSON.stringify(jwt))
    }

    cb()
  },
  isAuthenticated() {
    if (typeof window == "undefined") {
      return false
    }

    if (sessionStorage.getItem('jwt')) {
      return JSON.stringify(sessionStorage.getItem('jwt'))
    }

    return false
  },
  clearJwt(cb) {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem('jwt', JSON.stringify(jwt))
    }

    cb()
    signout().then((data) => {
      document.cookie = "t=; expires=Thur 01 Jan 1970 00:00:00 UTC; path=/;"
    })
  }
}
