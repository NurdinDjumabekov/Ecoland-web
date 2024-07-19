export const dataCategory = [
  {
    codeid: 2,
    name: "Остатки",
    link: "leftovers",
    img: "https://img.freepik.com/free-vector/button-style-concept-illustration_114360-4428.jpg?size=626&ext=jpg&ga=GA1.1.712878996.1706520692&semt=ais",
    pathApi: "leftovers",
  },
  {
    codeid: 3,
    name: "Продажа",
    link: "sale/main",
    img: "https://img.freepik.com/free-vector/finance-department-employees-are-calculating-expenses-company-s-business_1150-41782.jpg?t=st=1711965120~exp=1711968720~hmac=96a672de3602a7397d6e0b7452abfa17eaa700d42fd08a2a3e244eb154b7bd30&w=1380",
    pathApi: "sale/main",
  },
  {
    codeid: 6,
    name: "Возврат",
    link: "return/main",
    img: "https://img.freepik.com/premium-vector/teamwork-web-concept-with-character-scene-man-woman-work-together-construct-cubes-developing-project-people-situation-flat-design-vector-illustration-social-media-marketing-material_9209-12505.jpg?w=1380",
    pathApi: "return/main",
  },
];

export const listTableLeftoverst = [
  "Товар",
  "Остаток на начало",
  "Приход",
  "Расход",
  "Остаток на конец",
];

export const listTableForAcceptInvoice = [" Продукт", "Цена", "Шт(кг)"];

export const listTableForReturnProd = [
  " Товар",
  " Цена",
  "В наличии",
  "Возврат",
  " ....",
];

export const statusRevision = {
  1: "Не подтверждён",
  2: "Подтверждён",
  ///// статус накладных для ревизии
};

export const statusColor = {
  1: "red",
  2: "green",
};

export const typesPay = {
  1: "Поступление средств по накладной",
  2: "Передача денег торговой точки агенту",
  3: "Расходы и траты",
};

export const objTitleLeftov = {
  1: "Товар",
  2: "Цена",
  3: "Остаток на начало",
  4: "Приход",
  5: "Расход",
  6: "Остаток на конец",
};

export const upsText =
  "Упс, что-то пошло не так! Попробуйте перезайти в приложение...";

export const checkNumUser = /^\+996\(\d{3}\)-\d{2}-\d{2}-\d{2}$/;
