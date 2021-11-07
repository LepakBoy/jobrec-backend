-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 07, 2021 at 05:17 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jobrec`
--

-- --------------------------------------------------------

--
-- Table structure for table `pekerja`
--

CREATE TABLE `pekerja` (
  `username` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(277) NOT NULL,
  `password` varchar(277) NOT NULL,
  `nohp` varchar(15) NOT NULL,
  `jobdesk` varchar(100) DEFAULT NULL,
  `domisili` varchar(100) DEFAULT NULL,
  `accountStatus` varchar(32) NOT NULL DEFAULT 'notActive',
  `url_ig` varchar(100) DEFAULT NULL,
  `url_gitlab` varchar(100) DEFAULT NULL,
  `url_github` varchar(100) DEFAULT NULL,
  `deskripsi` longtext DEFAULT NULL,
  `avatar` varchar(277) DEFAULT NULL,
  `isActive` enum('isActive','noActive') DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pekerja`
--

INSERT INTO `pekerja` (`username`, `name`, `email`, `password`, `nohp`, `jobdesk`, `domisili`, `accountStatus`, `url_ig`, `url_gitlab`, `url_github`, `deskripsi`, `avatar`, `isActive`, `createdAt`, `updatedAt`) VALUES
('ez', 'ezlife', 'ezlife9909@gmail.com', '$2b$10$2uNWxhZ7kGwfLlrQhJgKLe.Ly3fZMIUFp5FBUjHVGwTx6w30dusey', '555443123adasd', NULL, NULL, 'notActive', NULL, NULL, NULL, NULL, NULL, NULL, '2021-11-06 16:30:25', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pengalaman`
--

CREATE TABLE `pengalaman` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `nama_perusahaan` varchar(100) NOT NULL,
  `posisi` varchar(100) NOT NULL,
  `tgl_masuk` date NOT NULL,
  `tgl_keluar` date NOT NULL,
  `deskripsi` longtext NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `perekrut`
--

CREATE TABLE `perekrut` (
  `id` int(11) NOT NULL,
  `nama_lengkap` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `bidang` varchar(100) NOT NULL,
  `domisi` varchar(100) NOT NULL,
  `deskripsi` longtext NOT NULL,
  `url_ig` varchar(100) NOT NULL,
  `url_linkedin` varchar(100) NOT NULL,
  `nohp` varchar(15) NOT NULL,
  `password` varchar(100) NOT NULL,
  `isActive` enum('notActive','active') NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `portofolio`
--

CREATE TABLE `portofolio` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `nama_applikasi` varchar(100) NOT NULL,
  `link_repository` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `skill`
--

CREATE TABLE `skill` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `nama_skill` varchar(100) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `skill`
--

INSERT INTO `skill` (`id`, `username`, `nama_skill`, `createdAt`, `updatedAt`) VALUES
(1, 'ez', 'Php', '2021-11-06 16:49:32', NULL),
(2, 'ez', 'JSsX', '2021-11-06 16:50:10', NULL),
(3, 'ez', 'JS', '2021-11-06 16:50:22', NULL),
(4, 'ez', 'JS', '2021-11-06 16:50:35', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pekerja`
--
ALTER TABLE `pekerja`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pengalaman`
--
ALTER TABLE `pengalaman`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `perekrut`
--
ALTER TABLE `perekrut`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `portofolio`
--
ALTER TABLE `portofolio`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `skill`
--
ALTER TABLE `skill`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pengalaman`
--
ALTER TABLE `pengalaman`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `perekrut`
--
ALTER TABLE `perekrut`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `portofolio`
--
ALTER TABLE `portofolio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `skill`
--
ALTER TABLE `skill`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
