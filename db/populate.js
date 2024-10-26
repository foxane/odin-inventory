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
  FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE SET NULL
  );`,
];

const POPULATE_DB = [
  `INSERT INTO category (name) VALUES
  ('cpu'), 
  ('gpu'), 
  ('motherboard'), 
  ('keyboard'), 
  ('RAM'), 
  ('storage'), 
  ('power supply'), 
  ('case'), 
  ('cooling');`,

  `INSERT INTO part (name, category_id, image_url) VALUES
  ('AMD Ryzen 9 5900X 12-core, 24-Thread Unlocked Desktop Processor', 1,  '/images/item/ryzen_5900x.jpg'),
  ('AMD Ryzen 7 7700X 8-Core, 16-Thread Unlocked Desktop Processor', 1,  '/images/item/ryzen_7700x.jpg'),
  ('Intel CoreTM i9-14900K New Gaming Desktop Processor 24 (8 P-cores + 16 E-cores) with Integrated Graphics - Unlocked', 1,  '/images/item/intel_14900k.jpg'),
  ('Intel Core i7-13700K Gaming Desktop Processor 16 cores (8 P-cores + 8 E-cores) with Integrated Graphics - Unlocked', 1,  '/images/item/intel_13700k.jpg'),
  ('ASUS TUF Gaming Radeon RX 7600 XT OC Edition 16GB GDDR6 Graphics Card', 2,  '/images/item/asus_7600xt.jpg'),
  ('ASUS TUF Gaming Z790-Plus WiFi LGA 1700', 3,  '/images/item/asus_z790.jpg'),
  ('ASUS TUF Gaming B650-PLUS WIFI AMD B650 AM5 Ryzen', 3, '/images/item/asus_b650.jpg'),
  ('Logitech MK540 Advanced Wireless Keyboard and Mouse Combo', 4, '/images/item/logitech_mk540.jpg'),

  ('Corsair Vengeance LPX 16GB (2 x 8GB) DDR4-3200', 5, '/images/item/corsair_lpx.jpg'),
  ('G.Skill Ripjaws V Series 16GB (2 x 8GB) DDR4-3600', 5, '/images/item/gskill_ripjaws.jpg'),

  ('Samsung 970 EVO Plus 1TB NVMe M.2 SSD', 6, '/images/item/samsung_970.jpg'),
  ('Western Digital Blue 1TB HDD', 6, '/images/item/wd_blue.jpg'),

  ('EVGA 600 W1 80+ WHITE 600W Power Supply', 7, '/images/item/evga_600w.jpg'),
  ('Corsair RM750x 750W 80+ GOLD Power Supply', 7, '/images/item/corsair_rm750x.jpg'),

  ('NZXT H510 ATX Mid Tower Case', 8, '/images/item/nzxt_h510.jpg'),
  ('Fractal Design Meshify C Mid Tower Case', 8, '/images/item/fractal_meshify_c.jpg'),

  ('Noctua NH-D15 Premium CPU Cooler', 9, '/images/item/noctua_nh.jpg'),
  ('Cooler Master MasterLiquid ML240L RGB Liquid Cooler', 9, '/images/item/cooler_master.jpg')
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
