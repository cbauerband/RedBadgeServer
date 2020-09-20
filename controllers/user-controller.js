const router = require("express").Router();
let User = require("../db").import("../models/user"); 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");