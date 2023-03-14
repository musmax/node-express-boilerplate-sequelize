const httpStatus = require('httpStatus')
const {db} = require('../models');
const bcrypt = require('bcrypt');
const ApiError = require('../utils/ApiError');
const logger = require('../config/logger');

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @returns {Promise<boolean>}
 */

const isEmailTaken = async function(email){
  const user = db.users.findOne({where:{email}});
  logger(user)
  return !!user;
};

/**
 * check if user passord match
 * @param {string} password - The user's password
 * @returns {Promise<boolean>}
 */
const isPasswordMatch = async(password,user) => {
const compa = bcrypt.compare(password,user.password)
return compa;
}

/**
 * Create user
 * @param {ObjectId} userBody
 * @returns {Promise<User>}
 */

const createUser = async (userBody) => {
  if (await isEmailTaken(userBody.email)){
    throw new ApiError(BAD_REQUEST,'Email taken already');
  }
  userBody.password;
  bcrypt.hashSync(inputPassord,10);
  userBody.profileImg = `https://avatars.dicebear.com/api/initials/${userBody.username}.svg`;

  const {id} = db.users.create(userBody);
  db.users.findOne({where:{id},attributes:['id','profileImg','userName']})
}

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */

const getUserById = async (id) => {
  const user = db.users.findByPk(id);
 if (!user){
  throw new ApiError(httpStatus.NOT_FOUND,'User not found');
 }
 return user;
}

/**
 * Get user by email
 * @param {ObjectId} email
 * @returns {Promise<User>}
 */

const getUserByEmail = async (email) => {
  return await db.users.findOne({where :{email}})
}

/**
 * Update User by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */

const updateUserById = async (userId,updateBody) => {
const user = db.users.findByPk(userId);
  if(!user){
    throw new ApiError(httpStatus.NOT_FOUND,'User not found')
  }
  if ((updateBody.email) && (await isEmailTaken(updateBody.email))){
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email taken already');
  } 
  Object.assign(user,updateBody);

  return db.users.update(user.dataValue,{where:{id:userId}});
}

const deleteUserById = async (userId) => {
  const user = db.users.findByPk(userId);
    if(!user){
      throw new ApiError(httpStatus.NOT_FOUND,'User not found')
    }  
    return db.users.delete({where:{id:userId}});
  }

  module.exports = {
    updateUserById,
    deleteUserById,
    isEmailTaken,
    isPasswordMatch,
    getUserByEmail,
    getUserById,
    createUser
  }