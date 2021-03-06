import alfy from 'alfy';
import dotenv from 'dotenv';
dotenv.config();

export const options = { headers: { 'Session-Token': `${process.env.API_KEY}` }, maxAge: 2000 };

export default async function getWorkspaces() {
  const url = `${process.env.ACCESS_URL}/api/v0/workspaces?users=${process.env.USER_ID}`
  return await alfy.fetch(url, options);
}