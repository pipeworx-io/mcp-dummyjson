interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
  meter?: { credits: number };
  cost?: Record<string, unknown>;
  provider?: string;
}

/**
 * DummyJSON MCP.
 */


const BASE = 'https://dummyjson.com';
const UA = 'pipeworx-mcp-dummyjson/1.0 (+https://pipeworx.io)';

const listProps = { limit: { type: 'number' as const }, skip: { type: 'number' as const }, select: { type: 'string' as const } };
const minProps = { limit: { type: 'number' as const }, skip: { type: 'number' as const } };

const tools: McpToolExport['tools'] = [
  { name: 'products', description: 'Paged products.', inputSchema: { type: 'object', properties: listProps } },
  { name: 'product', description: 'Single product.', inputSchema: { type: 'object', properties: { id: { type: 'number' } }, required: ['id'] } },
  { name: 'product_search', description: 'Search products.', inputSchema: { type: 'object', properties: { q: { type: 'string' }, limit: { type: 'number' }, skip: { type: 'number' } }, required: ['q'] } },
  { name: 'products_categories', description: 'Category list.', inputSchema: { type: 'object', properties: {} } },
  { name: 'users', description: 'Paged users.', inputSchema: { type: 'object', properties: listProps } },
  { name: 'user', description: 'Single user.', inputSchema: { type: 'object', properties: { id: { type: 'number' } }, required: ['id'] } },
  { name: 'posts', description: 'Paged posts.', inputSchema: { type: 'object', properties: listProps } },
  { name: 'post', description: 'Single post.', inputSchema: { type: 'object', properties: { id: { type: 'number' } }, required: ['id'] } },
  { name: 'comments', description: 'Paged comments.', inputSchema: { type: 'object', properties: minProps } },
  { name: 'recipes', description: 'Paged recipes.', inputSchema: { type: 'object', properties: listProps } },
  { name: 'recipe', description: 'Single recipe.', inputSchema: { type: 'object', properties: { id: { type: 'number' } }, required: ['id'] } },
  { name: 'quotes', description: 'Paged quotes.', inputSchema: { type: 'object', properties: minProps } },
  { name: 'todos', description: 'Paged todos.', inputSchema: { type: 'object', properties: minProps } },
];

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  const get = async (path: string, params?: Record<string, unknown>) => {
    const p = new URLSearchParams();
    if (params) for (const [k, v] of Object.entries(params)) if (v != null) p.set(k, String(v));
    const url = `${BASE}${path}${[...p].length ? `?${p}` : ''}`;
    const res = await fetch(url, { headers: { Accept: 'application/json', 'User-Agent': UA } });
    if (!res.ok) throw new Error(`DummyJSON: ${res.status}`);
    return res.json();
  };
  const reqNum = (k: string, ex: string) => {
    const v = args[k];
    if (v == null || typeof v !== 'number') throw new Error(`Required argument "${k}" is missing. Pass a number like ${ex}.`);
    return v;
  };
  switch (name) {
    case 'products':
      return get('/products', args);
    case 'product':
      return get(`/products/${reqNum('id', '1')}`);
    case 'product_search':
      return get('/products/search', args);
    case 'products_categories':
      return get('/products/categories');
    case 'users':
      return get('/users', args);
    case 'user':
      return get(`/users/${reqNum('id', '1')}`);
    case 'posts':
      return get('/posts', args);
    case 'post':
      return get(`/posts/${reqNum('id', '1')}`);
    case 'comments':
      return get('/comments', args);
    case 'recipes':
      return get('/recipes', args);
    case 'recipe':
      return get(`/recipes/${reqNum('id', '1')}`);
    case 'quotes':
      return get('/quotes', args);
    case 'todos':
      return get('/todos', args);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

export default { tools, callTool, meter: { credits: 1 } } satisfies McpToolExport;
