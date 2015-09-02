(function(){
  if (!document.addEventListener) return;

  var options = INSTALL_OPTIONS;

  var add = function(){
    for (var i = 0; i < options.blocks.length; i++) {
      var el = Eager.createElement(options.blocks[i].location);

      var code = options.blocks[i].code;
      if (typeof code == 'string')
        el.innerHTML = code;
      else if (typeof code == 'object')
        el.innerHTML = code.html;
    }
  };

  if (document.readyState == 'loading')
    document.addEventListener('DOMContentLoaded', add);
  else
    add();
})();
