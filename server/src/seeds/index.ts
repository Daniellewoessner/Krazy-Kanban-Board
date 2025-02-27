import { seedUsers } from "./user-seeds";
import { sequelize } from '../models/index';

const seed = async (): Promise<void> => {
    try {
        await sequelize.sync({ force: true });
        await seedUsers();

        process.exit(0); 
    } catch (err)   {
        console.error('error seeding datbase');
        process.exit(1);
        

        
    }
};

seed();