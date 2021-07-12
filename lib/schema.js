function pre(schema) {
  schema.pre('save', function (next) {
    if (this.isNew) {
      this.addedAt = new Date();
    } 
    return next();
  });
}
  
  module.exports = {
    pre,
  };
  