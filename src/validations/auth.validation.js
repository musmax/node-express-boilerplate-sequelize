const Joi = require('Joi');
const {custom, password} = require('./custom.validation')

const register = {
  body : Joi.objects().keys({
    email : Joi.string().trim().email().required(),
    password : Joi.string().trim().custom(password).required(),
    phoneNumber : Joi.string().trim().required(),
    role : Joi.string().default('user')
  })
}

const login = {
  body : Joi.objects.keys({
    email : Joi.string().trim().email().required(),
    password: Joi.string().custom(password).required()
  })
}

const logout = {
  body : Joi.objects.keys({
    refreshToken : Joi.string().trim().required(),
  })
}

const refreshToken = {
  body : Joi.objects.keys({
    refreshToken : Joi.string().trim().required(),
  })
}

const forgetPassword = {
  body: Joi.objects().key({
    email: Joi.string().trim().email().required()
  })
}

const resetPassord = {
  query:Joi.objects().keys({
    token:Joi.string().trim().required()
  }),
  body:Joi.objects().keys({
    password: Joi.string().custom(password).required()
  })
}

module.exports = {
  register,
  resetPassord,
  refreshToken,
  login,
  logout,
  forgetPassword,

}