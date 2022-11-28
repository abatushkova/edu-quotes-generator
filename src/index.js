const cardContent = document.querySelector('.card__content');
const quote = document.querySelector('#quoteContent');
const author = document.querySelector('#quoteAuthor');
const copyBtn = document.querySelector('#copy');
const generateBtn = document.querySelector('#generate');
const spinner = document.querySelector('#spinner');
const error = document.querySelector('#error');

const handleError = (err) => {
  spinner.classList.add('hide');
  error.classList.remove('hide');
  error.textContent = 'An error occurred!';
  console.error(err);
};

const fetchData = async () => {
  const response = await fetch('https://api.quotable.io/random').catch(handleError);
  const data = await response.json();

  return data;
};

const generateQuote = () => {
  error.classList.add('hide');
  cardContent.classList.add('hide');
  spinner.classList.remove('hide');

  fetchData()
    .then(data => {
      quote.textContent = data.content;
      author.textContent = data.author;
      spinner.classList.add('hide');
      cardContent.classList.remove('hide');
    })
    .catch(handleError);
};

const copyQuote = () => {
  navigator.clipboard.writeText(quote.textContent);
};

copyBtn.addEventListener('click', copyQuote);
generateBtn.addEventListener('click', generateQuote);

generateQuote();
