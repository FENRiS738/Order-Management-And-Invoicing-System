# Order Management and Invoicing System

## Problem Statement
Businesses often face challenges in managing customer orders, tracking their status, and ensuring smooth invoicing and payment workflows. This project addresses these challenges by providing an end-to-end solution that manages customer and order data, automates invoicing, and facilitates payment acknowledgment for each order. The goal is to streamline order processing while keeping data secure and organized.

## Solution Overview
This application is designed to:
1. **Store and Manage Customer and Order Data**: Uses Airtable as a cloud-based database to handle customer information and orders with a one-to-many relationship (each customer can have multiple orders).
2. **Generate and Deliver Invoices**: Upon order creation, the app generates a detailed invoice using the Google Docs Custom Invoice Template and sends an acknowledgment link to the client.
3. **Enable Client Acknowledgment and Payment**: Clients can acknowledge their orders through a link, which redirects them to the payment page for secure transaction completion.
4. **Automate Data Synchronization**: Streamlines the data pipeline by automatically storing new entries in Airtable after data submission in the application.

By leveraging Node.js, Express, HTMX, and Airtable, this app provides an efficient and automated order management system with a focus on customer communication and payment facilitation.

## Requirements Analysis

### Functional Requirements
- **Customer Data Management**: Capture and store customer details.
- **Order Management**: Handle multiple orders for each customer and manage the one-to-many data relationship.
- **Invoice Generation**: Create invoices based on customer orders using the Google Docs Invoice Template.
- **Acknowledgment and Payment Link**: Send an acknowledgment link to the customer, which redirects to a payment page.
- **Data Storage in Airtable**: Automatically store all customer and order data in Airtable for easy access and management.

### Non-Functional Requirements
- **Automation**: Reduce manual intervention by automating data updates in Airtable.
- **Scalability**: Ensure the app can handle increased orders and customers.
- **Reliability**: Maintain data consistency between the app and Airtable.
- **Security**: Protect sensitive customer and order information.

## Setup Configuration

### Prerequisites
- **Node.js**: Ensure Node.js is installed (https://nodejs.org/)
- **Make.com and Airtable Account**: Sign up and create Make.com and Airtable account, then create the scenarios and configure the airtable base.
- **Environment Variables**: Set up a `.env` file to securely store credentials, secret keys and external uris.

### Installation Steps
1. **Clone the Repository**
   ```bash
   git clone https://github.com/FENRiS738/Sales-Manager
   cd Sales-Manager

2. **Install Dependencies**
   ```bash
   npm install

1. **Start the server**
   ```bash
    npm start

