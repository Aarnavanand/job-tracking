import { NextResponse } from 'next/server';
import { User } from '@/models/User'; // MongoDB User model
import connectDB from '@/lib/dbconnect';
import crypto from 'crypto';

export async function POST(request) {
  try {
    // Get webhook signature and payload
    const signature = request.headers.get('clerk-signature'); // Signature from Clerk's request headers
    const body = await request.json(); // Request body

    // Verify the webhook signature
    if (!isValidWebhookSignature(signature, body)) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Connect to DB
    await connectDB();

    // Extract user data from the webhook payload
    const { userId, email, firstName, lastName } = body.data;
    
    // Validate user data
    if (!userId || !email || !firstName || !lastName) {
      return new NextResponse('Invalid user data', { status: 400 });
    }

    // Check if the user already exists in MongoDB
    let user = await User.findOne({ clerkId: userId });
    if (!user) {
      // Create new user if not found
      user = await User.create({
        clerkId: userId,
        email,
        name: `${firstName} ${lastName}`,
      });
    } else {
      // If user exists, update their details
      user.email = email;
      user.name = `${firstName} ${lastName}`;
      await user.save();
    }

    return new NextResponse('User updated successfully', { status: 200 });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// Function to verify the webhook signature
function isValidWebhookSignature(signature, body) {
  const secret = process.env.CLERK_WEBHOOK_SECRET; // Get this from Clerk dashboard

  // Calculate the HMAC using the request body and secret
  const hmac = crypto.createHmac('sha256', secret);
  const bodyString = JSON.stringify(body);
  hmac.update(bodyString);
  
  const calculatedSignature = hmac.digest('hex');
  
  // Compare the signature from the header with the calculated one
  return signature === calculatedSignature;
}
