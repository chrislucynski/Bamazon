-- <-----DEPARTMENTS----->
DROP TABLE departments;

CREATE TABLE departments(
department_id INT(10) AUTO_INCREMENT NOT NULL,
department_name VARCHAR (50) NOT NULL,
over_head_costs DECIMAL(10, 2) NOT NULL,
PRIMARY KEY(department_id)
);

INSERT INTO departments (department_id, department_name, over_head_costs)
	VALUES('1', 'Medications', '150000.00'), 
		('2', 'Medical Supplies', '75000.00');

select * from departments where department_name= 'Medical Supplies';
 

--  <-----PRODUCTS----->
CREATE TABLE products(
item_id INT AUTO_INCREMENT NOT NULL,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(50) NOT NULL,
price DECIMAL (10, 2) NOT NULL,
stock_quantity INT(25),
PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUES('wheelchair', 'Medical Supplies', '250.00', '40'),
    ('oxygen tank', 'Medications', '50.00', '250'),
    ('heating pad', 'Medical Supplies', '375.00', '15'),
    ('generic aspirin', 'Medications', '8.00', '500'),
    ('walker', 'Medical Supplies', '62.00', '25'),
    ('generic steroid cream', 'Medications', '12.00', '75'),
    ('generic beta-blocker', 'Medications', '10.00', '500'),
    ('generic stool softener', 'Medications', '10.00', '150'),
    ('medical bed', 'Medical Supplies', '3750.00', '5'),
    ('wound care supplies kit', 'Medical Supplies', '50.00', '50');

select * from products;

UPDATE products set department_id = 2 where department_name = 'Medications';

ALTER TABLE products
	ALTER department_id SET DEFAULT '0';


-- <-----INNER JOIN----->
SELECT d.department_id, p.department_name, 
d.over_head_costs, 
sum(p.product_sales) as total_product_sales,
sum(p.product_sales - d.over_head_costs) as total_profit 
FROM products p, departments d
where p.department_id = d.department_id
group by d.department_id, p.department_name, 
d.over_head_costs  
order by p.department_id;

-- OR THIS --
-- SELECT d.department_id, p.department_name, 
-- d.over_head_costs, p.product_sales,
-- sum(p.product_sales - d.over_head_costs) as total_profit 
-- FROM products p, departments d
-- where p.department_id = d.department_id
-- group by d.department_id, p.department_name, 
-- d.over_head_costs, p.product_salesdepartments
-- order by p.department_id;

-- SET sql_mode=(SELECT REPLACE(@@sql_mode, 'ONLY_FULL_GROUP_BY', '')); 






