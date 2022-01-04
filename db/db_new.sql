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
-- foreign keys to employee
ALTER TABLE `db`.`employee` 
ADD INDEX `status_emp_idx` (`status_emp` ASC) VISIBLE,
ADD INDEX `type_to_emp_idx` (`type` ASC) VISIBLE;
;
ALTER TABLE `db`.`employee` 
ADD CONSTRAINT `status_to_emp`
  FOREIGN KEY (`status_emp`)
  REFERENCES `db`.`status` (`id_status`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `type_to_emp`
  FOREIGN KEY (`type`)
  REFERENCES `db`.`employee_type` (`id_emp_type`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
  
  -- apdate client table
  ALTER TABLE `db`.`client` 
ADD COLUMN `genous` VARCHAR(45) NULL AFTER `history`,
ADD COLUMN `genus` BIT NOT NULL AFTER `genous`,
ADD COLUMN `phone` VARCHAR(10) NOT NULL AFTER `genus`,
ADD COLUMN `mail` VARCHAR(45) NOT NULL AFTER `phone`,
ADD COLUMN `address` VARCHAR(45) NULL AFTER `mail`,
ADD COLUMN `city` VARCHAR(45) NOT NULL AFTER `address`,
ADD COLUMN `password` VARCHAR(45) NOT NULL AFTER `city`,
ADD COLUMN `DegreeOfNursing` INT NOT NULL AFTER `password`,
ADD COLUMN `HoursOut` INT NULL AFTER `DegreeOfNursing`,
ADD COLUMN `HoursOutPrice` DOUBLE NULL AFTER `HoursOut`;

-- apdate employee table
ALTER TABLE `db`.`employee` 
ADD COLUMN `genus` BIT NOT NULL AFTER `status_emp`,
ADD COLUMN `address` VARCHAR(45) NULL AFTER `genus`,
ADD COLUMN `city` VARCHAR(45) NOT NULL AFTER `address`,
ADD COLUMN `phone` VARCHAR(10) NOT NULL AFTER `city`,
ADD COLUMN `password` VARCHAR(45) NOT NULL AFTER `phone`,
ADD COLUMN `mail` VARCHAR(45) NOT NULL AFTER `password`,
ADD COLUMN `birth_date` DATE NULL AFTER `mail`;
-- apdate massege table
ALTER TABLE `db`.`messages` 
ADD COLUMN `date` DATE NOT NULL AFTER `content`,
ADD COLUMN `ifRead` BIT NOT NULL AFTER `date`;
-- create opinion table
CREATE TABLE `db`.`opinion` (
  `idOpinion` INT NOT NULL,
  `clientId` INT NOT NULL,
  `empId` INT NOT NULL,
  `rank` INT NOT NULL,
  `description` VARCHAR(200) NULL,
  PRIMARY KEY (`idOpinion`));
  -- create 
  
  -- create status disabillity
  CREATE TABLE `db`.`status_disability` (
  `idstatus_disability` INT NOT NULL,
  `descripition` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idstatus_disability`));
ALTER TABLE `db`.`preferences` 
ADD INDEX `pref_to_emp_idx`employee (`emp_id` ASC) VISIBLE,
ADD INDEX `pref_tp_dis_idx` (`status_client` ASC) VISIBLE;
;

ALTER TABLE `db`.`preferences` 
ADD CONSTRAINT `pref_to_emp`
  FOREIGN KEY (`emp_id`)
  REFERENCES `db`.`employee` (`emp_id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `pref_tp_dis`
  FOREIGN KEY (`status_client`)
  REFERENCES `db`.`status_disability` (`idstatus_disability`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `db`.`opinion` 
ADD INDEX `op_to_emp_idx` (`empId` ASC) VISIBLE,
ADD INDEX `op_to_client_idx` (`clientId` ASC) VISIBLE;
;
ALTER TABLE `db`.`opinion` 
ADD CONSTRAINT `op_to_emp`
  FOREIGN KEY (`empId`)
  REFERENCES `db`.`employee` (`emp_id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `op_to_client`
  FOREIGN KEY (`clientId`)
  REFERENCES `db`.`client` (`id_client`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

CREATE TABLE `db`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `user_kind` BIT NOT NULL,
  PRIMARY KEY (`id`));
ALTER TABLE `db`.`users` 
ADD COLUMN `last_name` VARCHAR(45) NOT NULL AFTER `user_kind`,
ADD COLUMN `first_name` VARCHAR(45) NOT NULL AFTER `last_name`;

  
SELECT * FROM db.messages;
insert into db.client values(1234344,'לוי','כהן',curdate(),1, 1,0,curdate(),0,'123','123','123','123','123',1,1, 1)