// @flow
import { Button, MenuItem, Select } from "@material-ui/core";
import { FormEvent, useEffect, useRef, useState } from "react";
import io from "socket.io-client";

export const Mapping: React.FunctionComponent = () => {
  const socketIORef = useRef<SocketIOClient.Socket>();
  const [routes, setRoutes] = useState<any[]>([]);
  const [routeIdSelected, setRouteIdSelected] = useState<string>("");
  useEffect(() => {
    fetch("http://localhost:3000/routes")
      .then((data) => data.json())
      .then((data) => setRoutes(data));
  }, []);

  useEffect(() => {
    socketIORef.current = io.connect("http://localhost:3000");
    socketIORef.current.on("connect", () => {
      socketIORef.current?.emit("message", { message: "oi" });
    });

    socketIORef.current.on('new-position', (position) => {
        //pegar a instancia do mapa do Google Maps
        //marcador do carro atualizo com a posicao
        if(position.finished){
            //mostrar corrida finalizou
        }
    })

    socketIORef.current.on("receive-message", (data: any) => console.log(data));
  }, []);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(routeIdSelected);
    socketIORef.current?.emit("new-direction", { routeId: routeIdSelected });
    //montar o meu mapa
    //adicionar o marcador de start e end
  };

  return (
    <form onSubmit={onSubmit}>
      <Select
        fullWidth
        displayEmpty
        value={routeIdSelected}
        onChange={(event) => setRouteIdSelected(event.target.value + "")}
      >
        <MenuItem value="">
          <em>Selecione uma rota</em>
        </MenuItem>
        {routes.map((route, key) => (
          <MenuItem key={key} value={route._id}>
            {route.title}
          </MenuItem>
        ))}
      </Select>
      <Button type="submit" variant="contained" color="primary">
        Iniciar corrida
      </Button>
    </form>
  );
};

//CORS Cross Origin Resource Sharing
