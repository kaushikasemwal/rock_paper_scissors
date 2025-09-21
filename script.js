// Game state
class RockPaperScissorsGame {
    constructor() {
        this.playerScore = 0;
        this.computerScore = 0;
        this.tieCount = 0;
        this.choices = ['rock', 'paper', 'scissors'];
        this.choiceEmojis = {
            'rock': '🪨',
            'paper': '📄',
            'scissors': '✂️'
        };
        this.gameActive = true;
        this.initializeGame();
    }

    initializeGame() {
        this.bindEvents();
        this.updateScoreDisplay();
        this.resetChoiceDisplay();
    }

    bindEvents() {
        // Choice buttons
        document.querySelectorAll('.choice-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                if (this.gameActive) {
                    const choice = e.currentTarget.dataset.choice;
                    this.playRound(choice);
                }
            });
        });

        // Control buttons
        document.getElementById('reset-btn').addEventListener('click', () => {
            this.resetGame();
        });

        document.getElementById('quit-btn').addEventListener('click', () => {
            this.quitGame();
        });
    }

    playRound(playerChoice) {
        if (!this.gameActive) return;

        // Clear previous selections
        document.querySelectorAll('.choice-btn').forEach(btn => {
            btn.classList.remove('selected');
        });

        // Highlight player choice
        document.querySelector(`[data-choice="${playerChoice}"]`).classList.add('selected');

        // Generate computer choice
        const computerChoice = this.getComputerChoice();

        // Update choice display
        this.updateChoiceDisplay(playerChoice, computerChoice);

        // Determine winner
        const result = this.determineWinner(playerChoice, computerChoice);

        // Update scores
        this.updateScore(result);

        // Display result
        this.displayResult(result, playerChoice, computerChoice);

        // Update score display
        this.updateScoreDisplay();
    }

    getComputerChoice() {
        const randomIndex = Math.floor(Math.random() * this.choices.length);
        return this.choices[randomIndex];
    }

    determineWinner(playerChoice, computerChoice) {
        if (playerChoice === computerChoice) {
            return 'tie';
        }

        const winConditions = {
            'rock': 'scissors',
            'paper': 'rock',
            'scissors': 'paper'
        };

        if (winConditions[playerChoice] === computerChoice) {
            return 'win';
        } else {
            return 'lose';
        }
    }

    updateScore(result) {
        if (result === 'win') {
            this.playerScore++;
        } else if (result === 'lose') {
            this.computerScore++;
        } else if (result === 'tie') {
            this.tieCount++;
        }
    }

    updateScoreDisplay() {
        document.getElementById('player-score').textContent = this.playerScore;
        document.getElementById('computer-score').textContent = this.computerScore;
        this.updateDetailedScoreboard();
    }

    updateDetailedScoreboard() {
        const totalGames = this.playerScore + this.computerScore + this.tieCount;
        const playerWinPercentage = totalGames > 0 ? ((this.playerScore / totalGames) * 100).toFixed(1) : 0;
        const computerWinPercentage = totalGames > 0 ? ((this.computerScore / totalGames) * 100).toFixed(1) : 0;
        const tiePercentage = totalGames > 0 ? ((this.tieCount / totalGames) * 100).toFixed(1) : 0;

        // Update or create detailed scoreboard
        let scoreboardElement = document.getElementById('detailed-scoreboard');
        if (!scoreboardElement) {
            scoreboardElement = document.createElement('div');
            scoreboardElement.id = 'detailed-scoreboard';
            scoreboardElement.style.cssText = `
                background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                border-radius: 12px;
                padding: 20px;
                margin: 20px 0;
                box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                border: 2px solid #e1e8ed;
            `;
            
            // Insert after the main scoreboard
            const mainScoreboard = document.querySelector('.scoreboard');
            mainScoreboard.parentNode.insertBefore(scoreboardElement, mainScoreboard.nextSibling);
        }

        scoreboardElement.innerHTML = `
            <h3 style="text-align: center; color: #2c3e50; margin-bottom: 20px; font-size: 1.4rem;">
                📊 Detailed Statistics
            </h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; text-align: center; border: 2px solid #4CAF50;">
                    <div style="font-size: 1.1rem; font-weight: bold; color: #2e7d32;">🏆 Your Wins</div>
                    <div style="font-size: 2rem; color: #1b5e20; margin: 8px 0;">${this.playerScore}</div>
                    <div style="font-size: 0.9rem; color: #388e3c;">${playerWinPercentage}% win rate</div>
                </div>
                <div style="background: #ffe8e8; padding: 15px; border-radius: 8px; text-align: center; border: 2px solid #f44336;">
                    <div style="font-size: 1.1rem; font-weight: bold; color: #c62828;">🤖 Computer Wins</div>
                    <div style="font-size: 2rem; color: #b71c1c; margin: 8px 0;">${this.computerScore}</div>
                    <div style="font-size: 0.9rem; color: #d32f2f;">${computerWinPercentage}% win rate</div>
                </div>
                <div style="background: #fff3e0; padding: 15px; border-radius: 8px; text-align: center; border: 2px solid #ff9800;">
                    <div style="font-size: 1.1rem; font-weight: bold; color: #ef6c00;">🤝 Ties</div>
                    <div style="font-size: 2rem; color: #e65100; margin: 8px 0;">${this.tieCount}</div>
                    <div style="font-size: 0.9rem; color: #f57c00;">${tiePercentage}% of games</div>
                </div>
            </div>
            <div style="text-align: center; margin-top: 15px; padding: 10px; background: #f8f9fa; border-radius: 6px; border: 1px solid #dee2e6;">
                <strong style="color: #495057;">Total Games Played: ${totalGames}</strong>
                ${totalGames > 0 ? `<br><span style="color: #6c757d; font-size: 0.9rem;">
                    ${this.playerScore > this.computerScore ? 'You are leading! 🎉' : 
                      this.computerScore > this.playerScore ? 'Computer is ahead 🤔' : 
                      'It\'s tied! 🤝'}
                </span>` : ''}
            </div>
        `;
    }

    updateChoiceDisplay(playerChoice, computerChoice) {
        document.getElementById('player-choice-display').textContent = this.choiceEmojis[playerChoice];
        document.getElementById('computer-choice-display').textContent = this.choiceEmojis[computerChoice];
    }

    resetChoiceDisplay() {
        document.getElementById('player-choice-display').textContent = '?';
        document.getElementById('computer-choice-display').textContent = '?';
    }

    displayResult(result, playerChoice, computerChoice) {
        const resultElement = document.getElementById('game-result');
        let message = '';
        
        // Remove previous result classes
        resultElement.classList.remove('win', 'lose', 'tie');

        switch (result) {
            case 'tie':
                message = "It's a tie!";
                resultElement.classList.add('tie');
                break;
            case 'win':
                message = "You win!";
                resultElement.classList.add('win');
                break;
            case 'lose':
                message = "Computer wins!";
                resultElement.classList.add('lose');
                break;
        }

        // Add choice information
        const choiceInfo = `You chose ${playerChoice}, Computer chose ${computerChoice}`;
        resultElement.innerHTML = `
            <div>${message}</div>
            <div style="font-size: 1rem; margin-top: 8px; opacity: 0.9;">${choiceInfo}</div>
        `;

        // Add animation effect
        resultElement.style.transform = 'scale(1.1)';
        setTimeout(() => {
            resultElement.style.transform = 'scale(1)';
        }, 200);
    }

    resetGame() {
        this.playerScore = 0;
        this.computerScore = 0;
        this.tieCount = 0;
        this.gameActive = true;
        
        this.updateScoreDisplay();
        this.resetChoiceDisplay();
        
        // Clear result message
        const resultElement = document.getElementById('game-result');
        resultElement.textContent = 'Make your choice to start!';
        resultElement.classList.remove('win', 'lose', 'tie');
        
        // Clear choice selections
        document.querySelectorAll('.choice-btn').forEach(btn => {
            btn.classList.remove('selected');
        });

        // Show success message
        this.showTemporaryMessage('Game reset! All statistics cleared. Ready to play again?', 'reset');
    }

    quitGame() {
        this.gameActive = false;
        
        const totalGames = this.playerScore + this.computerScore + this.tieCount;
        
        // Display final score and thank you message
        const resultElement = document.getElementById('game-result');
        resultElement.innerHTML = `
            <div>Thanks for playing!</div>
            <div style="font-size: 1rem; margin-top: 8px; opacity: 0.9;">
                Final Score - You: ${this.playerScore}, Computer: ${this.computerScore}, Ties: ${this.tieCount}
            </div>
            <div style="font-size: 0.9rem; margin-top: 4px; opacity: 0.8;">
                Total Games: ${totalGames}
            </div>
        `;
        resultElement.classList.remove('win', 'lose', 'tie');
        
        // Disable choice buttons visually
        document.querySelectorAll('.choice-btn').forEach(btn => {
            btn.style.opacity = '0.5';
            btn.style.cursor = 'not-allowed';
        });

        // Show restart option
        setTimeout(() => {
            const shouldRestart = confirm('Game ended! Would you like to start a new game?');
            if (shouldRestart) {
                this.resetGame();
                // Re-enable buttons
                document.querySelectorAll('.choice-btn').forEach(btn => {
                    btn.style.opacity = '1';
                    btn.style.cursor = 'pointer';
                });
            }
        }, 1000);
    }

    showTemporaryMessage(message, type = '') {
        const resultElement = document.getElementById('game-result');
        const originalContent = resultElement.innerHTML;
        const originalClasses = resultElement.className;
        
        resultElement.textContent = message;
        if (type) {
            resultElement.classList.add(type);
        }
        
        setTimeout(() => {
            resultElement.innerHTML = originalContent;
            resultElement.className = originalClasses;
        }, 2000);
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (!game.gameActive) return;
    
    switch (e.key.toLowerCase()) {
        case 'r':
            game.playRound('rock');
            break;
        case 'p':
            game.playRound('paper');
            break;
        case 's':
            game.playRound('scissors');
            break;
        case 'q':
            game.quitGame();
            break;
        case 'escape':
            game.resetGame();
            break;
    }
});

// Add keyboard shortcuts info
document.addEventListener('DOMContentLoaded', () => {
    const instructionsSection = document.querySelector('.instructions');
    const keyboardInfo = document.createElement('div');
    keyboardInfo.style.marginTop = '15px';
    keyboardInfo.style.borderTop = '1px solid #ddd';
    keyboardInfo.style.paddingTop = '15px';
    keyboardInfo.innerHTML = `
        <p><strong>Keyboard shortcuts:</strong></p>
        <ul>
            <li>Press 'R' for Rock</li>
            <li>Press 'P' for Paper</li>
            <li>Press 'S' for Scissors</li>
            <li>Press 'Q' to Quit</li>
            <li>Press 'Esc' to Reset</li>
        </ul>
    `;
    instructionsSection.appendChild(keyboardInfo);
});

// Initialize game when page loads
let game;
document.addEventListener('DOMContentLoaded', () => {
    game = new RockPaperScissorsGame();
});