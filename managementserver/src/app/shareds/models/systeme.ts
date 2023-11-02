import {Serveur} from "./serveur";

export class Systeme{
  id: number | undefined | null
  nom: string | undefined | null
  version: string | undefined | null
  distribution: string | undefined | null
  serveurs: Serveur[] | undefined | null
  createdAt: Date | undefined | null
  updatedAt: Date | undefined | null

  toString(): string {
    return `Nom: ${this.nom} | Version: ${this.version} | Distribution: ${this.distribution}`;
  }
}
