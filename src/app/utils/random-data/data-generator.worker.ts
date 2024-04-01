/// <reference lib="webworker" />

import { faker } from "@faker-js/faker";

addEventListener('message', ({ data }) => {
  const users = Array.from({length: data.amount}, () => genUser({n: data.elements[0], e: data.elements[1], p: data.elements[2], a: data.elements[3]}));
  postMessage(users);
}, false);

interface User {
  name: string;
  email: string;
  phone: string;
  address: string;
}

function genUser({n, e, p, a}: {n: boolean, e: boolean, p: boolean, a: boolean}): User {
  let name = "";
  let email = "";
  let phone = "";
  let address = "";
  if(n == true) name = faker.person.firstName();
  if(e == true) email = faker.internet.email();
  if(p == true) phone = faker.phone.number();
  if(a == true) address = faker.location.streetAddress();
  return {name, email, phone, address};
}
