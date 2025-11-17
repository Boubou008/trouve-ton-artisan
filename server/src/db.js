// server/src/db.js
// 👉 Version sans MySQL : on lit les fichiers JSON du front

import { createRequire } from "module";
const require = createRequire(import.meta.url);

// Chemins depuis server/src vers le dossier src/data du front
const artisans = require("../../src/data/artisans.json");
const categories = require("../../src/data/categories.json");
const specialities = require("../../src/data/specialities.json");

export { artisans, categories, specialities };
