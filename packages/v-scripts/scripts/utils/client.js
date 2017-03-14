require('eventsource-polyfill')
require('webpack-hot-middleware/client?noInfo=true&reload=true')
  .subscribe(e => e.action === 'reload' && window.location.reload())
