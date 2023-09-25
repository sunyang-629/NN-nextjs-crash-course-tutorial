export interface ITicketDto {
  id: string;
  title: string;
  body: string;
  priority: string;
  user_email: string;
}

export interface ITicketResDto {
  tickets: Array<ITicketDto>;
}
