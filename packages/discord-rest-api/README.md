# @hiyocord/discord-rest-api

discordのRest APIラッパーです。

## How to use?

Example

```ts
import { getClient } from '@hiyocord/discord-rest-api';

const cl = getClient("token")
cl.get("/applications/{application_id}/commands", {
    params: {
        path: {
            application_id: p.application_id,
        },
    },
});
```


## shortcut system
### What is the shortcut system?

Rest APIのラッパー関数を利用者側で定義出来る機能です。
clientに定義したコンポーネントがマージされます。

### How to use the shortcut system?

write later...


