import { createClient } from "redis";
import config from "../config/env";

const client = await createClient({ url: config.redis_url }).on("error", (err) => console.log("Redis Client Error", err)).connect();

export default client;
