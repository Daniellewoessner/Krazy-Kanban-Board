import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';
import { TicketFactory } from './ticket.js';

let sequelize: Sequelize;

if (process.env.NODE_ENV === 'production') {
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
  console.log('Using production database configuration');
} else {
  sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
    dialectOptions: {
      decimalNumbers: true,
    },
    logging: true
  });
  console.log('Using development database configuration');
}

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const User = UserFactory(sequelize);
const Ticket = TicketFactory(sequelize);

User.hasMany(Ticket, { foreignKey: 'assignedUserId' });
Ticket.belongsTo(User, { foreignKey: 'assignedUserId', as: 'assignedUser'});

export { sequelize, User, Ticket };
