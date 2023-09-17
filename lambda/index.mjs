const { createHmac } = await import('node:crypto');

const secret = 'qwerfgvbnmloiuytredsxz';
let header={accept:"json"}
let body={accept:"json"}
console.log(JSON.stringify(header))
let headerb=atobConv(JSON.stringify(header))
let bodyb=atobConv(JSON.stringify(body))

const hash = createHmac('sha256', secret)
               .update(headerb+"."+bodyb)
               .digest('hex');
console.log(headerb+"."+bodyb+"."+btoa(hash));

function atobConv(data){
  return   Buffer.from(data).toString("base64")
}

