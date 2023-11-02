import {Serveur} from "./serveur";

export class Comptedacces{
  id: number | undefined | null
  nom: string | undefined | null
  password: string | undefined | null
  serveurs: Serveur[] | undefined | null
  createdAt: Date | undefined | null
  updatedAt: Date | undefined | null
}
