import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../users/users.schema';

@Schema()
export class Group extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [{ type: String, ref: 'User' }], default: [] })
  members: string[];

  @Prop({ type: String, ref: 'User' })
  admin: string;

  @Prop({ type: [{ type: String, ref: 'User' }], default: [] })
  joinRequests: string[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);
