import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';
import Auth from '../utils/auth';

const handleApiResponse = async (response: Response) => {
  const data = await response.json();

  if (!response.ok) {
    console.error('API Error Response:', {
      status: response.status,
      body: data
    });
    throw new Error(data.message || 'An unexpected error occurred');
  }

  return data;
};

const retrieveTickets = async () => {
  try {
    const response = await fetch('/api/tickets/', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });

    return await handleApiResponse(response);
  } catch (err) {
    console.error('Error retrieving tickets:', err);
    return [];
  }
};

const retrieveTicket = async (id: number | null): Promise<TicketData> => {
  try {
    const response = await fetch(`/api/tickets/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });

    return await handleApiResponse(response);
  } catch (err) {
    console.error('Error retrieving ticket:', err);
    throw new Error('Could not fetch ticket');
  }
};

const createTicket = async (body: TicketData) => {
  try {
    const response = await fetch('/api/tickets/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify(body)
    });

    return await handleApiResponse(response);
  } catch (err) {
    console.error('Error creating ticket:', err);
    throw new Error('Could not create ticket');
  }
};

const updateTicket = async (ticketId: number, body: TicketData): Promise<TicketData> => {
  try {
    const response = await fetch(`/api/tickets/${ticketId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify(body)
    });

    return await handleApiResponse(response);
  } catch (err) {
    console.error('Error updating ticket:', err);
    throw new Error('Could not update ticket');
  }
};

const deleteTicket = async (ticketId: number): Promise<ApiMessage> => {
  try {
    const response = await fetch(`/api/tickets/${ticketId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });

    return await handleApiResponse(response);
  } catch (err) {
    console.error('Error deleting ticket:', err);
    throw new Error('Could not delete ticket');
  }
};

export { 
  createTicket, 
  deleteTicket, 
  retrieveTickets, 
  retrieveTicket, 
  updateTicket
};