const userRoutes = require('../routes/userRoutes');
const memeRoutes = require('../routes/memeRoutes');
const resetPassRoutes = require('../routes/resetPassRoutes');

module.exports = (app) => {
    app.use('/api/user', userRoutes);
    app.use('/api/meme', memeRoutes);
    app.use('/api/reset', resetPassRoutes);
}