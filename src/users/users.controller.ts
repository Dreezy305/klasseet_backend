import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiForbiddenResponse,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard/jwt-auth.guard';
import { UserPromiseInterface } from 'src/utils/interfaces';
import { EditUserDto, UserDto } from './dto/user.dto';
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
  @ApiOperation({ summary: 'users info' })
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

  // SINGLE USER DETAILS
  @ApiHeader({
    name: 'Authorization',
  })
  @ApiOperation({ summary: 'single user details' })
  @ApiOkResponse({
    status: HttpStatus.FOUND,
    description: 'User Details Fetched successfully.',
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
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Not authorized.',
  })
  @HttpCode(HttpStatus.UNAUTHORIZED)
  @Get(':id')
  getSingleUser(@Param('id') id: string): Promise<any> {
    return this.userService.getSingleUser(id);
  }

  // EDIT USER INFO
  @ApiHeader({
    name: 'Authorization',
  })
  @ApiOperation({ summary: 'edit user details' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'user details updated successfully',
  })
  @ApiBody({ type: EditUserDto })
  @ApiForbiddenResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User doesn,t exist.',
  })
  @ApiForbiddenResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized.',
  })
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  editUserInfo(
    @Param('id') id: string,
    @Body() dto: EditUserDto,
  ): Promise<any> {
    return this.userService.editUserInfo(id, dto);
  }

  // DELETE USER
  @ApiHeader({
    name: 'Authorization',
  })
  @ApiOperation({ summary: 'delete user details' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'user details deleted successfully',
  })
  @ApiForbiddenResponse({
    status: HttpStatus.NOT_FOUND,
    description: `User doesn't exist.`,
  })
  @ApiForbiddenResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized.',
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  deleteUserInfo(@Param('id') id: string): Promise<any> {
    return this.userService.deleteUserInfo(id);
  }
}
