import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/users.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = new this.userModel({ ...dto, password: hashedPassword });
    await user.save();
    return { message: 'User registered successfully' };
  }

  async login(dto: LoginDto) {
    try {
      console.log('Login request received:', dto.email);
  
      const user = await this.userModel.findOne({ email: dto.email });
      if (!user) {
        console.error('User not found:', dto.email);
        throw new UnauthorizedException('Invalid credentials');
      }
  
      console.log('User found:', user.email);
  
      if (!user.password) {
        console.error('User password field is missing:', user.email);
        throw new InternalServerErrorException('User data is corrupted');
      }
  
      const isPasswordValid = await bcrypt.compare(dto.password, user.password);
      if (!isPasswordValid) {
        console.error('Incorrect password for:', dto.email);
        throw new UnauthorizedException('Invalid credentials');
      }
  
      console.log('Password matched, generating token');
  
      const token = this.jwtService.sign({ id: user.id });
  
      console.log('Login successful for:', dto.email);
      return { accessToken: token };
    } catch (error) {
      console.error('Login Error:', error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }
  
}
 