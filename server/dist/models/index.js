import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';
import { TicketFactory } from './ticket.js';
let sequelize;
if (process.env.NODE_ENV === 'production') {
    // Render production configuration
    sequelize = new Sequelize({
        host: 'dpg-curn51ij1k6c73aurff0-a',
        database: 'kanban_db_rlql',
        username: 'kanban_db_rlql_user',
        password: '9L8ygAiyZrHSJLDAlDW3AqjQUFBVnwRF',
        port: 5432,
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            },
            decimalNumbers: true
        },
        logging: false
    });
}
else {
    // Local development configuration
    sequelize = new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
        host: 'localhost',
        dialect: 'postgres',
        dialectOptions: {
            decimalNumbers: true,
        },
    });
}
const User = UserFactory(sequelize);
const Ticket = TicketFactory(sequelize);
User.hasMany(Ticket, { foreignKey: 'assignedUserId' });
Ticket.belongsTo(User, { foreignKey: 'assignedUserId', as: 'assignedUser' });
export { sequelize, User, Ticket };
