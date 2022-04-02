# Prisma runs in Gatsby SSR mode

为了实现 gatsby 的'一体化'功能, 通过其 SSR 的能力, 直接在 pages 下的页面直接访问数据库, 因为 SSR 的功能是运行在服务器上, 虽然是写在 pages 中, 但是依旧是通过服务器端运行 database 的 orm 的效果.

如此,可以实现'一体化'功能, 即前端 react 加载的数据不是通过 api, 而是直接连接数据库.

## What's Done
1. in the ssr page from gatsby default starter, replace `fetch` with `@prisma/client`
2. put prisma into getServerData() function


## Issues for Prisma (till 3.11)
1. 直到 3.11, prisma 在 SSR 的稳定性不好, 会报 `_http_common` 一类的问题, 这在 Next.js, Nest.js 的社区都有讨论到. Gatsby 4 刚推出 SSR, 目前讨论的较少. 这个问题的解决方式,是需要用到目前的 @prisma/client@dev 的版本, 具体参加: https://github.com/prisma/prisma/issues/6899#issuecomment-1079107042

2. prisma 读取 .env 在这个@dev 的版本不稳定, 会报 `error: Environment variable not found: DATABASE_URL.`, 即便如何删除 .cache 和 `npx prisma generate`, 都无法解决