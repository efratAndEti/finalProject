CREATE SCHEMA `db` ;
-- create client table
CREATE TABLE `db`.`client` (
  `id_client` INT NOT NULL AUTO_INCREMENT,
  `last_name` VARCHAR(45) NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `birth_date` DATE NOT NULL,
  `disability_perc` INT NOT NULL,
  `eligibility_hours` INT NOT NULL,
  `client_status` INT NOT NULL,
  `history` DATE NULL,
  PRIMARY KEY (`id_client`));
  ALTER TABLE `db`.`client` 
CHANGE COLUMN `id_client` `id_client` INT NOT NULL ;
-- crate employee table
CREATE TABLE `db`.`employee` (
  `emp_id` INT NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `end_visa_period` DATE NULL,
  `type` INT NOT NULL,
  PRIMARY KEY (`emp_id`));
  
  -- create status table
  CREATE TABLE `db`.`status` (
  `id_status` INT NOT NULL AUTO_INCREMENT,
  `status_type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_status`));
  
  -- create emloyee_type table
  CREATE TABLE `db`.`employee_type` (
  `id_emp_type` INT NOT NULL AUTO_INCREMENT,
  `emp_type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_emp_type`));
  
  -- create table messages
  CREATE TABLE `db`.`messages` (
  `id_msg` INT NOT NULL AUTO_INCREMENT,
  `from` VARCHAR(45) NOT NULL,
  `to` VARCHAR(45) NOT NULL,
  `title` VARCHAR(45) NULL,
  `content` VARCHAR(1000) NOT NULL,
  PRIMARY KEY (`id_msg`));
  
  -- crate matav table
  CREATE TABLE `db`.`schedule_matav` (
  `code` INT NOT NULL AUTO_INCREMENT,
  `id_matav` INT NOT NULL,
  `day` INT NOT NULL,
  `start` INT NOT NULL,
  `end` INT NOT NULL,
  PRIMARY KEY (`code`));
  -- alter
  ALTER TABLE `db`.`employee` 
ADD COLUMN `status_emp` INT NOT NULL AFTER `type`;
  
  -- fo


