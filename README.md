This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Email Configuration Setup

The application uses `nodemailer` to send an application confirmation email when someone applies for an internship. To ensure this works locally and in production, you must configure a Gmail App Password.

### 1. Set Up a Gmail App Password
Currently, emails are sent using **neuroweblabs@gmail.com**. Since standard password authentication is blocked by Google for SMTP, you must generate an App Password:
1. Go to your [Google Account Manage Options](https://myaccount.google.com/).
2. Navigate to **Security** on the left panel.
3. Under "How you sign in to Google", ensure **2-Step Verification** is turned **On**.
4. Click on **2-Step Verification** and scroll down to **App Passwords** (or search "App Passwords" in the search bar at the top).
5. Add a new App Password (e.g., name it "NeuroWebLabs Website").
6. Copy the generated 16-character password (e.g., `abcd efgh ijkl mnop`).


### 2. Configure Environment Variables
Inside your project root directory (`neuroweblab`), either update or create your `.env` file and add the following keys. 

```env
# Existing MongoDB URL
MONGODB_URI=your_mongodb_connection_string

# Email Configuration
EMAIL_USER=neuroweblabs@gmail.com
EMAIL_PASS="copy_pasted_16_character_app_password_here"
```

Once the `.env` file is set with the correct app password, the application will successfully send beautifully formatted confirmation HTML emails to candidates upon applying.
