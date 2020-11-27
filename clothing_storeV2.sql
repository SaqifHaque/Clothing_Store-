-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 27, 2020 at 06:41 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `clothing_store`
--

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `cart_Id` int(5) NOT NULL,
  `p_Id` int(5) NOT NULL,
  `u_Id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`cart_Id`, `p_Id`, `u_Id`) VALUES
(2, 3, 0),
(3, 6, 0),
(4, 1, 1),
(5, 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `c_Id` int(5) NOT NULL,
  `c_name` varchar(100) NOT NULL,
  `gender` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`c_Id`, `c_name`, `gender`) VALUES
(1, 'Shirts', 'Male'),
(2, 'Pants', 'Male'),
(3, 'Salwar', 'Female'),
(4, 'Shari', 'Female');

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

CREATE TABLE `invoice` (
  `inv_Id` int(11) NOT NULL,
  `products` varchar(100) NOT NULL,
  `total` varchar(100) NOT NULL,
  `card` varchar(100) NOT NULL,
  `date` varchar(100) NOT NULL,
  `u_Id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `notices`
--

CREATE TABLE `notices` (
  `n_Id` int(5) NOT NULL,
  `n_details` varchar(100) NOT NULL,
  `posted_by` varchar(100) NOT NULL,
  `date` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notices`
--

INSERT INTO `notices` (`n_Id`, `n_details`, `posted_by`, `date`) VALUES
(1, 'Welcome to Clothing Store', 'Admin', '11/11/20'),
(2, 'Choose Your favorite porduct and purchase it seemlessly.', 'Admin', '11/11/20');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `o_Id` int(5) NOT NULL,
  `products` varchar(100) NOT NULL,
  `total` varchar(100) NOT NULL,
  `u_Id` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `p_Id` int(11) NOT NULL,
  `p_name` varchar(20) NOT NULL,
  `price` varchar(20) NOT NULL,
  `size` varchar(20) NOT NULL,
  `p_description` varchar(100) NOT NULL,
  `p_image` varchar(100) NOT NULL,
  `c_Id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`p_Id`, `p_name`, `price`, `size`, `p_description`, `p_image`, `c_Id`) VALUES
(1, 'Addidas Pant', '500', 'S,M,XL', 'Very Comfy Pants ', '', 2),
(2, 'Jamdani Shari ', '1000', 'S,M,XL', 'Very silky shari', '', 4),
(3, 'Puma Pants', '500', 'S,M,XL', 'Comfy Pants', '', 2),
(4, 'Silk Shari Premium ', '2000', 'S,M,XL', 'Premium Shari', '', 4),
(5, 'Gucci Shirt', '1500', 'S,M,XL', 'Comfy shirt', '', 1),
(6, 'Raymond Shirt', '1800', 'S,M,XL', 'Premium Formal Shirt', '', 1),
(7, 'Pakistani Salwar', '800', 'S,M,XL', 'Beautiful Salwar', '', 3),
(8, 'Indian Salwar', '1000', 'S,M,XL', 'Beautiful and luxurious salwar', '', 3);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `bloodgroup` varchar(100) NOT NULL,
  `phonenumber` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `profilepic` varchar(100) NOT NULL,
  `type` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL,
  `gender` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `bloodgroup`, `phonenumber`, `password`, `profilepic`, `type`, `status`, `gender`) VALUES
(1, 'Saqif', 'saqifhaque@gmail.com', 'B+', '01845435118', 'MTIzNA==', '', 'User', 'Verified', 'Male');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`cart_Id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`c_Id`);

--
-- Indexes for table `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`inv_Id`);

--
-- Indexes for table `notices`
--
ALTER TABLE `notices`
  ADD PRIMARY KEY (`n_Id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`o_Id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`p_Id`),
  ADD KEY `products_ibfk_1` (`c_Id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `cart_Id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `c_Id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `invoice`
--
ALTER TABLE `invoice`
  MODIFY `inv_Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notices`
--
ALTER TABLE `notices`
  MODIFY `n_Id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `o_Id` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `p_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`c_Id`) REFERENCES `category` (`c_Id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
