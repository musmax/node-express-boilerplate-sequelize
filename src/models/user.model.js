const validator = require('validator');

module.exports = (sequelize, dataType) => {
  const user = sequelize.define('user', {
    firstName: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
    },
    lastName: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
    },
    email: {
      type: dataType.STRING,
      allowNull: false,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
    },
    isEmailVerified: {
      type: dataType.BOOLEAN,
    },
    phoneNumbers:{
      type : dataType.STRING,
      allowNull : false,
      trim:true, 
    },
    profileImg:{
      type : dataType.STRING,
      allowNull : false,
     
    },
    role:{
      type : dataType.STRING,
      allowNull : false,
      trim:true,
    },
    userName:{
      type : dataType.STRING,
      allowNull : false,
      trim:true,
    },
  });

  return user;
};
