-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 06, 2021 at 02:10 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.6

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
('fi', 'fikri awok', 'amdfikri35@gmail.com', '$2b$10$XlHUOBbjkPU7Tfq8IN4FzeJmbxvKW.w6nTK9YE..xF0Q8smmdUgxS', '55544adasd', NULL, NULL, 'notActive', NULL, NULL, NULL, NULL, NULL, NULL, '2021-11-06 11:58:21', NULL),
('fikriiiiiiii', 'fikri awok', 'amdfikri35@gmail.comd', '$2b$10$dZa5xAsz3uTIpP6Hem8BluNu/TZKxGBiLeDiYCL0CUQq2G2eLN.by', '555', NULL, NULL, 'notActive', NULL, NULL, NULL, NULL, NULL, NULL, '2021-11-06 11:56:06', NULL),
('fikriiiiiiii44', 'fikri awok', 'fikrinadzif35@gmail.com', '$2b$10$tAEaueVxRXt1gbf5U63OV.jwZYt613ctRf.Sd.dES92enjGhY7.hK', '55544', NULL, NULL, 'notActive', NULL, NULL, NULL, NULL, NULL, NULL, '2021-11-06 11:57:42', NULL),
('pekerjadua', 'pekerja dua', 'pekerjadua@mail.com', 'pekerjadua', '081233', 'freelancer', NULL, 'notActive', NULL, NULL, NULL, NULL, NULL, NULL, '2021-11-06 06:46:25', NULL),
('pekerjaempat', 'pekerja empat', 'pekerjaempat@mail.com', '$2b$10$VWQ122U.vByDurK6G.83Y.AgoBuVSM0m73YZ.jgO9c6phTseImuPO', '444', NULL, NULL, 'notActive', NULL, NULL, NULL, NULL, NULL, NULL, '2021-11-06 10:22:07', NULL),
('pekerjasatu', 'pekerja satu', 'pekerjasatu@mail.com', 'pekerjasatu', '08123', 'freelancer', NULL, 'notActive', NULL, NULL, NULL, NULL, NULL, NULL, '2021-11-06 06:45:23', NULL),
('pekerjasatusdadada', 'pekerja tiga', 'pekerjasatu@mail.comasdasd', '123', '081232342343', NULL, NULL, 'notActive', NULL, NULL, NULL, NULL, NULL, NULL, '2021-11-06 10:18:11', NULL);

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
-- Table structure for table `portfolio`
--

CREATE TABLE `portfolio` (
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
-- Indexes for table `portfolio`
--
ALTER TABLE `portfolio`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `skill`
--
ALTER TABLE `skill`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
