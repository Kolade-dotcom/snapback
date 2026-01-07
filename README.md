# Snapback

Snapback is a task management application with a twist. It leverages AI to encourage task completion, potentially using "roasts" or gamified feedback to keep users motivated. Built with modern mobile technologies for performance and a great user experience.

## ✨ Features

- **Task Management**: Create, view, and manage tasks.
- **AI-Powered**: Uses OpenAI to generate unique feedback and "roasts" for tasks.
- **Authentication**: Secure user signup and login.
- **Modern UI**: Clean, responsive interface built with NativeWind.

## 🛠️ Tech Stack

- **Framework**: [Expo](https://expo.dev/) & [React Native](https://reactnative.dev/)
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/)
- **Styling**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS)
- **Database**: [Supabase](https://supabase.com/) & [Drizzle ORM](https://orm.drizzle.team/)
- **State Management**: [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- **AI Integration**: [OpenAI](https://openai.com/)

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Expo Go app (for physical device testing) or an Android/iOS emulator.

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Kolade-dotcom/snapback.git
    cd snapback
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up environment variables:
    - Copy `.env.example` to `.env`.
    - Fill in your API keys (Supabase, OpenAI, etc.).

4.  Start the application:
    ```bash
    npm start
    ```

## 📜 Scripts

- `npm start`: Start the Expo development server.
- `npm run android`: Run on Android emulator/device.
- `npm run ios`: Run on iOS simulator/device.
- `npm run web`: Run on web browser.
- `npm test`: Run tests with Jest.
