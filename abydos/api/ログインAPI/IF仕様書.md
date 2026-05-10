# ログインAPI

## Endpoint
/login

## HTTP Methods
POST

## Request
| 物理名   | 論理名     | Required | 型     | Note |
| -------- | ---------- | -------- | ------ | ---- |
| email    | email      | 〇       | String |      |
| password | パスワード | 〇       | String |      |

## Response
**正常系**

| 物理名    |     | 論理名      | Required | 型     | Note |
| --------- | --- | ----------- | -------- | ------ | ---- |
| token     |     | JWTトークン | 〇       | String |      |
| user_name |     | ユーザー名  | 〇       | String |      |

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30",
  "user_name": "John Doe"
}
```

**異常系**

| HttpStatus | error_code       | message                   | 条件                                 |
| ---------- | ---------------- | ------------------------- | ------------------------------------ |
| 400        | API_ERR001       | validation check error.   | バリデーションエラー                 |
| 401        | API_LOGIN_ERR001 | invalid password or email | JWTが期限切れ・無効な場合            |
| 500        | API_ERR999       | server error.             | バックエンド内で想定外のエラー発生時 |

```json
{
  "error_code": "API_ERR001",
  "message": "validation check error."
}
```

```json
{
  "error_code": "API_LOGIN_ERR001",
  "message": "invalid password or email."
}
```

```json
{
  "error_code": "API_ERR999",
  "message": "server error."
}
```
