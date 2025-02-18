import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  HttpStatus,
  UseGuards,
  Get,
} from '@nestjs/common';
import { UsuarioService } from '../usuarios/usuario.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './JwtAuthGuard';
import { User } from './user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usuarioService: UsuarioService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    // Llamamos al servicio findByNombre
    const userOrMessage = await this.usuarioService.findByNombre(loginDto.Nombre);

    // Verificar si el resultado es un mensaje
    if (typeof userOrMessage === 'string') {
      // Si es un mensaje, lanzamos UnauthorizedException con el mensaje
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: userOrMessage, // El mensaje que devuelve el servicio (Ej. "El usuario está bloqueado" o "Usuario no encontrado")
      });
    }

    // Si no es un mensaje, es un objeto usuario
    const user = userOrMessage;

    // Verificar que las credenciales (contraseña) sean correctas
    const isPasswordValid = loginDto.password === user.Clave;
    if (!isPasswordValid) {
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Credenciales inválidas: contraseña incorrecta',
      });
    }

    // Si las credenciales son correctas, generamos un JWT
    const token = await this.authService.generateJwtToken(user);

    return {
      statusCode: HttpStatus.OK,
      message: 'Inicio de sesión exitoso',
      token,
    };
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@User() user) {
    return user;
  }
}
