export interface Transaccion {
  id: number;
  tipo: 'deposito' | 'transferencia';
  monto: number;
  descripcion: string;
  fecha: Date;
}