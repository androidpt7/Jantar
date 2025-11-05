export interface RsvpResponse {
  id?: string;
  name: string;
  attending: boolean;
  preferred_date?: string | null;
  preferred_menu?: string | null;
  created_at?: string;
}