import { Controller, Post, Body, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @UseGuards(AuthGuard)
  @Post()
  createGroup(@Body() body: { name: string; adminId: string }) {
    return this.groupsService.createGroup(body.name, body.adminId);
  }

  @UseGuards(AuthGuard)
  @Post(':groupId/join-request')
  sendJoinRequest(@Param('groupId') groupId: string, @Body() body: { userId: string }) {
    return this.groupsService.sendJoinRequest(groupId, body.userId);
  }

  @UseGuards(AuthGuard)
  @Post(':groupId/accept-request')
  acceptJoinRequest(@Param('groupId') groupId: string, @Body() body: { adminId: string; userId: string }) {
    return this.groupsService.acceptJoinRequest(groupId, body.adminId, body.userId);
  }

  @UseGuards(AuthGuard)
  @Post(':groupId/rename')
  renameGroup(@Param('groupId') groupId: string, @Body() body: { adminId: string; newName: string }) {
    return this.groupsService.renameGroup(groupId, body.adminId, body.newName);
  }

  @UseGuards(AuthGuard)
  @Delete(':groupId')
  deleteGroup(@Param('groupId') groupId: string, @Body() body: { adminId: string }) {
    return this.groupsService.deleteGroup(groupId, body.adminId);
  }

  @UseGuards(AuthGuard)
  @Get('search')
  searchGroups(@Body() body: { query: string }) {
    return this.groupsService.searchGroups(body.query);
  }

  @UseGuards(AuthGuard)
  @Delete(':groupId/leave')
  leaveGroup(@Param('groupId') groupId: string, @Body() body: { userId: string }) {
    return this.groupsService.leaveGroup(groupId, body.userId);
  }
}
