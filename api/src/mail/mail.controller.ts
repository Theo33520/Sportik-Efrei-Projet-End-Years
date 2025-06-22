import { Injectable, UseGuards } from "@nestjs/common";
import { from } from "rxjs";


import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Controllers } from "src/common/controller.enum";
import { sendAthleteCredentialsDto } from "./dto/mail.dto";
import { JwtAuthGuard } from "src/guards/jwt-auth-guard";
import { IsLoggedInGuard } from "src/guards/is-logged-in-guard";

@Controller(Controllers.MAIL)
@ApiTags(Controllers.MAIL)
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @UseGuards(JwtAuthGuard, IsLoggedInGuard)
  @Post('/send-athlete-credentials')
  @ApiOperation({ operationId: 'Send athlete credentials' })
  @ApiOkResponse({
    description: 'Send athlete credentials via email',
    type: String,
  })
  async sendAthleteCredentials(@Body() body: sendAthleteCredentialsDto) {
    const { email, password, firstname, lastname } = body;

    return this.mailService.sendAthleteCredentials(
      email,
      password,
      firstname,
      lastname,
    );
  }
}
