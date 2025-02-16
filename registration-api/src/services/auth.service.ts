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
    throw new BadRequestException('Email already exists');
  }
  
    const hashedPassword = await argon2.hash(password);
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const user = await this.userModel.create({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      verificationCode,
      verificationCodeExpires: new Date(Date.now() + 30 * 60 * 1000),
    });

    await this.sendVerificationEmail(email, verificationCode);
    return { message: 'Verification code sent to email' };
  }

  async verifyEmail(email: string, code: string) {
    const user = await this.userModel.findOne({ email });

    if (!user || user.verificationCode !== code) {
      throw new BadRequestException('Invalid or expired verification code');
    }

    if (new Date() > user.verificationCodeExpires) {
      throw new BadRequestException('Verification code expired');
    }

    user.isVerified = true;
    await user.save();
    return { message: 'Email verified successfully' };
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
      subject: 'Email Verification',
      text: `Your verification code is: ${code}`,
    });
  }
}
