import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
const port = 5000;

// Middleware setup
app.use(express.json()); // For parsing application/json
app.use(cors()); // Enable CORS for all routes

// Route for the homepage
app.get("/", (req, res) => {
  res.send("AQI Backend is running");
});

// Route for sending alert email
app.post("/api/send-alert", async (req, res) => {
  const { alerts } = req.body; // We now expect the 'alerts' array

  if (!alerts || alerts.length === 0) {
    return res.status(400).json({ message: 'No alerts to send' });
  }

  // Setup email transporter (using Gmail for example)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'owaisalam.m35@gmail.com', // replace with your email
      pass: 'zroeygazkdlejgma' // replace with your email password or app password
    }
  });

  // Format alerts into a message
  const alertMessages = alerts.map(alert => {
    return `<p><strong>Time:</strong> ${alert.time}</p>
            <p><strong>Message:</strong> ${alert.message}</p>
            <p><strong>Level:</strong> ${alert.level === 'high' ? 'High Alert' : 'Low Alert'}</p>
            <hr>`;
  }).join('');

  // Mail options
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'owais.alam338@gmail.com', // recipient email
    subject: `AQI Alerts - Real-time Notifications`,
    html: `<h2>AQI Alerts</h2>${alertMessages}`, // HTML content of the email
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Alert email sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending email', error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
