# Jamroom - Real-Time Music Jamming Platform

A real-time collaborative music jamming application that allows musicians to view song lyrics and chords synchronously during live sessions. Built with React, Socket.IO, and Redux.

## Live Demo

https://jamroom-wg7a.onrender.com/

## Features

### Real-Time Synchronization
- **Live Song Selection**: Admin selects a song, and all connected musicians are instantly navigated to the same song
- **Session Management**: Admin can end sessions and return all users to the main page
- **Late Join Support**: Musicians who join mid-session are automatically synced to the current song

### User Roles
- **Admin**:
  - Search and select songs for the band
  - Control live sessions (start/end)
  - Dedicated signup URL at `/signup/admin`
- **Musicians**:
  - Wait for admin to select songs
  - View lyrics with instrument-specific chord display
  - Auto-scroll feature for hands-free playing

### Smart Lyrics Display
- **Conditional Chord Display**: Vocals users see only lyrics, while instrumentalists see both lyrics and chords
- **Hebrew Language Support**: Automatic RTL (right-to-left) text detection and rendering
- **Auto-Scroll**: Smooth automatic scrolling with adjustable speed for seamless performance

### User Experience
- User authentication (login/signup)
- Instrument selection during registration
- Real-time user notifications
- Responsive design

## Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Redux** - State management
- **React Router** - Client-side routing
- **Socket.IO Client** - Real-time bidirectional communication
- **Axios** - HTTP client

### Backend Requirements
- Node.js server with Socket.IO
- RESTful API for songs and users
- WebSocket support for real-time features

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone <https://github.com/InbalCarmy>
cd jamroom-fronted
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory (if needed):
```env
VITE_API_URL=https://github.com/InbalCarmy/jamroom_backend
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## Project Structure

```
src/
├── cmps/                    # Reusable components
│   ├── AppHeader.jsx        # Navigation header
│   ├── SongFilter.jsx       # Search filter component
│   ├── SongList.jsx         # Song list display
│   ├── SongPreview.jsx      # Song preview card
│   ├── SongLyrics.jsx       # Lyrics and chords display
│   └── UserMsg.jsx          # Toast notifications
├── pages/                   # Page components
│   ├── HomePage.jsx         # Landing page
│   ├── LoginPage.jsx        # User login
│   ├── SignupPage.jsx       # User registration
│   ├── MainPage.jsx         # Admin song selection / User waiting room
│   └── LivePage.jsx         # Live performance page
├── services/                # Business logic and API
│   ├── http.service.js      # HTTP client wrapper
│   ├── song.service.js      # Song-related API calls
│   ├── user.service.js      # User authentication
│   ├── socket.service.js    # Socket.IO configuration
│   └── event-bus.service.js # Event bus for notifications
├── store/                   # Redux store
│   ├── store.js             # Redux store configuration
│   ├── song/                # Song-related state
│   │   ├── song.actions.js
│   │   └── song.reducer.js
│   └── user/                # User-related state
│       ├── user.actions.js
│       └── user.reducer.js
├── assets/                  # Static assets and styles
│   └── style/               # CSS files
├── App.jsx                  # Main app component
└── main.jsx                 # Application entry point
```

## Key Features Implementation

### Socket.IO Events

**Emitted Events:**
- `song-selected` - Admin selects a song
- `end-session` - Admin ends the live session
- `request-current-song` - New user requests current song
- `current-song` - Admin responds with current song

**Listened Events:**
- `song-selected` - Navigate all users to selected song
- `end-session` - Return all users to main page
- `current-song` - Navigate late-joining users to current song

### User Authentication Flow

1. Users sign up with username, password, and instrument selection
2. Admins sign up at a dedicated URL (`/signup/admin`)
3. Authentication state managed via Redux
4. Socket connection established on login
5. Socket disconnection on logout

### Admin Workflow

1. Admin logs in and navigates to main page
2. Search for songs using the filter
3. Click on a song to select it
4. All connected musicians are automatically navigated to the song
5. Click "Exit Live" to end the session and return everyone to main page

### Musician Workflow

1. Musician logs in and waits on main page
2. Automatically navigated when admin selects a song
3. View lyrics with chords (if not vocals)
4. Use auto-scroll feature during performance
5. Automatically returned to main page when session ends

## API Endpoints Expected

### Songs
- `GET /api/song?txt=searchTerm` - Get filtered songs
- `GET /api/song/:id` - Get specific song with lyrics

### Users
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/user` - Get logged-in user

## Environment Variables

Create a `.env` file with the following variables:

```env
VITE_API_URL=http://localhost:3030  # Backend API URL
```

## Deployment

The application is deployed on [Render](https://render.com).

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- [ ] Video chat integration
- [ ] Recording sessions
- [ ] Sheet music display
- [ ] Metronome and tempo control
- [ ] Song annotations and notes
- [ ] Private jam rooms
- [ ] Song creation and editing for admins

