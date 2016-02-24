

/*
 * ===============================
 *         Map Object
 * ===============================
 */
function MapObj()
{
  // Dimensions
  this.width = 30; // Number of tiles wide
  this.height = 30; // Number of tiles tall

  this.tileWidth = 64;
  this.tileHeight = 64;

  this.dimensions = {
    tilesWide: parseInt(screen.width / this.tileWidth),  // Number of tiles to show horizontally
    tilesTall: parseInt(screen.height / this.tileHeight) // Number of tiles to show vertically
  };

  // Current top-right location on the map
  this.location = new Coordinates();
  this.offset = new Coordinates(); // Map offset in pixels



  this.steps = 8;


  // Array of tiles
  var tiles = [
    new Sprite('tiles.grass.solid'),                  // 00 - grass whole

    new Sprite('tiles.dirt.solid'),                   // 01 - dirt whole
    new Sprite('tiles.dirt.grassy.left_right'),       // 02 - Dirt with grass on left and right
    new Sprite('tiles.dirt.grassy.top_bottom'),       // 03 - Dirt with grass on top and bottom
    new Sprite('tiles.dirt.grassy.left'),             // 04 - dirt with grass on left
    new Sprite('tiles.dirt.grassy.right'),            // 05 - dirt with grass on right
    new Sprite('tiles.dirt.grassy.top'),              // 06 - dirt with grass on top
    new Sprite('tiles.dirt.grassy.bottom'),           // 07 - dirt with grass on bottom
    new Sprite('tiles.dirt.grassy.top_left'),         // 08 - dirt with grass on north west
    new Sprite('tiles.dirt.grassy.top_right'),        // 09 - dirt with grass on north east
    new Sprite('tiles.dirt.grassy.bottom_left'),      // 10 - dirt with grass on south west
    new Sprite('tiles.dirt.grassy.bottom_right'),     // 11 - dirt with grass on south east

    new Sprite('tiles.water.solid'),                  // 12 - Solid water
    new Sprite('tiles.water.grassy.left_right'),      // 13 - water with grass on the left and right
    new Sprite('tiles.water.grassy.top_bottom'),      // 14 - water with grass on top and bottom
    new Sprite('tiles.water.grassy.left'),            // 15 - Water with grass on left
    new Sprite('tiles.water.grassy.right'),           // 16 - water with grass on right
    new Sprite('tiles.water.grassy.top'),             // 17 - water with grass on top
    new Sprite('tiles.water.grassy.bottom'),          // 18 - water with grass on bottom
    new Sprite('tiles.water.grassy.top_left'),        // 19 - grass on top left
    new Sprite('tiles.water.grassy.top_right'),       // 20 - grass on top right
    new Sprite('tiles.water.grassy.bottom_left'),     // 21 - grass on bottom left
    new Sprite('tiles.water.grassy.bottom_right'),    // 22 - grass on bottom right
    new Sprite('tiles.water.grassy.horshoe_bottom'),  // 23 - grass on left, bototm, and right

    new Sprite('tiles.tree.pine'),                    // 24 - pine tree
  ];



  // Array of items
  var items = [
    new Sprite('items.healthpack.pack'),              // 00 - Health pack
    new Sprite('items.cure.pill'),                    // 01 - The Cure
  ];


  // Tile Data for the entire map
  var data = [
    [00, 00, 02, 00, 00, 00, 00, 00, 00, 15, 12, 16, 00, 13, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 24],
    [00, 00, 02, 00, 00, 00, 00, 00, 00, 15, 12, 16, 00, 13, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00],
    [00, 00, 04, 03, 03, 03, 09, 24, 00, 15, 12, 16, 00, 13, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 24],
    [00, 00, 02, 00, 00, 00, 02, 00, 00, 15, 12, 16, 00, 13, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00],
    [00, 00, 02, 00, 00, 00, 02, 00, 00, 21, 18, 22, 00, 13, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00],
    [00, 00, 02, 00, 00, 00, 02, 00, 00, 00, 00, 00, 00, 23, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00],
    [00, 00, 10, 03, 03, 03, 11, 00, 00, 19, 17, 20, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00],
    [00, 00, 00, 00, 00, 00, 00, 00, 00, 15, 12, 16, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00],
    [00, 00, 00, 00, 00, 00, 00, 00, 00, 15, 12, 16, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00],
    [00, 23, 00, 00, 00, 00, 00, 00, 00, 21, 18, 22, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00],
    [00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00],
    [00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00],
    [24, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 13, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00],
    [00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 13, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00],
    [00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 13, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00],
    [00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00],
    [00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 13, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00],
    [00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 13, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00],
    [00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00],
    [00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00],
    [00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00],
    [00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00],
    [00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00],
    [00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00],
    [00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00],
    [00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00],
    [00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00],
    [00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00],
    [00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00],
    [24, 24, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 24]
  ];

  // Map of the items
  var item_data = [
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
  ];

  // Function to get a tile
  this.getTile = function(x, y){
    return tiles[data[y][x]];
  };

  this.getTileID = function(x, y){
    return data[y][x];
  };

  // Function to get an item at a certain point
  this.getItem = function(x, y){
    if (this.hasItem(x, y))
    {
      return items[item_data[y][x]];
    }
    return null;
  }
  this.getItemID = function(x, y){
    return item_data[y][x];
  }

  // Tells if a grid has an item
  this.hasItem = function(x, y)
  {
    return (item_data[y][x] >= 0);
  }

  this.placeItem = function(x, y, itemID)
  {
    item_data[y][x] = itemID;
  }
  this.removeItem = function(x, y)
  {
    item_data[y][x] = -1;
  }
}


