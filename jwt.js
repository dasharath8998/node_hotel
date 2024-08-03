const jwt = require('jsonwebtoken')

const jwtAuthMiddleware = (req, res, next) => {

  try {

    const hToken = req.headers.authorization;
    if (!hToken) return res.status(401).json({ message: 'Invalid token' });

    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET, { expiresIn: 30000 })
    req.user = decoded
    next();
  } catch (err) {
    next(err)
  }

}

const generateToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET);
}

module.exports = { jwtAuthMiddleware, generateToken }