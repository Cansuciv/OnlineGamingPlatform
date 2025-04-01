document.addEventListener('DOMContentLoaded', function () {
    // Initialize all game items
    const initializeGameItems = () => {
        document.querySelectorAll('.item[data-game-id]').forEach(gameItem => {
            const gameId = gameItem.dataset.gameId;
            initializeVoteButtons(gameItem, gameId);
        });
    };

    // Initialize vote buttons for a game item
    const initializeVoteButtons = (gameItem, gameId) => {
        const likeBtn = gameItem.querySelector('.like-btn');
        const dislikeBtn = gameItem.querySelector('.dislike-btn');
        const likeCount = gameItem.querySelector('.like-count');
        const dislikeCount = gameItem.querySelector('.dislike-count');

        // Load votes from localStorage
        loadVotes(gameId, likeCount, dislikeCount, likeBtn, dislikeBtn);

        // Add click event listeners
        if (likeBtn) {
            likeBtn.addEventListener('click', () => handleVote(gameId, 'like', likeCount, dislikeCount, likeBtn, dislikeBtn));
        }
        if (dislikeBtn) {
            dislikeBtn.addEventListener('click', () => handleVote(gameId, 'dislike', likeCount, dislikeCount, likeBtn, dislikeBtn));
        }
    };

    // Load votes from localStorage
    const loadVotes = (gameId, likeCount, dislikeCount, likeBtn, dislikeBtn) => {
        try {
            const allVotes = JSON.parse(localStorage.getItem('gameVotes')) || {};
            const votes = allVotes[gameId] || {
                like: 1,  // Default to 1 like for "Beğenilenler" page
                dislike: 0,
                userVote: 'like'  // Default to liked for "Beğenilenler" page
            };

            if (likeCount) likeCount.textContent = votes.like;
            if (dislikeCount) dislikeCount.textContent = votes.dislike;

            if (likeBtn) likeBtn.classList.toggle('active', votes.userVote === 'like');
            if (dislikeBtn) dislikeBtn.classList.toggle('active', votes.userVote === 'dislike');

        } catch (error) {
            console.error(`Error loading votes for ${gameId}:`, error);
        }
    };

    // Handle vote action
    const handleVote = (gameId, voteType, likeCount, dislikeCount, likeBtn, dislikeBtn) => {
        try {
            const allVotes = JSON.parse(localStorage.getItem('gameVotes')) || {};
            const currentVotes = allVotes[gameId] || {
                like: 1,
                dislike: 0,
                userVote: 'like'
            };

            // If clicking the already active button, remove the vote
            if (currentVotes.userVote === voteType) {
                currentVotes[voteType]--;
                currentVotes.userVote = null;
            }
            // If clicking the other button, switch the vote
            else {
                // Remove previous vote if exists
                if (currentVotes.userVote) {
                    currentVotes[currentVotes.userVote]--;
                }
                // Add new vote
                currentVotes[voteType]++;
                currentVotes.userVote = voteType;
            }

            // Update UI
            if (likeCount) likeCount.textContent = currentVotes.like;
            if (dislikeCount) dislikeCount.textContent = currentVotes.dislike;

            if (likeBtn) likeBtn.classList.toggle('active', currentVotes.userVote === 'like');
            if (dislikeBtn) dislikeBtn.classList.toggle('active', currentVotes.userVote === 'dislike');

            // Save to localStorage
            allVotes[gameId] = currentVotes;
            localStorage.setItem('gameVotes', JSON.stringify(allVotes));

        } catch (error) {
            console.error(`Error voting for ${gameId}:`, error);
        }
    };

    // Initialize all game items on page load
    initializeGameItems();
});