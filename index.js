const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv"); // Import the dotenv package

dotenv.config(); // Load the environment variables from .env

const app = express();

app.use(cors());
app.use(express.json());

app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data || [];

    // Initialize arrays
    const evenNumbers = [];
    const oddNumbers = [];
    const alphabets = [];
    const specialChars = [];
    let sum = 0;

    // Separate input
    for (const item of data) {
      if (!isNaN(item) && item.trim() !== "") {
        // Handle numbers
        const num = parseInt(item, 10);
        if (num % 2 === 0) {
          evenNumbers.push(item); // keep as string
        } else {
          oddNumbers.push(item); // keep as string
        }
        sum += num;
      } else if (/^[a-zA-Z]+$/.test(item)) {
        // Handle alphabets (convert to uppercase)
        alphabets.push(item.toUpperCase());
      } else {
        // Handle special characters
        specialChars.push(item);
      }
    }

    // Build concatenated string (reverse + alternating caps)
    const reversedAlphabets = alphabets.join("").split("").reverse();
    let concatString = "";
    reversedAlphabets.forEach((ch, i) => {
      concatString += i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase();
    });

    // Response
    res.status(200).json({
      is_success: true,
      user_id: "akash_singh_26042003", // full_name_ddmmyyyy (lowercase)
      email: "akash2604singh@gmail.com",
      roll_number: "22bce10955",
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets: alphabets,
      special_characters: specialChars,
      sum: sum.toString(),
      concat_string: concatString,
    });
  } catch (error) {
    res.status(500).json({
      is_success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

const path = require("path");

app.use(express.static(path.join(__dirname, "frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});