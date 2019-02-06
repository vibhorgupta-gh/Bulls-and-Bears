function isLoggedIn(req, res, next) {
  if (process.env.NODE_ENV === 'test') {
    return next();
  }
  if (req.user) {
    return next()
  } else {
    return next();
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
  isLoggedIn,
  isAdmin
}
