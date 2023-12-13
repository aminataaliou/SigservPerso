export class Tags{
  id: number | undefined | null
  nom: string | undefined | null
  createdAt: Date | undefined | null
  updatedAt: Date | undefined | null

  toString():string{
  return `NOM: ${this.nom}| DATE DE CREATION: ${this.createdAt}`;
  }
}


