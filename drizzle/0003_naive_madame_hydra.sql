ALTER TABLE `transactions` MODIFY COLUMN `amount` float NOT NULL;
ALTER TABLE `transactions` MODIFY COLUMN `is_exclude_from_report` boolean;
ALTER TABLE `transactions` ALTER COLUMN `is_exclude_from_report` SET DEFAULT false;
ALTER TABLE `transactions` ADD `type` varchar(50) NOT NULL;
ALTER TABLE `transactions` ADD `date` datetime NOT NULL;
ALTER TABLE `transactions` ADD `paid_with_note` varchar(255);