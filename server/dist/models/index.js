import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';
import { TicketFactory } from './ticket.js';
let sequelize;
if (process.env.NODE_ENV === 'production') {
    // Render production database
    sequelize = new Sequelize(process.env.ExternalDatabase || '', {
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
    // Local development database
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
// Add connection testing
sequelize
    .authenticate()
    .then(() => {
    console.log('Database connection has been established successfully.');
})
    .catch(err => {
    console.error('Unable to connect to the database:', err);
});
export { sequelize, User, Ticket };
