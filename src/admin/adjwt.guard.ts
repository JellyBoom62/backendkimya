import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AdJwtAuthGuard extends AuthGuard("admin-jwt") { }