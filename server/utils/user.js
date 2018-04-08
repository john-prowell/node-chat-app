[{
  id: '1jfdo0wdlglk',
  name: 'Andrew',
  room: 'The Office Fans'
}]

// addUser(id, name, room)
// removeUser(id)
// getUser(id)
//GetUserList(room)

class Users {
  constructor () {
    this.users = [];
  }
  addUser (id, name, room) {
    const user = {id, name, room} // user object
    this.users.push(user) // push user on to array
    return user;
  }
  removeUser (id) {
    const user = this.getUser(id);
    if (user) {
      // remove user that matches id from this.users array
      this.users = this.users.filter((user) => user.id !== id);
      console.log(this.users);
    }
    // return user that was removed
    return user;
    }
  getUser (id) {
    // returns 1st user found in array that matches id - should be only one
    return this.users.find((user) => user.id === id);
   }
  getUserList (room) {
    // returns array of users
    var users = this.users.filter((user) => {
      return user.room === room;
    });
    // iterrates over users and return each user name
    var namesArray = users.map((user) => {
      return user.name;
    });
    return namesArray;
  }
}

module.exports = {
  Users 
};


// // Class Example
// class Person {
//   constructor (name, age) {
//     this.name = name;
//     this.age = age;
//   }
//   getUserDescription () {
//     return `${this.name} is ${this.age} year(s) old.`;
//   }
// }

// var me = new Person('Andrew', 25);
// var description = me.getUserDescription();
// console.log(description);

