# ユーザー情報取得API

## Endpoint
api/v1/me

## HTTP Methods
GET

## Request
なし（HttpOnly Cookieのトークンで認証）

## Response
**正常系**

| HttpStatus | 条件 |
| ---------- | ---- |
| 200        | 認証済み（有効なJWTトークンがCookieに存在する場合） |
| 204        | 未認証（Cookieなし・JWT期限切れ・無効な場合） |

### 200 OK

| 物理名    |     | 論理名     | Required | 型     | Note |
| --------- | --- | ---------- | -------- | ------ | ---- |
| user_id   |     | ユーザーID | 〇       | Number |      |
| user_name |     | ユーザー名 | 〇       | String |      |
| email     |     | メール     | 〇       | String |      |

```json
{
  "user_id": 1,
  "user_name": "John Doe",
  "email": "john@example.com"
}
```

### 204 No Content
レスポンスボディなし

**異常系**

| HttpStatus | error_code | message       | 条件                              |
| ---------- | ---------- | ------------- | --------------------------------- |
| 500        | API_ERR999 | server error. | バックエンド内で想定外のエラー発生時 |

```json
{
  "error_code": "API_ERR999",
  "message": "server error."
}
```
