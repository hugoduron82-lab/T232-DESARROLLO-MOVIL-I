import { createContext } from "react";
import { Transaccion } from "../modelos/Transaccion";

export const BancoContext = createContext({
  saldo: 10000,
  transacciones: [] as Transaccion[],
  depositar: (monto: number) => {},
  transferir: (monto: number, destino: string, cuenta: string) => false as boolean
});