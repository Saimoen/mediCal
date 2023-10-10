export interface Reservation {
  rendezvous_id: number;
  medecin_id: number;
  patient: string;
  date_et_heure: string;
  motif: string;
  created_at: Date;
}
