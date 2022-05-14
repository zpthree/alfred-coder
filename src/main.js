import dotenv from 'dotenv';
import alfy from 'alfy';
import getWorkspaces from './getWorkspaces.js';
dotenv.config();

(async () => {
  const workspaces = await getWorkspaces();
  const allowedActions = [`start`, `stop`, `term`, `view`, `code`];

  let items = [];
  let action;
  let workspace;

  if (alfy.input.includes(` `)) {
    action = alfy.input.split(` `)[0];
    workspace = alfy.input.split(` `)[1];

    if (!allowedActions.includes(action)) {
      return alfy.output({
        title: `Action ${action} is not supported`,
      });
    }
  } else {
    workspace = alfy.input;
  }

  if (`stop:all`.includes(alfy.input)) {
    items.push({
      title: `Stop all`,
      subtitle: `Shut down all workspaces`,
      arg: [`Stop all`, `stopall`, null]
    });
  }

  workspaces.map(el => {
    if (el.name.includes(workspace)) {
      if (action) {
        if (el.latest_stat.container_status === `ON`) {
          if (`view`.includes(action)) {
            return items.push({
              title: `${el.name}`,
              subtitle: `https://${el.name}${process.env.APP_USER}.${process.env.BASE_URL}`,
              arg: [el.name, `view`, `https://${el.name}${process.env.APP_USER}.${process.env.BASE_URL}`]
            });
          }

          if (`code`.includes(action)) {
            return items.push({
              title: `${el.name}`,
              subtitle: `Open ${el.name} editor in the browser`,
              arg: [el.name, `code`, `https://${process.env.BASE_URL}/app/${process.env.APP_EDITOR}?workspaceId=${el.id}`]
            });
          }

          if (`term`.includes(action)) {
            return items.push({
              title: `${el.name}`,
              subtitle: `Open ${el.name} terminal in the browser`,
              arg: [el.name, `terminal`, `https://${process.env.BASE_URL}/app/terminal?workspaceId=${el.id}`]
            });
          }

          if (`stop`.includes(action)) {
            return items.push({
              title: `${el.name}`,
              subtitle: `Shut down ${el.name}`,
              arg: [el.name, `stop`, null]
            });
          }
        } else {
          if (`start`.includes(action)) {
            return items.push({
              title: `${el.name}`,
              subtitle: `Start ${el.name}`,
              arg: [el.name, `start`, null]
            });
          }
        }
      } else {
        items.push({
          title: `${el.latest_stat.container_status === `ON` ? `Shut down` : `Start`} ${el.name}`,
          subtitle: `Status: ${el.latest_stat.container_status}`,
          arg: [el.name, el.latest_stat.container_status === `ON` ? `stop` : `start`, el.latest_stat.container_status]
        });

        if (el.latest_stat.container_status === `ON`) {
          items.push({
            title: `View - ${el.name}`,
            subtitle: `Open ${el.name} frontend in the browser`,
            arg: [el.name, `view`, `https://${el.name}${process.env.APP_USER}.${process.env.BASE_URL}`]
          });

          items.push({
            title: `Editor - ${el.name}`,
            subtitle: `Open ${el.name} editor in the browser`,
            arg: [el.name, `code`, `https://${process.env.BASE_URL}/app/${process.env.APP_EDITOR}?workspaceId=${el.id}`]
          });

          items.push({
            title: `Terminal - ${el.name}`,
            subtitle: `Open ${el.name} terminal in the browser`,
            arg: [el.name, `terminal`, `https://${process.env.BASE_URL}/app/terminal?workspaceId=${el.id}`]
          });
        }
      }
    }
  });

  if (action && !items.length) {
    items.push({
      title: `Ah snap!`,
      subtitle: `Command is not available or no workspace was found with \`${workspace}\` in it's name`,
    });
  } else if (!items.length && !allowedActions.includes(workspace)) {
    items.push({
      title: `Ah snap!`,
      subtitle: `Could not find any workspace with \`${workspace}\` in it's name`,
    });
  } else if (allowedActions.includes(workspace)) {
    items.push({
      title: `Keep going...`,
      subtitle: `Add another space to initialize an action. [${workspace} workspace]`,
    });
  }

  alfy.output(items);

})()