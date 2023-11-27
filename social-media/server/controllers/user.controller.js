import User from '../models/user.model'
import extend from 'lodash/extend'
import errorHandler from './../helpers/dbErrorHandler'
import {IncomingForm} from 'formidable';
import fs from 'fs';

import profileImage from '../../client/assets/images/defaultPhoto.jpg'

const create = async (req, res, next) => {
  console.log(req.body);
  const user = new User(req.body)
  try {
    await user.save()
    return res.status(200).json({
      message: "Successfully signed up!"
    })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}
const list = async (req, res) => {
  try {
    let users = await User.find().select('name email updated created')
    return res.json(users)
  } catch (err) {
    return res.status(400).json({
      error: "Can't get user"
    })
  }
}
const userById = async (req, res, next, id) => {
  try {
    let user = await User.findById(id)
      .populate('following', '_id name')
      .populate('followers', '_id name')
      .exec()
    if (!user) return res.status(400).json({
      error: "User not found"
    })
    req.profile = user
    next()
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve user"
    })
  }
}
const read = async (req, res) => {
  // Just so the password and salt doesn't show up in the response
  req.profile.hashed_password = undefined
  req.profile.salt = undefined
  return res.json(req.profile)
}
const update = async (req, res) => {
  let form = new IncomingForm()
  form.keepExtensions = true
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(400).json({error: "Photo could not be uploaded"})

    let user = req.profile
    user = extend(user, fields)
    user.updated = Date.now()
    if (files.photo) {
      fs
      user.photo.data = fs.readFileSync(files.photo.path)
      user.photo.contentType = files.photo.type
    }

    try {
      await user.save()
      user.hashed_password = undefined
      user.salt = undefined
      res.json(user)
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  })
}
const remove = async (req, res) => {
  try {
    let user = req.profile
    let deleteUser = await user.remove()
    deleteUser.hashed_password = undefined
    deleteUser.salt = undefined
    res.json(deleteUser)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const photo = (req, res, next) => {
  if (req.profile.photo.data) {
    res.set("Content-Type", req.profile.photo.contentType)
    return res.send(req.profile.photo.data)
  }
  next()
}

const defaultPhoto = (req, res) => {
  return res.sendFile(process.cwd()+profileImage)
}

const addFollowing = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.body.userId, {$push: {following: req.body.followId}})
    next()
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const addFollower = async (req, res) => {
  try {
    let user = await User.findByIdAndUpdate(
      req.body.userId, 
      {$push: {following: req.body.followId}},
      {new: true}
    )
    .populate('following', '_id name')
    .populate('followers', '_id name')
    .exec()

    user.hashed_password = undefined
    user.salt = undefined
    res.json(user)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const removeFollowing = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.body.userId, {$push: {following: req.body.unfollowId}})
    next()
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const removeFollower = async (req, res) => {
  try {
    let user = await User.findByIdAndUpdate(
      req.body.userId, 
      {$push: {following: req.body.userId}},
      {new: true}
    )
    .populate('following', '_id name')
    .populate('followers', '_id name')
    .exec()

    user.hashed_password = undefined
    user.salt = undefined
    res.json(user)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

export default {create, userById, read, list, remove, update, defaultPhoto, photo, addFollower, addFollowing, removeFollower, removeFollowing}
