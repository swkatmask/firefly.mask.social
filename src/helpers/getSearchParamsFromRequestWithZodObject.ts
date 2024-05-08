import type { NextRequest } from 'next/server.js';
import { z, type ZodObject, type ZodRawShape } from 'zod';

export function getSearchParamsFromRequestWithZodObject<T extends ZodRawShape>(
    request: NextRequest,
    schemas: ZodObject<T>,
): z.infer<ZodObject<T>> {
    const obj = Object.fromEntries(request.nextUrl.searchParams.entries());
    return schemas.parse(obj);
}
