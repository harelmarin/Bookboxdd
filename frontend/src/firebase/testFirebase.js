const admin = require('./fireAdminConfig');

admin.auth().listUsers(10)
  .then((listUsersResult) => {
    console.log('Successfully fetched user data:', listUsersResult.users);
  })
  .catch((error) => {
    console.error('Error listing users:', error);
  });
