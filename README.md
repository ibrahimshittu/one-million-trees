# 🌳 One Million Trees Nigeria

An interactive web platform for tracking and supporting tree planting initiatives across Nigeria. Built with Next.js, TypeScript, and modern UI components.

## 🚀 Features

### Interactive Tree Map

- **Real-time Tree Tracking**: Click-enabled markers showing all planted trees
- **Tree Details**: Comprehensive information including species, location, planting date, and environmental impact
- **State Coverage**: Visual representation of planting density across Nigerian states

### Donation System

- **Multiple Tiers**: Four professionally designed donation packages
- **Custom Amounts**: Flexible donation options with impact calculator
- **Environmental Impact**: Real-time calculation of CO₂ offset and oxygen production
- **Secure Processing**: Ready for Paystack integration
- **Digital Certificates**: Automated certificate generation for donors

### Environmental Impact Dashboard

- **Live Statistics**: Real-time tree count and activity feed
- **Carbon Offset Tracking**: Measurable CO₂ absorption metrics
- **State-by-State Analysis**: Detailed breakdown by Nigerian states
- **Top Contributors**: Recognition for major donors
- **Activity Timeline**: Recent planting and donation activities

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + Shadcn/UI
- **Maps**: Mapbox
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

### Environment Variables

For production deployment, set these environment variables in Vercel:

```env
NEXT_PUBLIC_API_URL=your-api-endpoint
NEXT_PUBLIC_PAYSTACK_KEY=your-paystack-public-key
```

## 🗺️ Roadmap

### Phase 1: Foundation (Current) ✅

- [x] Interactive map
- [x] Tree marker system
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
- **Community**: Sustainable development

## 💚 Support

For support, questions, or partnerships:

- Email: support@onemilliontrees.org
- Twitter: @OneMillionTrees
- Website: [onemilliontrees.org](https://onemilliontrees.org)

## 🏆 Acknowledgments

- Local communities across Nigeria
- All our donors and volunteers

---

**Together, we're planting the future of Nigeria, one tree at a time.** 🌳

Built with 💚 for Nigeria's green future
