import dotenv from 'dotenv';
import alfy from 'alfy';

dotenv.config();

const url = `${process.env.ACCESS_URL}/${process.env.API_ROUTE}?users=${process.env.USER_ID}`
const options = { headers: { 'Session-Token': `${process.env.API_KEY}` }, maxAge: 2000 };
const workspaces = await alfy.fetch(url, options);

const items = [];
workspaces
  .map(element => {
    if (element.latest_stat.container_status === 'ON') {
      return items.push({
        title: `https://${element.name}${process.env.BASE_FRONTEND_URL}`,
        subtitle: `Status: ${element.latest_stat.container_status}`,
        arg: [element.name, element.id, `open-url`]
      });
    }
  });

alfy.output(items);