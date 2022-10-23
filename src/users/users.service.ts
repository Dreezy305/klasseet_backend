import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async getSingleUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User does not exist',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      success: true,
      data: user,
      message: 'User Detail Fetched successfully',
    };
  }
}
