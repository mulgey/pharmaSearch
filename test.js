var items = {
    "a": {
      "text": "text",
      "index": 5
    },
    "b": {
      "text": "text",
      "index": 3
    },
    "c": {
      "text": "text",
      "index": 1,
    }
  };
  
  Object.keys(items).sort(function(a, b) {
    return items[a].index - items[b].index;
  }).forEach(doStuff);
  
  function doStuff(key) {
    console.log(items[key]);
  }

  <i style="vertical-align: middle;" class="material-icons">label_outline</i>