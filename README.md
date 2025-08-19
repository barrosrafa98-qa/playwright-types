Playwright Types Project


📌 Overview

This project was created with the purpose of learning and practicing automated UI testing using Playwright
.
The main goal is to explore how to interact with all types of input fields, elements, and challenges typically found in web applications.

It serves as a hands-on learning exercise, where different pages and scenarios are tested to gain real-world experience in test automation.

🎯 Objectives

Practice manipulating different kinds of fields (buttons, checkboxes, inputs, dropdowns, alerts, etc.).

Learn how to handle dynamic content and special cases in UI automation.

Explore negative and positive testing strategies.

Gain experience in structuring Playwright test projects following good practices.

🌐 Test Website

The project uses the website The Internet
 as the test target.

Why this site?

It contains a wide variety of UI components and scenarios, making it ideal for practicing different types of automation.

It was designed for testing and learning purposes, so it’s safe to use for experimentation.

Each section of the site introduces unique challenges that help build experience in different areas of automation.

⚙️ Tech Stack

Playwright (for test automation)

Node.js (runtime environment)

JavaScript (test scripts)

📂 Project Structure

tests/ → Contains the test specifications organized by feature or challenge.

playwright.config.js → Global Playwright configuration file.

package.json → Project dependencies and scripts.

🚀 How to Run

Clone the repository:

git clone https://github.com/barrosrafa98-qa/playwright-types.git
cd playwright-types


Install dependencies:

npm install


Run all tests:

npx playwright test


View HTML report:

npx playwright show-report

⚠️ Disclaimer

This project was created for educational purposes only.
Some comments in the test files are written in Portuguese, as it made it easier for me to understand the logic while studying.
