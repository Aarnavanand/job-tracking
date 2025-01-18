import mongoose from 'mongoose';

// Define the schema for user profile
const profileSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },  // Link to Clerk userId
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  jobTitle: { type: String },
  about: { type: String },  // Short bio or introduction
  skills: { type: [String], default: [] },  // List of skills
  education: [
    {
      school: { type: String },
      degree: { type: String },
      startYear: { type: Number },
      endYear: { type: Number },
      description: { type: String },
    },
  ],
  workExperience: [
    {
      company: { type: String },
      jobTitle: { type: String },
      startDate: { type: Date },
      endDate: { type: Date },
      description: { type: String },
    },
  ],
  location: { type: String },
}, { timestamps: true });

const Profile = mongoose.models.Profile || mongoose.model('Profile', profileSchema);
export default Profile;
