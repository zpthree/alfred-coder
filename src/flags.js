import dotenv from 'dotenv';
import alfy from 'alfy';

dotenv.config();

const url = `${process.env.ACCESS_URL}/${process.env.API_ROUTE}?users=${process.env.USER_ID}`
const options = { headers: { 'Session-Token': `${process.env.API_KEY}` }, maxAge: 2000 };
const workspaces = await alfy.fetch(url, options);

const items = [];

if ('-stopall'.includes(alfy.input) && !'-url'.includes(alfy.input)) {
  items.push({
    title: 'Shut down all workspaces',
    arg: [null, null, `shutdown-all`]
  })
}

if ('-stop'.includes(alfy.input) && alfy.input !== '-stopall') {
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

if ('-url'.includes(alfy.input)) {
  workspaces
  .map(element => {
    if (element.latest_stat.container_status === 'ON') {
      return items.push({
        title: `Open https://${element.name}${process.env.BASE_FRONTEND_URL}`,
        subtitle: `Status: ${element.latest_stat.container_status}`,
        arg: [element.name, element.id, `open-url`]
      });
    }
  });
}

alfy.output(items);
