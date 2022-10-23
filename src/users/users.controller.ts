import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiHeader,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard/jwt-auth.guard';
import { UserPromiseInterface } from 'src/utils/interfaces';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@UseGuards(JwtGuard)
@Controller('users')
@ApiTags('User Management Service')
export class UsersController {
  constructor(private userService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @ApiHeader({
    name: 'Authorization',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Users fetched successfully.',
    schema: {
      allOf: [
        { $ref: getSchemaPath(UserDto) },
        {
          properties: {
            results: {
              type: 'array',
              items: {},
            },
          },
        },
      ],
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Users not found.',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Not authorized.',
  })
  @Get(':page/:limit')
  getUsers(
    @Param('page', new ParseIntPipe()) page: number,
    @Param('limit', new ParseIntPipe()) limit: number,
  ): Promise<UserPromiseInterface> {
    return this.userService.getAllUsers({ page, limit });
  }

  @ApiHeader({
    name: 'Authorization',
  })
  @ApiOkResponse({
    status: 200,
    description: 'User Detail Fetched successfully.',
  })
  @Get(':id')
  getSingleUser(@Param('id') id: string): Promise<any> {
    return this.userService.getSingleUser(id);
  }
}
