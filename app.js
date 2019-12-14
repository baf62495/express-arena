const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
	console.log('The root path was called');
	res.send('Hello Express!');
})

app.get('/burgers', (req, res) => {
	res.send('We have juicy cheese burgers!');
})

app.get('/pizza/pepperoni', (req, res) => {
	res.send('Your pizza is on the way!');
})

app.get('/pizza/pineapple', (req, res) => {
	res.send('We don\'t serve that here. Never call again!');
})

app.get('/echo', (req, res) => {
	const responseText = `Here are some details of your request:
		base Url: ${req.baseUrl}
		Host: ${req.hostname}
		Path: ${req.path}
	`;
	res.send(responseText);
})

app.get('/queryViewer', (req, res) => {
	console.log(req.query);
	res.end();
})

app.get('/greetings', (req, res) => {
	const name = req.query.name;
	const race = req.query.race;

	if(!name) {
		return res.status(400).send('Please provide a name');
	}

	if(!race) {
		return res.status(400).send('Please provice a race');
	}

	const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.`

	res.send(greeting);
})

app.get('/sum', (req, res) => {
	const a = req.query.a;
	const b = req.query.b;
	const c = +a + +b

	if(!a) {
		return res.status(400).send('Please provide A');
	}

	if(!b) {
		return res.status(400).send('Please provide B');
	}

	const sum = `The sum of ${a} and ${b} is: ${c}`;

	res.send(sum);
})

app.get('/cipher', (req, res) => {
  const { text, shift } = req.query;

  // validation: both values are required, shift must be a number
  if(!text) {
    return res
          .status(400)
          .send('text is required');
  }

  if(!shift) {
    return res
          .status(400)
          .send('shift is required');
  }

  const numShift = parseFloat(shift);

  if(Number.isNaN(numShift)) {
    return res
          .status(400)
          .send('shift must be a number');
  }

  // all valid, perform the task
  // Make the text uppercase for convenience
  // the question did not say what to do with punctuation marks
  // and numbers so we will ignore them and only convert letters.
  // Also just the 26 letters of the alphabet in typical use in the US
  // and UK today. To support an international audience we will have to
  // do more
  // Create a loop over the characters, for each letter, covert
  // using the shift

  const base = 'A'.charCodeAt(0);  // get char code 

  const cipher = text
    .toUpperCase()
    .split('') // create an array of characters
    .map(char => { // map each original char to a converted char
      const code = char.charCodeAt(0); //get the char code

      // if it is not one of the 26 letters ignore it
      if(code < base || code > (base + 26)) {
        return char;
      }
      
      // otherwise convert it
      // get the distance from A
      let diff = code - base;
      diff = diff + numShift; 
      
      // in case shift takes the value past Z, cycle back to the beginning
      diff = diff % 26;

      // convert back to a character
      const shiftedChar = String.fromCharCode(base + diff);
      return shiftedChar;
    })
    .join(''); // construct a String from the array

  // Return the response
  res
    .status(200)
    .send(cipher);  
});

app.listen(8000, () => {
	console.log('Express server is listening on port 8000!');
})





