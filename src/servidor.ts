import net from 'net';
import {spawn} from 'child_process';


const server = net.createServer((connection) => {
  console.log('A client has connected.');


  connection.on('data', (data) => {

    const comando = data;
    const argumentos = [];

    for (let i = 1; i < data.length; i++) {
      argumentos.push(data[i].toString());
    }

    console.log(comando)
    console.log("LLEGA2");
    console.log(argumentos)

    let subOutput = '';
    const subcomando = spawn(comando, argumentos);
    subcomando.stdout.on('data', (piece) => subOutput += piece);
    subcomando.stderr.on('data', (piece) => subOutput += piece);

    console.log("LLEGA3");

    subcomando.on('close', code => {
      if (code === 0) {
        connection.write('{"type": "OK", "result": ' + subOutput + '}\n');

      } else {
        connection.write('{"type": "Error", "result": ' + subOutput + '}\n');
      }
        connection.end();
        
      }).on('error', err =>{
        connection.write('{"type": "Error", "result": "Comando no existente"}\n');
        connection.end();
      });
  });


  connection.on('close', () => {
    console.log('A client has disconnected');
  });

});

server.listen(60300, () => {
  console.log('Waiting for clients to connect.');
});
