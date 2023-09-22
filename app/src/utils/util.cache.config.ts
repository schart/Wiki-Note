import configs from '../config.json';
import { createClient } from 'redis';


let Config_Json: any = configs

// Redis db; Using for keep data in cache
export let redis_client = createClient({ url: `redis://${Config_Json.Server.host}:${Config_Json.Redis.port}` });
redis_client.on('error', (error: Error) => console.log('Redis Client Error', error));
redis_client.on('connect', (result: any) => console.log('Successfuly connected to Redis Cache'));
redis_client.connect();
