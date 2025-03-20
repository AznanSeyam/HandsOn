import { Controller, Post, Get, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AuthGuard)
  @Post()
  @Post()
  createPost(@Body() body: { text: string; imageUrl?: string; groupId: string; userId: string }) {
    return this.postsService.createPost(body.text, body.imageUrl ?? '', body.groupId, body.userId);
  }
  

  @UseGuards(AuthGuard)
  @Get(':groupId')
  getGroupPosts(@Param('groupId') groupId: string) {
    return this.postsService.getGroupPosts(groupId);
  }

  @UseGuards(AuthGuard)
  @Delete(':postId')
  deletePost(@Param('postId') postId: string, @Body() body: { userId: string }) {
    return this.postsService.deletePost(postId, body.userId);
  }
}
