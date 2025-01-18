import mongoose from 'mongoose';

const JobApplicationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  jobLink: String,
  location: String,
  salary: String,
  status: {
    type: String,
    enum: ['applied', 'interviewing', 'offered', 'rejected', 'accepted'],
    default: 'applied',
  },
  notes: String,
  applicationDate: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.JobApplication || mongoose.model('JobApplication', JobApplicationSchema);