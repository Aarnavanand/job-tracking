import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: [true, "Clerk ID is required"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true, // Normalize email for consistency
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

// Handle duplicate key errors gracefully
UserSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error(`Duplicate key error: ${JSON.stringify(error.keyValue)}`));
  } else {
    next(error);
  }
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
