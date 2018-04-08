const expect = require('expect');
const { Users } = require('./user');

var users;

beforeEach(() => {
  users = new Users();
  users.users = [{
    id: '1',
    name: 'Mike',
    room: 'Node Course'
  }, {
    id: '2',
    name: 'Jen',
    room: 'React Course'
  }, {
    id: '3',
    name: 'Julie',
    room: 'Node Course'
  }]
});

describe ('Users', () => {
  it('should add new user', () => {
    const users = new Users(); // create new user instance
    const user = {
      id: '123',
      name: 'Andrew',
      room: 'Node Fun'
    };
    users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {    
    // take id of seed user pass to removeUser
    const userId = '2';
    // pass id to removeUser()
    const user = users.removeUser(userId);
    // check return removed user
    expect(user.id).toBe(userId);
    // check that a user was removed from array
    expect(users.users.length).toBe(2);    
  });

  it('should not remove a user', () => {    
    // create invalid user id
    const userId = '99';
    // pass id to removeUser()
    const user = users.removeUser(userId);
    // check that return user is undefined
    expect(user).toBeUndefined();
    // check that a user was not removed from array of 3 users
    expect(users.users.length).toBe(3);    
  });

  it('should find user', () => {  
    // pass in id
    var userId = '2';
    // get user object back
    var user = users.getUser(userId);
    expect(user.id).toBe(userId);    
  });

  it('should not find user', () => {
   // pass in invalide id
   var userId = '99';
   // no user object returns undefined
   var user = users.getUser(userId);
   expect(user).toBeUndefined();  
  });


  it('should return names for node course', () => {
    var userList = users.getUserList('Node Course');
    expect(userList).toEqual(['Mike', 'Julie']);
  });

  it('should return names for react course', () => {
    var userList = users.getUserList('React Course');
    expect(userList).toEqual(['Jen']);
  });
});