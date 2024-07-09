import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDtoLogin, AuthDtoRegister } from "./dto";
import * as bcrypt from "bcrypt";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable({})
export class AuthService {
  constructor(
    private prisma:PrismaService,
    private jwt:JwtService,
    private config:ConfigService,
  ) {}
  async signup(dto: AuthDtoRegister) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(dto.password, salt);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          username: dto.username,
          fullname: dto.fullname,
          hash,
        }
      });
      delete user.hash;
      delete user.id;
      return {
        status: 'success',
        message: 'User berhasil dibuat!',
        statusCode: 200,
        user,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Data sudah tersedia!'
          );
        }
      }
      throw error;
    }
  }
  async signin(dto: AuthDtoLogin) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    });

    if (!user) {
      throw new ForbiddenException(
        'Data tidak ditemukan'
      );
    }

    const pwMatch = await bcrypt.compare(dto.password, user.hash);
    if (!pwMatch) {
      throw new ForbiddenException(
        'Password salah!'
      );
    }

    // delete user.hash;
    // delete user.id;

    const token = await this.signToken(user.id, user.email, user.fullname, user.username);
    return {
      status: 'success',
      message: 'Selamat berhasil masuk!',
      statusCode: 200,
      access_token: token,
    };
  }

  signToken(
    userId: number,
    email: string,
    fullname: string,
    username: string,
  ): Promise<string> {
    const payload = {
      sub: userId,
      email,
      fullname,
      username
    }

    const secret = this.config.get('JWT_SECRET');

    return this.jwt.signAsync(payload, {
      expiresIn: '60m',
      secret: secret
    })
  }
}