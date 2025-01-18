"use client";

import Link from 'next/link';
import { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';

export default function Home() {
  const { userId, user } = useAuth();

  useEffect(() => {
    if (userId && user) {
      // Create user profile after successful sign-in/sign-up
      const userDetails = {
        clerkId: userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses[0]?.emailAddress, // Ensure correct email structure
      };

      console.log("User details being sent to the server:", userDetails);

      fetch('/api/store-user', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userDetails),
      })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            console.error("Error response from server:", errorData);
            throw new Error("Failed to save user details");
          });
        }
        return response.json();
      })
      .then(data => {
        console.log("User saved successfully:", data);
      })
      .catch(error => {
        console.error('Error creating user profile:', error);
      });
    }
  }, [userId, user]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-4">
            Smart Resume Builder
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Build professional resumes and track your job applications in one place
          </p>
          <div className="flex justify-center gap-4">
            {userId ? (
              <Link
                href="/dashboard"
                className="rounded-md bg-primary px-6 py-3 text-lg font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link
                href="/sign-up"
                className="rounded-md bg-primary px-6 py-3 text-lg font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold mb-2">Professional Resume Builder</h3>
            <p className="text-muted-foreground">
              Create stunning resumes with our easy-to-use builder. Choose from multiple templates and customize to your needs.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold mb-2">Job Application Tracker</h3>
            <p className="text-muted-foreground">
              Keep track of your job applications, interviews, and follow-ups all in one place.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold mb-2">Career Insights</h3>
            <p className="text-muted-foreground">
              Get insights into your job search progress and application success rate.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}