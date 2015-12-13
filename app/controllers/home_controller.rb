class HomeController < ApplicationController
  respond_to :js, only: [:next_move]

  def index
    Move.delete_all
    first_move = rand
    @board = [ ['','',''], ['','',''], ['','',''] ]
    if first_move < 0.5
      position = rand(8)
      if position < 3
        move = Move.create(line: 0, column: position, character: 'X')
        @board[0][position] = 'X'
      else
        if position >= 3 && position < 6
          move = Move.create(line: 1, column: position - 3, character: 'X')
          @board[1][position - 3] = 'X'
        else
          move = Move.create(line: 2, column: position - 6, character: 'X')
          @board[2][position - 6] = 'X'
        end
      end
    end
  end

  def next_move
    if !finished_game()
      count = Move.all.count
      if count % 2 == 0
        chr = 'X'
      else
        chr = '0'
      end
      move = Move.create(line: params[:line].to_i, column: params[:col].to_i, character: chr)
    end

    generate_move()
    finished_game()

    @board = [ ['','',''], ['','',''], ['','',''] ]
    Move.all.each do |move|
      @board[move.line][move.column] = move.character
    end
    render partial: 'content'
  end

  def finished_game
    if Move.all.count < 9
      check_winner()
      if !@winner
        return false
      else
        @winner << ' WINS !'
      end
    else
      @winner = 'TIE'
    end
  end

  def generate_move
     if Move.all.count < 9 && !finished_game
      row = rand(3)
      col = rand(3)
      while Move.where(column: col, line: row).count != 0 do
        row = rand(3)
        col = rand(3)
      end
      Move.last.character == 'X' ? c = '0' : c = 'X'
      move = Move.create(line: row, column: col, character: c)
    end
  end

  def check_winner
    #check rows
    (0..2).each do |row_nr|
      cells = Move.where(line: row_nr)
      if cells.count == 3 && cells.all? {|x| x.character == cells[0].character}
        @winner = cells[0].character
      end
    end
    #check columns
    (0..2).each do |col_nr|
      cells = Move.where(column: col_nr)
      if cells.count == 3 && cells.all? {|x| x.character == cells[0].character}
        @winner = cells[0].character
      end
    end
    #check diagonals
    cells = []
    (0..2).each do |ind|
      cells = cells + Move.where(column: ind, line: ind)
    end
    if cells.count == 3 && cells.all? {|x| x.character == cells[0].character}
      @winner = cells[0].character
    end
    cells = []
    (0..2).each do |ind|
      cells = cells + Move.where(column: ind, line: 2 - ind)
    end
    if cells.count == 3 && cells.all? {|x| x.character == cells[0].character}
      @winner = cells[0].character
    end
  end
end
