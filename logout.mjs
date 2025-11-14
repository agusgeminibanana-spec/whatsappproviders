
import http from 'http';

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/whatsapp/logout',
  method: 'POST',
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('Response:', JSON.parse(data));
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.end();
