import dotenv from 'dotenv';
import alfy from 'alfy';
import getWorkspaces, { options } from './getWorkspaces.js';
dotenv.config();

async function shutdownWorkspaces() {
  const workspaces = await getWorkspaces();

  // loop over all workspaces and turn off any that are on
  const active = []

  await Promise.all(workspaces.map(({ id, latest_stat: { container_status }, name }) => {
    if (container_status == 'ON') {
      alfy.fetch(`${process.env.ACCESS_URL}/${process.env.API_ROUTE}/${id}/stop`, {
        method: 'put',
        ...options
      })

      active.push(name);
    }
  }));

  return active;
}

(async () => {
  let active = await shutdownWorkspaces();
  const initial = active;

  let i = 0;
  while (active.length) {
    active = await shutdownWorkspaces();

    if (i+=1 > 5) {
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  if (initial.length === 0) {
    return;
  }
})();