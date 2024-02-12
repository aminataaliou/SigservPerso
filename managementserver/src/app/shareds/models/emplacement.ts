import {Datacenter} from "./datacenter";

export class Emplacement{
  id: number | undefined | null
  armoire: string | undefined | null
  etagere: string | undefined | null
  couloir: string | undefined | null
  createdAt: Date | undefined | null
  updatedAt: Date | undefined | null
  datacenter?: Datacenter | undefined | null

  toString(): string {
    return `Datacenter: ${this.datacenter?.nom}| Armoire: ${this.armoire} | Couloir: ${this.couloir} | Etagère: ${this.etagere}`;
  }
}
