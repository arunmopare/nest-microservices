import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { UserDocument } from './users/models/users.schema';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { TokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  login(user: UserDocument, response: Response) {
    const tokenPayload: TokenPayload = {
      userId: user._id.toHexString(),
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    const options: JwtSignOptions = {
      secret: this.configService.get('JWT_SECRET'),
    };

    const token = this.jwtService.sign(tokenPayload, options);

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
  }
}
