# 🌳 One Million Trees Nigeria

A professional, interactive web platform for tracking and supporting tree planting initiatives across Nigeria. Built with Next.js, TypeScript, and modern UI components.

## 🚀 Features

### Interactive Tree Map

- **Nigeria-Focused Visualization**: Dedicated map showing only Nigeria with masked boundaries
- **Real-time Tree Tracking**: Click-enabled markers showing all planted trees
- **Tree Details**: Comprehensive information including species, location, planting date, and environmental impact
- **State Coverage**: Visual representation of planting density across Nigerian states
- **Status Indicators**: Color-coded markers for tree health status

### Donation System

- **Multiple Tiers**: Four professionally designed donation packages
- **Custom Amounts**: Flexible donation options with impact calculator
- **Environmental Impact**: Real-time calculation of CO₂ offset and oxygen production
- **Secure Processing**: Ready for Paystack, Flutterwave, and Interswitch integration
- **Digital Certificates**: Automated certificate generation for donors

### Environmental Impact Dashboard

- **Live Statistics**: Real-time tree count and activity feed
- **Carbon Offset Tracking**: Measurable CO₂ absorption metrics
- **State-by-State Analysis**: Detailed breakdown by Nigerian states
- **Top Contributors**: Recognition for major donors
- **Activity Timeline**: Recent planting and donation activities

### Professional Design

- **Shadcn/UI Components**: Consistent, accessible design system
- **Responsive Layout**: Optimized for all devices
- **Smooth Animations**: Framer Motion for engaging interactions
- **Clean Typography**: Professional spacing and hierarchy
- **Glass Morphism**: Modern UI effects and overlays

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + Shadcn/UI
- **Maps**: Leaflet + React Leaflet
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/one-million-trees.git

# Navigate to project directory
cd one-million-trees

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🚀 Deployment on Vercel

The easiest way to deploy this Next.js app is using [Vercel](https://vercel.com), the platform from the creators of Next.js.

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fone-million-trees)

### Manual Deployment

1. Push your code to a GitHub repository
2. Import your repository on [Vercel](https://vercel.com/new)
3. Vercel will automatically detect Next.js and configure the build settings
4. Click "Deploy" and your application will be live in minutes

### Environment Variables

For production deployment, set these environment variables in Vercel:

```env
NEXT_PUBLIC_API_URL=your-api-endpoint
NEXT_PUBLIC_PAYSTACK_KEY=your-paystack-public-key
NEXT_PUBLIC_FLUTTERWAVE_KEY=your-flutterwave-public-key
```

## 🗺️ Roadmap

### Phase 1: Foundation (Current) ✅

- [x] Interactive map with Nigeria focus
- [x] Tree marker system with popups
- [x] Donation tiers and packages
- [ ] Basic statistics dashboard
- [x] Responsive design implementation
- [x] Mock data for demonstrations

### Phase 2: Backend Integration (Q3/Q4 2025)

- [ ] Database setup (PostgreSQL/Supabase)
- [ ] Admin dashboard for tree management
- [ ] Real payment gateway integration
- [ ] Email notification system
- [ ] Digital certificate generation

- [ ] User profiles and donation history
- [ ] Social sharing capabilities
- [ ] Tree adoption program
- [ ] Monthly progress reports
- [ ] Impact stories and blog

### Phase 3: Scale & Expansion (2026)

- [ ] Partnership with international organizations
- [ ] Carbon offset marketplace for businesses

## 🌍 API Endpoints

### Trees API

- `GET /api/trees` - Get all trees (with filtering)
- `GET /api/trees/[id]` - Get specific tree details
- `POST /api/trees` - Add new tree
- `PUT /api/trees/[id]` - Update tree information
- `DELETE /api/trees/[id]` - Remove tree

### Donations API

- `POST /api/donations` - Process new donation
- `GET /api/donations` - Get recent donations

### Stats API

- `GET /api/stats` - Get platform statistics

## 🎨 Design System

The project uses a professional green-themed design:

- **Primary Green**: `#16a34a` - Environmental action
- **Light Green**: `#f0fdf4` - Backgrounds
- **Accent Gold**: `#fbbf24` - Achievements
- **Status Colors**:
  - Healthy: Green
  - Growing: Blue
  - Planted: Yellow
  - Needs Attention: Orange

## 📱 Key Components

### Core Components

- `TreeMap.tsx` - Nigeria-focused interactive map
- `TreeDetailModal.tsx` - Comprehensive tree information
- `DonationSection.tsx` - Professional donation tiers
- `StatsSection.tsx` - Live statistics dashboard
- `Hero.tsx` - Landing page hero section

### API Routes

- `/api/trees` - Tree management
- `/api/donations` - Donation processing
- `/api/stats` - Statistics endpoints

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure responsive design is maintained

## 📄 License

This project is open source and available under the MIT License.

## 🌱 Environmental Impact

Every tree planted through this platform contributes to:

- **Climate Action**: ~22kg CO₂ absorbed per tree annually
- **Oxygen Production**: ~118kg oxygen produced per tree yearly
- **Biodiversity**: Habitat for local wildlife
- **Soil Health**: Erosion prevention and soil enrichment
- **Water Cycle**: Improved water retention and rainfall patterns
- **Community**: Jobs and sustainable development

## 💚 Support

For support, questions, or partnerships:

- Email: support@onemilliontrees.org
- Twitter: @OneMillionTrees
- Website: [onemilliontrees.org](https://onemilliontrees.org)

## 🏆 Acknowledgments

- Nigerian Federal Ministry of Environment
- State Forestry Departments
- Local communities across Nigeria
- All our donors and volunteers

---

**Together, we're planting the future of Nigeria, one tree at a time.** 🌳

Built with 💚 for Nigeria's green future
