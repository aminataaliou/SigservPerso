import {Emplacement} from "./emplacement";
import {Systeme} from "./systeme";
import {Application} from "./application";
import {Comptedacces} from "./comptedacces";
import {Tags} from "./tags";

export interface IServeur{
  id?: number | null;
  nom?: string | null;
  emplacement?: Emplacement | null;
  systeme?: Systeme | null;
  tags?: Tags[] | null;
  type?: string | null;
  etat?: string | null;
  serveurs?: Serveur[] | null;
  comptedacces?: Comptedacces [] | null;
  applications?: Application[] | null;
  adresseip?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null,

}

export class Serveur implements IServeur{
  constructor(
    public id?: number | null,
    public nom?: string | null,
    public emplacement?: Emplacement | null,
    public systeme?: Systeme | null,
    public tags?: Tags[] | null,
    public type?: string | null,
    public etat?: string | null,
    public serveurs?: Serveur[] | null,
    public comptedacces?: Comptedacces [] | null,
    public applications?: Application[] | null,
    public adresseip?: string | null,
    public createdAt?: Date | null,
    public updatedAt?: Date | null,
  ) {

  }

}
