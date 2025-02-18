import { Link } from 'react-router-dom';
import { useState } from 'react';
import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';
import { MouseEventHandler } from 'react';

interface TicketCardProps {
  ticket: TicketData;
  deleteTicket: (ticketId: number) => Promise<ApiMessage>;
  onDeleteSuccess?: () => void; // Optional callback for parent component update
}

const TicketCard = ({ ticket, deleteTicket, onDeleteSuccess }: TicketCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete: MouseEventHandler<HTMLButtonElement> = async (event) => {
    const ticketId = Number(event.currentTarget.value);
    
    if (isNaN(ticketId)) {
      setError('Invalid ticket ID');
      return;
    }

    try {
      setIsDeleting(true);
      setError(null);
      
      const data = await deleteTicket(ticketId);
      console.log('Ticket deleted successfully:', data);
      
      // Notify parent component if callback provided
      if (onDeleteSuccess) {
        onDeleteSuccess();
      }
    } catch (error) {
      console.error('Failed to delete ticket:', error);
      setError('Failed to delete ticket. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className='ticket-card'>
      <h3>{ticket.name}</h3>
      <p>{ticket.description}</p>
      <p>{ticket.assignedUser?.username || 'Unassigned'}</p>
      
      {error && (
        <p className="error-message" style={{ color: 'red' }}>
          {error}
        </p>
      )}

      <div className="ticket-actions">
        <Link 
          to='/edit' 
          state={{ id: ticket.id }} 
          className='editBtn'
        >
          Edit
        </Link>
        
        <button 
          type='button'
          value={String(ticket.id)}
          onClick={handleDelete}
          className='deleteBtn'
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
};

export default TicketCard;