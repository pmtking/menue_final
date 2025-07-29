import mongoose, {Document, Schema} from "mongoose";

// تعریف نوع TypeScript برای کاربر
export interface IUser extends Document {
    number: string;
    password: string;
    role: "ADMIN" | "USER";
    createdAt?: Date;
}

// تعریف اسکیمای Mongoose
const userSchema = new Schema<IUser>(
    {
        number: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: false,
        },
        role: {
            type: String,
            enum: ["ADMIN", "USER"],
            default: "ADMIN",
        },
    },
    {
        timestamps: true, // ایجاد فیلد createdAt و updatedAt به‌صورت خودکار
    }
);

// ساخت مدل
const User = mongoose.model<IUser>("User", userSchema);

export default User;
