import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';
import { TicketFactory } from './ticket.js';
const sequelize = new Sequelize(process.env.DATABASE_URL || '', {
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
const User = UserFactory(sequelize);
const Ticket = TicketFactory(sequelize);
User.hasMany(Ticket, { foreignKey: 'assignedUserId' });
Ticket.belongsTo(User, { foreignKey: 'assignedUserId', as: 'assignedUser' });
export { sequelize, User, Ticket };
