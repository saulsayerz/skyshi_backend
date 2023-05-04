SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;

DROP DATABASE IF EXISTS db_skyshi;
CREATE DATABASE IF NOT EXISTS db_skyshi;
USE db_skyshi;

CREATE TABLE IF NOT EXISTS `activities` (
  `activity_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`activity_id`)
);

CREATE TABLE IF NOT EXISTS `todos` (
  `todo_id` int NOT NULL AUTO_INCREMENT,
  `activity_group_id` int NOT NULL,
  `title` varchar(256) NOT NULL,
  `priority` varchar(10),
  `is_active` BOOLEAN,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`todo_id`),
  FOREIGN KEY (`activity_group_id`) REFERENCES `activities` (`activity_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- Insert sample data into the activities table
INSERT INTO `activities` (`title`, `email`, `created_at`) VALUES
('Workout', 'jane@example.com', '2023-05-01 10:00:00'),
('Study', 'john@example.com', '2023-05-02 09:00:00'),
('Meeting', 'peter@example.com', '2023-05-03 14:00:00');

-- Insert sample data into the todos table
INSERT INTO `todos` (`activity_group_id`, `title`, `priority`, `is_active`, `created_at`) VALUES
(1, 'Push ups', 'medium', true, '2023-05-01 10:15:00'),
(1, 'Sit ups', 'medium', true, '2023-05-01 10:45:00'),
(2, 'Read book', 'medium', false, '2023-05-02 09:30:00'),
(2, 'Take notes', 'medium', true, '2023-05-02 10:30:00'),
(3, 'Prepare slides', 'medium', true, '2023-05-03 13:00:00'),
(3, 'Present findings', 'medium', false, '2023-05-03 14:30:00');

COMMIT;