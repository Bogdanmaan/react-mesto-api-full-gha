const Card = require('../models/cards');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');

const NO_ERR = 200;
const NO_ERROR = 201;

const getCards = (req, res, next) => Card.find({})
  .then((cards) => res.status(NO_ERR).send(cards))
  .catch((err) => next(err));

const createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  return Card.create({ name, link, owner })
    .then((card) => card.populate('owner'))
    .then((newCard) => res.status(NO_ERR).send(newCard))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Некорректные данные'));
      }
      return next(err);
    });
};

const deleteCardById = (req, res, next) => {
  const { cardId } = req.params;
  return Card.findById(cardId)
    .then((card) => card.populate('owner'))
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      if (req.user._id === card.owner._id) {
        return card.deleteOne().then((needCard) => {
          if (!needCard) {
            throw new NotFoundError('Карточка не найдена');
          }
          return res.status(NO_ERR).send('Карточка удалена');
        });
      }
      throw new NotFoundError('Карточку нельзя удалить');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Некорректные данные'));
      }
      return next(err);
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => card.populate(['owner', 'likes']))
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      return res.status(NO_ERROR).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Некорректные данные'));
      }
      return next(err);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => card.populate(['owner', 'likes']))
    // .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      return res.status(NO_ERR).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Некорректные данные'));
      }
      return next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};
