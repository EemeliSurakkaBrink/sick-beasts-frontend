# Seeder Setup Guide

Before you can run the seeders to populate your Sanity CMS with data, you need to set up a Sanity API token with write permissions.

## Creating a Sanity API Token

1. Go to [https://www.sanity.io/manage](https://www.sanity.io/manage)
2. Select your project 
3. Navigate to "API" tab
4. Click "Add API token"
5. Name it something like "Data Seeders"
6. Set token permissions to "Editor" (needs write access)
7. Copy the generated token

## Adding the Token to Your Environment

Add the token to your `.env.local` file in the project root:

```
SANITY_API_TOKEN="your-token-here"
```

Replace `your-token-here` with the actual token you copied from Sanity.

## Running the Seeders

Once you've set up the token, you can run the seeders:

```bash
npm run seed
```

Or to seed only products:

```bash
npm run seed:products
``` 