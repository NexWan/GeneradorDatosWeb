/// <reference lib="webworker" />

import { faker } from "@faker-js/faker";

addEventListener('message', ({ data }) => {
  const users = Array.from({length: data.amount}, genUser)
  postMessage(users);
}, false);

interface User {
  name: string;
  email: string;
  phone: string;
  address: string;
}

function genUser(): User {
  return {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    address: faker.location.streetAddress()
  };
}