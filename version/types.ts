
export interface Submission {
  id: number;
  created_at: string;
  name: string;
  isAttending: boolean;
  selectedDate: string | null;
}
