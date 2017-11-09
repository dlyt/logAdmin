import fs from 'fs';
import readline from 'readline';
import { exec } from 'child_process';
import io from '../../../../bin/io';
console.log(io)

export async function start(ctx) {
  try {
    const data = await getHistoryLogs(ctx.query.type);
    ctx.body = {
      data: data
    }
  } catch (err) {
    console.log(err)
  }
}

const getHistoryLogs = () => {
  return new Promise((resolve, reject) => {
    let logsArr = [];
    const fileName = 'test.log';
    const readEvent = readline.createInterface({
      input: fs.createReadStream(fileName, { enconding: 'urf8' }),
      output: null,
      terminal: false
    });
    readEvent.on('line', (line) => {
      if (line) {
        logsArr.push(line.toString());
      }
    }).on('close', () => {
      let historyLogs = [];
      const length = logsArr.length;
      for(let i = length - 12 ; i < length; i++) {
        historyLogs.push(logsArr[i]);
      }
      return resolve(historyLogs.join('\r\n'));
    })
  })
}

function _exec(type) {
  let cmd,cwd
  switch (type) {
    case 'syncHotel':
      cmd = 'node hotelAll > ../../../work.log'
      cwd = '../db/controllers/hunyan'
      break;
    case 'syncRegion':
      cmd = 'node regions > ../../work.log'
      cwd = '../db/controllers'
      break;
    case 'delHotel':
      cmd = 'node deleteHotal > ../../../work.log'
      cwd = '../db/controllers/hunyan'
      break;
    default:
      cmd = 'node hotelAll > ../../../work.log'
      cwd = '../db/controllers/hunyan'
      break;
  }
  return new Promise((resolve, reject) => {
    exec(cmd, { cwd: cwd }, function (err, stdout, stderr) {
          if (err) {
            reject(err)
          }
          const readableStream = fs.createReadStream('../work.log')
          let data = ''
          readableStream.setEncoding('utf8')
          readableStream.on('data', function(chunk) {
            data += chunk
          });

          readableStream.on('end', function() {
            resolve(data)
          });
      })
  })
}