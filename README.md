# PC Part Inventory

Inventory app using express and postgres

## Note for development

### Database schema

#### Category

- id INT PRIMARY KEY
- name VARCHAR(10)

#### Brand

- id INT PRIMARY KEY
- name VARCHAR(20)
- website TEXT

#### Parts

- id INT PRIMARY KEY
- name TEXT
- category_id FOREIGN KEY
- brand_id FOREIGN KEY
- create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
