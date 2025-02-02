CREATE TABLE `api_keys` (
	`id` text PRIMARY KEY NOT NULL,
	`api_key` text NOT NULL,
	`user_id` text NOT NULL,
	`is_active` text DEFAULT 'active' NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`expires_at` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `api_keys_api_key_unique` ON `api_keys` (`api_key`);--> statement-breakpoint
CREATE UNIQUE INDEX `api_keys_user_id_unique` ON `api_keys` (`user_id`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`email_verified_at` text,
	`status` text DEFAULT 'inactive' NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE TABLE `verification_tokens` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`token` text NOT NULL,
	`email` text NOT NULL,
	`expires_at` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`email`) REFERENCES `users`(`email`) ON UPDATE cascade ON DELETE cascade
);