/* ----------------
 * Draw on Buffer
 * ---------------- */
MapObj.prototype.draw = function()
{
  for (var x = 0; x <= this.width; x++)
  {
    if ( ((x * this.tileWidth) + this.offset.x) >= screen.width){x = this.width + 1;}

    for (var y = 0; y <= this.height; y++)
    {
      if ( ((y * this.tileHeight) + this.offset.y) >= screen.height){y = this.height + 1;}

      if ( ((x + this.location.x) < this.width) && ((this.location.y + y) < this.height) )
      {
        // Draw the tile on the buffer
        this.getTile(x + this.location.x, y + this.location.y).draw((x * this.tileWidth) + this.offset.x, (y * this.tileHeight) + this.offset.y);

        // Draw the item on the buffer
        if (this.hasItem(x + this.location.x, y + this.location.y))
        {
          this.getItem(x + this.location.x, y + this.location.y).draw((x * this.tileWidth) + this.offset.x, (y * this.tileHeight) + this.offset.y);
        }
      }

    }
  }


};



MapObj.prototype.getLocation = function(x, y){
  var loc = new Coordinates(parseInt((this.offset.x * -1) / this.tileWidth), parseInt((this.offset.y * -1) / this.tileHeight));

  // Make sure x and y are valid
  if (x >= 0 && x <= screen.width && y >= 0 && y <= screen.height)
  {
    loc.x += x;
    loc.y += y;
  }

  if (loc.x >= 0 && loc.y >= 0 && loc.x <= this.width && loc.y <= this.height)
    return loc; // Return the coordinates on the map
  else
    return new Coordinates(); // Coordinates on map someone ended up invalid, return (0, 0)
};



/* ----------------
 *    Valid Move
 * ---------------- */
MapObj.prototype.validMove = function(x, y){
  var map_x = parseInt((x  + (this.offset.x * -1)) / this.tileWidth);
  var map_y = parseInt((y + (this.offset.y * -1)) / this.tileHeight);

  // Constraint to force the new map location to be valid
  if (map_x >= 0 && map_y >= 0 && map_x <= this.width && map_y <= this.height)
  {
    // Constraint to make sure the character sprite does not move off of the screen
    if (x >= 0 && x <= screen.width && y >= 0 && y <= screen.height)
    {
      // Constraint to make sure that the map tile isn't something you can't walk on
      if (this.getTileID(map_x, map_y) < 12)
      {
        return true;
      }
    }
  }

  return false;

};

