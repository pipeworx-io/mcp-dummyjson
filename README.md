# @pipeworx/dummyjson

[DummyJSON](https://dummyjson.com/) MCP — keyless mock REST data for prototyping, agent test scaffolds, demos.

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1394+ live data sources.

## Tools

- `products(limit?, skip?, select?)` — paged products
- `product(id)` — single product
- `product_search(q, limit?, skip?)` — search products
- `products_categories()` — category list
- `users(limit?, skip?, select?)` — paged users
- `user(id)` — single user
- `posts(limit?, skip?, select?)` — paged posts
- `post(id)` — single post
- `comments(limit?, skip?)` — paged comments
- `recipes(limit?, skip?, select?)` — paged recipes
- `recipe(id)` — single recipe
- `quotes(limit?, skip?)` — paged quotes
- `todos(limit?, skip?)` — paged todos

## Data source

`https://dummyjson.com`

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "dummyjson": {
      "url": "https://gateway.pipeworx.io/dummyjson/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 1394+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Dummyjson data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
