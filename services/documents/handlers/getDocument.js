import AWS from 'aws-sdk';

export const handler = (event, context, callback) => {
  const s3 = new AWS.S3();
	const params = {
	  Bucket: process.env.BUCKET_NAME,
	  Key: event.path.key
	};

  const getUrl = (params) => {
    return new Promise((resolve, reject) => {
	    s3.getSignedUrl('getObject', params, (err, url) => {
	      if (err) reject(err)
	      else resolve(url)
	    });
	  });
  };

  getUrl(params).then(res => {
	  callback(null, res);
  }).catch(err => { callback(err); });
};