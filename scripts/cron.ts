import cron from 'node-cron';

console.log("Starting cron job scheduler...");

// Schedule a task to run every day at midnight (or change to '*/5 * * * *' for every 5 mins during testing)
cron.schedule('0 0 * * *', async () => {
    console.log("Running unpaid applicant background check...");
    try {
        // This will hit the endpoint running on the local server or production
        const URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        const response = await fetch(`${URL}/api/cron/process-unpaid`);
        const data = await response.json();
        console.log("Cron Result:", data);
    } catch (error) {
        console.error("Error during cron run:", error);
    }
});
