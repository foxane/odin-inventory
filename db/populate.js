import pg from 'pg';
const { Client } = pg;

const CREATE_TABLE = [
  `CREATE TABLE IF NOT EXISTS category (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(20) NOT NULL);`,

  `CREATE TABLE IF NOT EXISTS part (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  image_url TEXT,
  category_id INT,
  brand_id INT,
  FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE SET NULL,
  FOREIGN KEY (brand_id) REFERENCES brand(id) ON DELETE SET NULL
  );`,
];

const POPULATE_DB = [
  `INSERT INTO category (name) VALUES('cpu'), ('gpu'), ('motherboard'), ('keyboard');`,

  `INSERT INTO part (name, category_id, brand_id, image_url) VALUES
  ('AMD Ryzen 9 5900X 12-core, 24-Thread Unlocked Desktop Processor', 1, 2, '/images/item/ryzen_5900x.jpg'),
  ('AMD Ryzen 7 7700X 8-Core, 16-Thread Unlocked Desktop Processor', 1, 2, '/images/item/ryzen_7700x.jpg'),
  ('Intel CoreTM i9-14900K New Gaming Desktop Processor 24 (8 P-cores + 16 E-cores) with Integrated Graphics - Unlocked', 1, 2, '/images/item/intel_14900k.jpg'),
  ('Intel Core i7-13700K Gaming Desktop Processor 16 cores (8 P-cores + 8 E-cores) with Integrated Graphics - Unlocked', 1, 1, '/images/item/intel_13700k.jpg' ),
  ('ASUS TUF Gaming Radeon™ RX 7600 XT OC Edition 16GB GDDR6 Graphics Card', 2, 3, '/images/item/asus_7600xt.jpg' ),
  ('ASUS TUF Gaming Z790-Plus WiFi LGA 1700', 3, 3, '/images/item/asus_z790.jpg' ),
  ('ASUS TUF Gaming B650-PLUS WIFI AMD B650 AM5 Ryzen', 3, 3, '/images/item/asus_b650.jpg' ),
  ('Logitech MK540 Advanced Wireless Keyboard and Mouse Combo', 4, 4 , '/images/item/logitech_mk540.jpg')
  ;`,
];

async function main() {
  const client = new Client({
    connectionString: process.argv[2],
  });
  try {
    await client.connect();

    for (const q of CREATE_TABLE) {
      await client.query(q);
    }

    for (const q of POPULATE_DB) {
      await client.query(q);
    }

    console.log('Success');
  } catch (error) {
    console.log(error);
  } finally {
    client.end();
  }
}

main();
