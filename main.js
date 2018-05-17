// функция getAllUsers() - должна вернуть текущий список всех пользователей в БД.
const getUsers = document.querySelector("#get-all-users"); // Button
const resultUsers = document.querySelector("#result-get-users"); // result

// функция getUserById(id) - должна вернуть пользователя с переданным id.
const userId = document.querySelector("#user-id"); // input user Id
const getUserId = document.querySelector("#get-user"); // button

//функция addUser(name, age) - должна записывать в БД юзера с полями name и age.
const userName = document.querySelector("#add-user-name"); // input name
const userAge = document.querySelector("#add-user-age"); // input age
const getUserData = document.querySelector("#add-user"); // button
const resultAdd = document.querySelector("#result-add"); // result

// функция removeUser(id) - должна удалять из БД юзера по указанному id.
const removeUserId = document.querySelector("#remove-user-id"); // input user Id
const getRemoveUser = document.querySelector("#get-remove-user"); // button
const resultRemove = document.querySelector("#result-remove"); // result

// функция updateUser(id, user) - должна обновлять данные пользователя по id. user это объект с новыми полями name и age.
const getIdUpdate = document.querySelector("#user-id-update"); // input user Id
const getUpdate = document.querySelector("#update-users"); // button
const resultUpdate = document.querySelector("#result-update"); // result

const tBody = document.querySelector("#js-tbody");
const htmlTpl = document.querySelector("#table-row").textContent.trim();
const compiled = _.template(htmlTpl);
const url = 'https://test-users-api.herokuapp.com/users';

// get all users
const updateView = currencies => {
  let htmlString = "";
  currencies.data.forEach(currency => {
    htmlString += compiled(currency);
  });
  tBody.innerHTML = htmlString;
};

// get by id
const currentUser = user => {
  let htmlString = "";
  user.forEach(allUsers => {
    if (allUsers.id == userId.value){
      htmlString += compiled(allUsers)
    }
  });
  tBody.innerHTML = htmlString;
};

// get all users
const getAllUsers = () =>
  fetch(url)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error("Error fetching data");
    })
    .catch(err => {
      console.error("Error: ", err);
    });
const onClickGetUsers = () => {
  getAllUsers().then(currencies => {
    updateView(currencies);
  });
};

// get by id
const getUser = () =>
  fetch(url)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error("Error fetching data");
    })
    .catch(err => {
      console.error("Error: ", err);
    });
const onClickGetUser = () => {
  getUser().then(currencies => {
    user = currencies.data
    currentUser(user);
  });
};

// add user name age
const addUser = (name, age) =>
  fetch(url, {
    method: 'POST',
    body: JSON.stringify({ name: name, age: age}),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
    });

const onClickAddUser = () => {
  name = userName.value;
  age = userAge.value;
  name == '' || age == ''
    ?htmlString = 'Nothing to add'
    :( resultAdd.textContent = `To DataBase add user with name: ${name}, and age: ${age}`,
      addUser(name, age))
}

// remove user
const removeUser = id => {
  return fetch(url + '/' + id, {
    method: 'delete'
  })
  .then(response => response.json());
}

const onClickRemoveUser = () => {
  id = removeUserId.value;
  id == null
    ? resultRemove.textContent = 'Nothing to remove'
    :( resultRemove.textContent = `Remove user with id: ${id}`,
      removeUser(id))
}

const updateUser= (id, user) =>
  fetch(url + '/' + id, {
    method: 'PUT',
    body: JSON.stringify({name: user.name, age: user.age}),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }

  });

const onClickUpdateUser = () => {
  id = getIdUpdate.value;
  user = {
    name: 'Mr. Smith',
    age: 21
  };
  id == ''
    ? htmlString = 'Nothing to add'
    :( resultUpdate.textContent = `User with id: ${id}, was changing name: ${user.name}, and age: ${user.age}`,
      updateUser(id, user))
}

getUsers.addEventListener("click", onClickGetUsers);
getUserId.addEventListener("click", onClickGetUser);
getUserData.addEventListener("click", onClickAddUser);
getRemoveUser.addEventListener("click", onClickRemoveUser);
getUpdate.addEventListener("click", onClickUpdateUser);
