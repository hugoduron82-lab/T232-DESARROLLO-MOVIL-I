import React, { useState } from 'react';
import { BancoContext } from '../context/BancoContext';
import { Transaccion } from '../modelos/Transaccion';
import { Vista } from '../modelos/Vista';
import { useContext } from 'react';

export default function ProviderBanco(props: Vista) {
  const [saldo, setSaldo] = useState(10000);
  const [transacciones, setTransacciones] = useState<Transaccion[]>([
    { id: 1, tipo: 'deposito', monto: 500, descripcion: 'Depósito de L.500', fecha: new Date() },
    { id: 2, tipo: 'transferencia', monto: 200, descripcion: 'Transferencia simulada de L.200', fecha: new Date() }
  ]);

  function depositar(monto: number) {
    setSaldo(saldo + monto);
    const nueva: Transaccion = {
      id: transacciones.length + 1,
      tipo: 'deposito',
      monto,
      descripcion: `Depósito de L.${monto}`,
      fecha: new Date()
    };
    setTransacciones([nueva, ...transacciones]);
    alert('Depósito exitoso');
  }

  function transferir(monto: number, destino: string, cuenta: string): boolean {
    if (monto > saldo) {
      alert('No cuenta con el saldo para completar la transacción');
      return false;
    }
    setSaldo(saldo - monto);
    const nueva: Transaccion = {
      id: transacciones.length + 1,
      tipo: 'transferencia',
      monto,
      descripcion: `Transferencia a ${destino} (${cuenta}) por L.${monto}`,
      fecha: new Date()
    };
    setTransacciones([nueva, ...transacciones]);
    alert(`Transferencia exitosa: L.${monto} a ${destino}`);
    return true;
  }

  return (
    <BancoContext.Provider value={{ saldo, transacciones, depositar, transferir }}>
      {props.children}
    </BancoContext.Provider>
  );
}

export function useContextBanco() {
  return useContext(BancoContext);
}