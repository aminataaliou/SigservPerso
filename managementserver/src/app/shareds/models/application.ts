import {Tags} from "./tags";
import {Serveur} from "./serveur";

export class Application{
  id: number | undefined | null
  nom: string | undefined | null
  port: string | undefined | null
  url: string | undefined | null
  adresseIp: string | undefined | null
  type: string | undefined | null
  etat: string | undefined | null
  createdAt: Date | undefined | null
  updatedAt: Date | undefined | null
  tags: Tags[] | undefined | null
  serveurs:Serveur[] | undefined | null

  toString():string {
    return `NOM: ${this.nom} | ADRESSE IP: ${this.adresseIp} | PORT: ${this.port}| TYPE: ${this.type}| URL: ${this.url}| DATE DE CREATION: ${this.createdAt}`;
  }
}
