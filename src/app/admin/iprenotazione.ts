export interface Iprenotazione {
  disponibilita: Array<Slot>;
}

export interface Slot {
  id: string;
  disponibile: boolean;
  ora: string;

}
