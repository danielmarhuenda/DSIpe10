import net from 'net';

const client = net.connect({port: 60300});

let enviar = '';
for(var i of process.argv.slice(2)){
  enviar += i + ' ';
  console.log(enviar);
}
client.write(enviar + '\n');


let wholeData = '';
client.on('data', (dataChunk) => {
  wholeData += dataChunk;
});


client.on('end', () => {
  const message = JSON.parse(wholeData);

  if (message.type === 'OK') {
    console.log(`Comando ejecutado correctamente:`);
    console.log(`Resultado: ${message.result}`);

  } else if (message.type === 'Error') {
    console.log(`Hubo un error en la ejecución:`);
    console.log(`Error: ${message.result}`);

  } else {
    console.log(`Message type ${message.type} is not valid`);
  }

});


  
