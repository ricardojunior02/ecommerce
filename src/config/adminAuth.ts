export default {
  secret: process.env.ADMIN_SECRET || 'adminsecret',
  expireIn: '7d',
};
