import AWS from 'aws-sdk';

export const s3 = new AWS.S3({
  endpoint: 'http://localhost:9000',
  accessKeyId: 'admin',
  secretAccessKey: 'password',
  s3ForcePathStyle: true,
  signatureVersion: 'v4',
});
