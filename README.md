# Tic-Tac-Toe-vs-AI
- ttt for play against a friend ,or brainstorm you self,in repository.
# Chose who to start vs miniMax algorithm AI.
- minimax algotithm is used in games and teory
- where you can caculate all possibilities to the end
- https://kaliscandinavia.github.io/Tic-Tac-Toe-vs-AI/index.html
- 
  - Illustration and explonation of use in TTT
  ![miniMax to Depth = 3 in TTT](https://github.com/kaliscandinavia/Tic-Tac-Toe-vs-AI/blob/main/minimax.png)
    Level 1: X has three possible moves and tries to find the maximum node.
    Level 2: The first move leads to direct win for X thus 100 points are given.
    Level 2: The second and third moves will lead to two more possible moves where it’s O’s turn.
    Level 3: O is trying to minimize the score so it chooses the nodes with the minimum value.
    Level 3: The first move for O will lead to a win and the second to a draw, thus we assume that O is going to choose the first move and the parent node will have a value of -100. Same for the third and fourth moves.
    Back to Level 1, X now has to choose between 100, -100 and 0. Since X is the maximizer, it will definitely choose 100 which will lead to a win.[Credit:alialaa.com]
