import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  async sendAthleteCredentials(
    email: string,
    password: string,
    firstname: string,
    lastname: string,
  ): Promise<void> {
    const logoPath = path.join(process.cwd(), 'public', 'logo.png');
    const logoContent = fs.readFileSync(logoPath).toString('base64');

    const mailOptions = {
      from: `"Sportik" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Vos identifiants d'accès à la plateforme",
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 30px;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden;">
            <div style="text-align: center; padding: 20px;">
              <img src="cid:sportik-logo" alt="Sportik Logo" style="width: 120px; height: auto;" />
            </div>
            <div style="background-color: #2c3e50; color: #ffffff; padding: 20px;">
              <h2 style="margin: 0;">Bienvenue sur la plateforme Sportik</h2>
            </div>
            <div style="padding: 30px;">
              <p>Bonjour <strong>${firstname} ${lastname}</strong>,</p>
              <p>Voici vos identifiants pour accéder à la plateforme :</p>
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr>
                  <td style="padding: 8px; font-weight: bold;">Email :</td>
                  <td style="padding: 8px;">${email}</td>
                </tr>
                <tr style="background-color: #f2f2f2;">
                  <td style="padding: 8px; font-weight: bold;">Mot de passe :</td>
                  <td style="padding: 8px;">${password}</td>
                </tr>
              </table>
              <p style="color: #e74c3c;"><strong>Veuillez vous connecter et changer votre mot de passe dès que possible.</strong></p>
              <p>Si vous avez des questions, n'hésitez pas à nous contacter.</p>
              <p>Sportivement,<br>L'équipe de la Sportik</p>
            </div>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: 'logo.png',
          content: logoContent,
          encoding: 'base64',
          cid: 'sportik-logo',
        },
      ],
    };

    await this.transporter.sendMail(mailOptions);
  }
}