MapObj.prototype.pickupItem = function(x, y){
  var map_x = parseInt((x  + (this.offset.x * -1)) / this.tileWidth);
  var map_y = parseInt((y + (this.offset.y * -1)) / this.tileHeight);

  // Constraint to force the new map location to be valid
  if (map_x >= 0 && map_y >= 0 && map_x <= this.width && map_y <= this.height)
  {
    // Constraint to make sure the character sprite does not move off of the screen
    if (x >= 0 && x <= screen.width && y >= 0 && y <= screen.height)
    {
      var item_id = this.getItemID(map_x, map_y);
      if (item_id != -1)
      {
        this.removeItem(map_x, map_y); // Remove the item
        return item_id;
      }
    }
  }

  // Not a valid location
  return null;
};


MapObj.prototype.validShift = function(x, y){
  return ( (this.location.x + x <= this.width) && (this.location.y + y <= this.height) );
};



/* ----------------
 *  Shift Map Left
 * ---------------- */
MapObj.prototype.shiftLeft = function(player_x, player_y) {
  this.offset.x += this.steps;

  if (this.offset.x > 0)
  {
    this.offset.x -= this.steps;
    return false;
  }

  // If the character can not move to that tile, undo the shift, but still return true
  if (!this.validMove(player_x, player_y))
  {
    this.offset.x -= this.steps;
  }

  return true;

};



/* ----------------
 *  Shift Map Right
 * ---------------- */
MapObj.prototype.shiftRight = function(player_x, player_y) {

  this.offset.x -= this.steps;

  // Do not let the map offset too far
  if ((this.offset.x < (((this.width * this.tileWidth) - screen.width) * -1)))
  {
    this.offset.x += this.steps;
    return false;
  }

  // If the character can not move to that tile, undo the shift, but still return true
  if (!this.validMove(player_x, player_y))
  {
    this.offset.x += this.steps;
  }

  return true;
};


/* ----------------
 *  Shift Map Up
 * ---------------- */
MapObj.prototype.shiftUp = function(player_x, player_y) {

  this.offset.y += this.steps;

  // Make sure the offset is not past the endge of the map
  if (this.offset.y > 0)
  {
    this.offset.y -= this.steps;
    return false;
  }

  // If the character can not move to that tile, undo the shift, but still return true
  if (!this.validMove(player_x, player_y))
  {
    this.offset.y -= this.steps;
  }

  return true;
};


/* ----------------
 *  Shift Map Down
 * ---------------- */
MapObj.prototype.shiftDown = function(player_x, player_y) {
  this.offset.y -= this.steps;

  // Do not let the map offset too far
  if (this.offset.y < (((this.height * this.tileHeight) - screen.height) * -1) )
  {
    this.offset.y += this.steps;
    return false;
  }

  // If the character can not move to that tile, undo the shift, but still return true
  if (!this.validMove(player_x, player_y))
  {
    this.offset.y += this.steps;
  }

  return true;
};





/* ----------------
 *  Spawn Items
 * ---------------- */
 MapObj.prototype.spawnItems = function()
 {
   // Spawn 5 health packs around the map
   var packs_left = 5;
   var rand_x = 0;
   var rand_y = 0;

   while (packs_left > 0)
   {
      rand_x = Math.floor((Math.random() * (this.width - 1)));
      rand_y = Math.floor((Math.random() * (this.height - 1)));

      if (!this.hasItem(rand_x, rand_y) && this.getTileID(rand_x, rand_y) < 12)
      {
        this.placeItem(rand_x, rand_y, 00);
        packs_left--;
      }
   }
 };











var map = new MapObj();
