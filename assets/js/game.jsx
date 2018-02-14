import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';
import classnames from 'classnames';

<<<<<<< HEAD
export default function game_init(root, channel) {
  ReactDOM.render(<MemoryGame channel={channel} />, root);
}

function getTiles() {
  var alphabets = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  var tiles = [];
  for (var i=0; i < 16; i++) {
    tiles.push({ index: i,
                 val: alphabets[i],
=======
export default function run_game(root) {
  ReactDOM.render(<Game side={0}/>, root);
}

function shuffle(alpha) {
  for (var i=0; i < alpha.length; i++) {
    var j = Math.floor(Math.random() * i);
    var temp = alpha[i];
    
    alpha[i] = alpha[j];
    alpha[j] = temp;
  }
  return alpha;
}

function getTiles() {
  
  var alphabets = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  var shuffled_alpha = shuffle(alphabets);
  var tiles = [];
  
  for (var i=0; i < 16; i++) {
    tiles.push({ index: i,
                 val: shuffled_alpha[i],
>>>>>>> e1005e36f9678645af1b194cae4e1c8cee4c5cde
                 open: false,
                 match: false
               })
 }
 return tiles;
}

<<<<<<< HEAD
class MemoryGame extends React.Component {
  
  constructor(props){
    super(props);
    this.channel = props.channel;
    this.state = {
      tiles: getTiles(),
      clicks: 0,
      prev_tile: {},
      curr_tile: {},
      wrong_match: 1
    };

    this.channel.join()
                .receive("ok", this.getView.bind(this))
                .receive("error", resp => { console.log("Unable to join", resp)});
  }

  getView(view) {
    this.setState(view.game);

    if(this.state.wrong_match == 0)
    {
      setTimeout(() => {
                this.channel.push("flipback")
                          .receive("ok", this.getView.bind(this));
           }, 1000);
    }

  }
  
  playing(tile) {
    this.channel.push("tile", {tile})
                        .receive("ok", this.getView.bind(this));
=======
class Game extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
                   tiles: getTiles(),
                   clicks: 0,
                   prev_tile: null,
                   processing: false
                  };
  }

  playing(tile) {

     var prev_tile = this.state.prev_tile;
     var tiles = this.state.tiles;

     if(this.state.processing) return;
     if(tile.match) return;
     if(prev_tile) {
      if(prev_tile.index === tile.index) {
        return;
      }
     }
     
     tiles[tile.index].open = true;
     this.setState({
                    tiles: tiles,
                    processing: true,
                  });

     if(prev_tile) {
        var clicks = this.state.clicks;
        this.setState({clicks: clicks + 1});
        if(tile.val === prev_tile.val && tile.index !== prev_tile.index) {
          tile.match=true;
          tiles[prev_tile.index].match = true;
          prev_tile = null;
          this.setState({
                      tiles: tiles, prev_tile: prev_tile, processing: false
                    });
        }
        else {
          setTimeout(() => {
              tiles[tile.index].open = false;
              tiles[prev_tile.index].open = false;
              prev_tile = null;
              this.setState({
                      tiles: tiles, prev_tile: prev_tile, processing: false
                    });
         }, 1000);
      }
    }
    else {
      tiles[tile.index].open = true;
      prev_tile = tiles[tile.index];
      this.setState({
                    tiles: tiles, prev_tile: prev_tile, processing: false
                  });
    }
    
     
  }
  
  gameWon(){
      
      var tiles = this.state.tiles;
      var count = 0;
      tiles.forEach(function(tile){
         if(tile.open === true) count++;
    });
    if(count==16) {
    return true;
    }
    return false;
  }
  
  restart(){
    this.setState({
                    tiles: getTiles(),
                    clicks: 0,
                    prev_tile: null,
                    processing: false
                   });
>>>>>>> e1005e36f9678645af1b194cae4e1c8cee4c5cde
  }

  renderTile(tile) {
    var cls = classnames({
      'card-title': tile.open,
      'matched': tile.open && tile.match
    });
<<<<<<< HEAD
    
    return (
          <div className="card" onClick={()=>this.playing(tile)}>
=======
    return (
          <div className="card"  onClick={ ()=>this.playing(tile)}>
>>>>>>> e1005e36f9678645af1b194cae4e1c8cee4c5cde
            <div className="card-block">
              {tile.open && (<h4 className={cls}>{tile.val}</h4>)}
              {!tile.open && (<h4 className="card-title"></h4>)}
            </div>
          </div>
          );
  }

<<<<<<< HEAD
  restart(){
    this.channel.push("restart")
        .receive("ok", this.getView.bind(this));
  }

  gameWon(){
    var tiles = this.state.tiles;
    var count = 0;
    tiles.forEach(function(tile){
      if(tile.open === true) count++;
    });
    if(count==16) {
    return true;
    }
    return false;
  }

  render() {

    var tiles = this.state.tiles;

=======
  render() {
    
    var tiles = this.state.tiles;
>>>>>>> e1005e36f9678645af1b194cae4e1c8cee4c5cde
    if(this.gameWon()){
            return (
            <div>
               <h2>Congrats... You Won!!!. Your Score: {this.state.clicks}</h2>
               <div className="rightCol">
                 <button onClick={()=>this.restart()}>NEW GAME</button>
               </div>
            </div>);
    }
<<<<<<< HEAD
  
    return (
=======
    return (
      
>>>>>>> e1005e36f9678645af1b194cae4e1c8cee4c5cde
      <div className="container">
        <div className="card-deck">
          {this.renderTile(tiles[0])}
          {this.renderTile(tiles[1])}
          {this.renderTile(tiles[2])}
          {this.renderTile(tiles[3])}
        </div>
        <div className="card-deck" >
          {this.renderTile(tiles[4])}
          {this.renderTile(tiles[5])}
          {this.renderTile(tiles[6])}
          {this.renderTile(tiles[7])}
        </div>
        <div className="card-deck">
          {this.renderTile(tiles[8])}
          {this.renderTile(tiles[9])}
          {this.renderTile(tiles[10])}
          {this.renderTile(tiles[11])}
        </div>
        <div className="card-deck">
          {this.renderTile(tiles[12])}
          {this.renderTile(tiles[13])}
          {this.renderTile(tiles[14])}
          {this.renderTile(tiles[15])}
        </div>
        <div className="row">
          <h4>Number of Guesses: {this.state.clicks}</h4>
        </div>
        <div className="rightCol">
                 <button onClick={()=>this.restart()}>RESTART</button>
        </div>
      </div>
    );
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> e1005e36f9678645af1b194cae4e1c8cee4c5cde
