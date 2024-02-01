"use client"

interface InfoProps {
    title: string;
    content: string;
  }
  
  export const InfoComponent: React.FC<InfoProps> = ({ title, content }) => {
    const paragraphs = content.split("\n\n").map((paragraph, index) => (
      <p key={index} className="text-gray-700 text-base mb-4">{paragraph}</p>
    ));
  
    return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg p-4" style={{ height: '100vh', width: '75vw' }}>
        <div className="font-bold text-xl mb-2" style={{ textAlign: 'center' }}>{title}</div>
        <div className="overflow-auto" style={{ maxHeight: '90vh' }}>
          {paragraphs}
        </div>
      </div>
    );
  };