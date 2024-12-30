# FlamingoTube
🎥 FlamingoTube – Your ultimate destination for streaming movies! Discover, watch, and enjoy a curated library of entertainment anytime, anywhere!

# 🦩 FlamingoTube

FlamingoTube is a modern, React-based movie streaming platform that offers a seamless experience for discovering and watching movies. With a sleek user interface and comprehensive features, it provides users with an engaging way to explore and enjoy their favorite films.

## ✨ Features

- **User Authentication**
  - Secure login and signup functionality
  - Protected routes for authenticated users
  - User profile management

- **Movie Discovery**
  - Browse trending movies
  - Search functionality
  - Genre-based browsing
  - Detailed movie information

- **Personal Features**
  - Watchlist functionality
  - User profiles
  - Movie recommendations

- **User Interface**
  - Modern, responsive design
  - Intuitive navigation
  - Smooth transitions
  - Dark mode support

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- TMDB API key (for movie data)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MeryAmr/FlamingoTube.git
   cd FlamingoTube
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your TMDB API key:
   ```env
   VITE_TMDB_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## 🛠️ Built With

- [React](https://reactjs.org/) - Frontend framework
- [React Router](https://reactrouter.com/) - Navigation
- [React Bootstrap](https://react-bootstrap.github.io/) - UI components
- [TMDB API](https://www.themoviedb.org/documentation/api) - Movie data
- [Vite](https://vitejs.dev/) - Build tool

## 📁 Project Structure

```
FlamingoTube/
├── src/
│   ├── api/           # API service functions
│   ├── components/    # Reusable components
│   ├── context/       # Context providers
│   ├── pages/         # Page components
│   ├── styles/        # CSS styles
│   └── main.jsx       # Application entry point
├── public/            # Static assets
└── index.html         # HTML template
```

## 🔑 Key Components

- **Authentication System**
  - Handles user login/signup
  - Manages protected routes
  - Stores user session

- **Movie Service**
  - Fetches movie data from TMDB
  - Handles search and filtering
  - Manages movie details

- **User Features**
  - Watchlist management
  - Profile customization
  - Movie preferences

## 🎨 Styling

The application uses a combination of:
- Custom CSS modules
- React Bootstrap components
- Global styles with CSS variables
- Responsive design principles

## 🔒 Security

- Protected routes for authenticated users
- Secure storage of user data
- API key protection
- Input validation

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for providing the movie data API
- React and its community for the amazing tools
- All contributors who helped with the project
