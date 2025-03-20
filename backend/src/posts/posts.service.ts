import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './posts.schema';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async createPost(text: string, imageUrl: string, groupId: string, userId: string) {
    const newPost = new this.postModel({ text, imageUrl, groupId, createdBy: userId });
    await newPost.save();
    return newPost;
  }

  async getGroupPosts(groupId: string) {
    return this.postModel.find({ groupId }).sort({ createdAt: -1 });
  }

  async deletePost(postId: string, userId: string) {
    const post = await this.postModel.findById(postId);
    if (!post) throw new NotFoundException('Post not found');
    if (post.createdBy !== userId) throw new NotFoundException('Unauthorized');

    await this.postModel.findByIdAndDelete(postId);
    return { message: 'Post deleted' };
  }
}
