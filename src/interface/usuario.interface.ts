import { Document } from 'mongoose';
export interface IUsuario extends Document {
  nombres: string;
  apellidoMaterno: string;
  apellidoPaterno: string;
  nombreCompleto: string;
  edad: number;
  telefono: number;
  email: string;
  password: string;
  tipoUsuario: string;
  comparePassword: () => Promise<boolean>;
}
