import { ITicketDto } from "@/app/dto/ticket";
import React from "react";
import { notFound } from "next/navigation";

export const generateStaticParams = async () => {
  const res = await fetch("http://localhost:3500/tickets");

  const tickets = (await res.json()) as ITicketDto[];

  return tickets.map((ticket) => ({ id: ticket.id }));
};

const getTickt = async (id: string) => {
  const res = await fetch(`http://localhost:3500/tickets/${id}`, {
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) notFound();

  return res.json();
};

const TicketDetails = async ({ params }: { params: { id: string } }) => {
  const ticket = await getTickt(params.id);
  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  );
};

export default TicketDetails;
