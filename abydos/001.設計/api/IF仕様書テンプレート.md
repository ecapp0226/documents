# {API名}

## Endpoint
/{path}

## HTTP Methods
{GET / POST / PUT / DELETE}

## Request
| 物理名 | 論理名 | Required | 型 | Note |
| ------ | ------ | -------- | -- | ---- |
|        |        |          |    |      |

## Response
**正常系**

| 物理名 |        | 論理名 | Required | 型 | Note |
| ------ | ------ | ------ | -------- | -- | ---- |
|        |        |        |          |    |      |

```json
{

}
```

**異常系**

| HttpStatus | error_code | message                 | 条件                                 |
| ---------- | ---------- | ----------------------- | ------------------------------------ |
| 400        | API_ERR001 | validation check error. | バリデーションエラー                 |
| 500        | API_ERR999 | server error.           | バックエンド内で想定外のエラー発生時 |

```json
{
  "error_code": "API_ERR001",
  "message": "validation check error."
}
```

```json
{
  "error_code": "API_ERR999",
  "message": "server error."
}
```
