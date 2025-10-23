class CodeBreakerGame {
    constructor() {
        this.array = new Array(10).fill(null);
        this.secretPattern = [];
        this.currentLevel = 1;
        this.score = 0;
        this.timeLeft = 60;
        this.gameActive = true;
        this.timerInterval = null;
        this.maxTime = 60;
        this.operationsCount = 0;
        
        this.initializeGame();
        this.setupEventListeners();
        this.generateSecretPattern();
        this.updateDisplay();
        this.startTimer();
        this.updateProgressBar();
    }

    initializeGame() {
        this.arrayDisplay = document.getElementById('array-display');
        this.arrayIndices = document.getElementById('array-indices');
        this.feedbackMessage = document.getElementById('feedback-message');
        this.successEffects = document.getElementById('success-effects');
        this.gameOverlay = document.getElementById('game-overlay');
        
        // Create array cells
        this.createArrayCells();
        this.createIndexLabels();
    }

    createArrayCells() {
        this.arrayDisplay.innerHTML = '';
        for (let i = 0; i < this.array.length; i++) {
            const cell = document.createElement('div');
            cell.className = 'array-cell';
            cell.dataset.index = i;
            
            // Add click functionality for quick insert
            cell.addEventListener('click', () => {
                if (this.gameActive) {
                    this.quickInsert(i);
                }
            });
            
            this.arrayDisplay.appendChild(cell);
        }
    }

    createIndexLabels() {
        this.arrayIndices.innerHTML = '';
        for (let i = 0; i < this.array.length; i++) {
            const label = document.createElement('div');
            label.className = 'index-label';
            label.textContent = i;
            this.arrayIndices.appendChild(label);
        }
    }

    quickInsert(index) {
        // Generate a random number for quick insert
        const value = Math.floor(Math.random() * 10);
        
        if (this.array[index] !== null) {
            this.showFeedback(`Cell ${index} is already occupied!`, 'error');
            this.playSound('error');
            return;
        }

        // Shift elements to the right
        for (let i = this.array.length - 1; i > index; i--) {
            this.array[i] = this.array[i - 1];
        }

        this.array[index] = value;
        this.updateDisplay();
        this.animateInsert(index);
        this.showFeedback(`Quick inserted ${value} at index ${index}!`, 'success');
        this.playSound('insert');
        this.addScore(5); // Lower score for quick insert
        this.addOperationCount();

        this.checkPatternMatch();
    }

    setupEventListeners() {
        document.getElementById('insert-btn').addEventListener('click', () => this.insertOperation());
        document.getElementById('delete-btn').addEventListener('click', () => this.deleteOperation());
        document.getElementById('search-btn').addEventListener('click', () => this.searchOperation());
        document.getElementById('reset-btn').addEventListener('click', () => this.resetArray());
        document.getElementById('new-level-btn').addEventListener('click', () => this.newLevel());
        document.getElementById('next-level-btn').addEventListener('click', () => this.nextLevel());
        document.getElementById('restart-btn').addEventListener('click', () => this.restartGame());

        // Enter key support
        document.getElementById('insert-value').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.insertOperation();
        });
        document.getElementById('search-pattern').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.searchOperation();
        });
    }

    generateSecretPattern() {
        const patternLength = Math.min(2 + this.currentLevel, 4);
        this.secretPattern = [];
        
        for (let i = 0; i < patternLength; i++) {
            this.secretPattern.push(Math.floor(Math.random() * 10));
        }
        
        this.updateSecretPatternDisplay();
    }

    updateSecretPatternDisplay() {
        const display = document.getElementById('secret-pattern');
        const hiddenPattern = this.secretPattern.map(() => '?').join(', ');
        display.textContent = `[${hiddenPattern}]`;
    }

    insertOperation() {
        const index = parseInt(document.getElementById('insert-index').value);
        const value = parseInt(document.getElementById('insert-value').value);

        if (isNaN(index) || isNaN(value)) {
            this.showFeedback('Please enter valid index and value!', 'error');
            this.playSound('error');
            return;
        }

        if (index < 0 || index >= this.array.length) {
            this.showFeedback('Index out of bounds!', 'error');
            this.playSound('error');
            return;
        }

        if (value < 0 || value > 9) {
            this.showFeedback('Value must be between 0 and 9!', 'error');
            this.playSound('error');
            return;
        }

        // Shift elements to the right
        for (let i = this.array.length - 1; i > index; i--) {
            this.array[i] = this.array[i - 1];
        }

        this.array[index] = value;
        this.updateDisplay();
        this.animateInsert(index);
        this.showFeedback(`Inserted ${value} at index ${index}!`, 'success');
        this.playSound('insert');
        this.addScore(10);
        this.addOperationCount();

        // Clear inputs
        document.getElementById('insert-index').value = '';
        document.getElementById('insert-value').value = '';

        this.checkPatternMatch();
    }

    deleteOperation() {
        const index = parseInt(document.getElementById('delete-index').value);

        if (isNaN(index)) {
            this.showFeedback('Please enter a valid index!', 'error');
            this.playSound('error');
            return;
        }

        if (index < 0 || index >= this.array.length) {
            this.showFeedback('Index out of bounds!', 'error');
            this.playSound('error');
            return;
        }

        if (this.array[index] === null) {
            this.showFeedback('No element at this index!', 'error');
            this.playSound('error');
            return;
        }

        const deletedValue = this.array[index];
        
        // Shift elements to the left
        for (let i = index; i < this.array.length - 1; i++) {
            this.array[i] = this.array[i + 1];
        }
        this.array[this.array.length - 1] = null;

        this.updateDisplay();
        this.animateDelete(index);
        this.showFeedback(`Deleted element ${deletedValue} at index ${index}!`, 'info');
        this.playSound('delete');
        this.addScore(5);
        this.addOperationCount();

        // Clear input
        document.getElementById('delete-index').value = '';
    }

    searchOperation() {
        const patternInput = document.getElementById('search-pattern').value.trim();
        
        if (!patternInput) {
            this.showFeedback('Please enter a pattern to search!', 'error');
            this.playSound('error');
            return;
        }

        const pattern = patternInput.split(',').map(p => parseInt(p.trim()));
        
        if (pattern.some(p => isNaN(p) || p < 0 || p > 9)) {
            this.showFeedback('Enter a valid pattern (e.g., 2,1,4)', 'error');
            this.playSound('error');
            return;
        }

        this.animateSearch(pattern);
        const found = this.findPattern(pattern);
        
        if (found !== -1) {
            this.showFeedback(`Pattern [${pattern.join(',')}] found at index ${found}!`, 'success');
            this.playSound('success');
            this.addScore(20);
            this.addOperationCount();
        } else {
            this.showFeedback(`Pattern [${pattern.join(',')}] not found!`, 'info');
            this.playSound('search');
            this.addOperationCount();
        }

        // Clear input
        document.getElementById('search-pattern').value = '';
    }

    findPattern(pattern) {
        for (let i = 0; i <= this.array.length - pattern.length; i++) {
            let match = true;
            for (let j = 0; j < pattern.length; j++) {
                if (this.array[i + j] !== pattern[j]) {
                    match = false;
                    break;
                }
            }
            if (match) {
                return i;
            }
        }
        return -1;
    }

    checkPatternMatch() {
        const found = this.findPattern(this.secretPattern);
        if (found !== -1) {
            this.levelComplete();
        }
    }

    levelComplete() {
        this.gameActive = false;
        clearInterval(this.timerInterval);
        
        const timeUsed = 60 - this.timeLeft;
        const bonusScore = Math.max(0, this.timeLeft * 2);
        this.addScore(bonusScore);

        this.showFeedback('🎉 LEVEL COMPLETE! 🎉', 'success');
        this.showSuccessEffects('🔓 CODE CRACKED! 🔓');
        this.playSound('victory');

        setTimeout(() => {
            this.showGameOverlay('Level Complete!', 
                `You cracked the code in ${timeUsed} seconds!`, 
                timeUsed, this.score);
        }, 2000);
    }

    resetArray() {
        this.array = new Array(10).fill(null);
        this.updateDisplay();
        this.showFeedback('Array reset!', 'info');
        this.playSound('reset');
    }

    newLevel() {
        this.currentLevel++;
        this.generateSecretPattern();
        this.resetArray();
        this.timeLeft = 60;
        this.gameActive = true;
        this.startTimer();
        this.showFeedback(`Starting Level ${this.currentLevel}!`, 'info');
        this.updateLevelDisplay();
    }

    nextLevel() {
        this.hideGameOverlay();
        this.newLevel();
    }

    restartGame() {
        this.hideGameOverlay();
        this.currentLevel = 1;
        this.score = 0;
        this.timeLeft = 60;
        this.gameActive = true;
        this.generateSecretPattern();
        this.resetArray();
        this.startTimer();
        this.updateLevelDisplay();
        this.updateScoreDisplay();
        this.showFeedback('Game restarted!', 'info');
    }

    updateDisplay() {
        const cells = this.arrayDisplay.querySelectorAll('.array-cell');
        cells.forEach((cell, index) => {
            const value = this.array[index];
            cell.textContent = value !== null ? value : '';
            cell.className = 'array-cell';
            if (value === null) {
                cell.classList.add('empty');
            }
        });
    }

    animateInsert(index) {
        const cells = this.arrayDisplay.querySelectorAll('.array-cell');
        const targetCell = cells[index];
        
        // Animate shifting cells
        for (let i = index + 1; i < cells.length; i++) {
            cells[i].style.transform = 'translateX(70px)';
            setTimeout(() => {
                cells[i].style.transform = 'translateX(0)';
                cells[i].style.transition = 'transform 0.3s ease';
            }, 100);
        }

        // Animate new cell
        targetCell.classList.add('insert-animation');
        setTimeout(() => {
            targetCell.classList.remove('insert-animation');
        }, 500);
    }

    animateDelete(index) {
        const cells = this.arrayDisplay.querySelectorAll('.array-cell');
        const targetCell = cells[index];
        
        targetCell.classList.add('delete-animation');
        
        setTimeout(() => {
            // Animate shifting cells
            for (let i = index; i < cells.length - 1; i++) {
                cells[i].style.transform = 'translateX(-70px)';
                setTimeout(() => {
                    cells[i].style.transform = 'translateX(0)';
                    cells[i].style.transition = 'transform 0.3s ease';
                }, 100);
            }
        }, 250);
    }

    async animateSearch(pattern) {
        const cells = this.arrayDisplay.querySelectorAll('.array-cell');
        
        for (let i = 0; i <= this.array.length - pattern.length; i++) {
            // Highlight current search position
            for (let j = 0; j < pattern.length; j++) {
                if (cells[i + j]) {
                    cells[i + j].classList.add('search-animation');
                }
            }
            
            await this.sleep(300);
            
            // Remove highlight
            for (let j = 0; j < pattern.length; j++) {
                if (cells[i + j]) {
                    cells[i + j].classList.remove('search-animation');
                }
            }
            
            // Check if pattern matches at this position
            let match = true;
            for (let j = 0; j < pattern.length; j++) {
                if (this.array[i + j] !== pattern[j]) {
                    match = false;
                    break;
                }
            }
            
            if (match) {
                // Highlight the found pattern
                for (let j = 0; j < pattern.length; j++) {
                    cells[i + j].classList.add('highlight');
                }
                break;
            }
            
            await this.sleep(200);
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    startTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
        
        this.timerInterval = setInterval(() => {
            if (this.gameActive) {
                this.timeLeft--;
                this.updateTimerDisplay();
                this.updateProgressBar();
                
                if (this.timeLeft <= 0) {
                    this.gameOver();
                }
            }
        }, 1000);
    }

    gameOver() {
        this.gameActive = false;
        clearInterval(this.timerInterval);
        this.showFeedback('⏰ TIME\'S UP! ⏰', 'error');
        this.playSound('gameOver');
        
        setTimeout(() => {
            this.showGameOverlay('Game Over!', 
                'Time ran out! Try again!', 
                60, this.score);
        }, 2000);
    }

    showGameOverlay(title, message, time, score) {
        document.getElementById('overlay-title').textContent = title;
        document.getElementById('overlay-message').textContent = message;
        document.getElementById('overlay-time').textContent = time;
        document.getElementById('overlay-score').textContent = score;
        this.gameOverlay.style.display = 'flex';
    }

    hideGameOverlay() {
        this.gameOverlay.style.display = 'none';
    }

    showFeedback(message, type = 'info') {
        this.feedbackMessage.textContent = message;
        this.feedbackMessage.className = `feedback-message ${type}`;
        
        setTimeout(() => {
            this.feedbackMessage.textContent = '';
            this.feedbackMessage.className = 'feedback-message';
        }, 3000);
    }

    showSuccessEffects(message) {
        this.successEffects.textContent = message;
        setTimeout(() => {
            this.successEffects.textContent = '';
        }, 3000);
    }

    addScore(points) {
        this.score += points;
        this.updateScoreDisplay();
    }

    updateTimerDisplay() {
        document.getElementById('timer').textContent = this.timeLeft;
        
        // Change color based on time left
        const timerElement = document.getElementById('timer');
        if (this.timeLeft <= 10) {
            timerElement.style.color = '#ff6b6b';
            timerElement.style.animation = 'pulse 0.5s ease-in-out infinite';
        } else if (this.timeLeft <= 30) {
            timerElement.style.color = '#ffd93d';
        } else {
            timerElement.style.color = '#4ecdc4';
            timerElement.style.animation = 'none';
        }
    }

    updateScoreDisplay() {
        document.getElementById('score').textContent = this.score;
    }

    updateLevelDisplay() {
        document.getElementById('current-level').textContent = this.currentLevel;
    }

    updateProgressBar() {
        const progressFill = document.getElementById('progress-fill');
        const progress = (this.maxTime - this.timeLeft) / this.maxTime * 100;
        progressFill.style.width = `${progress}%`;
        
        // Change color based on progress - subtle approach
        if (progress > 80) {
            progressFill.style.background = 'linear-gradient(90deg, #ff6b6b, #ff8e8e)';
        } else if (progress > 60) {
            progressFill.style.background = 'linear-gradient(90deg, #ffd93d, #ffed4e)';
        } else {
            progressFill.style.background = 'linear-gradient(90deg, #00ff41, #00cc33)';
        }
    }

    addOperationCount() {
        this.operationsCount++;
        this.updateProgressBar();
    }

    playSound(type) {
        // Create audio context for sound effects
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        let frequency;
        let duration;
        
        switch (type) {
            case 'insert':
                frequency = 800;
                duration = 0.1;
                break;
            case 'delete':
                frequency = 400;
                duration = 0.1;
                break;
            case 'search':
                frequency = 600;
                duration = 0.2;
                break;
            case 'success':
                frequency = 1000;
                duration = 0.3;
                break;
            case 'victory':
                // Victory fanfare
                this.playVictorySound();
                return;
            case 'error':
                frequency = 200;
                duration = 0.3;
                break;
            case 'gameOver':
                frequency = 150;
                duration = 0.5;
                break;
            case 'reset':
                frequency = 500;
                duration = 0.2;
                break;
            default:
                frequency = 440;
                duration = 0.1;
        }
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = 'square';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    }

    playVictorySound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const frequencies = [523, 659, 784, 1047]; // C, E, G, C
        
        frequencies.forEach((freq, index) => {
            setTimeout(() => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.3);
            }, index * 200);
        });
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new CodeBreakerGame();
});