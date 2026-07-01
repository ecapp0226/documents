# ログアウトAPI

## Endpoint
/api/v1/logout

## HTTP Methods
POST

## Request
| 物理名 | 論理名 | Required | 型 | Note |
| ------ | ------ | -------- | -- | ---- |
|        |        |          |    |      |

## Response
**正常系**

| HttpStatus |
| ---------- |
| 204        |
  
| 物理名 |        | 論理名 | Required | 型 | Note |
| ------ | ------ | ------ | -------- | -- | ---- |
|        |        |        |          |    |      |

```json
※レスポンスボディ無し
```

**異常系**

| HttpStatus | error_code | message       | 条件                                 |
| ---------- | ---------- | ------------- | ------------------------------------ |
| 500        | API_ERR999 | server error. | バックエンド内で想定外のエラー発生時 |

```json
{
  "error_code": "API_ERR999",
  "message": "server error."
}
```
