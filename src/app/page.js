"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button"; // Assuming Button is exported from a components folder
import bgHero from "../../public/hero-background.jpg";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-purple-600 text-white">
      {/* Navbar */}
      <nav className="bg-white text-gray-900 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                JAB
              </Link>
            </div>
            <div className="hidden md:flex space-x-4">
              <Button variant="default" size="sm">
                <Link href="/sign-in">Login</Link>
              </Button>
              <Button variant="default" size="sm">
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                aria-expanded={isMenuOpen}
                aria-label="Toggle navigation"
              >
                <svg
                  className={cn("h-6 w-6 transition-transform", isMenuOpen ? "rotate-90" : "rotate-0")}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>
          </div>
          {isMenuOpen && (
            <div className="md:hidden mt-2 transition-opacity duration-300">
              <div className="space-y-2 px-2 pt-2 pb-3 sm:px-3">
                <Button variant="outline" size="sm" className="w-full">
                  <Link href="/dashboard/sign-in">Login</Link>
                </Button>
                <Button variant="default" size="sm" className="w-full">
                  <Link href="/dashboard/sign-up">Sign Up</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex items-center justify-center h-screen">
        <div className="absolute inset-0">
          <Image
            src={bgHero}
            alt="Background"
            fill
            className="object-cover opacity-60"
          />
        </div>
        <div className="relative z-10 text-center max-w-3xl">
          <h1 className="text-5xl font-bold md:text-6xl">
            Build Smart Resumes, Track Applications
          </h1>
          <p className="mt-6 text-lg md:text-xl opacity-90">
            Simplify your job search with our intuitive resume builder and job tracking system. Stay organized, stand out, and land your dream job.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 md:px-12 lg:px-24 bg-white text-gray-900">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Why Choose JAB?</h2>
          <p className="mt-4 text-lg md:text-xl opacity-80">
            JAB (Job Application Builder) is designed to help you create professional resumes and keep track of your job applications effortlessly. From personalized templates to real-time status updates, JAB ensures you're always one step ahead.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="bg-blue-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">Customizable Templates</h3>
              <p className="mt-2 text-gray-700">
                Choose from a variety of modern, professional templates to craft the perfect resume.
              </p>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">Job Tracking</h3>
              <p className="mt-2 text-gray-700">
                Organize and track all your job applications in one place.
              </p>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">AI Suggestions</h3>
              <p className="mt-2 text-gray-700">
                Get AI-powered recommendations to enhance your resume and improve job match.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 md:px-12 bg-gradient-to-r from-purple-500 to-blue-600 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm md:text-base">
            © 2025 JAB Resume Builder & Job Tracker. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
