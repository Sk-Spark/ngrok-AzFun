import { AzureFunction, Context, HttpRequest, HttpResponse } from "@azure/functions"
import fetch from 'node-fetch';
import { readFileSync } from 'fs';
import tunnels404 from './tunnels404.html'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');    
    // const tunnels404 = '<center><h2> No Tunnels Found !!! </h2></center>';
    // const tunnels404 = readFileSync('./tunnels404.html');

    const link = `<a href=__URL__> Partner 360 POC </a>`;
    const respp:HttpResponse = {
        body:  '',
        statusCode: 200,
        headers:{
            "Content-Type":"text/html"
        }
    }

    const token = '2FqoVlEun1pbSPKJ8DRji74M3qk_4s89tG15nPYWf93S8WuRH';
    const options = {
        method: 'get',
        headers:{
            "Ngrok-Version" : "2",
            "Authorization" : `Bearer ${token}`
        }
    }

    await fetch('https://api.ngrok.com/tunnels',options)
    .then((response) => response.json())
    .then((data:any) => {
        console.log("data:",data);
        let body='';
        if(data && data.tunnels && data.tunnels.length > 0 ){
            data.tunnels.forEach(t => {
                console.log('Public URL:',t.public_url);
                body += link.replace('__URL__',t.public_url) + '</br>';
            });
        }
        if(body === ''){
            body = tunnels404.toLocaleString() ;
        }
        respp.body = body;
        context.res = respp;
    });    

};

export default httpTrigger;