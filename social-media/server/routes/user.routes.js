import express from 'express'
import userCtrl from '../controllers/user.controller.js'
import authController from '../controllers/auth.controller.js'

const router = express.Router()

router.route('/api/users')
  .get(userCtrl.list)
  .post(userCtrl.create)

router.route('/api/users/:userId')
  .get(authController.requireSignin, userCtrl.read)
  .put(authController.requireSignin, authController.hasAuthorization, userCtrl.update)
  .delete(authController.requireSignin, authController.hasAuthorization, userCtrl.remove)

router.route('/api/users/follow')
  .put(authController.requireSignin, userCtrl.addFollowing, userCtrl.addFollower)
router.route('/api/users/unfollow')
  .put(authController.requireSignin, userCtrl.removeFollowing, userCtrl.removeFollower)

router.route('/api/users/photo/:userId')
  .get(userCtrl.photo, userCtrl.defaultPhoto)

router.route('/api/users/defaultPhoto')
  .get(userCtrl.defaultPhoto)

router.param('userId', userCtrl.userById)

export default router
