import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

function formatCardNumber(cardNumber) {
  // Remove any existing spaces and non-digit characters
  const cleanNumber = cardNumber.replace(/\D/g, '');
  
  // Format with spaces every 4 digits
  return cleanNumber.split('')
    .reduce((result, digit, index) => {
      if (index > 0 && index % 4 === 0) {
        result += ' ';
      }
      return result + digit;
    }, '');
}

app.get("/", (req, res)=>{
    res.render("index.ejs");
});

app.post("/submit", (req, res)=>{
  res.render("index.ejs", {
    showResult: true,
    cardName: req.body.card_holder_name,
    cardNumber: formatCardNumber(req.body.card_number),
    expiringMonth: parseInt(req.body.month),
    expiringYear: parseInt(req.body.year),
    usercvc: parseInt(req.body.cvc)
  });
    
});

app.listen(port, (req, res)=>{
    console.log(`Started listening at port ${port}`);
});