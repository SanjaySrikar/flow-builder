import React, { useCallback, useRef } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { useFlowStore } from './store/flowStore';
import TextNode from './components/nodes/TextNode';
import NodesPanel from './components/panels/NodesPanel';
import SettingsPanel from './components/panels/SettingsPanel';
import Snackbar from './components/ui/Snackbar';

// Define custom node types - we'll start with just text messages but can add more types later
const nodeTypes = {
  textMessage: TextNode,
};

function FlowBuilder() {
  // We need a ref to get the wrapper bounds for calculating drop positions
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { project } = useReactFlow();
  
  const {
    nodes,
    edges,
    selectedNodeId,
    snackbar,
    addNode,
    setSelectedNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    validateFlow,
    showSnackbar,
    hideSnackbar,
  } = useFlowStore();

  // When a node is selected, we want to show its settings panel
  // But only if exactly one node is selected
  const onSelectionChange = useCallback(
    ({ nodes: selectedNodes }: { nodes: any[] }) => {
      if (selectedNodes.length === 1) {
        setSelectedNode(selectedNodes[0].id);
      } else {
        setSelectedNode(null);
      }
    },
    [setSelectedNode]
  );

  // Handle dragging nodes from the panel
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // When a node is dropped, we need to:
  // 1. Get the drop position relative to the flow
  // 2. Create a new node at that position
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type || !reactFlowBounds) {
        return;
      }

      // Calculate the position where the node should be created
      const position = project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      addNode(type, position);
    },
    [project, addNode]
  );

  // When saving, we want to:
  // 1. Validate the flow to make sure it's complete
  // 2. Show success/error message to user
  // 3. Log the flow data (in real app, would save to backend)
  const handleSave = () => {
    const validation = validateFlow();
    if (validation.isValid) {
      showSnackbar('Flow saved successfully!', 'success');
      console.log('Saved flow:', { nodes, edges });
    } else {
      showSnackbar(validation.error || 'Invalid flow', 'error');
    }
  };

  return (
    <div className="h-screen flex bg-gray-50">
      <NodesPanel isVisible={!selectedNodeId} />
      <SettingsPanel isVisible={!!selectedNodeId} />

      <div className="flex-1 relative">
        <div className="absolute top-0 left-0 right-0 z-10 bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold text-slate-900">Chatbot Flow Builder</h1>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          >
            Save Changes
          </button>
        </div>

        <div ref={reactFlowWrapper} className="w-full h-full pt-16">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onSelectionChange={onSelectionChange}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
            attributionPosition="bottom-left"
          >
            <Background 
              color="#e2e8f0" 
              gap={20} 
              size={1}
            />
            <Controls 
              className="bg-white border border-slate-200 rounded-lg shadow-sm"
            />
            <MiniMap
              nodeColor={(node) => {
                if (node.type === 'textMessage') return '#64748b';
                return '#64748b';
              }}
              className="bg-white border border-slate-200 rounded-lg shadow-sm"
            />
          </ReactFlow>
        </div>
      </div>

      <Snackbar
        message={snackbar.message}
        type={snackbar.type}
        isVisible={snackbar.isVisible}
        onClose={hideSnackbar}
      />
    </div>
  );
}

// Wrap everything in ReactFlowProvider to access flow context
function App() {
  return (
    <div className="App">
      <ReactFlowProvider>
        <FlowBuilder />
      </ReactFlowProvider>
    </div>
  );
}

export default App;
