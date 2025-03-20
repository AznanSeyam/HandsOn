import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Group } from './groups.schema';
import { User } from '../users/users.schema';

@Injectable()
export class GroupsService {
  constructor(@InjectModel(Group.name) private groupModel: Model<Group>) {}

  async createGroup(name: string, adminId: string) {
    const newGroup = new this.groupModel({ name, admin: adminId, members: [adminId] });
    await newGroup.save();
    return newGroup;
  }

  async sendJoinRequest(groupId: string, userId: string) {
    const group = await this.groupModel.findById(groupId);
    if (!group) throw new NotFoundException('Group not found');

    if (!group.joinRequests.includes(userId)) {
      group.joinRequests.push(userId);
      await group.save();
    }
    return { message: 'Join request sent' };
  }

  async acceptJoinRequest(groupId: string, adminId: string, userId: string) {
    const group = await this.groupModel.findById(groupId);
    if (!group) throw new NotFoundException('Group not found');
    if (group.admin !== adminId) throw new ForbiddenException('Not authorized');

    group.members.push(userId);
    group.joinRequests = group.joinRequests.filter(id => id !== userId);
    await group.save();
    return { message: 'User added to group' };
  }

  async renameGroup(groupId: string, adminId: string, newName: string) {
    const group = await this.groupModel.findById(groupId);
    if (!group) throw new NotFoundException('Group not found');
    if (group.admin !== adminId) throw new ForbiddenException('Not authorized');

    group.name = newName;
    await group.save();
    return { message: 'Group renamed' };
  }

  async deleteGroup(groupId: string, adminId: string) {
    const group = await this.groupModel.findById(groupId);
    if (!group) throw new NotFoundException('Group not found');
    if (group.admin !== adminId) throw new ForbiddenException('Not authorized');

    await this.groupModel.findByIdAndDelete(groupId);
    return { message: 'Group deleted' };
  }

  async searchGroups(query: string) {
    return this.groupModel.find({ name: new RegExp(query, 'i') });
  }

  async leaveGroup(groupId: string, userId: string) {
    const group = await this.groupModel.findById(groupId);
    if (!group) throw new NotFoundException('Group not found');

    group.members = group.members.filter(id => id !== userId);
    await group.save();
    return { message: 'Left the group' };
  }
}
