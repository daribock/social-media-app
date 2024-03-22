import { Model, model, Schema } from 'mongoose';

export interface IUser {
    username: string;
    password: string;
    email: string;
    createdAt: string;
}

type UserModel = Model<IUser>;

const userSchema = new Schema<IUser, UserModel>({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    email: { type: String, required: true },
    createdAt: { type: String, required: true },
});

const User = model<IUser>('User', userSchema);

export default User;
