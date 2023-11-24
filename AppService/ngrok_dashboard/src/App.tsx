import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { makeNgrokApiRequest } from './actions';

export const App = () => {

  const [tunnel, setTunnel] = React.useState({public_url:[]});

  useEffect(() => {
    makeNgrokApiRequest().then((data) => {
      console.log("#1",data);
      if(data.tunnels.length > 0) {
        console.log("#1 tunnel url:",data.tunnels[0].public_url);
        const tunnels:any = [];
        data.tunnels.forEach((tunnel:any) => {
          tunnels.push(tunnel.public_url);
        });
        setTunnel({public_url: tunnels});
      }

    });
  }, []);

  const getTunnelLinks = () => {
    return tunnel.public_url.map((url) => {
      return <li key={url}> 
        <a 
          className="App-link" 
          href={url}
          target='_blank'
        >
            {url}
        </a> 
      </li>
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ngrok Dashboard</h1>
        {getTunnelLinks()}
      </header>
    </div>
  );
}

