-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 04 avr. 2024 à 11:57
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : "test"
--

-- --------------------------------------------------------

--
-- Structure de la table "testeee"
--

CREATE TABLE "testeee" (
  "nom" text NOT NULL,
  "prenom" text NOT NULL,
  "age" int NOT NULL,
  "date_naissance" date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table "testeee"
--

INSERT INTO "testeee" ("nom", "prenom", "age", "date_naissance") VALUES
('Doe', 'John', 30, '1994-05-15'),
('Smith', 'Alice', 25, '1999-10-20'),
('Johnson', 'Michael', 40, '1984-03-08');

-- --------------------------------------------------------

--
-- Structure de la table "uytutut"
--

CREATE TABLE "uytutut" (
  "uii" int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table "uytutut"
--

INSERT INTO "uytutut" ("uii") VALUES
(123),
(456),
(789);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
