import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #8b5cf6 100%)',
          borderRadius: 7,
        }}
      >
        <div
          style={{
            width: 26,
            height: 26,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0a0a14',
            borderRadius: 5,
            color: '#e2e8f0',
            fontSize: 15,
            fontWeight: 800,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: -0.5,
          }}
        >
          SG
        </div>
      </div>
    ),
    { ...size },
  );
}
