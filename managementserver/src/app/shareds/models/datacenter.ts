import {Emplacement} from "./emplacement";

export class Datacenter{
  id: number | undefined | null
  nom: string | undefined | null
  pays: string | undefined | null
  ville: string | undefined | null
  quartier: string | undefined | null
  emplacement: Emplacement[] | undefined | null
  createdAt: Date | undefined | null
  updatedAt: Date | undefined | null
}
