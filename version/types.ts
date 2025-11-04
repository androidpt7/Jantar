export interface RsvpResponse {
  id?: string;
  name: string;
  attending: boolean;
  preferred_date?: string | null;
  created_at?: string;
}
