SELECT *
FROM expenses;

SELECT *
FROM users;

SELECT *
FROM users
  LEFT JOIN expenses ON users.id = expenses.user_id