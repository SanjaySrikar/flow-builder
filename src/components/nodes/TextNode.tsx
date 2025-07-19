import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { WhatsAppIcon, InstagramIcon, SMSIcon } from '../icons/ChannelIcons';

export interface TextNodeData {
  text: string;
  channel?: 'whatsapp' | 'instagram' | 'sms';
}

/**
 * TextNode Component
 * Represents a message node in the chatbot flow
 * 
 * @param data - The node data containing the message text
 * @param selected - Whether the node is currently selected
 */
const TextNode: React.FC<NodeProps<TextNodeData>> = ({ data, selected }) => {
  const channel = data?.channel || 'whatsapp';
  
  const channelIcon = channel ? (() => {
    switch (channel) {
      case 'whatsapp':
        return <WhatsAppIcon className="w-4 h-4 text-green-600" />;
      case 'instagram':
        return <InstagramIcon className="w-4 h-4 text-pink-600" />;
      case 'sms':
        return <SMSIcon className="w-4 h-4 text-blue-600" />;
      default:
        return null;
    }
  })() : null;

  const channelLabel = (() => {
    switch (channel) {
      case 'whatsapp':
        return 'WhatsApp';
      case 'instagram':
        return 'Instagram';
      case 'sms':
        return 'SMS';
      default:
        return 'Message';
    }
  })();
  return (
    <div className={`bg-white border rounded-xl min-w-[200px] shadow-sm font-sans transition-all duration-200 ${
      selected 
        ? 'border-slate-900 shadow-lg' 
        : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
    }`}>
      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2 bg-slate-400 border-2 border-white rounded-full hover:bg-slate-600 transition-colors duration-200 -top-1"
      />
      
      <div className="flex items-center px-3 py-2 bg-slate-50 border-b border-slate-100">
        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
        {channelIcon && (
          <div className="mr-2">
            {channelIcon}
          </div>
        )}
        <div className="text-xs font-medium text-slate-600">
          {channelLabel}
        </div>
      </div>
      
      <div className="p-3">
        <div className="text-sm text-slate-800 leading-relaxed min-h-[20px]">
          {data?.text || 'Click to edit message'}
        </div>
      </div>
      
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2 h-2 bg-slate-400 border-2 border-white rounded-full hover:bg-slate-600 transition-colors duration-200 -bottom-1"
      />
    </div>
  );
};

export default TextNode;