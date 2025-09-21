"""
Create a Rock Paper Scissors game where the player inputs their choice
and plays  against a computer that randomly selects its move, 
with the game showing who won each round.
Add a score counter that tracks player and computer wins, 
and allow the game to continue until the player types “quit”.
"""
import random

def play_rps():
    choices = ["rock", "paper", "scissors"]
    player_score = 0
    computer_score = 0

    while True:
        player_choice = input("Enter rock (r), paper (p), or scissors (s) (or 'quit' to stop): ").lower()
        if player_choice == "r":
            player_choice = "rock"
        elif player_choice == "p":
            player_choice = "paper"
        elif player_choice == "s":
            player_choice = "scissors"
        elif player_choice == "quit":
            break
        elif player_choice not in choices:
            print("Invalid choice. Please try again.")
            continue

        computer_choice = random.choice(choices)
        print(f"Computer chose: {computer_choice}")

        if player_choice == computer_choice:
            print("It's a tie!")
        elif (player_choice == "rock" and computer_choice == "scissors") or \
             (player_choice == "paper" and computer_choice == "rock") or \
             (player_choice == "scissors" and computer_choice == "paper"):
            print("You win!")
            player_score += 1
        else:
            print("Computer wins!")
            computer_score += 1

        print(f"Score - You: {player_score}, Computer: {computer_score}")

    print("Thanks for playing!")
if __name__ == "__main__":
    play_rps()