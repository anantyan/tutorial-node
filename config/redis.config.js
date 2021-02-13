const redis = require('redis');
const fs = require('fs');

const redisClient = redis.createClient({
  host: '127.0.0.1',
  port: 6379, // jika menggunakan path redis.sock lebih baik ganti ke path saja
  ttl: 60*60*24 // in second to 24 hours
}).on('connect', () => {
  fs.appendFile('RedisConnect.txt', new Date()+' Redis isConnected!\n', (err) => {
    if(err) throw err;
    console.log('Success write!');
  });
}).on('error', (err) => {
  fs.appendFile('RedisError.txt', new Date()+' '+err+'\n', (err) => {
    if(err) throw err;
    console.log('Success write!');
  });
});

module.exports = redisClient