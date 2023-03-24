CREATE TABLE `accounts` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`userId` varchar(36),
	`type` varchar(255),
	`provider` varchar(255),
	`providerAccountId` varchar(255),
	`refresh_token` varchar(255),
	`access_token` varchar(255),
	`expires_at` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` varchar(255),
	`session_state` varchar(255),
	`oauth_token_secret` varchar(255),
	`oauth_token` varchar(255));

CREATE TABLE `categories` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(20) NOT NULL,
	`level` int NOT NULL DEFAULT 0,
	`icon` varchar(255),
	`parent_id` int);

CREATE TABLE `templateCategories` (
	`template_id` int NOT NULL,
	`category_id` int NOT NULL);

CREATE TABLE `templates` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(50) NOT NULL);

CREATE TABLE `transactions` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`wallet_id` int NOT NULL,
	`category_id` int NOT NULL,
	`paid_with_wallet_id` int,
	`paid_with_category_id` int,
	`amount` int NOT NULL,
	`note` varchar(255),
	`is_exclude_from_report` int DEFAULT 0);

CREATE TABLE `wallets` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(50) NOT NULL,
	`currency` varchar(20) NOT NULL DEFAULT 'THB',
	`balance` int NOT NULL,
	`type` varchar(20) NOT NULL,
	`icon` varchar(255),
	`template_id` int NOT NULL);

CREATE TABLE `sessions` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`userId` varchar(36),
	`expires` timestamp,
	`sessionToken` varchar(255));

CREATE TABLE `users` (
	`id` varchar(36) PRIMARY KEY NOT NULL,
	`name` varchar(50) NOT NULL,
	`username` varchar(50) NOT NULL,
	`password` varchar(50),
	`email` varchar(50),
	`emailVerified` varchar(50),
	`image` varchar(255));

CREATE TABLE `verification_tokens` (
	`identifier` varchar(255),
	`token` varchar(255),
	`expires` timestamp);

CREATE UNIQUE INDEX unique_tem_cat ON templateCategories (`template_id`,`category_id`);
CREATE UNIQUE INDEX unique_name ON templates (`name`);
CREATE UNIQUE INDEX unique_token ON verification_tokens (`token`);
CREATE UNIQUE INDEX unique_ident_token ON verification_tokens (`identifier`,`token`);