import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
const argon2 = require('argon2');
import * as nodemailer from 'nodemailer';
import { User, UserDocument } from '../models/user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(
    fullName: string,
    email: string,
    password: string,
    phoneNumber: string,
  ) {
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('Email đã tồn tại !');
    }

    const hashedPassword = await argon2.hash(password);
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    const user = await this.userModel.create({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      verificationCode,
      verificationCodeExpires: new Date(Date.now() + 30 * 60 * 1000),
    });

    await this.sendVerificationEmail(email, verificationCode);
    return { message: 'Đăng ký thành công, mã xác minh đã được gửi đến email của bạn !' };
  }

  async verifyEmail(email: string, code: string) {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new BadRequestException('Người dùng không tìm thấy');
    }

    if (user.failedAttempts >= 5) {
      throw new BadRequestException(
        'Bạn đã vượt quá số lần thử không thành công tối đa. Vui lòng thử lại sau !',
      );
    }

    if (new Date() > user.verificationCodeExpires) {
      throw new BadRequestException('Mã xác minh đã hết hạn');
    }

    if (user.verificationCode !== code) {
      user.failedAttempts = (user.failedAttempts || 0) + 1;
      await user.save();
      throw new BadRequestException(
        'Mã xác minh không chính xác, vui lý thử lại !',
      );
    }

    user.isVerified = true;
    await user.save();
    return { message: 'Xác minh email thành công, bạn có thể đăng nhập !' };
  }

  async sendVerificationEmail(email: string, code: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: '[SAIGON STEC] Xác minh email',
      text: `Mã xác minh của bạn là: ${code}`,
    });
  }
}
