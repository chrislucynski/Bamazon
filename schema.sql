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
SELECT d.department_id, p.department_name, 
d.over_head_costs, p.product_sales,
sum(p.product_sales - d.over_head_costs) as total_profit 
FROM products p, departments d
where p.department_id = d.department_id
group by d.department_id, p.department_name, 
d.over_head_costs, p.product_salesdepartments
order by p.department_id;

SET sql_mode=(SELECT REPLACE(@@sql_mode, 'ONLY_FULL_GROUP_BY', '')); 






