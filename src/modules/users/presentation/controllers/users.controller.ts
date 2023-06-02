import { Controller } from '@nestjs/common';
import { UsersService } from '../../application/services/users.service';
import { CreateUserDto, ValidateUsersAdminFiltersPipeDto, ValidateUsersFiltersPipeDto } from '../../application/dto/create-user.dto';
import { UserRoleEnum } from '../../../../shared/enum/user-role.enum';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserMSG } from '../../../../shared/enum/proxy.enum';
import { IUpdateData } from '../../domain/interfaces/user.controller.interface';
import { Observable } from 'rxjs';
import { IUsers } from '../../domain/interfaces/users.interface';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @MessagePattern(UserMSG.CREATE)
  create(@Payload() createUserDto: CreateUserDto) {
    createUserDto.role = UserRoleEnum.USER;
    return this.usersService.create(createUserDto);
  }
  @MessagePattern(UserMSG.CREATE_ADMIN)
  createAdmin(@Payload() createUserDto: CreateUserDto) {
    createUserDto.role = UserRoleEnum.ADMINISTRATOR;
    return this.usersService.create(createUserDto);
  }
  @MessagePattern(UserMSG.FIND_ALL)
  findAll(@Payload() query: ValidateUsersFiltersPipeDto) {
    return this.usersService.findAll(query);
  }
  @MessagePattern(UserMSG.FIND_ALL_ADMIN)
  findAllAdmin(@Payload()  query: ValidateUsersAdminFiltersPipeDto) {
    return this.usersService.findAllAdmin(query);
  }
  @MessagePattern(UserMSG.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.usersService.findOne(id);
  }
  @MessagePattern(UserMSG.FIND_ONE_BY_EMAIL)
  findOneByEmail(@Payload() email: string): Promise<IUsers> {
    return this.usersService.findOneByEmail(email);
  }
  @MessagePattern(UserMSG.UPDATE)
  update(@Payload() payload: IUpdateData) {
    return this.usersService.update(payload.id, payload.updateUserDto);
  }
  @MessagePattern(UserMSG.DELETE)
  remove(@Payload() id: string) {
    return this.usersService.remove(id);
  }
}
