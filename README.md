# Github Issue 部落格

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## 環境

Node.js,

## 文件

.env文件

```bash
    #project/.env:
    CLIENT_ID = client ID from GitHub OAuth apps
    CLIENT_SECRET = client secrets from GitHub OAuth apps
    HOST = homepage URL
    NEXTAUTH_SECRET = create a good value by command 'openssl rand -base64 32'
    NEXT_PUBLIC_OWNER_NAME = owers GitHub name
    NEXT_PUBLIC_REPO_NAME = the project that issues come from
```

## Getting Started

1. 安裝 [Node.js](https://nodejs.org/en)\

2. 初始化

    ```bash
    npm i
    ```

3. 在專案目錄下建立.env

    ```bash
        #GithubBlog/.env:
        CLIENT_ID = 
        CLIENT_SECRET = 
        HOST = "https://localhost:3000"
        NEXTAUTH_SECRET = 
        NEXT_PUBLIC_OWNER_NAME = 
    ```

4. 運行開發伺服器:

    ```bash
    npm run dev
    ```

    用瀏覽器開啟[http://localhost:3000](http://localhost:3000)

## Learn More
