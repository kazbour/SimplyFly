'use strict';
var bcrypt = require("bcrypt");
var salt = bcrypt.genSaltSync(10);


/****  Attributes ****/
/*define module.exports function {
  instanceMethods,classMethods
}
*/
module.exports = function (sequelize, DataTypes){
  var User = sequelize.define('User', {
    email: { 
      type: DataTypes.STRING, 
      unique: true, 
      validate: {
        len: [6, 30],
      }
    },
    passwordDigest: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    age: DataTypes.INTEGER,
  },

  /*** End of Attributes ***/

  {

    instanceMethods: {
      checkPassword: function(password) {
        return bcrypt.compareSync(password, this.passwordDigest);
      }
    },

    classMethods: {
      encryptPassword: function(password) {
        var hash = bcrypt.hashSync(password, salt);
        return hash;
      },

      createSecure: function(email, password) {
        if (password.length < 6) {
          throw new Error("Password too short");
        }
        return this.create({
          email: email,
          passwordDigest: this.encryptPassword(password)
        });

      },

      authenticate: function(email, password) {
        return this.find({
          where: {
            email: email
          }
        }) 
        .then(function(user){
          if (user === null){
            return false;
          }
          else if (user.checkPassword(password)){
            return user;
          } else {
            return false;
          }

        });
      }
      
      //} // close instanceMethods   
    } // close classMethods
  }); // close define user

  return User;
}; // close User function


//////////////////////////////////////////////////////////////
/*          USER MODEL INFORMATION                          //
//////////////////////////////////////////////////////////////

DATA BASE:
Name: flyable_user_db
           List of relations
 Schema |     Name      | Type  | Owner 
--------+---------------+-------+-------
 public | SequelizeMeta | table | CK
 public | Users         | table | CK
(2 rows)
       

DATA TABLE:
Name: Users
Question:
sequelize model:create --name "User" --attributes email:string,passwordDigest:string,fname:string,lname:string,age:integer

 id | email | passwordDigest | fname | lname | age | createdAt | updatedAt 
----+----
(0 rows)

/////////////////////////////////////////*/