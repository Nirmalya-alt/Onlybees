
export interface TicketType {
  id: string;
  name: string;
  price: number;
  benefits: string[];
  availableQuantity: number;
}

export interface SelectedTickets {
  [key: string]: number;
}

export interface EventDetails {
  title: string;
  location: string;
  date: string;
  time: string;
  city: string;
  posterUrl: string;
}
