import dotenv from 'dotenv';
import alfy from 'alfy';

dotenv.config();

const url = `${process.env.ACCESS_URL}/${process.env.API_ROUTE}?users=${process.env.USER_ID}`
const options = { headers: { 'Session-Token': `${process.env.API_KEY}` }, maxAge: 2000 };
const workspaces = await alfy.fetch(url, options);

let items;

items = alfy
  .inputMatches(workspaces, 'name')
  .map(element => ({
    title: `${element.latest_stat.container_status === 'ON' ? 'Shut down' : 'Start'} ${element.name}`,
    subtitle: `Status: ${element.latest_stat.container_status}`,
		arg: [element.name, element.id, element.latest_stat.container_status]
  }));

alfy.output(items);
