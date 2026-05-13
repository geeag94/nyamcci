# Nyamcci (냥씨)

귀엽고 발랄한 날씨 PWA 웹 애플리케이션

## 기능

- 현재 위치 기반 실시간 날씨
- 시간별 / 일별 예보
- 지도에서 날씨 확인
- 즐겨찾기 기능
- PWA (오프라인 지원, 홈 화면 설치)
- 푸시 알림
- 다크모드
- 귀여운 날씨 아이콘 애니메이션

## 기술 스택

- Next.js 16 + TypeScript
- Tailwind CSS
- Framer Motion
- Zustand
- Leaflet
- 기상청 단기예보 API

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 테스트
npm run test
```

## 환경 변수

`.env.local` 파일을 생성하고 기상청 API 키를 추가하세요:

```
NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here
```

기상청 API 키는 [공공데이터포털](https://www.data.go.kr/)에서 발급받을 수 있습니다.

## 배포

Vercel에 자동 배포됩니다.
