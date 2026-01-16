import "server-only";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const secretKey = process.env.STREAM_SECRET_KEY;

if (!apiKey || !secretKey) {
  throw new Error("Stream API key or secret key is missing");
}

export const streamVideo = new StreamClient(apiKey, secretKey);