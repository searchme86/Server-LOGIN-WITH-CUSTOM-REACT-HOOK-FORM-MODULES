import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    id: { type: String },

    userImagePublicId: {
      type: String,
      required: true,
    },

    userImageUrl: {
      type: String,
      required: true,
    },

    userNickName: {
      type: String,
      required: true,
    },

    userEmail: {
      type: String,
      required: true,
    },

    userPassword: {
      type: String,
      required: true,
    },

    roles: {
      User: {
        type: Number,
        default: 2001,
      },
      Editor: Number,
      Admin: Number,
    },

    refreshToken: String,

    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

export default User;
