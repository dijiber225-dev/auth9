import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

// 1. Cargamos las variables del archivo .env local
config(); 

// 2. Creamos una variable para guardar las opciones de configuración
let dataSourceOptions: DataSourceOptions;

// 3. Usamos un IF normal para decidir la conexión
if (process.env.DATABASE_URL) {
  // CONFIGURACIÓN PARA RENDER / NEON (Producción)
  dataSourceOptions = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    // Neon requiere SSL para funcionar en la nube
    ssl: {
      rejectUnauthorized: false,
    },
  };
} else {
  // CONFIGURACIÓN PARA LOCALHOST (Desarrollo)
  dataSourceOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    ssl: false,
  };
}

// 4. Exportamos el DataSource con las opciones elegidas y la configuración de rutas
export default new DataSource({
  ...dataSourceOptions,
  
  // Seguridad: synchronize siempre en false para usar migraciones profesionales [1-3]
  synchronize: false, 

  // Rutas que funcionan tanto en desarrollo (.ts) como en producción (.js) [4, 5]
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
});