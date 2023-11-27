const create = async (user) => {
  try {
      let response = await fetch('/api/users/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}
const list = async (signal) => {
  try {
    let res = await fetch('/api/users', {
      method: 'GET',
      signal: signal
    })

    return await res.json()
  } catch (err) {
    console.log(err)
  }
}

const read = async (params, credentials, signal) => {
  try {
    let res = await fetch('/api/users/' + params.userId, {
      method: 'GET',
      signal: signal,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + credentials.t,
      }
    })

    return await res.json()
  } catch (err) {
    console.log(err)
  }
}

const update = async (params, credentials, user) => {
  try {
    let res = await fetch('/api/users/' + params.userId, {
      method: 'PUT',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + credentials.t,
      },
      body: user
    })

    return await res.json()
  } catch (err) {
    console.log(err)
  }
}

const remove = async (params, credentials) => {
  try {
    let res = await fetch('/api/users/' + params.userId, {
      method: 'DELETE',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + credentials.t,
      },
    })

    return await res.json()
  } catch (err) {
    console.log(err)
  }
}


const follow = async (params, credentials, followId) => {
  try {
    let res = await fetch('/api/users/follow', {
      method: 'PUT',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + credentials.t,
      },
      body: JSON.stringify({userId: params.userId, followId: followId})
    })

    return await res.json()
  } catch (err) {
    console.log(err)
  }
}

const unfollow = async (params, credentials, unfollowId) => {
  try {
    let res = await fetch('/api/users/unfollow', {
      method: 'PUT',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + credentials.t,
      },
      body: JSON.stringify({userId: params.userId, unfollowId: unfollowId})
    })

    return await res.json()
  } catch (err) {
    console.log(err)
  }
}

export {create, list, read, update, remove}
