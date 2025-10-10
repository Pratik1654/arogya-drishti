# ArogyaDrishti - Population-Scale Disease & Mutation Sandbox

A comprehensive healthcare simulation platform that provides AI-powered disease modeling, mutation tracking, and public health management tools.

## 🌟 Features

### Core Simulations
- **Virus Spread Simulation**: Real-time pathogen spread modeling and infection rate analytics
- **Virus Mutation Analysis**: Environmental factor analysis and mutation prediction
- **Emergency AI Assist**: Predictive outbreak detection and automated response planning
- **Voice Analytics**: Symptom detection via voice and population health monitoring

### Advanced Analytics
- **SIER Statistics**: Real-time epidemiological compartment tracking and forecasting
- **Heatmap Visualization**: Geographic infection density mapping and hotspot identification
- **AI-Powered Predictions**: Machine learning models for mutation pattern recognition

### Dashboard Features
- Real-time policy monitoring (Vaccination, Lockdown levels, Fixed limits)
- Population health metrics and statistics
- Interactive data visualizations
- Custom virus creation and modeling

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd arogya-drishti
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   GOOGLE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
arogya-drishti/
├── app/
│   ├── chatai/                 # AI Assistant Chat Interface
│   ├── mutation/               # Virus Mutation Simulator
│   ├── layout.tsx
│   └── page.tsx               # Main Landing Page
├── public/                    # Static assets
│   ├── virus-sim.jpg
│   ├── ai-assist.jpg
│   └── medical-pattern.png
├── components/               # Reusable components
└── styles/                  # Global styles
```

## 🎯 Key Pages

### Main Dashboard (`/`)
- Overview of all simulation modules
- Policy statistics and metrics
- Quick access to all features

### AI Assistant (`/chatai`)
- Healthcare-focused AI chatbot
- Real-time responses using Google Gemini
- Clean white interface for optimal readability

### Mutation Simulator (`/mutation`)
- Advanced virus mutation visualization
- Custom virus creation tools
- AI-powered mutation predictions
- Interactive simulation controls

## 🔧 Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **AI Integration**: Google Gemini API
- **Charts & Visualizations**: Canvas API

## 🧩 API Integration

### Google Gemini AI
The platform integrates with Google's Gemini AI for:
- Healthcare recommendations
- Disease pattern analysis
- Real-time chat assistance
- Mutation prediction models

### Configuration
Update the API key in the chat component:
```tsx
const genAI = new GoogleGenerativeAI("your_api_key_here");
```

## 🎨 Customization

### Adding New Simulations
1. Extend the `simulations` array in the main page
2. Create corresponding route in `app/` directory
3. Update navigation and linking

### Styling
- Uses Tailwind CSS for consistent design
- Custom color scheme: Blue/Cyan healthcare theme
- Responsive design for all device sizes

## 📊 Data Models

### Virus Simulation
```typescript
interface VirusData {
  name: string;
  family: string;
  type: string;
  mutationRate: string;
  incubation: string;
  r0: string;
  fatality: string;
  transmission: string;
  symptoms: string;
  ageSusceptibility: Record<string, number>;
}
```

### Chat Messages
```typescript
interface ChatMessage {
  text: string;
  sender: 'user' | 'ai';
}
```

## 🔒 Security Notes

- API keys should be stored in environment variables
- No sensitive health data is stored permanently
- All AI interactions are stateless

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel deploy
```

### Other Platforms
The application can be deployed on any platform supporting Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Check the documentation
- Open an issue on GitHub
- Contact the development team

## 🎯 Future Enhancements

- [ ] Real-world data integration
- [ ] Multi-language support
- [ ] Advanced predictive models
- [ ] Mobile application
- [ ] API for external data sources
- [ ] Collaborative features for research teams

---

**ArogyaDrishti** - Seeing Beyond Illness, Towards Wellness. 🌍💙
