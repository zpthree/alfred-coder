import dotenv from 'dotenv';
import alfy from 'alfy';

dotenv.config();

const url = `${process.env.ACCESS_URL}/${process.env.API_ROUTE}?users=${process.env.USER_ID}`
const options = { headers: { 'Session-Token': `${process.env.API_KEY}` }, maxAge: 2000 };
const workspaces = await alfy.fetch(url, options);

const items = [];

items.push({
  title: 'Shut down all workspaces',
  arg: [null, null, `shutdown-all`]
})

if (alfy.input !== '-stopall') {
  workspaces
  .map(element => {
    if (element.latest_stat.container_status === 'ON') {
      return items.push({
        title: `Shut down ${element.name}`,
        subtitle: `Status: ${element.latest_stat.container_status}`,
        arg: [element.name, element.id, element.latest_stat.container_status]
      });
    }
  });
}

alfy.output(items);
