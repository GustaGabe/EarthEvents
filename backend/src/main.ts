import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    
    // Habilitar CORS
    app.enableCors({
      origin: 'http://localhost:3000', // URL do frontend
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    });

    const port = process.env.PORT ?? 3001;
    await app.listen(port);
    console.log(`Servidor rodando na porta ${port}`);
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
  }
}
bootstrap();
