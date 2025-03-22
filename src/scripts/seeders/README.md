# Sanity CMS Data Seeders

This directory contains data seeders for the Sick Beasts e-commerce store, which populate Sanity CMS with initial data. The seeders are designed to work similar to Laravel's database seeders, allowing you to populate your CMS with test or initial data with a single command.

## Available Seeders

- **Products Seeder**: Seeds product data including t-shirt designs with images, pricing, descriptions, and sustainability information

## Usage

To run all seeders at once:

```bash
npm run seed
```

To run a specific seeder:

```bash
npm run seed:products  # Runs only the products seeder
```

Or you can use the more flexible format:

```bash
npm run seed -- --only products
```

## Adding New Seeders

1. Create a new seeder file in this directory (e.g., `categorySeeder.ts`)
2. Export a main function (e.g., `seedCategories`)
3. Register the new seeder in `index.ts` by adding it to the `seeders` object
4. Add a new npm script in `package.json` for convenience if needed

## Seeder Structure

Each seeder follows this general pattern:

1. Define the data to be seeded
2. Check if the data already exists to avoid duplicates
3. Transform the data to match Sanity's document structure
4. Upload or reference required assets (e.g., images)
5. Create the documents in Sanity CMS

## Image Handling

For seeders that require images (like the product seeder):

1. Place your images in the appropriate folder (e.g., `public/images/dummy-shirts/`)
2. Reference the image filenames in your seeder data
3. The seeder will upload the images to Sanity and link them to the created documents

## Error Handling

Each seeder includes error handling to:

- Skip documents that already exist (to avoid duplicates)
- Log warnings when assets (like images) can't be found
- Report any errors during the seeding process 