const Koa=require('koa');
const fs=require('fs');
const static=require('koa-static');
const path=require('path');


const app=new Koa();

var count=0;

function readData(url) {
    return fs.readFileSync(url);
}

app.use(static(path.join(__dirname,'public')));

app.use(async ctx=>{
    count++;
    try{
        if (/Android|webOS|iPhone|iPod|ipad|BlackBerry/i.test(ctx.request.header['user-agent'])) {
          // console.log('移动端');
          if(count<2000){
              let data = await readData('./index_mobile.html');
              ctx.body = data.toString();
          }else ctx.body='';
        } else {
          // console.log('电脑端');
          if(count<2000){
              let data = await readData('./index.html');
              ctx.body = data.toString();
          }else ctx.body='';
        }
    }catch(err){
        console.log(err.message);
    }
});

app.on('error',err=>{
    fs.appendFile('.log', err+'\n', err => {
        if (err) console.log(err.message);
    })
})
app.listen(3000);

console.log('the server is listening at port 3000');


