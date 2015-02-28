
module.exports = {
  datestring: function() {
    var d = new Date(Date.now() - 5*60*60*1000);  //est timezone
    return d.getUTCFullYear()   + '-'
       +  (d.getUTCMonth() + 1) + '-'
       +   d.getDate();
  },
  handleError: function(err) {
    console.log('*** error ***');
    console.log(err);
    console.log('*** /error ***');
    return 1;
  },
  handleSuccess: function(data) {
    console.log(data);
  },
  randIndex: function(arr) {
    var index = Math.floor(arr.length*Math.random());
    return arr[index];
  }
};