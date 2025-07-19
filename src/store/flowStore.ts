import { create } from 'zustand';
import { Node, Edge, Connection, addEdge, applyNodeChanges, applyEdgeChanges, NodeChange, EdgeChange } from 'reactflow';
import { TextNodeData } from '../components/nodes/TextNode';

interface SnackbarState {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
}

interface FlowStore {
  nodes: Node<TextNodeData>[];
  edges: Edge[];
  selectedNodeId: string | null;
  snackbar: SnackbarState;
  
  addNode: (type: string, position: { x: number; y: number }) => void;
  updateNodeData: (nodeId: string, data: Partial<TextNodeData>) => void;
  setSelectedNode: (nodeId: string | null) => void;
  
  onConnect: (connection: Connection) => void;
  
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  
  validateFlow: () => { isValid: boolean; error?: string };
  showSnackbar: (message: string, type: 'success' | 'error' | 'info') => void;
  hideSnackbar: () => void;
}

let nodeIdCounter = 1;

export const useFlowStore = create<FlowStore>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  snackbar: {
    message: '',
    type: 'info',
    isVisible: false,
  },

  addNode: (type: string, position: { x: number; y: number }) => {
    const newNode: Node<TextNodeData> = {
      id: `${type}-${nodeIdCounter++}`,
      type,
      position,
      data: { text: 'Enter your message here...' },
    };
    
    set((state) => ({
      nodes: [...state.nodes, newNode],
    }));
  },

  updateNodeData: (nodeId: string, data: Partial<TextNodeData>) => {
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...data } }
          : node
      ),
    }));
  },

  setSelectedNode: (nodeId: string | null) => {
    set({ selectedNodeId: nodeId });
  },

  onConnect: (connection: Connection) => {
    const { edges } = get();
    const sourceHasConnection = edges.some(
      (edge) => edge.source === connection.source && edge.sourceHandle === connection.sourceHandle
    );
    
    if (sourceHasConnection) {
      set((state) => ({
        edges: state.edges.filter(
          (edge) => !(edge.source === connection.source && edge.sourceHandle === connection.sourceHandle)
        ),
      }));
    }
    
    set((state) => ({
      edges: addEdge(connection, state.edges),
    }));
  },

  onNodesChange: (changes: NodeChange[]) => {
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    }));
  },

  onEdgesChange: (changes: EdgeChange[]) => {
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    }));
  },

  validateFlow: () => {
    const { nodes, edges } = get();
    
    if (nodes.length <= 1) {
      return { isValid: true };
    }
    
    const nodesWithoutIncoming = nodes.filter((node) => {
      return !edges.some((edge) => edge.target === node.id);
    });
    
    if (nodesWithoutIncoming.length > 1) {
      return {
        isValid: false,
        error: 'Cannot save flow: More than one node has empty target handles',
      };
    }
    
    return { isValid: true };
  },

  showSnackbar: (message: string, type: 'success' | 'error' | 'info') => {
    set({
      snackbar: {
        message,
        type,
        isVisible: true,
      },
    });
  },

  hideSnackbar: () => {
    set((state) => ({
      snackbar: {
        ...state.snackbar,
        isVisible: false,
      },
    }));
  },
}));