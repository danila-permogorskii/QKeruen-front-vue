export const CAR_TYPES = [
  {
    id: 0,
    title: 'Эконом',
    key: 'econom',
    img: require('@/assets/images/types-of-machines/econom.png'),
  },
  {
    id: 1,
    title: 'Комфорт',
    key: 'comfort',
    img: require('@/assets/images/types-of-machines/econom.png'),
  },
  {
    id: 2,
    title: 'Минивен',
    key: 'minivan',
    img: require('@/assets/images/types-of-machines/minivan.png'),
  },
];

export const TRUCK_TYPES = [
  {
    id: 1,
    title: 'Микроавтобус',
    description: 'До 750кг - предназначен для перевозки малой мебели и коробок',
    key: 'microbus',
    img: require('@/assets/images/trucks/microbus.png'),
  },
  {
    id: 2,
    title: 'Малый кузов',
    description: 'До 400 кг - поместится мелкая техника, кресло или тумба',
    key: 'small',
    img: require('@/assets/images/trucks/small.png'),
  },
  {
    id: 3,
    title: 'Средний кузов',
    description: 'До 1.5т - поместится диван и коробки с вещами',
    key: 'middle',
    img: require('@/assets/images/trucks/middle.png'),
  },
  {
    id: 4,
    title: 'Большой кузов',
    description: 'До 5т - поместится крупня техника, вся мебель и коробки',
    key: 'big',
    active: true,
    img: require('@/assets/images/trucks/big.png'),
  },
  {
    id: 5,
    title: 'Бортовой',
    description: 'До 7т - с откидными бортами, поместится крупная мебель и стройматериалы',
    key: 'bort',
    img: require('@/assets/images/trucks/bort.png'),
  },
  {
    id: 6,
    title: 'Рефрижератор',
    description: 'До 1.5т - сохранится температура еды и лекарств',
    key: 'refrizh',
    img: require('@/assets/images/trucks/refrizh.png'),
  },
  {
    id: 7,
    title: 'Фура',
    description: 'До 20т - по межгороду, поместится вся мебель и стройматериалы',
    key: 'truck',
    img: require('@/assets/images/trucks/truck.png'),
  },
];

export const KEY_NAMES = {
  avatar: 'Фото профиля',
  carColor: 'Цвет машины',
  carModel: 'Тип машины',
  carNumber: 'Номер машины',
  firstName: 'Имя',
  id: 'ID',
  inn: 'ИИН',
  lastName: 'Фамилия',
  phone: 'Номер',
}

export const CAR_COLORS = [
  'Чёрный',
  'Белый',
  'Серый',
  'Серебристый',
  'Красный',
  'Синий',
  'Голубой',
  'Розовый',
  'Жёлтый',
  'Золотистый',
  'Оранжевый',
  'Фиолетовый',
  'Бежевый',
]