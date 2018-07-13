function isLoggedIn(req, res, next) {
  if (req.user) {
    return next()
  } else {
    console.log('no headers')
    res.redirect('/')
  }
}

function isAdmin(req, res, next) {
  if (req.user.admin) {
    return next()
  } else {
    console.log('you don\'t have permission')
    res.redirect('/')
  }
}

module.exports = {
  isLoggedIn, isAdmin
}
