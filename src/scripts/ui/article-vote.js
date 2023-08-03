window.addEventListener('DOMContentLoaded', () => {
  const $articleVoteQuestion = document.querySelector('.article__votes-question');
  const $articleVoteUp = document.querySelector('.article-vote-up');
  const $articleVoteDown = document.querySelector('.article-vote-down');

  if ($articleVoteQuestion) {
    const hideVoteBtns = () => {
      $articleVoteQuestion.innerText = 'Thanks for your feedback!';
      $articleVoteUp.style.display = 'none';
      $articleVoteDown.style.display = 'none';
    };

    $articleVoteUp.addEventListener('click', hideVoteBtns);
    $articleVoteDown.addEventListener('click', hideVoteBtns);
  }
});
