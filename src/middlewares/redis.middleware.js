import { client } from '../config/redisdb';
import HttpStatus from 'http-status-codes';


export const redisData = async (req, res, next) => {
 const data = await client.get("getAll");
 client.del('getAll', (err, reply) => {
      if (err) {
        console.error('Error deleting key from Redis:', err);
      } else {
        console.log('Key deleted from Redis:', reply);
      }
    });
  if (data != null) {
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: JSON.parse(data),
      message: 'All Notes fetched successfully from redis'
    });
  } else {
    next();
  }
};
