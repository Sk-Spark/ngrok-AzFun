import React, { useEffect } from "react";
import logo from "./logo.svg";
import loadingSvg from "./loading.svg";
import "./App.css";
import { makeNgrokApiRequest } from "./actions";

export const App = () => {
  const [tunnel, setTunnel] = React.useState({ public_url: [] });
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    makeNgrokApiRequest().then((data) => {
      console.log("#1", data);
      if (data.tunnels.length > 0) {
        console.log("#1 tunnel url:", data.tunnels[0].public_url);
        const tunnels: any = [];
        data.tunnels.forEach((tunnel: any) => {
          tunnels.push(tunnel.public_url);
        });
        setTunnel({ public_url: tunnels });
      }
      setLoading(false);
    });
  }, []);

  const getTunnelLinks = () => {
    return tunnel.public_url.map((url) => {
      return (
        <div key={url}>
          <a className="App-link" href={url} target="_blank">
            {url}
          </a>
        </div>
      );
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ngrok Dashboard</h1>
        {!loading && tunnel.public_url.length > 0 && getTunnelLinks()}
        {!loading && tunnel.public_url.length == 0 && (
          <div>
            <p>
              Ngrok is not running. <br/>
              Please start ngrok and refresh this page.
            </p>
          </div>
        )}

        {loading && 
          <>
            <img src={loadingSvg} width={100} className="App-logo" alt="loading" />
            <label>Loading Tunnels ...</label>
          </>
        }
      </header>
    </div>
  );
};
