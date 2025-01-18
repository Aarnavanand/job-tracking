"use client";

import { useForm } from 'react-hook-form';
import { useUser } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState, useEffect } from 'react';

// Zod schema for validating profile form
const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  jobType: z.string().min(1, 'Job type is required'),
  resumeStyle: z.string().min(1, 'Resume style is required'),
  skills: z.array(z.string()).min(1, 'At least one skill is required'),
  experienceLevel: z.enum(['Junior', 'Mid', 'Senior'], 'Experience level is required'),
  bio: z.string().optional(),
  location: z.string().optional(),
  profilePicture: z.string().optional(),
});

export default function ProfilePage() {
  const { user } = useUser();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Fetch user profile if available
    if (user) {
      fetch(`/api/profile?userId=${user.id}`)
        .then(res => res.json())
        .then(data => setProfile(data));
    }
  }, [user]);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: profile || {
      firstName: '',
      lastName: '',
      jobType: '',
      resumeStyle: '',
      skills: [''],
      experienceLevel: 'Junior',
      bio: '',
      location: '',
      profilePicture: '',
    },
  });

  const onSubmit = async (data) => {
    const res = await fetch('/api/profile', {
      method: 'POST',
      body: JSON.stringify({ ...data, userId: user.id }),
      headers: { 'Content-Type': 'application/json' },
    });

    const result = await res.json();
    if (res.ok) {
      alert('Profile saved successfully');
    } else {
      alert('Error saving profile');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-6">User Profile</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium">First Name</label>
            <input
              type="text"
              {...register('firstName')}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName.message}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Last Name</label>
            <input
              type="text"
              {...register('lastName')}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName.message}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Job Type</label>
            <input
              type="text"
              {...register('jobType')}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.jobType && <span className="text-red-500 text-sm">{errors.jobType.message}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Resume Style</label>
            <input
              type="text"
              {...register('resumeStyle')}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.resumeStyle && <span className="text-red-500 text-sm">{errors.resumeStyle.message}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Skills</label>
            <input
              type="text"
              {...register('skills')}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.skills && <span className="text-red-500 text-sm">{errors.skills.message}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Experience Level</label>
            <select
              {...register('experienceLevel')}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="Junior">Junior</option>
              <option value="Mid">Mid</option>
              <option value="Senior">Senior</option>
            </select>
            {errors.experienceLevel && <span className="text-red-500 text-sm">{errors.experienceLevel.message}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Bio</label>
            <textarea
              {...register('bio')}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.bio && <span className="text-red-500 text-sm">{errors.bio.message}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Location</label>
            <input
              type="text"
              {...register('location')}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Profile Picture URL</label>
            <input
              type="text"
              {...register('profilePicture')}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}
