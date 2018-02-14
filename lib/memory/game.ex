defmodule Memory.Game do

  def new do
    %{
      tiles: getTiles(),
      clicks: 0,
      prev_tile: %{},
      curr_tile: %{},
      wrong_match: 1,
    }
  end
  
  def client_view(game) do
    %{
      tiles: game.tiles,
      clicks: game.clicks,
      prev_tile: game.prev_tile,
      curr_tile: game.curr_tile,
      wrong_match: game.wrong_match,
    }
  end

  def getTiles do
  a = [ "A", "B", "C", "D", "E", "F", "G", "H", "A", "B", "C", "D", "E", "F", "G", "H"]
  shuffled_alpha =  Enum.shuffle(a)
  indeces = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
     for indx <- indeces do
      %{
         index: indx,
         val: Enum.at(shuffled_alpha, indx),
         open: false,
         match: false,
      }     
      end
  end

  def restart() do
    new()
  end

  def flipback(state) do
    if state.curr_tile !={} do
        tiles = state.tiles
        prev_tile = state.prev_tile
        ind = state.curr_tile["index"]
        IO.inspect ind
        IO.inspect state.curr_tile
        IO.inspect prev_tile

        z = Map.put(Enum.at(tiles, ind), :open, false)
        tiles = List.delete_at(tiles, ind)
        tiles = List.insert_at(tiles, ind , z) 
        
        l = prev_tile.index
        t = Map.put(Enum.at(tiles, l), :open, false)
        tiles = List.delete_at(tiles, l)
        tiles = List.insert_at(tiles, l , t)

        prev_tile = %{} 
        curr_tile = %{}
        state = Map.put(state, :tiles, tiles)
        state = Map.put(state, :prev_tile, prev_tile)
        state = Map.put(state, :curr_tile, curr_tile)
        state = Map.put(state, :wrong_match, 1)
    end 
  end
  
  def playing(state, tile) do
    
    prev_tile = state.prev_tile
    tiles = state.tiles

    state = Map.put(state, :curr_tile, tile)
    state = Map.put(state, :wrong_match, 1)

    if tile["open"] == true do
      state = state
    else
        i = tile["index"]
        x = Map.put(Enum.at(tiles, i), :open, true)
        tiles = List.delete_at(tiles, i)
        tiles = List.insert_at(tiles, i , x) 
        state = Map.put(state, :tiles, tiles)
        if tile["match"] == true do
          state = state
        else
          if prev_tile != %{} do
            if prev_tile.index == tile["index"] do
              state = state
            else

              clicks = state.clicks
              state = Map.put(state, :clicks, clicks + 1)
              if tile["val"] == prev_tile.val and tile["index"] != prev_tile.index do
                  p = tile["index"]
                  q = Map.put(Enum.at(tiles, p), :match, true)
                  tiles = List.delete_at(tiles, p)
                  tiles = List.insert_at(tiles, p , q)  

                  indx = prev_tile.index
                  y = Map.put(Enum.at(tiles, indx), :match, true)
                  tiles = List.delete_at(tiles, indx)
                  tiles = List.insert_at(tiles, indx , y) 

                  prev_tile = %{}
                  state = Map.put(state, :tiles, tiles)
                  state = Map.put(state, :prev_tile, prev_tile)

              else
                  state = Map.put(state, :wrong_match, 0) 
              end
            end
          else
              j = tile["index"]
              k = Map.put(Enum.at(tiles, j), :open, true)
              tiles = List.delete_at(tiles, j)
              tiles = List.insert_at(tiles, j , k)

              prev_tile = Enum.at(tiles, tile["index"])

              state = Map.put(state, :tiles, tiles)
              state = Map.put(state, :prev_tile, prev_tile)
         end
       end
    end    
  end
end
