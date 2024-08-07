CREATE DATABASE  IF NOT EXISTS `user_system` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `user_system`;
-- MySQL dump 10.13  Distrib 8.0.36, for macos14 (arm64)
--
-- Host: 127.0.0.1    Database: user_system
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Temporary view structure for view `availablecourses`
--

DROP TABLE IF EXISTS `availablecourses`;
/*!50001 DROP VIEW IF EXISTS `availablecourses`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `availablecourses` AS SELECT 
 1 AS `CourseID`,
 1 AS `CourseName`,
 1 AS `Location`,
 1 AS `StartDate`,
 1 AS `TimeSlot`,
 1 AS `DayOfWeek`,
 1 AS `TotalWeeks`,
 1 AS `AvailableSpots`,
 1 AS `CoachFirstName`,
 1 AS `CoachLastName`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `Bookings`
--

DROP TABLE IF EXISTS `Bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Bookings` (
  `BookingID` int NOT NULL AUTO_INCREMENT,
  `CourseID` int DEFAULT NULL,
  `StudentID` int DEFAULT NULL,
  `DateBooked` date DEFAULT NULL,
  `TimeBooked` datetime DEFAULT NULL,
  PRIMARY KEY (`BookingID`),
  KEY `CourseID` (`CourseID`),
  KEY `StudentID` (`StudentID`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `Courses` (`CourseID`),
  CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`StudentID`) REFERENCES `Students` (`StudentID`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Bookings`
--

LOCK TABLES `Bookings` WRITE;
/*!40000 ALTER TABLE `Bookings` DISABLE KEYS */;
INSERT INTO `Bookings` VALUES (16,2,1,'2024-07-11','2024-07-11 23:45:39'),(26,2,11,'2024-07-27','2024-07-27 15:52:23'),(27,2,12,'2024-07-27','2024-07-27 15:54:02'),(28,3,8,'2024-07-30','2024-07-30 14:46:04'),(29,4,9,'2024-07-30','2024-07-30 14:48:40'),(30,3,16,'2024-07-30','2024-07-30 20:19:43'),(31,5,17,'2024-07-30','2024-07-30 20:23:14'),(32,5,19,'2024-07-30','2024-07-30 21:02:09'),(33,5,18,'2024-07-30','2024-07-30 21:02:16'),(34,5,19,'2024-07-30','2024-07-30 21:02:20'),(35,5,18,'2024-07-30','2024-07-30 21:02:25'),(36,3,2,'2024-08-02','2024-08-02 22:19:56'),(37,5,21,'2024-08-04','2024-08-04 13:53:00'),(38,5,22,'2024-08-04','2024-08-04 13:58:04');
/*!40000 ALTER TABLE `Bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Coaches`
--

DROP TABLE IF EXISTS `Coaches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Coaches` (
  `CoachID` int NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(50) NOT NULL,
  `LastName` varchar(50) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Phone` varchar(20) DEFAULT NULL,
  `DateOfBirth` date NOT NULL,
  `Address` varchar(255) NOT NULL,
  `HireDate` date NOT NULL,
  PRIMARY KEY (`CoachID`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Coaches`
--

LOCK TABLES `Coaches` WRITE;
/*!40000 ALTER TABLE `Coaches` DISABLE KEYS */;
INSERT INTO `Coaches` VALUES (1,'Sharon','Yeh','sharon.Yeh@example.com','555-1234','1995-07-15','1234 Elm Street','2019-01-01'),(2,'Jane','Smith','jane.smith@example.com','555-5678','1982-08-25','2345 Oak Avenue','2019-06-15'),(3,'Jim','Taylor','jim.taylor@example.com','555-8765','1979-12-30','3456 Pine Road','2018-03-20'),(4,'Julia','Lee','julia.lee@example.com','555-4321','1984-05-05','4567 Maple Lane','2020-11-11'),(5,'Jacob','Brown','jacob.brown@example.com','555-6789','1975-10-10','5678 Cedar Blvd','2017-07-07');
/*!40000 ALTER TABLE `Coaches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Courses`
--

DROP TABLE IF EXISTS `Courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Courses` (
  `CourseID` int NOT NULL AUTO_INCREMENT,
  `CourseName` varchar(100) NOT NULL,
  `Location` varchar(255) NOT NULL,
  `StartDate` date DEFAULT NULL,
  `TimeSlot` varchar(20) DEFAULT NULL,
  `DayOfWeek` varchar(10) DEFAULT NULL,
  `CoachID` int DEFAULT NULL,
  `TotalWeeks` int DEFAULT NULL,
  `AvailableSpots` int DEFAULT NULL,
  PRIMARY KEY (`CourseID`),
  KEY `CoachID` (`CoachID`),
  CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`CoachID`) REFERENCES `Coaches` (`CoachID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Courses`
--

LOCK TABLES `Courses` WRITE;
/*!40000 ALTER TABLE `Courses` DISABLE KEYS */;
INSERT INTO `Courses` VALUES (1,'1v1 Baby Class','Community Center','2025-01-03','12:00-13:00','Wednesday',3,10,0),(2,'1v1 Toddler Swimming Intro','Local Pool','2025-01-02','12:00-13:00','Tuesday',2,10,0),(3,'1v1 Adult Swim Beginners','Local Pool','2025-01-01','12:00-13:00','Monday',1,10,4),(4,'3v1 Water Babies Class','Community Center','2025-01-04','12:00-13:00','Thursday',4,10,6),(5,'4v1 Little Swimmers Level 1','Local Pool','2025-01-05','12:00-13:00','Friday',5,10,2);
/*!40000 ALTER TABLE `Courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CourseSessions`
--

DROP TABLE IF EXISTS `CourseSessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CourseSessions` (
  `SessionID` int NOT NULL AUTO_INCREMENT,
  `CourseID` int DEFAULT NULL,
  `Date` date DEFAULT NULL,
  `TimeSlot` varchar(20) DEFAULT NULL,
  `WeekNumber` int DEFAULT NULL,
  PRIMARY KEY (`SessionID`),
  KEY `CourseID` (`CourseID`),
  CONSTRAINT `coursesessions_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `Courses` (`CourseID`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CourseSessions`
--

LOCK TABLES `CourseSessions` WRITE;
/*!40000 ALTER TABLE `CourseSessions` DISABLE KEYS */;
INSERT INTO `CourseSessions` VALUES (1,1,'2025-01-01','12:00-13:00',1),(2,1,'2025-01-08','12:00-13:00',2),(3,1,'2025-01-15','12:00-13:00',3),(4,1,'2025-01-22','12:00-13:00',4),(5,1,'2025-01-29','12:00-13:00',5),(6,1,'2025-02-05','12:00-13:00',6),(7,1,'2025-02-12','12:00-13:00',7),(8,1,'2025-02-19','12:00-13:00',8),(9,1,'2025-02-26','12:00-13:00',9),(10,1,'2025-03-04','12:00-13:00',10),(11,2,'2025-01-01','12:00-13:00',1),(12,2,'2025-01-08','12:00-13:00',2),(13,2,'2025-01-15','12:00-13:00',3),(14,2,'2025-01-22','12:00-13:00',4),(15,2,'2025-01-29','12:00-13:00',5),(16,2,'2025-02-05','12:00-13:00',6),(17,2,'2025-02-12','12:00-13:00',7),(18,2,'2025-02-19','12:00-13:00',8),(19,2,'2025-02-26','12:00-13:00',9),(20,2,'2025-03-04','12:00-13:00',10),(21,3,'2025-07-18','10:00-11:00',1),(22,3,'2025-07-19','10:00-11:00',2),(23,3,'2025-07-20','10:00-11:00',3),(24,4,'2025-07-18','11:00-12:00',1),(25,4,'2025-07-19','11:00-12:00',2),(26,4,'2025-07-20','11:00-12:00',3),(27,5,'2025-07-18','12:00-13:00',1),(28,5,'2025-07-19','12:00-13:00',2),(29,5,'2025-07-20','12:00-13:00',3);
/*!40000 ALTER TABLE `CourseSessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `milestone_id` int DEFAULT NULL,
  `item_name` varchar(255) NOT NULL,
  `description` text,
  PRIMARY KEY (`item_id`),
  KEY `milestone_id` (`milestone_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (1,1,'Water Adaptation','Feels relaxed and comfortable in the water'),(2,1,'Face Wetting','Accepts face getting wet'),(3,1,'Surface Splashing','Able to splash the water surface with hands'),(4,1,'Water Play','Participates in simple interactive water games'),(5,2,'Board Support Floating','Able to float with the help of a float board'),(6,2,'Gentle Kicking','Able to gently kick the water with legs'),(7,2,'Back Float','Able to float on the back with coach\'s assistance'),(8,2,'Simple Diving','Able to dive briefly'),(9,3,'Independent Floating','Able to float independently for a short time'),(10,3,'Autonomous Diving','Able to perform simple diving actions independently'),(11,3,'Breathing Practice','Able to practice simple underwater breathing'),(12,3,'Short Distance Swimming','Able to swim a short distance with coach\'s assistance'),(13,4,'Independent Water Entry','Able to enter the water safely without assistance'),(14,4,'Autonomous Breathing','Able to breathe independently in the water'),(15,4,'Basic Swimming Movements','Able to perform simple swimming strokes, such as freestyle or breaststroke'),(16,4,'Confident Swimming','Able to swim confidently in the water without relying on float boards or other aids');
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `milestones`
--

DROP TABLE IF EXISTS `milestones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `milestones` (
  `milestone_id` int NOT NULL AUTO_INCREMENT,
  `milestone_name` varchar(255) NOT NULL,
  `description` text,
  PRIMARY KEY (`milestone_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `milestones`
--

LOCK TABLES `milestones` WRITE;
/*!40000 ALTER TABLE `milestones` DISABLE KEYS */;
INSERT INTO `milestones` VALUES (1,'Little Fun Time','Basic adaptation to water'),(2,'Little Floater','Initial floating skills'),(3,'Little Explorer','Advanced skills exploration'),(4,'Little Swimmer','Independent swimming skills');
/*!40000 ALTER TABLE `milestones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `progress`
--

DROP TABLE IF EXISTS `progress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `progress` (
  `progress_id` int NOT NULL AUTO_INCREMENT,
  `student_id` int DEFAULT NULL,
  `item_id` int DEFAULT NULL,
  `completion_date` date DEFAULT NULL,
  `coach_signature` varchar(255) DEFAULT NULL,
  `notes` text,
  PRIMARY KEY (`progress_id`),
  KEY `student_id` (`student_id`),
  KEY `item_id` (`item_id`),
  CONSTRAINT `progress_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`StudentID`),
  CONSTRAINT `progress_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `items` (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `progress`
--

LOCK TABLES `progress` WRITE;
/*!40000 ALTER TABLE `progress` DISABLE KEYS */;
INSERT INTO `progress` VALUES (1,1,1,'2023-06-15','Coach A','Completed successfully'),(2,1,2,'2023-06-16','Coach A','Enjoyed the activity'),(3,1,3,'2023-06-17','Coach A','No issues'),(4,1,4,'2023-06-18','Coach A','Very comfortable in water'),(5,2,1,'2023-06-15','Coach B','Completed successfully'),(6,2,2,'2023-06-16','Coach B','A bit hesitant at first'),(7,2,3,'2023-06-17','Coach B','Got better over time'),(8,2,4,'2023-06-18','Coach B','Loves water play'),(9,13,1,'2023-07-01','Test Coach','Test progress feature'),(10,13,2,'2023-07-03','Test Coach','Test progress feature'),(11,13,3,'2023-07-07','Test Coach','Test progress feature'),(12,13,4,'2023-07-11','Test Coach','Test progress feature'),(13,13,5,'2023-07-15','Test Coach','Test progress feature'),(14,13,6,'2023-07-15','Test Coach','Test progress feature'),(15,13,7,'2023-07-17','Test Coach','Test progress feature'),(16,13,8,'2023-07-17','Test Coach','Test progress feature'),(17,13,9,'2023-07-20','Test Coach','Test progress feature'),(18,13,10,'2023-07-20','Test Coach','Test progress feature'),(19,13,11,'2023-07-21','Test Coach','Test progress feature'),(20,14,1,'2023-07-01','Test Coach','Test progress feature'),(21,14,2,'2023-07-03','Test Coach','Test progress feature'),(22,14,3,'2023-07-07','Test Coach','Test progress feature'),(23,14,4,'2023-07-11','Test Coach','Test progress feature'),(24,14,5,'2023-07-15','Test Coach','Test progress feature'),(25,14,6,'2023-07-15','Test Coach','Test progress feature'),(26,14,7,'2023-07-17','Test Coach','Test progress feature'),(34,16,1,'2023-07-01','Test Coach','Test progress feature'),(35,16,2,'2023-07-03','Test Coach','Test progress feature'),(36,16,3,'2023-07-07','Test Coach','Test progress feature'),(37,16,4,'2023-07-11','Test Coach','Test progress feature'),(38,16,5,'2023-07-15','Test Coach','Test progress feature'),(39,16,6,'2023-07-15','Test Coach','Test progress feature'),(40,16,7,'2023-07-17','Test Coach','Test progress feature'),(41,17,1,'2023-07-01','Test Coach','Test progress feature'),(42,17,2,'2023-07-03','Test Coach','Test progress feature'),(43,17,3,'2023-07-07','Test Coach','Test progress feature'),(44,17,4,'2023-07-11','Test Coach','Test progress feature'),(45,17,5,'2023-07-15','Test Coach','Test progress feature'),(46,17,6,'2023-07-15','Test Coach','Test progress feature'),(47,17,7,'2023-07-17','Test Coach','Test progress feature'),(48,18,1,'2023-07-01','Test Coach','Test progress feature'),(49,18,2,'2023-07-03','Test Coach','Test progress feature'),(50,18,3,'2023-07-07','Test Coach','Test progress feature'),(51,18,4,'2023-07-11','Test Coach','Test progress feature'),(52,18,5,'2023-07-15','Test Coach','Test progress feature'),(53,18,6,'2023-07-15','Test Coach','Test progress feature'),(54,18,7,'2023-07-17','Test Coach','Test progress feature'),(55,19,1,'2023-07-01','Test Coach','Test progress feature'),(56,19,2,'2023-07-03','Test Coach','Test progress feature'),(57,19,3,'2023-07-07','Test Coach','Test progress feature'),(58,19,4,'2023-07-11','Test Coach','Test progress feature'),(59,19,5,'2023-07-15','Test Coach','Test progress feature'),(60,19,6,'2023-07-15','Test Coach','Test progress feature'),(61,19,7,'2023-07-17','Test Coach','Test progress feature'),(69,21,1,'2023-07-01','Test Coach','Test progress feature'),(70,21,2,'2023-07-03','Test Coach','Test progress feature'),(71,21,3,'2023-07-07','Test Coach','Test progress feature'),(72,21,4,'2023-07-11','Test Coach','Test progress feature'),(73,21,5,'2023-07-15','Test Coach','Test progress feature'),(74,21,6,'2023-07-15','Test Coach','Test progress feature'),(75,21,7,'2023-07-17','Test Coach','Test progress feature'),(76,22,1,'2023-07-01','Test Coach','Test progress feature'),(77,22,2,'2023-07-03','Test Coach','Test progress feature'),(78,22,3,'2023-07-07','Test Coach','Test progress feature'),(79,22,4,'2023-07-11','Test Coach','Test progress feature'),(80,22,5,'2023-07-15','Test Coach','Test progress feature'),(81,22,6,'2023-07-15','Test Coach','Test progress feature'),(82,22,7,'2023-07-17','Test Coach','Test progress feature');
/*!40000 ALTER TABLE `progress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('7lxb7oz7Z1nCfFJ22L5evagC0_oyEJYY',1723028452,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2024-08-07T11:00:51.979Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"None\"},\"userId\":12,\"username\":\"linda\"}'),('IpR6OBAWT_Ivm1nXaewuXalz4hPR8SyM',1723028389,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2024-08-07T10:59:48.972Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"None\"},\"userId\":12,\"username\":\"linda\"}'),('xLhXhYRt8k1tL9gTR0O0htyGCrTglCL2',1723027814,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2024-08-07T10:50:14.253Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"None\"},\"userId\":12,\"username\":\"linda\"}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Students`
--

DROP TABLE IF EXISTS `Students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Students` (
  `StudentID` int NOT NULL AUTO_INCREMENT,
  `UserID` int DEFAULT NULL,
  `FirstName` varchar(255) DEFAULT NULL,
  `LastName` varchar(255) DEFAULT NULL,
  `Birthdate` date DEFAULT NULL,
  PRIMARY KEY (`StudentID`),
  KEY `UserID` (`UserID`),
  CONSTRAINT `students_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Students`
--

LOCK TABLES `Students` WRITE;
/*!40000 ALTER TABLE `Students` DISABLE KEYS */;
INSERT INTO `Students` VALUES (1,12,'Alice','Lin','2017-03-01'),(2,12,'Bob','Lin','2016-08-15'),(3,12,'Charlie','Lin','2017-05-21'),(4,12,'David','Lin','2016-11-01'),(8,14,'rickbaby','ooo','1997-01-07'),(9,14,'lindaaaa','li','1996-07-15'),(10,NULL,'Jake','Gee','2020-09-04'),(11,11,'Jake','Gee','2020-09-04'),(12,11,'Jessica','Gee','2020-09-04'),(13,11,'Baby','Gee','1997-03-20'),(14,12,'Baby','Lin','1998-02-02'),(16,25,'Linda','Lin','1995-07-15'),(17,25,'Yu','Lin','1995-11-02'),(18,26,'Linda','Cassum','2008-08-25'),(19,26,'Tanya','Cassum','2010-03-02'),(21,27,'Aaron','Yeh','2000-07-06'),(22,27,'Cara','Yeh','2004-07-06');
/*!40000 ALTER TABLE `Students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `FirstName` varchar(50) NOT NULL,
  `LastName` varchar(50) NOT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Phone` varchar(20) DEFAULT NULL,
  `Points` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (11,'noah','$2a$08$adxBmbXWGdhUdRvJllgR1OUW.kKodQVVE2Ofd9kRSkp6hn.lhHaLG','noahgee@gmail.com','Noah','Gee',NULL,NULL,-2),(12,'linda','$2a$08$c3PUg93hH2QTosmFHh6vwuHulZ3yOW2FvUy.h02c/uqFHpAboRhDG','linda@gmail.com','Linda','Lin',NULL,'0123456789',91),(14,'rick','$2a$08$sbm0E/FIfD5r6n7U73bX5ev3fHPlRgjukXML2A1j3GhkqwTA2aGlq','rick@gmail.com','Rick','Tokyo','Aspire Point','12345678',-10),(15,'Rick','Password1234','ec23590@qmul.ac.uk','Rick','Matsukura',NULL,NULL,0),(21,'dli','$2a$10$hBB.6xkZSrhZDWC8uWl/m.BLKGVzSLx53HuU7mvCNw8uoZ918QnCW','isjdlgf@jlaffd','dsalfi','idlsaf',NULL,NULL,10),(22,'fda','$2a$10$Euu3.cfOQSqzCOIr8AXss.Lr3TLd3n09sc9FjcsXF5Fa3Wec8DZ6i','fs@sfa','dfa','fda',NULL,NULL,10),(23,'daf','$2a$10$Zf8z5o4Osa5gJqZh2LhJOue6lWg.vfzW24AZUzKgZqi/WvilabLK2','afd@sfd','adsf','adf',NULL,NULL,10),(24,'fdl','$2a$10$/.4eun/toifTrnsF1jApwuhIPKWbCdqjiKU3VGCIc7pSEqY/gPkEm','lsi@calisjf.claisdj','adslfij','slidf',NULL,NULL,10),(25,'hedy','$2a$10$dPXvhHu2fldwBYomHsL0F.9CHF.FnnIwIy.Tg2sgUSyxuoF3yAatC','debby1102@gmail.com','hedy','lin',NULL,NULL,8),(26,'AnushaC','$2a$10$qygS8X0jWk6zvYl1KdsiOeo6b2O56KpbG3qswLUx5fPQElA..RW0m','anusha.cassum@gmail.com','Anusha','Cassum',NULL,NULL,6),(27,'sharonyeh','$2a$10$CGDk1aytBfrnWAaqaoJ/bubABm5oTGlm9Xi6iruTlSbaOvQegav4C','sharon7yeh@gmail.com','tzuhsuan','yeh',NULL,NULL,8);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `availablecourses`
--

/*!50001 DROP VIEW IF EXISTS `availablecourses`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `availablecourses` AS select `c`.`CourseID` AS `CourseID`,`c`.`CourseName` AS `CourseName`,`c`.`Location` AS `Location`,date_format(`c`.`StartDate`,'%Y-%m-%d') AS `StartDate`,`c`.`TimeSlot` AS `TimeSlot`,`c`.`DayOfWeek` AS `DayOfWeek`,`c`.`TotalWeeks` AS `TotalWeeks`,`c`.`AvailableSpots` AS `AvailableSpots`,`co`.`FirstName` AS `CoachFirstName`,`co`.`LastName` AS `CoachLastName` from (`courses` `c` join `coaches` `co` on((`c`.`CoachID` = `co`.`CoachID`))) where (`c`.`AvailableSpots` > 0) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-07 11:16:58
