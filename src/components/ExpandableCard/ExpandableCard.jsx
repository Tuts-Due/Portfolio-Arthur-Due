import { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ExpandableCard = ({ 
  title, 
  description, 
  image, 
  tags = [], 
  links = [], 
  type = 'project',
  onOpenModal 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`expandable-card bg-white dark:bg-gray-800 rounded-lg border-2 
                   border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 
                   ${isExpanded ? 'expanded' : ''}`}>
      {/* Card Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            {title}
          </h3>
          <div className="flex space-x-2">
            {/* Modal Button */}
            {onOpenModal && (
              <Button
                onClick={() => onOpenModal({ title, description, image, tags, links })}
                variant="outline"
                size="sm"
                className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
            )}
            
            {/* External Links */}
            {links.map((link, index) => (
              <Button
                key={index}
                onClick={() => window.open(link.url, '_blank')}
                variant="outline"
                size="sm"
                className="border-purple-500 text-purple-500 hover:bg-purple-500/10"
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            ))}
            
            {/* Expand Button */}
            <Button
              onClick={toggleExpanded}
              variant="outline"
              size="sm"
              className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Image */}
        {image && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <img 
              src={image} 
              alt={title}
              className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Short Description */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {description}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, isExpanded ? tags.length : 3).map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 
                         text-cyan-400 rounded-full text-sm border border-cyan-400/30"
              >
                {tag}
              </span>
            ))}
            {!isExpanded && tags.length > 3 && (
              <span className="px-3 py-1 text-gray-500 text-sm">
                +{tags.length - 3} mais
              </span>
            )}
          </div>
        )}
      </div>

      {/* Expanded Content */}
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
        isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-6 pb-6 border-t border-purple-500/20">
          <div className="pt-4">
            <h4 className="text-lg font-semibold text-cyan-400 mb-2">
              Detalhes Completos
            </h4>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {description}
            </p>
            
            {/* Additional Info for Projects */}
            {type === 'project' && (
              <div className="mt-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-purple-400">Tecnologias:</span>
                  <div className="flex flex-wrap gap-1">
                    {tags.map((tag, index) => (
                      <span key={index} className="text-sm text-gray-500 dark:text-gray-400">
                        {tag}{index < tags.length - 1 ? ',' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Links Section */}
            {links.length > 0 && (
              <div className="mt-4">
                <h5 className="text-sm font-semibold text-purple-400 mb-2">Links:</h5>
                <div className="flex flex-wrap gap-2">
                  {links.map((link, index) => (
                    <Button
                      key={index}
                      onClick={() => window.open(link.url, '_blank')}
                      variant="outline"
                      size="sm"
                      className="border-purple-500 text-purple-500 hover:bg-purple-500/10"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      {link.label}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandableCard;

