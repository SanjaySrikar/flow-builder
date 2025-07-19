import React from 'react';

// can add types here
const nodeTypes = [
  {
    type: 'textMessage',
    label: 'Message',
    icon: '💬',
    description: 'Send a text message',
  },
];

interface NodesPanelProps {
  isVisible: boolean;
}

const NodesPanel: React.FC<NodesPanelProps> = ({ isVisible }) => {
  // Handle drag start for node creation
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  if (!isVisible) return null;

  return (
    <div className="w-70 h-full bg-white border-r border-slate-200 flex flex-col font-sans">
      <div className="px-5 py-4 border-b border-slate-200">
        <h3 className="m-0 text-base font-semibold text-slate-900">Nodes</h3>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto">
        {nodeTypes.map((nodeType) => (
          <div
            key={nodeType.type}
            className="flex items-center p-3 border border-slate-200 rounded-lg mb-3 cursor-grab transition-all duration-200 bg-white hover:border-slate-300 hover:shadow-sm active:cursor-grabbing active:scale-98"
            draggable
            onDragStart={(event) => onDragStart(event, nodeType.type)}
          >
            <div className="flex items-center justify-center w-8 h-8 mr-3 bg-slate-100 rounded-lg text-sm">
              {nodeType.icon}
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-slate-900 mb-0.5">{nodeType.label}</div>
              <div className="text-xs text-slate-500">{nodeType.description}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="px-5 py-4 border-t border-slate-200 bg-slate-50">
        <p className="m-0 text-xs text-slate-500 text-center leading-relaxed">
          Drag and drop nodes to add them to the flow
        </p>
      </div>
    </div>
  );
};

export default NodesPanel;