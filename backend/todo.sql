-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 12, 2021 at 11:17 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `todo`
--

-- --------------------------------------------------------

--
-- Table structure for table `listtodo`
--

CREATE TABLE `listtodo` (
  `id` int(11) NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `time` time NOT NULL,
  `day` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `checks` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `listtodo`
--

INSERT INTO `listtodo` (`id`, `content`, `time`, `day`, `checks`) VALUES
(68, 'abn', '14:45:16', '2021-04-11 14:45:16', 0),
(79, 'ádas', '22:00:48', '2021-04-11 22:00:48', 0),
(80, 'ád', '22:00:49', '2021-04-11 22:00:49', 0),
(81, 'ád', '22:00:50', '2021-04-11 22:00:50', 0),
(83, 'helo', '22:00:53', '2021-04-11 22:00:53', 0),
(84, 'haha', '22:01:36', '2021-04-11 22:01:36', 0),
(85, 'haha', '22:01:38', '2021-04-11 22:01:38', 0),
(86, 'hahah', '10:08:07', '2021-04-12 10:08:07', 0),
(88, 'he', '22:05:11', '2021-04-11 22:05:11', 0),
(93, 'heh', '14:23:57', '2021-04-12 14:23:57', 0),
(94, 'haha', '14:23:22', '2021-04-12 14:23:22', 0),
(179, 'hhaa', '15:35:14', '2021-04-12 15:35:14', 0),
(180, '<h1>ád</h1>', '15:37:38', '2021-04-12 15:37:38', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `listtodo`
--
ALTER TABLE `listtodo`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `listtodo`
--
ALTER TABLE `listtodo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=181;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
