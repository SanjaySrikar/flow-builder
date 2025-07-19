# 🤖 Chatbot Flow Builder

A modern, intuitive drag-and-drop chatbot flow builder built with React Flow and TypeScript.

## ✨ Features

- **Drag & Drop Interface** - Create chatbot flows by dragging message nodes from the panel
- **Visual Flow Editor** - Connect nodes with handles to create conversation paths
- **Real-time Editing** - Click on any node to edit its message content
- **Flow Validation** - Ensures proper flow structure before saving
- **Modern UI** - Clean, minimalist design with smooth animations
- **Responsive Design** - Works on desktop and mobile devices

## 🛠️ Built With

- **React 18** with TypeScript
- **React Flow** for the flow editor
- **Zustand** for state management
- **Tailwind CSS** for styling
- **Vite** for fast development

## 🚀 Live Demo

**[View Live Demo →](flow-builder-hs758o41w-sanjaysrikars-projects.vercel.app)**

## 📱 How to Use

1. **Create Nodes** - Drag the "Message" node from the left panel to the canvas
2. **Edit Content** - Click on any node to open the settings panel and edit the message
3. **Connect Nodes** - Drag from the bottom handle to the top handle of another node
4. **Save Flow** - Click "Save Changes" to validate and save your flow

## 🏗️ Development

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd chatbot-flow-builder

# Install dependencies
npm install

# Start development server
npm start
```

### Build for Production

```bash
npm run build
```

## 🚀 Deployment

This project is configured for easy deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with every push

## 📁 Project Structure

```
src/
├── components/
│   ├── nodes/          # Custom node components
│   ├── panels/         # Side panels (Nodes, Settings)
│   └── ui/             # Reusable UI components
├── store/              # Zustand state management
└── App.tsx             # Main application component
```

## 🎯 Features in Detail

### Flow Validation
- Only one node can have empty target handles
- Prevents invalid flow structures
- Real-time validation feedback

### Node Management
- Extensible architecture for adding new node types
- Smart placeholder text handling
- Auto-focus and text selection for better UX

### State Management
- Centralized state with Zustand
- Real-time updates across components
- Persistent flow state during editing

