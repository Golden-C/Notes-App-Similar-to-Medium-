import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { objInt } from '../interfaces/interface';
import { StdioNull } from 'child_process';
const salt: string = process.env.SALT as string;

interface UserModel extends mongoose.Model<objInt> {
	validateCredentials(email: string, password: string): objInt;
}

const UsersSchema = new mongoose.Schema<objInt>(
  {
    firstName: {
      type: String,
      required: [true, 'Name is needed'],
    },
    lastName: {
      type: String,
      required: [true, 'Name is needed'],
    },
    email: {
      type: String,
      required: [true, 'Email is needed'],
      unique: true,
      lowercase: true,
    },
    googleId: {
      type: String,
      // required : true,
    },
    facebookId:{
      type: String
    },
    password: {
      type: String,
      minlength: [7, 'Password length should not be less than 7'],
    },
    location: {
      type: String,
    },
    gender: {
      type: String,
    },
    role: {
      type: String,
    },
    about: {
      type: String,
    },
    avatar: { 
      type: String, 
      default: "https://res.cloudinary.com/sarmueil/image/upload/v1634479074/mstwee5tpggz6v5e15vk.jpg",
      required: true
    },
  },
  {
    timestamps: true,
  }  
);
UsersSchema.pre('save', async function (next: () => void) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, +salt);
  next();
});

UsersSchema.statics.validateCredentials = async (email, password) => {
	const user = await User.findOne({ email });
	if (!user) throw new Error("Invalid Login Credentials");

	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) throw new Error("Invalid Login Credentials");

	return user;
};

const User = mongoose.model<objInt, UserModel>("notesusers", UsersSchema);

// export default mongoose.model('notesusers', UsersSchema);

export default User;