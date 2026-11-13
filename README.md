# Shatranj

The royal game: 3D chess in a candlelit study, played with hand gestures, by voice, or with the mouse, against the engine, across one table, or as a live courier duel with a rival anywhere.

Made for laptops and tablets. Best in Chrome or Edge; allow the camera and microphone when asked.

## Run locally

Needs Node.js 20 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Run in production

The game comes with a small server: it hands out the courier invite rooms and links the two players of a live duel. It needs a host that runs Node and keeps WebSocket connections open (GitHub Pages cannot do this).

```bash
npm install
npm run build
npm start
```

The server listens on `PORT` (3000 by default).

### Render

`render.yaml` describes the service. In Render: **New → Blueprint**, pick this repository, and Render builds and starts it on every push.
