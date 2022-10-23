import { Injectable } from '@nestjs/common';
import { PaginationTypes } from 'src/utils/interfaces';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers({ page, limit }: PaginationTypes) {
    const users = await this.prisma.user.findMany({
      skip: page,
      take: limit,
    });
    const total = users.length;
    return {
      success: true,
      data: users,
      total: total,
      limit: limit,
      page: page,
      nextPage: limit > total ? false : true,
      message: 'Users fetched successfully',
    };
  }
}
