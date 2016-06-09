(function(){
  if (!document.addEventListener) return;

  var options = INSTALL_OPTIONS;
  var elements = {};

  var prevElements = {};

  var add = function(){
    console.log(options.richtextTest)
    for (var i = 0; i < options.blocks.length; i++) {
      var block = options.blocks[i];
      var locationHash = block.location.selector + "!" + block.location.method;


      if (elements[locationHash]){
        var el = elements[locationHash];
      } else {
        if (block.location.method === 'replace'){
          prevElements[locationHash] = document.querySelector(block.location.selector);
        }

        var el = Eager.createElement(block.location);
        elements[locationHash] = el;
      }

      el.foundInBlocks = true;

      var code = block.code;
      if (typeof code == 'string')
        el.innerHTML = code;
      else if (typeof code == 'object')
        el.innerHTML = code.html;
    }

    for (var hash in elements){
      if (!elements[hash].foundInBlocks){
        if (prevElements[hash]){
          elements[hash].parentNode.replaceChild(prevElements[hash], elements[hash]);
          delete prevElements[hash];
        } else {
          elements[hash].parentNode.removeChild(elements[hash]);
        }

        delete elements[hash];
      } else {
        delete elements[hash].foundInBlocks;
      }
    }
  };

  var setOptions = function(opts){
    options = opts;

    add();
  };

  if (document.readyState == 'loading')
    document.addEventListener('DOMContentLoaded', add);
  else
    add();

  window.EagerAddMarkdown = {
    setOptions: setOptions
  };
})();
