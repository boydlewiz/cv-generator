# South African CV Generator

A modern, AI-powered CV generator designed specifically for the South African job market. Create professional CVs with ATS-friendly templates, featuring SA-specific fields like ID number, nationality, and marital status.

## Features

- **AI-Powered Generation**: Generate complete CVs from simple job descriptions using Google Gemini
- **7 Professional Templates**: Modern, Classic, Creative, Executive, Simple, Corporate, and Elegant designs
- **South African Focused**: 
  - ID Number field
  - Nationality and Marital Status
  - SA cities and local context
  - Languages including isiZulu and Afrikaans
- **Manual Editor**: Full control with intuitive forms for all CV sections
- **Live Preview**: See changes in real-time
- **Perfect A4 Export**: Print or save CVs with proper pagination
- **Beautiful Theme**: Protea pink, Jacaranda purple, and warm gold color scheme

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Google Gemini API key

### Installation

1. **Clone or extract the project**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```bash
   cp .env.example .env.local
   ```
   
   Then edit `.env.local` and add your Gemini API key:
   ```
   GOOGLE_GENERATIVE_AI_API_KEY=your_actual_api_key_here
   ```

   **Get your Gemini API key:**
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy the key and paste it into your `.env.local` file

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### AI Generate Mode

1. Click "AI Generate" on the builder page
2. Enter a job description or use one of the example prompts
3. The AI will generate a complete CV based on your description
4. Edit any section as needed

### Manual Edit Mode

1. Click "Manual Edit" to switch modes
2. Fill out each section using the intuitive forms:
   - Personal Info (including ID number, nationality, marital status)
   - Work Experience (with AI-suggested achievements)
   - Education
   - Skills (Technical, Soft, and Tools/Software)
   - Projects
   - Languages

### Choose a Template

1. Click "Templates" to open the template selector
2. Choose from 7 professional designs
3. Preview updates in real-time

### Export Your CV

1. Click "Download CV" or use your browser's print function (Ctrl/Cmd + P)
2. Choose "Save as PDF" as the printer
3. Your CV will export perfectly formatted to A4 pages

## Technology Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **AI**: Google Gemini 2.5 Flash
- **Icons**: Lucide React

## Project Structure

```
├── app/
│   ├── page.tsx              # Landing page
│   ├── builder/              # CV builder page
│   ├── preview/              # CV preview page
│   └── api/ai/               # AI generation endpoints
├── components/
│   ├── builder/              # Builder UI components
│   │   ├── ai-generator.tsx
│   │   ├── manual-editor.tsx
│   │   ├── template-selector.tsx
│   │   └── forms/            # Form components for each section
│   └── templates/            # CV template components
├── lib/
│   ├── types.ts              # TypeScript interfaces
│   └── utils.ts              # Utility functions
└── hooks/                    # Custom React hooks
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GOOGLE_GENERATIVE_AI_API_KEY` | Your Google Gemini API key from AI Studio | Yes |

## Troubleshooting

### AI Generation Not Working

1. **Check your API key**: Ensure `GOOGLE_GENERATIVE_AI_API_KEY` is set correctly in `.env.local`
2. **Restart the dev server**: After adding environment variables, restart with `npm run dev`
3. **Check the console**: Open browser DevTools to see any error messages

### Export Issues

1. Use browser print (Ctrl/Cmd + P) and "Save as PDF"
2. Ensure you're printing from the preview or builder page
3. Select "A4" as the paper size in print settings

## License

MIT License - feel free to use this project for your own CV needs!

## Support

For issues or questions:
1. Check the browser console for error messages
2. Ensure all environment variables are set correctly
3. Verify your Gemini API key is valid and has quota remaining

---

Built with ❤️ for the South African job market
