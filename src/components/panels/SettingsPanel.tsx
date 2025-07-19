import React, { useState, useEffect } from 'react';
import { useFlowStore } from '../../store/flowStore';
import { WhatsAppIcon, InstagramIcon, SMSIcon } from '../icons/ChannelIcons';

interface SettingsPanelProps {
  isVisible: boolean;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ isVisible }) => {
  const { nodes, selectedNodeId, updateNodeData, setSelectedNode } = useFlowStore();
  const [messageText, setMessageText] = useState('');
  const [selectedChannel, setSelectedChannel] = useState<'whatsapp' | 'instagram' | 'sms' | ''>('');


  const selectedNode = nodes.find(node => node.id === selectedNodeId);

  useEffect(() => {
    if (selectedNode) {
      const nodeText = selectedNode.data?.text || '';
      // If the text is the placeholder text, clear it for editing
      if (nodeText === 'Enter your message here...') {
        setMessageText('');
      } else {
        setMessageText(nodeText);
      }
      setSelectedChannel(selectedNode.data?.channel || 'whatsapp');
    }
  }, [selectedNode]);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageText('');
    const newText = event.target.value;
    setMessageText(newText);
    
    if (selectedNodeId) {
      updateNodeData(selectedNodeId, { text: newText });
    }
  };

  const handleChannelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newChannel = event.target.value as 'whatsapp' | 'instagram' | 'sms' | '';
    setSelectedChannel(newChannel);
    
    if (selectedNodeId) {
      updateNodeData(selectedNodeId, { 
        text: messageText,
        channel: newChannel || undefined 
      });
    }
  };


  const handleFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    if (event.target.value === '' || selectedNode?.data?.text === 'Click to edit message') {
      event.target.select();
    }
  };

  const handleBack = () => {
    setSelectedNode(null);
  };

  if (!isVisible || !selectedNode) return null;

  return (
    <div className="w-70 h-full bg-white border-r border-slate-200 flex flex-col font-sans">
      <div className="px-5 py-4 border-b border-slate-200 flex items-center">
        <button 
          className="text-slate-600 text-sm cursor-pointer px-2 py-1 mr-3 rounded hover:bg-slate-100 transition-colors duration-200"
          onClick={handleBack}
        >
          ← Back
        </button>
        <h3 className="m-0 text-base font-semibold text-slate-900">Settings</h3>
      </div>
      
      <div className="flex-1 p-5 overflow-y-auto">
        <div className="mb-6">
          <label htmlFor="channel-select" className="block text-sm font-medium text-slate-700 mb-2">
            Channel
          </label>
          <select
            id="channel-select"
            className="w-full p-3 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all duration-200"
            value={selectedChannel}
            onChange={handleChannelChange}
          > 
          {/* Can be extended to more channels in the future */}
            <option value="">Select a channel</option>
            <option value="whatsapp">📱 WhatsApp</option>
            <option value="instagram">📷 Instagram</option>
            <option value="sms">💬 SMS</option>
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="message-text" className="block text-sm font-medium text-slate-700 mb-2">
            Text
          </label>
          <textarea
            id="message-text"
            className="w-full p-3 border border-slate-200 rounded-lg text-sm leading-relaxed text-slate-900 resize-vertical min-h-[100px] font-inherit focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 placeholder-slate-400 transition-all duration-200"
            value={messageText}
            onChange={handleTextChange}
            onFocus={handleFocus}
            placeholder="Enter your message here..."
            rows={4}
          />
        </div>
        
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-slate-500">Node ID:</span>
            <span className="text-xs text-slate-900 font-mono bg-white px-2 py-1 rounded border">{selectedNode.id}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-slate-500">Type:</span>
            <span className="text-xs text-slate-900 font-mono bg-white px-2 py-1 rounded border">Text Message</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;