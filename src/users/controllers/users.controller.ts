import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';

import { ApiParam } from '@nestjs/swagger';

import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET /users
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // POST /users
  @Post()
  create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  // GET /users/:id
  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    format: 'uuid',
    example: 'c18ee2f4-e8c9-4ac1-af59-344a1102bf5d',
  })
  findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return this.usersService.findOne(id);
  }

  // PATCH /users/:id
  @Patch(':id')
@ApiParam({
  name: 'id',
  type: String,
  format: 'uuid',
  example: 'c18ee2f4-e8c9-4ac1-af59-344a1102bf5d',
})
update(
  @Param('id', new ParseUUIDPipe()) id: string,
  @Body() body: UpdateUserDto,
) {
  return this.usersService.update(id, body);
}

  // DELETE /users/:id
  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    format: 'uuid',
    example: 'c18ee2f4-e8c9-4ac1-af59-344a1102bf5d',
  })
  remove(
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return this.usersService.remove(id);
  }
}