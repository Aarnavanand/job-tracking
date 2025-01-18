import connectDb from '@/lib/dbconnect.js'; 
import Profile from '@/models/Profile.js';  

// Handler for GET and POST requests
export default async function creatProfile(req, res) {
  await connectDb();  // Ensure MongoDB connection

  if (req.method === 'POST') {
    // Create or update user profile
    try {
      const { userId, firstName, lastName, email, phone, jobTitle, about, skills, education, workExperience, location } = req.body;

      // Check if profile already exists for the user
      let profile = await Profile.findOne({ userId });

      if (profile) {
        // Update profile if it already exists
        profile.firstName = firstName || profile.firstName;
        profile.lastName = lastName || profile.lastName;
        profile.email = email || profile.email;
        profile.phone = phone || profile.phone;
        profile.jobTitle = jobTitle || profile.jobTitle;
        profile.about = about || profile.about;
        profile.skills = skills || profile.skills;
        profile.education = education || profile.education;
        profile.workExperience = workExperience || profile.workExperience;
        profile.location = location || profile.location;

        await profile.save();
        return res.status(200).json({ message: 'Profile updated successfully', profile });
      } else {
        // Create new profile if it doesn't exist
        profile = new Profile({
          userId,
          firstName,
          lastName,
          email,
          phone,
          jobTitle,
          about,
          skills,
          education,
          workExperience,
          location,
        });

        await profile.save();
        return res.status(201).json({ message: 'Profile created successfully', profile });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Error saving profile', details: error.message });
    }
  }

  if (req.method === 'GET') {
    // Fetch user profile by userId
    const { userId } = req.query;
    try {
      const profile = await Profile.findOne({ userId });

      if (profile) {
        return res.status(200).json(profile);
      } else {
        return res.status(404).json({ error: 'Profile not found' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching profile', details: error.message });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });  // Allow only GET and POST
}
