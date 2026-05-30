import { NextResponse } from 'next/server';

const SOURCE = 'https://avatars.githubusercontent.com/u/22870886?v=4';
const ONE_DAY = 86400;

export const revalidate = 86400;

export async function GET(): Promise<NextResponse> {
  const upstream = await fetch(SOURCE, { next: { revalidate: ONE_DAY } });
  if (!upstream.ok) {
    return new NextResponse('Not found', { status: 404 });
  }
  const buffer = await upstream.arrayBuffer();
  return new NextResponse(buffer, {
    status: 200,
    headers: {
      'Content-Type': upstream.headers.get('content-type') ?? 'image/jpeg',
      'Cache-Control': `public, max-age=${ONE_DAY}, s-maxage=${ONE_DAY}, immutable`,
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
