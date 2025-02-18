import { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTicket } from '../api/ticketAPI';
import { TicketData } from '../interfaces/TicketData';
import { UserData } from '../interfaces/UserData';

const CreateTicket = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [newTicket, setNewTicket] = useState<TicketData>({
    id: 0,
    description: '',
    status: 'Todo',
    assignedUserId: 1, // Default to first user
    assignedUser: null,
    name: ''
  });

  // Static users list
  const users: UserData[] = [
    { id: 1, username: 'JollyGuru' },
    { id: 2, username: 'SunnyScribe' },
    { id: 3, username: 'RadiantComet' }
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      setIsLoading(true);
      
      if (!newTicket.name?.trim()) {
        throw new Error('Ticket name is required');
      }

      if (!newTicket.description?.trim()) {
        throw new Error('Ticket description is required');
      }

      const ticketToCreate = {
        ...newTicket,
        assignedUserId: Number(newTicket.assignedUserId)
      };

      console.log('Creating ticket:', ticketToCreate);
      const data = await createTicket(ticketToCreate);
      console.log('Ticket created successfully:', data);
      navigate('/');
    } catch (err) {
      console.error('Failed to create ticket:', err);
      setError(err instanceof Error ? err.message : 'Failed to create ticket');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTicket(prev => ({ ...prev, [name]: value }));
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTicket(prev => ({
      ...prev,
      [name]: name === 'assignedUserId' ? Number(value) : value
    }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Create Ticket</h1>
        
        {error && (
          <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        <div className="form-group">
          <label htmlFor='tName'>Ticket Name</label>
          <textarea 
            id='tName'
            name='name'
            value={newTicket.name ?? ''}
            onChange={handleTextAreaChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor='tStatus'>Ticket Status</label>
          <select 
            name='status' 
            id='tStatus'
            value={newTicket.status ?? 'Todo'}
            onChange={handleTextChange}
            required
          >
            <option value='Todo'>Todo</option>
            <option value='In Progress'>In Progress</option>
            <option value='Done'>Done</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor='tDescription'>Ticket Description</label>
          <textarea 
            id='tDescription'
            name='description'
            value={newTicket.description ?? ''}
            onChange={handleTextAreaChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor='tUserId'>Assigned User</label>
          <select
            id='tUserId'
            name='assignedUserId'
            value={String(newTicket.assignedUserId)} // Convert to string for select value
            onChange={handleTextChange}
            required
          >
            {users.map((user) => (
              <option key={user.id} value={String(user.id)}>
                {user.username}
              </option>
            ))}
          </select>
        </div>

        <button 
          type='submit' 
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Create Ticket'}
        </button>
      </form>
    </div>
  );
};

export default CreateTicket;